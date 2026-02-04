'use client';

// State Persistence and Optimistic Updates Utilities
export interface StatePersistenceOptions {
  key?: string;
  storage?: 'localStorage' | 'sessionStorage' | 'memory' | 'indexedDB' | 'file';
  serialize?: (state: any) => string;
  deserialize?: (state: string) => any;
  encrypt?: boolean;
  compress?: boolean;
  ttl?: number; // Time to live in milliseconds
  version?: number;
  namespace?: string;
  debounceMs?: number;
  maxRetries?: number;
  retryDelay?: number;
  optimisticUpdates?: boolean;
  conflictResolution?: 'client' | 'server' | 'merge' | 'timestamp';
  syncAcrossTabs?: boolean;
  syncAcrossDevices?: boolean;
  backupEnabled?: boolean;
  backupInterval?: number;
  maxBackups?: number;
  onSyncStart?: (key: string) => void;
  onSyncSuccess?: (key: string, data: any) => void;
  onSyncError?: (key: string, error: Error) => void;
  onConflict?: (key: string, local: any, remote: any) => any;
  onBackup?: (key: string, data: any) => void;
  onRestore?: (key: string, data: any) => void;
}

export interface OptimisticUpdate<T = any> {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: T;
  timestamp: number;
  status: 'pending' | 'success' | 'error';
  error?: Error;
  retryCount?: number;
  rollback?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface SyncResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  conflict?: boolean;
  resolved?: boolean;
  timestamp?: number;
}

export interface PersistenceState<T = any> {
  data: T;
  lastModified: number;
  version: number;
  checksum: string;
  optimisticUpdates: OptimisticUpdate<T>[];
  pendingSync: boolean;
  syncError?: Error;
  lastSync?: number;
  backup?: T;
}

// State Persistence Manager
export class StatePersistenceManager {
  private static instance: StatePersistenceManager;
  private storage: Storage | Map<string, any>;
  private optimisticUpdates: Map<string, OptimisticUpdate[]> = new Map();
  private syncQueues: Map<string, Promise<any>> = new Map();
  private backupTimers: Map<string, NodeJS.Timeout> = new Map();
  private defaultOptions: StatePersistenceOptions = {
    storage: 'localStorage',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    encrypt: false,
    compress: false,
    ttl: undefined,
    version: 1,
    namespace: '',
    debounceMs: 300,
    maxRetries: 3,
    retryDelay: 1000,
    optimisticUpdates: true,
    conflictResolution: 'timestamp',
    syncAcrossTabs: true,
    syncAcrossDevices: false,
    backupEnabled: true,
    backupInterval: 60000, // 1 minute
    maxBackups: 5,
  };

  private constructor() {
    this.initializeStorage();
    this.setupEventListeners();
  }

  // Singleton pattern
  public static getInstance(): StatePersistenceManager {
    if (!StatePersistenceManager.instance) {
      StatePersistenceManager.instance = new StatePersistenceManager();
    }
    return StatePersistenceManager.instance;
  }

  // Initialize storage
  private initializeStorage(): void {
    const storageType = this.defaultOptions.storage;
    
    switch (storageType) {
      case 'localStorage':
        this.storage = localStorage;
        break;
      case 'sessionStorage':
        this.storage = sessionStorage;
        break;
      case 'indexedDB':
        this.storage = new Map(); // Fallback to Map for now
        break;
      case 'file':
        this.storage = new Map(); // Fallback to Map for now
        break;
      case 'memory':
      default:
        this.storage = new Map();
        break;
    }
  }

  // Setup event listeners for cross-tab sync
  private setupEventListeners(): void {
    if (typeof window !== 'undefined' && this.defaultOptions.syncAcrossTabs) {
      window.addEventListener('storage', (event) => {
        if (event.key && event.key.startsWith(this.defaultOptions.namespace || '')) {
          this.handleStorageChange(event);
        }
      });
    }
  }

  // Handle storage changes from other tabs
  private handleStorageChange(event: StorageEvent): void {
    const key = event.key;
    const newValue = event.newValue;
    const oldValue = event.oldValue;

    if (!key || !newValue) return;

    try {
      const parsedNew = JSON.parse(newValue);
      const parsedOld = oldValue ? JSON.parse(oldValue) : null;

      // Handle conflict resolution
      if (parsedOld && parsedNew) {
        const resolved = this.resolveConflict(key, parsedOld.data, parsedNew.data);
        if (resolved !== parsedNew.data) {
          // Update with resolved data
          this.saveState(key, resolved, { ...this.defaultOptions, optimisticUpdates: false });
        }
      }

      // Trigger sync callbacks
      this.defaultOptions.onSyncSuccess?.(key, parsedNew.data);
    } catch (error) {
      this.defaultOptions.onSyncError?.(key, error as Error);
    }
  }

