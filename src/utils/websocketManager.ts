'use client';

// WebSocket Manager for Real-time Updates and Offline Notifications
import { useUIStore, useNotificationStore } from '@/store';
import { localStorageUtils } from '@/utils/localStorage';

export interface WebSocketConfig {
  url?: string;
  protocols?: string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  heartbeatTimeout?: number;
  enableOfflineQueue?: boolean;
  offlineQueueMaxSize?: number;
  enableNotifications?: boolean;
  enableDebug?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  onMessage?: (message: any) => void;
  onReconnect?: (attempt: number) => void;
  onMaxReconnectAttempts?: () => void;
}

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
  id?: string;
  userId?: string;
  channelId?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface OfflineNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: any;
  retryCount?: number;
  maxRetries?: number;
}

export interface WebSocketStats {
  connected: boolean;
  reconnectAttempts: number;
  lastConnected?: number;
  lastDisconnected?: number;
  messagesReceived: number;
  messagesSent: number;
  bytesReceived: number;
  bytesSent: number;
  uptime: number;
  latency: number;
  offlineQueueSize: number;
}

export interface ChannelSubscription {
  channelId: string;
  callbacks: Set<(message: WebSocketMessage) => void>;
  lastActivity: number;
  isActive: boolean;
}

// WebSocket Manager Class
export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private heartbeatTimeoutTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private isConnected: boolean = false;
  private messageQueue: WebSocketMessage[] = [];
  private offlineQueue: OfflineNotification[] = [];
  private subscriptions: Map<string, ChannelSubscription> = new Map();
  private stats: WebSocketStats;
  private defaultConfig: WebSocketConfig = {
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080',
    protocols: [],
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
    heartbeatInterval: 30000, // 30 seconds
    heartbeatTimeout: 5000, // 5 seconds
    enableOfflineQueue: true,
    offlineQueueMaxSize: 100,
    enableNotifications: true,
    enableDebug: false,
  };

  constructor(config: Partial<WebSocketConfig> = {}) {
    this.config = { ...this.defaultConfig, ...config };
    this.stats = {
      connected: false,
      reconnectAttempts: 0,
      messagesReceived: 0,
      messagesSent: 0,
      bytesReceived: 0,
      bytesSent: 0,
      uptime: 0,
      latency: 0,
      offlineQueueSize: 0,
    };

    this.loadOfflineQueue();
    this.setupOnlineOfflineListeners();
  }

  // Connect to WebSocket
  public connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      if (this.config.enableDebug) {
        console.debug('WebSocket already connected');
      }
      return;
    }

    try {
      if (this.config.enableDebug) {
        console.debug(`Connecting to WebSocket: ${this.config.url}`);
      }

      this.ws = new WebSocket(this.config.url, this.config.protocols);
      this.setupEventListeners();
      
      // Start connection timeout
      const connectionTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
          this.ws.close();
          this.handleConnectionError(new Error('Connection timeout'));
        }
      }, 10000);

      // Clear timeout when connection opens
      this.ws.addEventListener('open', () => {
        clearTimeout(connectionTimeout);
      }, { once: true });
    } catch (error) {
      this.handleConnectionError(error as Error);
    }
  }

  // Disconnect from WebSocket
  public disconnect(): void {
    this.clearTimers();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
    this.stats.connected = false;
    this.stats.lastDisconnected = Date.now();
    
    if (this.config.enableDebug) {
      console.debug('WebSocket disconnected');
    }
  }

  // Setup event listeners
  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.handleConnectionOpen();
    };

    this.ws.onclose = (event) => {
      this.handleConnectionClose(event);
    };

    this.ws.onerror = (event) => {
      this.handleConnectionError(event);
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event);
    };
  }

  // Handle connection open
  private handleConnectionOpen(): void {
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.stats.connected = true;
    this.stats.lastConnected = Date.now();
    this.stats.uptime = Date.now() - (this.stats.lastDisconnected || Date.now());

    if (this.config.enableDebug) {
      console.debug('WebSocket connected');
    }

    // Clear reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Start heartbeat
    this.startHeartbeat();

    // Send queued messages
    this.sendQueuedMessages();

    // Process offline queue
    this.processOfflineQueue();

    // Call connect callback
    this.config.onConnect?.();
  }

  // Handle connection close
  private handleConnectionClose(event: CloseEvent): void {
    this.isConnected = false;
    this.stats.connected = false;
    this.stats.lastDisconnected = Date.now();

    if (this.config.enableDebug) {
      console.debug(`WebSocket closed: ${event.code} - ${event.reason}`);
    }

    // Clear timers
    this.clearTimers();

    // Attempt to reconnect
    if (!event.wasClean && this.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.scheduleReconnect();
    } else if (event.wasClean) {
      // Clean close, don't reconnect
      this.config.onDisconnect?.();
    } else {
      // Max reconnect attempts reached
      this.config.onMaxReconnectAttempts?.();
    }
  }

  // Handle connection error
  private handleConnectionError(error: Event | Error): void {
    if (this.config.enableDebug) {
      console.error('WebSocket error:', error);
    }

    this.config.onError?.(error);
  }

  // Handle message
  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Update stats
      this.stats.messagesReceived++;
      this.stats.bytesReceived += event.data.length;

      // Update latency if timestamp is provided
      if (message.timestamp) {
        this.stats.latency = Date.now() - message.timestamp;
      }

      if (this.config.enableDebug) {
        console.debug('WebSocket message received:', message);
      }

      // Handle heartbeat
      if (message.type === 'heartbeat') {
        this.handleHeartbeatResponse(message);
        return;
      }

      // Route message to subscribers
      this.routeMessage(message);

      // Call message callback
      this.config.onMessage?.(message);
    } catch (error) {
      if (this.config.enableDebug) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }

  // Route message to subscribers
  private routeMessage(message: WebSocketMessage): void {
    if (message.channelId) {
      const subscription = this.subscriptions.get(message.channelId);
      if (subscription && subscription.isActive) {
        subscription.callbacks.forEach(callback => {
          try {
            callback(message);
          } catch (error) {
            console.error('Error in subscription callback:', error);
          }
        });
        subscription.lastActivity = Date.now();
      }
    }
  }

  // Send message
  public sendMessage(message: WebSocketMessage): boolean {
    if (!this.isConnected || !this.ws) {
      // Queue message for when we reconnect
      this.messageQueue.push(message);
      return false;
    }

    try {
      const messageData = JSON.stringify({
        ...message,
        timestamp: Date.now(),
      });

      this.ws.send(messageData);
      
      // Update stats
      this.stats.messagesSent++;
      this.stats.bytesSent += messageData.length;

      if (this.config.enableDebug) {
        console.debug('WebSocket message sent:', message);
      }

      return true;
    } catch (error) {
      if (this.config.enableDebug) {
        console.error('Failed to send WebSocket message:', error);
      }
      return false;
    }
  }

  // Send queued messages
  private sendQueuedMessages(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.sendMessage(message);
    }
  }

  // Subscribe to channel
  public subscribe(channelId: string, callback: (message: WebSocketMessage) => void): () => void {
    let subscription = this.subscriptions.get(channelId);
    
    if (!subscription) {
      subscription = {
        channelId,
        callbacks: new Set(),
        lastActivity: Date.now(),
        isActive: true,
      };
      this.subscriptions.set(channelId, subscription);
    }

    subscription.callbacks.add(callback);

    // Send subscription message
    this.sendMessage({
      type: 'subscribe',
      data: { channelId },
      timestamp: Date.now(),
    });

    // Return unsubscribe function
    return () => {
      const sub = this.subscriptions.get(channelId);
      if (sub) {
        sub.callbacks.delete(callback);
        
        if (sub.callbacks.size === 0) {
          sub.isActive = false;
          
          // Send unsubscribe message
          this.sendMessage({
            type: 'unsubscribe',
            data: { channelId },
            timestamp: Date.now(),
          });
        }
      }
    };
  }

  // Unsubscribe from channel
  public unsubscribe(channelId: string, callback?: (message: WebSocketMessage) => void): void {
    const subscription = this.subscriptions.get(channelId);
    
    if (subscription) {
      if (callback) {
        subscription.callbacks.delete(callback);
      } else {
        subscription.callbacks.clear();
      }

      if (subscription.callbacks.size === 0) {
        subscription.isActive = false;
        this.subscriptions.delete(channelId);
        
        // Send unsubscribe message
        this.sendMessage({
          type: 'unsubscribe',
          data: { channelId },
          timestamp: Date.now(),
        });
      }
    }
  }

  // Start heartbeat
  private startHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }

    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected && this.ws) {
        this.sendMessage({
          type: 'heartbeat',
          data: { timestamp: Date.now() },
          timestamp: Date.now(),
        });

        // Set timeout for heartbeat response
        this.heartbeatTimeoutTimer = setTimeout(() => {
          if (this.config.enableDebug) {
            console.warn('Heartbeat timeout, reconnecting...');
          }
          this.disconnect();
          this.scheduleReconnect();
        }, this.config.heartbeatTimeout);
      }
    }, this.config.heartbeatInterval);
  }

  // Handle heartbeat response
  private handleHeartbeatResponse(message: WebSocketMessage): void {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }

    if (this.config.enableDebug) {
      console.debug('Heartbeat response received');
    }
  }

  // Schedule reconnect
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      return;
    }

    this.reconnectAttempts++;
    
    if (this.config.enableDebug) {
      console.debug(`Scheduling reconnect attempt ${this.reconnectAttempts}`);
    }

    this.config.onReconnect?.(this.reconnectAttempts);

    const delay = this.config.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  // Clear timers
  private clearTimers(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  // Setup online/offline listeners
  private setupOnlineOfflineListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        if (this.config.enableDebug) {
          console.debug('Browser is online');
        }
        if (!this.isConnected) {
          this.connect();
        }
      });

      window.addEventListener('offline', () => {
        if (this.config.enableDebug) {
          console.debug('Browser is offline');
        }
        this.disconnect();
      });
    }
  }

  // Add offline notification
  public addOfflineNotification(notification: Omit<OfflineNotification, 'id' | 'timestamp' | 'read'>): void {
    if (!this.config.enableOfflineQueue) {
      return;
    }

    const fullNotification: OfflineNotification = {
      ...notification,
      id: notification.id || Math.random().toString(36).substr(2, 9),
      timestamp: notification.timestamp || Date.now(),
      read: false,
      retryCount: 0,
      maxRetries: notification.maxRetries || 3,
    };

    // Add to queue
    this.offlineQueue.push(fullNotification);
    
    // Limit queue size
    if (this.offlineQueue.length > this.config.offlineQueueMaxSize) {
      this.offlineQueue.shift();
    }

    // Save to localStorage
    this.saveOfflineQueue();

    // Show notification if enabled
    if (this.config.enableNotifications) {
      this.showOfflineNotification(fullNotification);
    }

    this.stats.offlineQueueSize = this.offlineQueue.length;

    if (this.config.enableDebug) {
      console.debug('Added offline notification:', fullNotification);
    }
  }

  // Process offline queue
  private processOfflineQueue(): void {
    if (!this.config.enableOfflineQueue || this.offlineQueue.length === 0) {
      return;
    }

    const notifications = [...this.offlineQueue];
    this.offlineQueue = [];

    notifications.forEach(notification => {
      if (notification.retryCount < notification.maxRetries) {
        // Try to send notification
        const success = this.sendMessage({
          type: 'notification',
          data: notification,
          timestamp: Date.now(),
        });

        if (!success) {
          // Re-add to queue
          notification.retryCount++;
          this.offlineQueue.push(notification);
        } else {
          // Mark as read and remove
          notification.read = true;
        }
      }
    });

    // Update stats
    this.stats.offlineQueueSize = this.offlineQueue.length;

    // Save updated queue
    this.saveOfflineQueue();

    if (this.config.enableDebug) {
      console.debug(`Processed offline queue: ${notifications.length} notifications`);
    }
  }

  // Show offline notification
  private showOfflineNotification(notification: OfflineNotification): void {
    const notificationStore = useNotificationStore.getState();
    
    notificationStore.addNotification({
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      timestamp: notification.timestamp,
      read: notification.read,
      autoClose: false,
      data: notification.data,
    });
  }

  // Save offline queue to localStorage
  private saveOfflineQueue(): void {
    try {
      localStorageUtils.set('websocket_offline_queue', this.offlineQueue, {
        ttl: 24 * 60 * 60 * 1000, // 24 hours
      });
    } catch (error) {
      if (this.config.enableDebug) {
        console.error('Failed to save offline queue:', error);
      }
    }
  }

  // Load offline queue from localStorage
  private loadOfflineQueue(): void {
    try {
      const queue = localStorageUtils.get<OfflineNotification[]>('websocket_offline_queue', []);
      if (queue) {
        this.offlineQueue = queue;
        this.stats.offlineQueueSize = queue.length;
      }
    } catch (error) {
      if (this.config.enableDebug) {
        console.error('Failed to load offline queue:', error);
      }
    }
  }

  // Get connection status
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Get stats
  public getStats(): WebSocketStats {
    return {
      ...this.stats,
      uptime: this.stats.connected ? Date.now() - (this.stats.lastConnected || Date.now()) : this.stats.uptime,
    };
  }

  // Update configuration
  public updateConfig(config: Partial<WebSocketConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Restart heartbeat if interval changed
    if (config.heartbeatInterval && this.isConnected) {
      this.startHeartbeat();
    }
  }

  // Get configuration
  public getConfig(): WebSocketConfig {
    return { ...this.config };
  }

  // Get active subscriptions
  public getActiveSubscriptions(): string[] {
    return Array.from(this.subscriptions.entries())
      .filter(([_, sub]) => sub.isActive)
      .map(([channelId, _]) => channelId);
  }

  // Get subscription info
  public getSubscriptionInfo(channelId: string): ChannelSubscription | null {
    return this.subscriptions.get(channelId) || null;
  }

  // Clear message queue
  public clearMessageQueue(): void {
    this.messageQueue = [];
  }

  // Clear offline queue
  public clearOfflineQueue(): void {
    this.offlineQueue = [];
    this.stats.offlineQueueSize = 0;
    this.saveOfflineQueue();
  }

  // Reset stats
  public resetStats(): void {
    this.stats = {
      connected: this.stats.connected,
      reconnectAttempts: 0,
      lastConnected: this.stats.lastConnected,
      lastDisconnected: this.stats.lastDisconnected,
      messagesReceived: 0,
      messagesSent: 0,
      bytesReceived: 0,
      bytesSent: 0,
      uptime: 0,
      latency: 0,
      offlineQueueSize: this.stats.offlineQueueSize,
    };
  }

  // Destroy WebSocket manager
  public destroy(): void {
    this.disconnect();
    this.clearTimers();
    this.clearMessageQueue();
    this.clearOfflineQueue();
    this.subscriptions.clear();
  }
}

