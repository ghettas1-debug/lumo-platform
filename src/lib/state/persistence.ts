// State Persistence and Optimistic Updates
// Advanced state persistence with optimistic updates and conflict resolution

import { useState, useCallback, useEffect, useRef } from 'react';
import { useUIStore, useUserStore, useCourseStore } from './store';
import { StorageUtils } from '../storage/localStorage';

// Persistence configuration
export interface PersistenceConfig {
  key: string;
  version: number;
  migrate?: (oldState: any, version: number) => any;
  compress?: boolean;
  encrypt?: boolean;
  ttl?: number;
  excludeKeys?: string[];
}

// Optimistic update configuration
export interface OptimisticConfig {
  key: string;
  timeout?: number;
  rollbackOnError?: boolean;
  maxRetries?: number;
  conflictResolution?: 'client' | 'server' | 'merge';
}

// State snapshot interface
export interface StateSnapshot {
  timestamp: number;
  version: number;
  data: any;
  checksum: string;
}

// Conflict resolution result
export interface ConflictResolution {
  resolved: boolean;
  data: any;
  conflicts: string[];
  resolution: 'client' | 'server' | 'merge';
}

// Persistence manager class
export class StatePersistenceManager {
  private static instance: StatePersistenceManager;
  private snapshots: Map<string, StateSnapshot> = new Map();
  private optimisticUpdates: Map<string, any> = new Map();
  private pendingOperations: Map<string, Promise<any>> = new Map();

  private constructor() {}

  static getInstance(): StatePersistenceManager {
    if (!StatePersistenceManager.instance) {
      StatePersistenceManager.instance = new StatePersistenceManager();
    }
    return StatePersistenceManager.instance;
  }

  // Generate checksum for data integrity
  private generateChecksum(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  // Validate data integrity
  private validateIntegrity(snapshot: StateSnapshot): boolean {
    return snapshot.checksum === this.generateChecksum(snapshot.data);
  }

  // Create state snapshot
  createSnapshot(data: any, version: number = 1): StateSnapshot {
    return {
      timestamp: Date.now(),
      version,
      data,
      checksum: this.generateChecksum(data)
    };
  }

  // Save state to storage
  saveState(key: string, data: any, config: PersistenceConfig): boolean {
    try {
      const snapshot = this.createSnapshot(data, config.version);
      
      // Exclude specified keys
      let filteredData = data;
      if (config.excludeKeys) {
        filteredData = this.excludeKeys(data, config.excludeKeys);
      }

      // Apply migration if needed
      if (config.migrate) {
        filteredData = config.migrate(filteredData, config.version);
      }

      const finalSnapshot = this.createSnapshot(filteredData, config.version);
      this.snapshots.set(key, finalSnapshot);

      // Save to localStorage
      const result = StorageUtils.setLocalStorage(key, finalSnapshot, {
        ttl: config.ttl
      });

      return result.success;
    } catch (error) {
      console.error('Failed to save state:', error);
      return false;
    }
  }

  // Load state from storage
  loadState(key: string, config: PersistenceConfig): any | null {
    try {
      const result = StorageUtils.getLocalStorage(key);
      
      if (!result.success || !result.data) {
        return null;
      }

      const snapshot = result.data as StateSnapshot;

      // Validate integrity
      if (!this.validateIntegrity(snapshot)) {
        console.warn('State integrity check failed, clearing corrupted data');
        StorageUtils.removeLocalStorage(key);
        return null;
      }

      // Check version and migrate if needed
      if (config.version !== snapshot.version && config.migrate) {
        try {
          const migratedData = config.migrate(snapshot.data, snapshot.version);
          const newSnapshot = this.createSnapshot(migratedData, config.version);
          this.snapshots.set(key, newSnapshot);
          
          // Save migrated data
          StorageUtils.setLocalStorage(key, newSnapshot, {
            ttl: config.ttl
          });
          
          return migratedData;
        } catch (error) {
          console.error('Migration failed:', error);
          return null;
        }
      }

      this.snapshots.set(key, snapshot);
      return snapshot.data;
    } catch (error) {
      console.error('Failed to load state:', error);
      return null;
    }
  }

  // Exclude keys from data
  private excludeKeys(data: any, keys: string[]): any {
    if (Array.isArray(data)) {
      return data;
    }

    if (typeof data === 'object' && data !== null) {
      const result = { ...data };
      keys.forEach(key => {
        delete result[key];
      });
      return result;
    }

    return data;
  }

  // Optimistic update
  async optimisticUpdate<T>(
    key: string,
    updateFn: () => Promise<T>,
    config: OptimisticConfig
  ): Promise<T> {
    const {
      timeout = 5000,
      rollbackOnError = true,
      maxRetries = 3,
      conflictResolution = 'client'
    } = config;

    // Store original state
    const originalState = this.optimisticUpdates.get(key);
    
    try {
      // Apply optimistic update
      const optimisticResult = await updateFn();
      this.optimisticUpdates.set(key, optimisticResult);

      // Execute actual update
      const actualResult = await this.executeWithRetry(updateFn, maxRetries);

      // Handle conflicts
      if (JSON.stringify(actualResult) !== JSON.stringify(optimisticResult)) {
        const resolution = this.resolveConflict(
          optimisticResult,
          actualResult,
          conflictResolution
        );
        
        this.optimisticUpdates.set(key, resolution.data);
        return resolution.data;
      }

      return actualResult;
    } catch (error) {
      console.error('Optimistic update failed:', error);
      
      if (rollbackOnError && originalState !== undefined) {
        this.optimisticUpdates.set(key, originalState);
      }
      
      throw error;
    }
  }

  // Execute with retry logic
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw lastError!;
  }