  // Resolve conflicts between local and remote data
  private resolveConflict<T>(key: string, local: T, remote: T): T {
    const resolution = this.defaultOptions.conflictResolution;

    switch (resolution) {
      case 'client':
        return local;
      case 'server':
        return remote;
      case 'merge':
        return this.mergeStates(local, remote);
      case 'timestamp':
        const localState = this.getPersistedState<T>(key);
        const remoteState = this.parseState(remote);
        if (localState && remoteState) {
          return localState.lastModified > remoteState.lastModified ? local : remote;
        }
        return remote;
      default:
        return remote;
    }
  }

  // Merge states
  private mergeStates<T>(local: T, remote: T): T {
    if (typeof local === 'object' && typeof remote === 'object' && local && remote) {
      return { ...local, ...remote };
    }
    return remote;
  }

  // Parse state from storage
  private parseState<T>(data: any): PersistenceState<T> | null {
    try {
      if (typeof data === 'string') {
        return JSON.parse(data);
      }
      return data;
    } catch {
      return null;
    }
  }

  // Calculate checksum
  private calculateChecksum(data: any): string {
    const serialized = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < serialized.length; i++) {
      const char = serialized.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  // Get full key with namespace
  private getFullKey(key: string): string {
    return this.defaultOptions.namespace ? `${this.defaultOptions.namespace}:${key}` : key;
  }

  // Save state to storage
  private saveState<T>(key: string, data: T, options: StatePersistenceOptions = {}): void {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const fullKey = this.getFullKey(key);

    const state: PersistenceState<T> = {
      data,
      lastModified: Date.now(),
      version: mergedOptions.version || 1,
      checksum: this.calculateChecksum(data),
      optimisticUpdates: this.optimisticUpdates.get(key) || [],
      pendingSync: false,
      backup: mergedOptions.backupEnabled ? data : undefined,
    };

    try {
      const serialized = mergedOptions.serialize!(state);
      this.storage.setItem(fullKey, serialized);
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }

  // Get persisted state
  private getPersistedState<T>(key: string): PersistenceState<T> | null {
    const fullKey = this.getFullKey(key);
    
    try {
      const stored = this.storage.getItem(fullKey);
      if (!stored) return null;

      const state = this.parseState<PersistenceState<T>>(stored);
      
      // Check TTL
      if (state && this.defaultOptions.ttl) {
        const elapsed = Date.now() - state.lastModified;
        if (elapsed > this.defaultOptions.ttl) {
          this.storage.removeItem(fullKey);
          return null;
        }
      }

      // Check version
      if (state && state.version !== (this.defaultOptions.version || 1)) {
        // Handle version migration
        return this.migrateState(state);
      }

      return state;
    } catch (error) {
      console.error('Failed to get persisted state:', error);
      return null;
    }
  }

  // Migrate state to new version
  private migrateState<T>(state: PersistenceState<T>): PersistenceState<T> {
    // Simple migration logic - can be extended
    return {
      ...state,
      version: this.defaultOptions.version || 1,
      lastModified: Date.now(),
    };
  }

  // Persist state with optimistic updates
  public persistState<T>(
    key: string,
    data: T,
    options: StatePersistenceOptions = {}
  ): SyncResult<T> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      const fullKey = this.getFullKey(key);

      // Save state
      this.saveState(key, data, mergedOptions);

      // Setup backup if enabled
      if (mergedOptions.backupEnabled) {
        this.setupBackup(key, data, mergedOptions);
      }

      // Sync across tabs if enabled
      if (mergedOptions.syncAcrossTabs) {
        this.syncAcrossTabs(key, data, mergedOptions);
      }

      return {
        success: true,
        data,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
        timestamp: Date.now(),
      };
    }
  }

  // Get persisted state
  public getState<T>(key: string, defaultValue?: T, options: StatePersistenceOptions = {}): T | null {
    try {
      const state = this.getPersistedState<T>(key);
      return state ? state.data : defaultValue || null;
    } catch (error) {
      console.error('Failed to get state:', error);
      return defaultValue || null;
    }
  }