// React hook for WebSocket
export const useWebSocket = (config: Partial<WebSocketConfig> = {}) => {
  const [wsManager] = useState(() => new WebSocketManager(config));
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState<WebSocketStats>(() => wsManager.getStats());
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  // Update connection status
  useEffect(() => {
    const updateStatus = () => {
      const connected = wsManager.getConnectionStatus();
      setIsConnected(connected);
      setStats(wsManager.getStats());
      setSubscriptions(wsManager.getActiveSubscriptions());
    };

    // Initial update
    updateStatus();

    // Set up interval for updates
    const interval = setInterval(updateStatus, 1000);

    // Set up event listeners
    const handleConnect = () => updateStatus();
    const handleDisconnect = () => updateStatus();
    const handleMessage = () => updateStatus();

    wsManager.updateConfig({
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onMessage: handleMessage,
    });

    return () => {
      clearInterval(interval);
    };
  }, [wsManager]);

  // Connect
  const connect = useCallback(() => {
    wsManager.connect();
  }, [wsManager]);

  // Disconnect
  const disconnect = useCallback(() => {
    wsManager.disconnect();
  }, [wsManager]);

  // Send message
  const sendMessage = useCallback((message: WebSocketMessage) => {
    return wsManager.sendMessage(message);
  }, [wsManager]);

  // Subscribe to channel
  const subscribe = useCallback((channelId: string, callback: (message: WebSocketMessage) => void) => {
    return wsManager.subscribe(channelId, callback);
  }, [wsManager]);

  // Unsubscribe from channel
  const unsubscribe = useCallback((channelId: string, callback?: (message: WebSocketMessage) => void) => {
    wsManager.unsubscribe(channelId, callback);
  }, [wsManager]);

  // Add offline notification
  const addOfflineNotification = useCallback((notification: Omit<OfflineNotification, 'id' | 'timestamp' | 'read'>) => {
    wsManager.addOfflineNotification(notification);
  }, [wsManager]);

  // Get subscription info
  const getSubscriptionInfo = useCallback((channelId: string) => {
    return wsManager.getSubscriptionInfo(channelId);
  }, [wsManager]);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<WebSocketConfig>) => {
    wsManager.updateConfig(newConfig);
  }, [wsManager]);

  // Clear queues
  const clearQueues = useCallback(() => {
    wsManager.clearMessageQueue();
    wsManager.clearOfflineQueue();
  }, [wsManager]);

  // Reset stats
  const resetStats = useCallback(() => {
    wsManager.resetStats();
    setStats(wsManager.getStats());
  }, [wsManager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsManager.destroy();
    };
  }, [wsManager]);

  return {
    wsManager,
    isConnected,
    stats,
    subscriptions,
    connect,
    disconnect,
    sendMessage,
    subscribe,
    unsubscribe,
    addOfflineNotification,
    getSubscriptionInfo,
    updateConfig,
    clearQueues,
    resetStats,
  };
};

