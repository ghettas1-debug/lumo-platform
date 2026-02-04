// WebSocket Manager and Offline Notifications
// Comprehensive real-time updates and offline notification support

import { useState, useCallback, useEffect, useRef } from 'react';

// WebSocket configuration
export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  heartbeatTimeout?: number;
  enableOfflineSupport?: boolean;
  offlineStorageKey?: string;
}

// WebSocket message types
export enum MessageType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  HEARTBEAT = 'heartbeat',
  NOTIFICATION = 'notification',
  MESSAGE = 'message',
  STATUS_UPDATE = 'status_update',
  REAL_TIME_UPDATE = 'real_time_update',
  ERROR = 'error'
}

// WebSocket message interface
export interface WebSocketMessage {
  type: MessageType;
  data: any;
  timestamp: number;
  id: string;
  userId?: string;
  roomId?: string;
}

// Connection status
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error'
}

// Offline notification interface
export interface OfflineNotification {
  id: string;
  type: MessageType;
  data: any;
  timestamp: number;
  delivered: boolean;
  retryCount: number;
  maxRetries: number;
}

// WebSocket event handlers
export interface WebSocketEventHandlers {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Error) => void;
  onReconnect?: () => void;
  onStatusChange?: (status: ConnectionStatus) => void;
}

// Main WebSocket manager class
export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  private reconnectAttempts: number = 0;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private heartbeatTimeoutTimer: NodeJS.Timeout | null = null;
  private eventHandlers: WebSocketEventHandlers = {};
  private offlineNotifications: OfflineNotification[] = [];
  private messageQueue: WebSocketMessage[] = [];
  private isOnline: boolean = navigator.onLine;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      heartbeatInterval: 30000,
      heartbeatTimeout: 5000,
      enableOfflineSupport: true,
      offlineStorageKey: 'websocket_offline_notifications',
      ...config,
    };

    this.loadOfflineNotifications();
    this.setupOnlineStatusListeners();
  }

  private setupOnlineStatusListeners(): void {
    window.addEventListener('online', this.handleOnlineStatusChange.bind(this));
    window.addEventListener('offline', this.handleOnlineStatusChange.bind(this));
  }

  private handleOnlineStatusChange(): void {
    const wasOnline = this.isOnline;
    this.isOnline = navigator.onLine;

    if (!wasOnline && this.isOnline) {
      // We're back online, try to reconnect
      if (this.status === ConnectionStatus.DISCONNECTED) {
        this.connect();
      }
      // Send queued messages
      this.sendQueuedMessages();
    } else if (wasOnline && !this.isOnline) {
      // We went offline, disconnect
      this.disconnect();
    }
  }

  private loadOfflineNotifications(): void {
    if (!this.config.enableOfflineSupport) return;

    try {
      const stored = localStorage.getItem(this.config.offlineStorageKey!);
      if (stored) {
        this.offlineNotifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load offline notifications:', error);
    }
  }

  private saveOfflineNotifications(): void {
    if (!this.config.enableOfflineSupport) return;

    try {
      localStorage.setItem(
        this.config.offlineStorageKey!,
        JSON.stringify(this.offlineNotifications)
      );
    } catch (error) {
      console.error('Failed to save offline notifications:', error);
    }
  }

  private createWebSocket(): WebSocket {
    const ws = new WebSocket(this.config.url, this.config.protocols);
    
    ws.onopen = this.handleOpen.bind(this);
    ws.onclose = this.handleClose.bind(this);
    ws.onmessage = this.handleMessage.bind(this);
    ws.onerror = this.handleError.bind(this);

    return ws;
  }

  private handleOpen(): void {
    this.status = ConnectionStatus.CONNECTED;
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    this.eventHandlers.onConnect?.();
    this.eventHandlers.onStatusChange?.(this.status);

    // Send queued messages
    this.sendQueuedMessages();
  }

  private handleClose(event: CloseEvent): void {
    this.status = ConnectionStatus.DISCONNECTED;
    this.stopHeartbeat();
    this.eventHandlers.onDisconnect?.();
    this.eventHandlers.onStatusChange?.(this.status);

    // Attempt to reconnect if not a clean close
    if (!event.wasClean && this.reconnectAttempts < this.config.maxReconnectAttempts!) {
      this.attemptReconnect();
    }
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Handle heartbeat
      if (message.type === MessageType.HEARTBEAT) {
        this.handleHeartbeatResponse();
        return;
      }

      // Handle other messages
      this.eventHandlers.onMessage?.(message);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private handleError(event: Event): void {
    this.status = ConnectionStatus.ERROR;
    this.eventHandlers.onError?.(new Error('WebSocket error occurred'));
    this.eventHandlers.onStatusChange?.(this.status);
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();

    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.heartbeatTimeoutTimer = setTimeout(() => {
          console.warn('Heartbeat timeout, reconnecting...');
          this.disconnect();
          this.attemptReconnect();
        }, this.config.heartbeatTimeout!);

        this.send({
          type: MessageType.HEARTBEAT,
          data: { timestamp: Date.now() },
          timestamp: Date.now(),
          id: this.generateMessageId()
        });
      }
    }, this.config.heartbeatInterval!);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  private handleHeartbeatResponse(): void {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts!) {
      console.error('Max reconnect attempts reached');
      return;
    }

    this.status = ConnectionStatus.RECONNECTING;
    this.eventHandlers.onStatusChange?.(this.status);

    setTimeout(() => {
      this.reconnectAttempts++;
      this.eventHandlers.onReconnect?.();
      this.connect();
    }, this.config.reconnectInterval!);
  }

  private sendQueuedMessages(): void {
    while (this.messageQueue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      this.send(message!);
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public methods
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.status = ConnectionStatus.CONNECTING;
    this.eventHandlers.onStatusChange?.(this.status);

    try {
      this.ws = this.createWebSocket();
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      this.status = ConnectionStatus.ERROR;
      this.eventHandlers.onError?.(error as Error);
      this.eventHandlers.onStatusChange?.(this.status);
    }
  }

  disconnect(): void {
    this.stopHeartbeat();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.status = ConnectionStatus.DISCONNECTED;
    this.eventHandlers.onStatusChange?.(this.status);
  }

  send(message: WebSocketMessage): boolean {
    if (!this.isOnline && this.config.enableOfflineSupport) {
      // Store message for offline delivery
      this.offlineNotifications.push({
        id: message.id,
        type: message.type,
        data: message.data,
        timestamp: message.timestamp,
        delivered: false,
        retryCount: 0,
        maxRetries: 3
      });
      this.saveOfflineNotifications();
      return false;
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
        return false;
      }
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
      return false;
    }
  }

  sendNotification(data: any): boolean {
    const message: WebSocketMessage = {
      type: MessageType.NOTIFICATION,
      data,
      timestamp: Date.now(),
      id: this.generateMessageId()
    };

    return this.send(message);
  }

  getStatus(): ConnectionStatus {
    return this.status;
  }

  isReady(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // Event handler management
  onConnect(handler: () => void): void {
    this.eventHandlers.onConnect = handler;
  }

  onDisconnect(handler: () => void): void {
    this.eventHandlers.onDisconnect = handler;
  }

  onMessage(handler: (message: WebSocketMessage) => void): void {
    this.eventHandlers.onMessage = handler;
  }

  onError(handler: (error: Error) => void): void {
    this.eventHandlers.onError = handler;
  }

  onReconnect(handler: () => void): void {
    this.eventHandlers.onReconnect = handler;
  }

  onStatusChange(handler: (status: ConnectionStatus) => void): void {
    this.eventHandlers.onStatusChange = handler;
  }

  // Offline notification management
  getOfflineNotifications(): OfflineNotification[] {
    return [...this.offlineNotifications];
  }

  markNotificationDelivered(id: string): void {
    const notification = this.offlineNotifications.find(n => n.id === id);
    if (notification) {
      notification.delivered = true;
      this.saveOfflineNotifications();
    }
  }

  clearDeliveredNotifications(): void {
    this.offlineNotifications = this.offlineNotifications.filter(n => !n.delivered);
    this.saveOfflineNotifications();
  }

  retryFailedNotifications(): void {
    const failedNotifications = this.offlineNotifications.filter(
      n => !n.delivered && n.retryCount < n.maxRetries
    );

    failedNotifications.forEach(notification => {
      notification.retryCount++;
      const message: WebSocketMessage = {
        type: notification.type,
        data: notification.data,
        timestamp: notification.timestamp,
        id: notification.id
      };

      if (this.send(message)) {
        this.markNotificationDelivered(notification.id);
      }
    });

    this.saveOfflineNotifications();
  }

  // Cleanup
  destroy(): void {
    this.disconnect();
    window.removeEventListener('online', this.handleOnlineStatusChange.bind(this));
    window.removeEventListener('offline', this.handleOnlineStatusChange.bind(this));
  }
}