  // Add optimistic update
  public addOptimisticUpdate<T>(
    key: string,
    update: OptimisticUpdate<T>,
    options: StatePersistenceOptions = {}
  ): void {
    const updates = this.optimisticUpdates.get(key) || [];
    updates.push(update);
    this.optimisticUpdates.set(key, updates);

    // Apply optimistic update immediately
    const currentState = this.getState<T>(key);
    if (currentState) {
      let newState = { ...currentState };

      switch (update.type) {
        case 'create':
          newState = { ...newState, ...update.data };
          break;
        case 'update':
          newState = { ...newState, ...update.data };
          break;
        case 'delete':
          if (typeof update.data === 'object' && update.data.id) {
            delete newState[update.data.id as keyof T];
          }
          break;
      }

      this.persistState(key, newState, { ...options, optimisticUpdates: false });
    }
  }

  // Resolve optimistic update
  public resolveOptimisticUpdate<T>(
    key: string,
    updateId: string,
    success: boolean,
    actualData?: T,
    options: StatePersistenceOptions = {}
  ): void {
    const updates = this.optimisticUpdates.get(key) || [];
    const updateIndex = updates.findIndex(u => u.id === updateId);
    
    if (updateIndex !== -1) {
      const update = updates[updateIndex];
      update.status = success ? 'success' : 'error';
      
      if (!success && update.rollback) {
        update.rollback();
      } else if (success && update.onSuccess) {
        update.onSuccess(actualData || update.data);
      } else if (!success && update.onError) {
        update.onError(update.error || new Error('Update failed'));
      }

      // Remove resolved update
      updates.splice(updateIndex, 1);
      this.optimisticUpdates.set(key, updates);

      // Update with actual data if provided
      if (success && actualData) {
        this.persistState(key, actualData, options);
      }
    }
  }

  // Sync across tabs
  private syncAcrossTabs<T>(key: string, data: T, options: StatePersistenceOptions): void {
    const fullKey = this.getFullKey(key);
    
    // Trigger storage event for other tabs
    if (typeof window !== 'undefined') {
      const event = new StorageEvent('storage', {
        key: fullKey,
        newValue: JSON.stringify({
          data,
          lastModified: Date.now(),
          version: options.version || 1,
        }),
        oldValue: this.storage.getItem(fullKey),
      });
      
      window.dispatchEvent(event);
    }
  }

  // Setup backup
  private setupBackup<T>(key: string, data: T, options: StatePersistenceOptions): void {
    if (!options.backupEnabled || !options.backupInterval) return;

    // Clear existing timer
    const existingTimer = this.backupTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new backup timer
    const timer = setTimeout(() => {
      this.createBackup(key, data, options);
    }, options.backupInterval);

    this.backupTimers.set(key, timer);
  }

