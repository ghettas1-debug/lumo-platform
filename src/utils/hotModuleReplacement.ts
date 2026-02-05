'use client';

// Hot Module Replacement (HMR) Utilities for Lumo Platform
import React, { useEffect, useState, useCallback } from 'react';

// HMR configuration interface
export interface HMRConfig {
  enabled: boolean;
  port?: number;
  host?: string;
  path?: string;
  timeout?: number;
  overlay?: boolean;
  autoAccept?: boolean;
  reloadOnFailure?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

// Module interface
export interface Module {
  id: string;
  path: string;
  version: number;
  hot: boolean;
  accepted: boolean;
  disposed: boolean;
  selfAccepting: boolean;
}

// HMR event types
export type HMREventType = 
  | 'connected'
  | 'disconnected'
  | 'update'
  | 'update-available'
  | 'update-applied'
  | 'update-failed'
  | 'error'
  | 'progress'
  | 'complete';

// HMR event interface
export interface HMREvent {
  type: HMREventType;
  data?: any;
  timestamp: number;
  module?: Module;
}

// HMR Manager Class
export class HMRManager {
  private static instance: HMRManager;
  private config: HMRConfig;
  private socket: WebSocket | null = null;
  private modules: Map<string, Module> = new Map();
  private listeners: Map<HMREventType, Set<(event: HMREvent) => void>> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;
  private overlay: HTMLElement | null = null;

  private constructor() {
    this.config = this.getDefaultConfig();
    this.initializeHMR();
  }

  public static getInstance(): HMRManager {
    if (!HMRManager.instance) {
      HMRManager.instance = new HMRManager();
    }
    return HMRManager.instance;
  }

  // Get default HMR configuration
  private getDefaultConfig(): HMRConfig {
    return {
      enabled: process.env.NODE_ENV === 'development',
      port: 3001,
      host: 'localhost',
      path: '/hmr',
      timeout: 5000,
      overlay: true,
      autoAccept: false,
      reloadOnFailure: true,
      logLevel: 'info',
    };
  }

  // Initialize HMR
  private initializeHMR(): void {
    if (!this.config.enabled || typeof window === 'undefined') {
      return;
    }

    // Setup WebSocket connection
    this.setupWebSocket();
    
    // Setup overlay
    if (this.config.overlay) {
      this.setupOverlay();
    }
    
    // Setup module tracking
    this.setupModuleTracking();
    
    // Setup error handling
    this.setupErrorHandling();
  }