// React hook for WebSocket
export function useWebSocket(config: WebSocketConfig, eventHandlers?: WebSocketEventHandlers) {
  const wsRef = useRef<WebSocketManager | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [offlineNotifications, setOfflineNotifications] = useState<OfflineNotification[]>([]);

  useEffect(() => {
    const ws = new WebSocketManager(config);
    wsRef.current = ws;

    // Set up event handlers
    if (eventHandlers) {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        (ws as any)[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = handler;
      });
    }

    // Default handlers
    ws.onStatusChange((newStatus) => {
      setStatus(newStatus);
    });

    ws.onMessage((message) => {
      setLastMessage(message);
    });

    // Connect
    ws.connect();

    // Cleanup
    return () => {
      ws.destroy();
    };
  }, [config, eventHandlers]);

  const send = useCallback((message: WebSocketMessage) => {
    return wsRef.current?.send(message) || false;
  }, []);

  const sendNotification = useCallback((data: any) => {
    return wsRef.current?.sendNotification(data) || false;
  }, []);

  const retryFailedNotifications = useCallback(() => {
    wsRef.current?.retryFailedNotifications();
    setOfflineNotifications(wsRef.current?.getOfflineNotifications() || []);
  }, []);

  const clearDeliveredNotifications = useCallback(() => {
    wsRef.current?.clearDeliveredNotifications();
    setOfflineNotifications(wsRef.current?.getOfflineNotifications() || []);
  }, []);

  return {
    status,
    lastMessage,
    offlineNotifications,
    send,
    sendNotification,
    retryFailedNotifications,
    clearDeliveredNotifications,
    isConnected: status === ConnectionStatus.CONNECTED,
    isConnecting: status === ConnectionStatus.CONNECTING,
    isReconnecting: status === ConnectionStatus.RECONNECTING,
    isDisconnected: status === ConnectionStatus.DISCONNECTED,
    hasError: status === ConnectionStatus.ERROR,
  };
}

// Service Worker integration for offline support
export class OfflineNotificationService {
  private registration: ServiceWorkerRegistration | null = null;

  async register(): Promise<boolean> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        return true;
      } catch (error) {
        console.error('Failed to register service worker:', error);
        return false;
      }
    }
    return false;
  }

  async showNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
    if ('Notification' in navigator && Notification.permission === 'granted') {
      try {
        await new Notification(title, options);
        return true;
      } catch (error) {
        console.error('Failed to show notification:', error);
        return false;
      }
    }
    return false;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in navigator) {
      return await Notification.requestPermission();
    }
    return 'denied';
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.error('Service worker not registered');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'YOUR_VAPID_PUBLIC_KEY_HERE'
        ),
      });
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray.buffer as any;
  }
}

// Export all utilities
export const WebSocketUtils = {
  WebSocketManager,
  useWebSocket,
  OfflineNotificationService,
  ConnectionStatus,
  MessageType,
};

export default WebSocketUtils;