  // Create backup
  private createBackup<T>(key: string, data: T, options: StatePersistenceOptions): void {
    try {
      const backupKey = `${key}_backup_${Date.now()}`;
      const fullBackupKey = this.getFullKey(backupKey);
      
      const backup = {
        data,
        timestamp: Date.now(),
        version: options.version || 1,
      };

      const serialized = options.serialize!(backup);
      this.storage.setItem(fullBackupKey, serialized);

      // Clean up old backups
      this.cleanupBackups(key, options);

      // Trigger backup callback
      options.onBackup?.(key, data);
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  }

  // Clean up old backups
  private cleanupBackups(key: string, options: StatePersistenceOptions): void {
    try {
      const maxBackups = options.maxBackups || 5;
      const backups: Array<{ key: string; timestamp: number }> = [];

      // Find all backup keys
      for (let i = 0; i < this.storage.length; i++) {
        const storageKey = this.storage.key(i);
        if (storageKey && storageKey.includes(`${key}_backup_`)) {
          try {
            const backup = JSON.parse(this.storage.getItem(storageKey) || '{}');
            backups.push({ key: storageKey, timestamp: backup.timestamp });
          } catch {
            // Invalid backup, remove it
            this.storage.removeItem(storageKey);
          }
        }
      }

      // Sort by timestamp (newest first) and remove old ones
      backups.sort((a, b) => b.timestamp - a.timestamp);
      const toRemove = backups.slice(maxBackups);
      
      toRemove.forEach(({ key: backupKey }) => {
        this.storage.removeItem(backupKey);
      });
    } catch (error) {
      console.error('Failed to cleanup backups:', error);
    }
  }

  // Restore from backup
  public restoreFromBackup<T>(key: string, options: StatePersistenceOptions = {}): T | null {
    try {
      const backups: Array<{ key: string; timestamp: number; data: T }> = [];

      // Find all backup keys
      for (let i = 0; i < this.storage.length; i++) {
        const storageKey = this.storage.key(i);
        if (storageKey && storageKey.includes(`${key}_backup_`)) {
          try {
            const backup = JSON.parse(this.storage.getItem(storageKey) || '{}');
            backups.push({ key: storageKey, timestamp: backup.timestamp, data: backup.data });
          } catch {
            // Invalid backup, remove it
            this.storage.removeItem(storageKey);
          }
        }
      }

      // Get most recent backup
      if (backups.length > 0) {
        backups.sort((a, b) => b.timestamp - a.timestamp);
        const latestBackup = backups[0];
        
        // Restore from backup
        this.persistState(key, latestBackup.data, options);
        
        // Trigger restore callback
        options.onRestore?.(key, latestBackup.data);
        
        return latestBackup.data;
      }

      return null;
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      return null;
    }
  }

  // Sync with remote server
  public async syncWithServer<T>(
    key: string,
    data: T,
    serverUrl: string,
    options: StatePersistenceOptions = {}
  ): Promise<SyncResult<T>> {
    const fullKey = this.getFullKey(key);
    
    // Check if already syncing
    if (this.syncQueues.has(fullKey)) {
      return this.syncQueues.get(fullKey);
    }

    const syncPromise = this.performServerSync(key, data, serverUrl, options);
    this.syncQueues.set(fullKey, syncPromise);

    try {
      const result = await syncPromise;
      return result;
    } finally {
      this.syncQueues.delete(fullKey);
    }
  }

  // Perform server sync
  private async performServerSync<T>(
    key: string,
    data: T,
    serverUrl: string,
    options: StatePersistenceOptions = {}
  ): Promise<SyncResult<T>> {
    const maxRetries = options.maxRetries || 3;
    const retryDelay = options.retryDelay || 1000;
    let lastError: Error | undefined;

    options.onSyncStart?.(key);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-State-Key': key,
            'X-State-Version': (options.version || 1).toString(),
          },
          body: JSON.stringify({
            key,
            data,
            timestamp: Date.now(),
            optimisticUpdates: this.optimisticUpdates.get(key) || [],
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        // Handle conflict
        if (result.conflict) {
          const resolved = this.resolveConflict(key, data, result.data);
          if (resolved !== result.data) {
            // Update local with resolved data
            this.persistState(key, resolved, { ...options, optimisticUpdates: false });
          }
        }

        // Clear optimistic updates on success
        this.optimisticUpdates.delete(key);

        options.onSyncSuccess?.(key, result.data);

        return {
          success: true,
          data: result.data,
          conflict: result.conflict,
          resolved: resolved !== result.data,
          timestamp: Date.now(),
        };
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    options.onSyncError?.(key, lastError!);

    return {
      success: false,
      error: lastError,
      timestamp: Date.now(),
    };
  }

  // Get all persisted keys
  public getKeys(options: StatePersistenceOptions = {}): string[] {
    const keys: string[] = [];
    const namespace = options.namespace || this.defaultOptions.namespace;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        if (namespace) {
          if (key.startsWith(`${namespace}:`)) {
            keys.push(key.substring(namespace.length + 1));
          }
        } else {
          keys.push(key);
        }
      }
    }

    return keys;
  }

  // Clear persisted state
  public clearState(key: string, options: StatePersistenceOptions = {}): boolean {
    try {
      const fullKey = this.getFullKey(key);
      this.storage.removeItem(fullKey);
      
      // Clear optimistic updates
      this.optimisticUpdates.delete(key);
      
      // Clear backup timer
      const timer = this.backupTimers.get(key);
      if (timer) {
        clearTimeout(timer);
        this.backupTimers.delete(key);
      }

      return true;
    } catch (error) {
      console.error('Failed to clear state:', error);
      return false;
    }
  }

  // Clear all states
  public clearAllStates(options: StatePersistenceOptions = {}): boolean {
    try {
      const namespace = options.namespace || this.defaultOptions.namespace;
      const keysToRemove: string[] = [];

      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) {
          if (namespace) {
            if (key.startsWith(`${namespace}:`)) {
              keysToRemove.push(key);
            }
          } else {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach(key => this.storage.removeItem(key));

      // Clear all optimistic updates and timers
      this.optimisticUpdates.clear();
      this.backupTimers.forEach(timer => clearTimeout(timer));
      this.backupTimers.clear();

      return true;
    } catch (error) {
      console.error('Failed to clear all states:', error);
      return false;
    }
  }

  // Get storage statistics
  public getStorageStats(options: StatePersistenceOptions = {}): {
    totalKeys: number;
    totalSize: number;
    optimisticUpdates: number;
    pendingSyncs: number;
    backupCount: number;
  } {
    const namespace = options.namespace || this.defaultOptions.namespace;
    let totalKeys = 0;
    let totalSize = 0;
    let backupCount = 0;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        if (namespace) {
          if (key.startsWith(`${namespace}:`)) {
            totalKeys++;
            const value = this.storage.getItem(key);
            if (value) {
              totalSize += key.length + value.length;
            }
            if (key.includes('_backup_')) {
              backupCount++;
            }
          }
        } else {
          totalKeys++;
          const value = this.storage.getItem(key);
          if (value) {
            totalSize += key.length + value.length;
          }
          if (key.includes('_backup_')) {
            backupCount++;
          }
        }
      }
    }