  // Resolve conflicts
  private resolveConflict<T>(
    optimistic: T,
    actual: T,
    resolution: 'client' | 'server' | 'merge'
  ): ConflictResolution {
    const conflicts: string[] = [];

    switch (resolution) {
      case 'client':
        return {
          resolved: true,
          data: optimistic,
          conflicts,
          resolution: 'client'
        };
      
      case 'server':
        return {
          resolved: true,
          data: actual,
          conflicts,
          resolution: 'server'
        };
      
      case 'merge':
        const merged = this.mergeData(optimistic, actual);
        return {
          resolved: true,
          data: merged,
          conflicts,
          resolution: 'merge'
        };
      
      default:
        return {
          resolved: false,
          data: actual,
          conflicts,
          resolution: 'server'
        };
    }
  }

  // Merge data
  private mergeData<T>(optimistic: T, actual: T): T {
    if (typeof optimistic !== 'object' || typeof actual !== 'object') {
      return actual;
    }

    if (Array.isArray(optimistic) && Array.isArray(actual)) {
      return [...new Set([...optimistic, ...actual])] as T;
    }

    if (optimistic && actual && typeof optimistic === 'object' && typeof actual === 'object') {
      return { ...actual, ...optimistic };
    }

    return actual;
  }

  // Get optimistic state
  getOptimisticState(key: string): any {
    return this.optimisticUpdates.get(key);
  }

  // Clear optimistic state
  clearOptimisticState(key: string): void {
    this.optimisticUpdates.delete(key);
  }

  // Clear all optimistic states
  clearAllOptimisticStates(): void {
    this.optimisticUpdates.clear();
  }

  // Get pending operations
  getPendingOperations(): Map<string, Promise<any>> {
    return new Map(this.pendingOperations);
  }

  // Clear all data
  clearAll(): void {
    this.snapshots.clear();
    this.optimisticUpdates.clear();
    this.pendingOperations.clear();
  }
}

// React hooks for state persistence
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  config: PersistenceConfig
): [T, (value: T) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    const manager = StatePersistenceManager.getInstance();
    const loadedState = manager.loadState(key, config);
    return loadedState !== null ? loadedState : defaultValue;
  });

  const setValue = useCallback((value: T) => {
    const manager = StatePersistenceManager.getInstance();
    const success = manager.saveState(key, value, config);
    
    if (success) {
      setState(value);
    } else {
      console.error('Failed to persist state');
    }
  }, [key, config]);

  const clearValue = useCallback(() => {
    const manager = StatePersistenceManager.getInstance();
    manager.clearOptimisticState(key);
    StorageUtils.removeLocalStorage(key);
    setState(defaultValue);
  }, [key, defaultValue]);

  return [state, setValue, clearValue];
}

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  key: string,
  updateFn: () => Promise<T>,
  config: OptimisticConfig
): [T, () => Promise<T>, boolean, Error | null] {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeUpdate = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const manager = StatePersistenceManager.getInstance();
      const result = await manager.optimisticUpdate(key, updateFn, config);
      setState(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [key, updateFn, config]);

  // Load initial optimistic state
  useEffect(() => {
    const manager = StatePersistenceManager.getInstance();
    const optimisticState = manager.getOptimisticState(key);
    if (optimisticState !== undefined) {
      setState(optimisticState as T);
    }
  }, [key]);

  return [state as T, executeUpdate, loading, error];
}

// Hook for store persistence
export function usePersistedStore(
  storeName: string,
  config: PersistenceConfig
) {
  const store = storeName === 'ui' ? useUIStore() : 
                storeName === 'user' ? useUserStore() : 
                useCourseStore();

  const saveStore = useCallback(() => {
      const manager = StatePersistenceManager.getInstance();
      return manager.saveState(storeName, store, config);
    }, [store, storeName, config]);

  const loadStore = useCallback(() => {
      const manager = StatePersistenceManager.getInstance();
      const loadedState = manager.loadState(storeName, config);
      if (loadedState) {
        // Update store with loaded state
        const storeAny = store as any;
        Object.entries(loadedState).forEach(([key, value]) => {
          if (typeof storeAny[key] === 'function') {
            storeAny[key](value);
          }
        });
      }
    }, [store, storeName, config]);

  return { store, saveStore, loadStore };
}

// ... (rest of the code remains the same)
// Auto-save hook
export function useAutoSave(
  storeName: string,
  config: PersistenceConfig,
  interval: number = 5000
) {
  const { store, saveStore } = usePersistedStore(storeName, config);

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveStore();
    }, interval);

    return () => clearInterval(intervalId);
  }, [saveStore, interval]);

  return { store, saveStore };
}

// Export all utilities
export const PersistenceUtils = {
  StatePersistenceManager,
  usePersistedState,
  useOptimisticUpdate,
  usePersistedStore,
  useAutoSave
};

export default PersistenceUtils;