  // Setup WebSocket connection
  private setupWebSocket(): void {
    const wsUrl = `ws://${this.config.host}:${this.config.port}${this.config.path}`;
    
    try {
      this.socket = new WebSocket(wsUrl);
      
      this.socket.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emitEvent({ type: 'connected', timestamp: Date.now() });
        this.log('HMR connected', 'info');
      };
      
      this.socket.onmessage = (event) => {
        this.handleMessage(event.data);
      };
      
      this.socket.onclose = () => {
        this.isConnected = false;
        this.emitEvent({ type: 'disconnected', timestamp: Date.now() });
        this.log('HMR disconnected', 'warn');
        
        // Attempt to reconnect
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++;
            this.setupWebSocket();
          }, this.reconnectDelay * this.reconnectAttempts);
        }
      };
      
      this.socket.onerror = (error) => {
        this.emitEvent({ 
          type: 'error', 
          timestamp: Date.now(), 
          data: error 
        });
        this.log('HMR connection error', 'error');
      };
      
    } catch (error) {
      this.log(`Failed to create WebSocket connection: ${error}`, 'error');
    }
  }

  // Handle WebSocket messages
  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'update':
          this.handleUpdate(message);
          break;
        case 'progress':
          this.handleProgress(message);
          break;
        case 'complete':
          this.handleComplete(message);
          break;
        default:
          this.log(`Unknown message type: ${message.type}`, 'warn');
      }
    } catch (error) {
      this.log(`Failed to parse HMR message: ${error}`, 'error');
    }
  }

  // Handle module update
  private handleUpdate(message: any): void {
    const { module: moduleData, version } = message;
    
    const module: Module = {
      id: moduleData.id,
      path: moduleData.path,
      version: version || 0,
      hot: moduleData.hot || false,
      accepted: false,
      disposed: false,
      selfAccepting: moduleData.selfAccepting || false,
    };
    
    this.modules.set(module.id, module);
    
    this.emitEvent({
      type: 'update-available',
      timestamp: Date.now(),
      data: module,
      module,
    });
    
    if (this.config.autoAccept && module.hot) {
      this.acceptModule(module.id);
    }
  }

  // Handle progress updates
  private handleProgress(message: any): void {
    this.emitEvent({
      type: 'progress',
      timestamp: Date.now(),
      data: message.progress,
    });
  }

  // Handle completion
  private handleComplete(message: any): void {
    this.emitEvent({
      type: 'complete',
      timestamp: Date.now(),
      data: message,
    });
  }

  // Setup overlay
  private setupOverlay(): void {
    if (typeof document === 'undefined') return;
    
    this.overlay = document.createElement('div');
    this.overlay.id = 'hmr-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: #1a1a1a;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      text-align: center;
    `;
    
    content.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #fff;">Hot Module Replacement</h3>
      <p style="margin: 0 0 15px 0; color: #ccc;">Module update available</p>
      <button id="hmr-accept" style="
        background: #007acc;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
      ">Accept</button>
      <button id="hmr-reject" style="
        background: #666;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">Reject</button>
    `;
    
    this.overlay.appendChild(content);
    document.body.appendChild(this.overlay);
    
    // Setup button handlers
    const acceptBtn = content.querySelector('#hmr-accept');
    const rejectBtn = content.querySelector('#hmr-reject');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        this.hideOverlay();
        this.acceptAllModules();
      });
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        this.hideOverlay();
      });
    }
  }

  // Show overlay
  private showOverlay(): void {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
    }
  }

  // Hide overlay
  private hideOverlay(): void {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  // Setup module tracking
  private setupModuleTracking(): void {
    if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
      const require = (window as any).__webpack_require__;
      
      // Hook into module loading
      if (require.cache) {
        Object.keys(require.cache).forEach((moduleId) => {
          const module = require.cache[moduleId];
          if (module && module.hot) {
            this.modules.set(moduleId, {
              id: moduleId,
              path: module.filename || '',
              version: 0,
              hot: true,
              accepted: false,
              disposed: false,
              selfAccepting: module.hot.selfAccepted || false,
            });
          }
        });
      }
    }
  }

  // Setup error handling
  private setupErrorHandling(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        if (event.filename && event.filename.includes('.hot-update.')) {
          this.log(`HMR error: ${event.message}`, 'error');
          this.emitEvent({
            type: 'error',
            timestamp: Date.now(),
            data: {
              message: event.message,
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno,
            },
          });
          
          if (this.config.reloadOnFailure) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      });
    }
  }

  // Accept module update
  public acceptModule(moduleId: string): boolean {
    const module = this.modules.get(moduleId);
    if (!module || !module.hot) {
      return false;
    }
    
    try {
      if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
        const require = (window as any).__webpack_require__;
        const webpackModule = require.cache[moduleId];
        
        if (webpackModule && webpackModule.hot) {
          webpackModule.hot.accept();
          module.accepted = true;
          
          this.emitEvent({
            type: 'update-applied',
            timestamp: Date.now(),
            module,
          });
          
          this.log(`Module ${moduleId} accepted`, 'info');
          return true;
        }
      }
    } catch (error) {
      this.log(`Failed to accept module ${moduleId}: ${error}`, 'error');
    }
    
    return false;
  }

  // Accept all modules
  public acceptAllModules(): void {
    let acceptedCount = 0;
    
    this.modules.forEach((module, moduleId) => {
      if (this.acceptModule(moduleId)) {
        acceptedCount++;
      }
    });
    
    this.log(`Accepted ${acceptedCount} modules`, 'info');
  }

  // Reject module update
  public rejectModule(moduleId: string): void {
    const module = this.modules.get(moduleId);
    if (module) {
      module.accepted = false;
      this.log(`Module ${moduleId} rejected`, 'info');
    }
  }

  // Add event listener
  public addEventListener(type: HMREventType, listener: (event: HMREvent) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    
    this.listeners.get(type)!.add(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(type);
      if (listeners) {
        listeners.delete(listener);
      }
    };
  }

  // Remove event listener
  public removeEventListener(type: HMREventType, listener: (event: HMREvent) => void): void {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  // Emit event
  private emitEvent(event: HMREvent): void {
    const listeners = this.listeners.get(event.type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          this.log(`Error in HMR event listener: ${error}`, 'error');
        }
      });
    }
  }

  // Get module status
  public getModuleStatus(): {
    total: number;
    hot: number;
    accepted: number;
    pending: number;
  } {
    let total = 0;
    let hot = 0;
    let accepted = 0;
    let pending = 0;
    
    this.modules.forEach(module => {
      total++;
      if (module.hot) hot++;
      if (module.accepted) accepted++;
      if (!module.accepted && module.hot) pending++;
    });
    
    return { total, hot, accepted, pending };
  }

  // Get connection status
  public getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    maxReconnectAttempts: number;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
    };
  }

  // Update configuration
  public updateConfig(updates: Partial<HMRConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Get configuration
  public getConfig(): HMRConfig {
    return { ...this.config };
  }

  // Enable HMR
  public enable(): void {
    this.config.enabled = true;
    this.initializeHMR();
  }

  // Disable HMR
  public disable(): void {
    this.config.enabled = false;
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.hideOverlay();
  }

  // Log message
  private log(message: string, level: 'debug' | 'info' | 'warn' | 'error'): void {
    if (this.config.logLevel && this.shouldLog(level)) {
      const prefix = '[HMR]';
      switch (level) {
        case 'debug':
          console.debug(prefix, message);
          break;
        case 'info':
          console.info(prefix, message);
          break;
        case 'warn':
          console.warn(prefix, message);
          break;
        case 'error':
          console.error(prefix, message);
          break;
      }
    }
  }

  // Check if should log
  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevel = levels.indexOf(this.config.logLevel || 'info');
    const messageLevel = levels.indexOf(level);
    return messageLevel >= configLevel;
  }

  // Cleanup
  public cleanup(): void {
    this.disable();
    this.modules.clear();
    this.listeners.clear();
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
      this.overlay = null;
    }
  }
}