    let optimisticUpdates = 0;
    this.optimisticUpdates.forEach(updates => {
      optimisticUpdates += updates.length;
    });

    return {
      totalKeys,
      totalSize,
      optimisticUpdates,
      pendingSyncs: this.syncQueues.size,
      backupCount,
    };
  }
}

// React hook for state persistence
export const useStatePersistence = <T>(
  key: string,
  initialValue: T,
  options: StatePersistenceOptions = {}
) => {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<number>(Date.now());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const persistenceManager = StatePersistenceManager.getInstance();

  // Load initial state
  useEffect(() => {
    const persistedState = persistenceManager.getState<T>(key, initialValue, options);
    
    if (persistedState !== null) {
      setState(persistedState);
    }
    
    setLoading(false);
    setLastSync(Date.now());
  }, [key, initialValue, options]);

  // Save state changes
  useEffect(() => {
    if (!loading) {
      const result = persistenceManager.persistState(key, state, options);
      
      if (!result.success && result.error) {
        setError(result.error.message);
        console.error('State persistence error:', result.error);
      } else {
        setError(null);
        setLastSync(Date.now());
      }
    }
  }, [key, state, loading, options]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Optimistic update function
  const optimisticUpdate = useCallback((
    type: 'create' | 'update' | 'delete',
    data: Partial<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
  ) => {
    const update: OptimisticUpdate<T> = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: data as T,
      timestamp: Date.now(),
      status: 'pending',
      onSuccess,
      onError,
    };

    persistenceManager.addOptimisticUpdate(key, update, options);
  }, [key, options]);

  // Resolve optimistic update
  const resolveOptimisticUpdate = useCallback((
    updateId: string,
    success: boolean,
    actualData?: T
  ) => {
    persistenceManager.resolveOptimisticUpdate(key, updateId, success, actualData, options);
    
    if (success && actualData) {
      setState(actualData);
    }
  }, [key, options]);

  // Sync with server
  const syncWithServer = useCallback(async (serverUrl: string) => {
    if (!isOnline) {
      setError('Offline - cannot sync');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await persistenceManager.syncWithServer(key, state, serverUrl, options);
      
      if (result.success && result.data) {
        setState(result.data);
        setLastSync(Date.now());
      } else if (result.error) {
        setError(result.error.message);
      }
      
      return result;
    } catch (error) {
      const errorObj = error as Error;
      setError(errorObj.message);
      return { success: false, error: errorObj };
    } finally {
      setLoading(false);
    }
  }, [key, state, isOnline, options]);

  // Restore from backup
  const restoreFromBackup = useCallback(() => {
    const restoredData = persistenceManager.restoreFromBackup<T>(key, options);
    
    if (restoredData) {
      setState(restoredData);
      setLastSync(Date.now());
      return true;
    }
    
    return false;
  }, [key, options]);

  // Clear state
  const clearState = useCallback(() => {
    const success = persistenceManager.clearState(key, options);
    
    if (success) {
      setState(initialValue);
      setLastSync(Date.now());
    }
    
    return success;
  }, [key, initialValue, options]);

  return {
    state,
    setState,
    optimisticUpdate,
    resolveOptimisticUpdate,
    syncWithServer,
    restoreFromBackup,
    clearState,
    loading,
    error,
    lastSync,
    isOnline,
  };
};

// Utility functions
export const statePersistenceUtils = {
  // Get manager instance
  getManager: () => StatePersistenceManager.getInstance(),

  // Quick persist
  persist: <T>(key: string, data: T, options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().persistState(key, data, options);
  },

  // Quick get
  get: <T>(key: string, defaultValue?: T, options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().getState(key, defaultValue, options);
  },

  // Quick clear
  clear: (key: string, options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().clearState(key, options);
  },

  // Quick clear all
  clearAll: (options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().clearAllStates(options);
  },

  // Get keys
  getKeys: (options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().getKeys(options);
  },

  // Get stats
  getStats: (options?: StatePersistenceOptions) => {
    return StatePersistenceManager.getInstance().getStorageStats(options);
  },

  // Format bytes
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

export default StatePersistenceManager;