// Utility functions
export const webSocketUtils = {
  // Create WebSocket manager
  createManager: (config?: Partial<WebSocketConfig>) => {
    return new WebSocketManager(config);
  },

  // Generate WebSocket URL
  generateUrl: (baseUrl: string, path?: string, params?: Record<string, string>): string => {
    const url = new URL(baseUrl);
    
    if (path) {
      url.pathname = path;
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  },

  // Validate WebSocket URL
  validateUrl: (url: string): boolean => {
    try {
      const wsUrl = new URL(url);
      return wsUrl.protocol === 'ws:' || wsUrl.protocol === 'wss:';
    } catch {
      return false;
    }
  },

  // Format connection status
  formatStatus: (connected: boolean): string => {
    return connected ? 'Connected' : 'Disconnected';
  },

  // Format latency
  formatLatency: (latency: number): string => {
    return `${latency}ms`;
  },

  // Format uptime
  formatUptime: (uptime: number): string => {
    if (uptime < 60000) {
      return `${Math.floor(uptime / 1000)}s`;
    } else if (uptime < 3600000) {
      return `${Math.floor(uptime / 60000)}m`;
    } else {
      return `${Math.floor(uptime / 3600000)}h`;
    }
  },

  // Format bytes
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Create default config
  createDefaultConfig: (): WebSocketConfig => {
    return {
      url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080',
      protocols: [],
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      heartbeatInterval: 30000,
      heartbeatTimeout: 5000,
      enableOfflineQueue: true,
      offlineQueueMaxSize: 100,
      enableNotifications: true,
      enableDebug: false,
    };
  },

  // Validate config
  validateConfig: (config: Partial<WebSocketConfig>): string[] => {
    const errors: string[] = [];
    
    if (config.url && !webSocketUtils.validateUrl(config.url)) {
      errors.push('Invalid WebSocket URL');
    }
    
    if (config.reconnectInterval !== undefined && config.reconnectInterval < 1000) {
      errors.push('reconnectInterval must be at least 1000ms');
    }
    
    if (config.maxReconnectAttempts !== undefined && config.maxReconnectAttempts < 0) {
      errors.push('maxReconnectAttempts must be non-negative');
    }
    
    if (config.heartbeatInterval !== undefined && config.heartbeatInterval < 10000) {
      errors.push('heartbeatInterval must be at least 10000ms');
    }
    
    if (config.heartbeatTimeout !== undefined && config.heartbeatTimeout < 1000) {
      errors.push('heartbeatTimeout must be at least 1000ms');
    }
    
    if (config.offlineQueueMaxSize !== undefined && config.offlineQueueMaxSize < 1) {
      errors.push('offlineQueueMaxSize must be at least 1');
    }
    
    return errors;
  },
};

// Default WebSocket manager instance
export const defaultWebSocketManager = new WebSocketManager();

export default WebSocketManager;
export type { WebSocketConfig, WebSocketMessage, OfflineNotification, WebSocketStats, ChannelSubscription };