// React hooks
export const useHMR = () => {
  const manager = HMRManager.getInstance();
  const [status, setStatus] = useState(manager.getModuleStatus());
  const [connection, setConnection] = useState(manager.getConnectionStatus());

  useEffect(() => {
    const unsubscribeModule = manager.addEventListener('update-applied', () => {
      setStatus(manager.getModuleStatus());
    });

    const unsubscribeConnection = manager.addEventListener('connected', () => {
      setConnection(manager.getConnectionStatus());
    });

    const unsubscribeDisconnected = manager.addEventListener('disconnected', () => {
      setConnection(manager.getConnectionStatus());
    });

    return () => {
      unsubscribeModule();
      unsubscribeConnection();
      unsubscribeDisconnected();
    };
  }, [manager]);

  return {
    status,
    connection,
    acceptModule: (moduleId: string) => manager.acceptModule(moduleId),
    acceptAllModules: () => manager.acceptAllModules(),
    rejectModule: (moduleId: string) => manager.rejectModule(moduleId),
    addEventListener: (type: HMREventType, listener: (event: HMREvent) => void) => 
      manager.addEventListener(type, listener),
    removeEventListener: (type: HMREventType, listener: (event: HMREvent) => void) => 
      manager.removeEventListener(type, listener),
    enable: () => manager.enable(),
    disable: () => manager.disable(),
    updateConfig: (updates: Partial<HMRConfig>) => manager.updateConfig(updates),
    getConfig: () => manager.getConfig(),
  };
};

// Utility functions
export const hmrUtils = {
  // Create HMR manager instance
  createManager: () => HMRManager.getInstance(),

  // Check if HMR is available
  isHMRAvailable: (): boolean => {
    return typeof window !== 'undefined' && 
           process.env.NODE_ENV === 'development' &&
           !!(window as any).__webpack_require__;
  },

  // Get webpack module info
  getWebpackModuleInfo: (moduleId: string) => {
    if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
      const require = (window as any).__webpack_require__;
      const module = require.cache[moduleId];
      
      if (module) {
        return {
          id: moduleId,
          filename: module.filename,
          hot: !!module.hot,
          selfAccepted: module.hot?.selfAccepted || false,
          disposeHandlers: module.hot?.disposeHandlers || [],
          acceptHandlers: module.hot?.acceptHandlers || [],
        };
      }
    }
    
    return null;
  },

  // Setup HMR for React components
  setupReactHMR: (componentName: string, componentModule: any) => {
    if (hmrUtils.isHMRAvailable() && componentModule.hot) {
      componentModule.hot.accept();
      
      componentModule.hot.dispose(() => {
        console.log(`[HMR] Disposing component: ${componentName}`);
      });
      
      console.log(`[HMR] Component ${componentName} is hot-reloadable`);
    }
  },

  // Setup HMR for CSS modules
  setupCSSHMR: (styleId: string) => {
    if (hmrUtils.isHMRAvailable()) {
      const style = document.getElementById(styleId);
      if (style) {
        console.log(`[HMR] CSS module ${styleId} is hot-reloadable`);
      }
    }
  },

  // Create HMR-aware component wrapper
  createHMRWrapper: <P extends object>(
    Component: React.ComponentType<P>,
    componentName: string
  ): React.ComponentType<P> => {
    const HMRWrapper = (props: P) => {
      const { addEventListener } = useHMR();
      
      useEffect(() => {
        const unsubscribe = addEventListener('update-applied', (event) => {
          if (event.module?.path?.includes(componentName)) {
            console.log(`[HMR] Component ${componentName} updated`);
          }
        });
        
        return unsubscribe;
      }, [addEventListener]);
      
      return React.createElement(Component, props);
    };
    
    HMRWrapper.displayName = `HMRWrapper(${componentName})`;
    
    return HMRWrapper;
  },

  // Get HMR statistics
  getHMRStats: () => {
    const manager = HMRManager.getInstance();
    return {
      modules: manager.getModuleStatus(),
      connection: manager.getConnectionStatus(),
      config: manager.getConfig(),
    };
  },

  // Force HMR update
  forceUpdate: () => {
    const manager = HMRManager.getInstance();
    manager.acceptAllModules();
  },

  // Toggle HMR overlay
  toggleOverlay: () => {
    const manager = HMRManager.getInstance();
    // This would need to be implemented in the manager
    console.log('[HMR] Toggle overlay');
  },
};

// Default instance
export const defaultHMRManager = HMRManager.getInstance();

export default {
  HMRManager,
  useHMR,
  hmrUtils,
  defaultHMRManager,
};
