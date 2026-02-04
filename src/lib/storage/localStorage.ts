// LocalStorage Utilities with Proper Error Handling
// Safe localStorage operations with error handling and fallbacks

import { useState, useCallback } from 'react';

// Storage error types
export enum StorageErrorType {
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  PARSE_ERROR = 'PARSE_ERROR',
  SERIALIZATION_ERROR = 'SERIALIZATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Storage error class
export class StorageError extends Error {
  constructor(
    public type: StorageErrorType,
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

// Storage result type
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: StorageError;
}

// Storage configuration
export interface StorageConfig {
  key: string;
  defaultValue?: any;
  encrypt?: boolean;
  compress?: boolean;
  ttl?: number; // Time to live in milliseconds
}

// Storage utilities
export class LocalStorageManager {
  private static instance: LocalStorageManager;
  private isAvailable: boolean = false;
  private prefix: string = 'lumo_';
  private encryptionKey: string | null = null;

  private constructor() {
    this.checkAvailability();
  }

  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  private checkAvailability(): void {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      this.isAvailable = true;
    } catch (error) {
      this.isAvailable = false;
      console.warn('localStorage is not available:', error);
    }
  }

  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private handleError(error: any, operation: string, key: string): StorageError {
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'QuotaExceededError':
        case 'NS_ERROR_DOM_QUOTA_REACHED':
          return new StorageError(
            StorageErrorType.QUOTA_EXCEEDED,
            `Storage quota exceeded for key: ${key}`,
            error
          );
        case 'SecurityError':
          return new StorageError(
            StorageErrorType.ACCESS_DENIED,
            `Access denied for key: ${key}`,
            error
          );
        default:
          return new StorageError(
            StorageErrorType.UNKNOWN_ERROR,
            `Unknown error during ${operation} for key: ${key}`,
            error
          );
      }
    }

    if (error instanceof SyntaxError) {
      return new StorageError(
        StorageErrorType.PARSE_ERROR,
        `Parse error during ${operation} for key: ${key}`,
        error
      );
    }

    return new StorageError(
      StorageErrorType.UNKNOWN_ERROR,
      `Unknown error during ${operation} for key: ${key}`,
      error
    );
  }

  private serialize(data: any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      throw new StorageError(
        StorageErrorType.SERIALIZATION_ERROR,
        'Failed to serialize data',
        error as Error
      );
    }
  }

  private deserialize(data: string): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new StorageError(
        StorageErrorType.PARSE_ERROR,
        'Failed to parse data',
        error as Error
      );
    }
  }

  private isExpired(timestamp: number, ttl?: number): boolean {
    if (!ttl) return false;
    return Date.now() - timestamp > ttl;
  }

  // Public methods
  isLocalStorageAvailable(): boolean {
    return this.isAvailable;
  }

  set<T>(key: string, value: T, config: Partial<StorageConfig> = {}): StorageResult<T> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const fullKey = this.getFullKey(key);
      const data = {
        value,
        timestamp: Date.now(),
        ttl: config.ttl
      };

      const serializedData = this.serialize(data);
      localStorage.setItem(fullKey, serializedData);

      return { success: true, data: value };
    } catch (error) {
      const storageError = this.handleError(error, 'set', key);
      console.error('Failed to set localStorage item:', storageError);
      return { success: false, error: storageError };
    }
  }

  get<T>(key: string, defaultValue?: T, config: Partial<StorageConfig> = {}): StorageResult<T> {
    if (!this.isAvailable) {
      return {
        success: false,
        data: defaultValue,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const fullKey = this.getFullKey(key);
      const item = localStorage.getItem(fullKey);

      if (item === null) {
        return { success: true, data: defaultValue };
      }

      const data = this.deserialize(item);

      // Check if item is expired
      if (this.isExpired(data.timestamp, data.ttl)) {
        this.remove(key);
        return { success: true, data: defaultValue };
      }

      return { success: true, data: data.value };
    } catch (error) {
      const storageError = this.handleError(error, 'get', key);
      console.error('Failed to get localStorage item:', storageError);
      return { success: false, data: defaultValue, error: storageError };
    }
  }

  remove(key: string): StorageResult<boolean> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
      return { success: true, data: true };
    } catch (error) {
      const storageError = this.handleError(error, 'remove', key);
      console.error('Failed to remove localStorage item:', storageError);
      return { success: false, error: storageError };
    }
  }

  clear(): StorageResult<boolean> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return { success: true, data: true };
    } catch (error) {
      const storageError = this.handleError(error, 'clear', 'all');
      console.error('Failed to clear localStorage:', storageError);
      return { success: false, error: storageError };
    }
  }

  getAllKeys(): StorageResult<string[]> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.substring(this.prefix.length));
        }
      }

      return { success: true, data: keys };
    } catch (error) {
      const storageError = this.handleError(error, 'getAllKeys', 'all');
      console.error('Failed to get localStorage keys:', storageError);
      return { success: false, error: storageError };
    }
  }

  getStorageInfo(): StorageResult<{
    used: number;
    available: number;
    total: number;
    itemCount: number;
  }> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      let used = 0;
      let itemCount = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          const value = localStorage.getItem(key);
          if (value) {
            used += key.length + value.length;
            itemCount++;
          }
        }
      }

      // Estimate total localStorage size (usually 5MB)
      const total = 5 * 1024 * 1024; // 5MB in bytes
      const available = total - used;

      return {
        success: true,
        data: {
          used,
          available,
          total,
          itemCount
        }
      };
    } catch (error) {
      const storageError = this.handleError(error, 'getStorageInfo', 'info');
      console.error('Failed to get storage info:', storageError);
      return { success: false, error: storageError };
    }
  }

  // Batch operations
  setBatch<T extends Record<string, any>>(items: T): StorageResult<boolean> {
    const results: StorageResult<any>[] = [];
    
    Object.entries(items).forEach(([key, value]) => {
      const result = this.set(key, value);
      results.push(result);
    });

    const hasErrors = results.some(result => !result.success);
    
    return {
      success: !hasErrors,
      error: hasErrors ? new StorageError(
        StorageErrorType.UNKNOWN_ERROR,
        'Some batch operations failed'
      ) : undefined
    };
  }

  getBatch<T extends Record<string, any>>(keys: string[], defaultValue?: any): StorageResult<T> {
    const result: any = {};
    let hasErrors = false;

    keys.forEach(key => {
      const itemResult = this.get(key, defaultValue);
      if (itemResult.success) {
        result[key] = itemResult.data;
      } else {
        hasErrors = true;
        result[key] = defaultValue;
      }
    });

    return {
      success: !hasErrors,
      data: result,
      error: hasErrors ? new StorageError(
        StorageErrorType.UNKNOWN_ERROR,
        'Some batch get operations failed'
      ) : undefined
    };
  }

  // Utility methods
  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  getPrefix(): string {
    return this.prefix;
  }

  // Migration utilities
  migrate(fromPrefix: string, toPrefix: string): StorageResult<boolean> {
    if (!this.isAvailable) {
      return {
        success: false,
        error: new StorageError(
          StorageErrorType.NOT_AVAILABLE,
          'localStorage is not available'
        )
      };
    }

    try {
      const oldPrefix = this.prefix;
      this.prefix = fromPrefix;
      
      const keysResult = this.getAllKeys();
      if (!keysResult.success) {
        this.prefix = oldPrefix;
        return { success: false, error: keysResult.error };
      }

      const keys = keysResult.data || [];
      const migrationData: Record<string, any> = {};

      // Get all data with old prefix
      keys.forEach(key => {
        const getResult = this.get(key);
        if (getResult.success) {
          migrationData[key] = getResult.data;
        }
      });

      // Clear old data
      this.clear();
      
      // Set new prefix and data
      this.prefix = toPrefix;
      const setResult = this.setBatch(migrationData);
      
      if (!setResult.success) {
        this.prefix = oldPrefix;
        return setResult;
      }

      this.prefix = oldPrefix;
      return { success: true, data: true };
    } catch (error) {
      const storageError = this.handleError(error, 'migrate', 'migration');
      console.error('Failed to migrate localStorage:', storageError);
      return { success: false, error: storageError };
    }
  }
}

// Export singleton instance
export const localStorageManager = LocalStorageManager.getInstance();

// Convenience functions
export function setLocalStorage<T>(key: string, value: T, config?: Partial<StorageConfig>): StorageResult<T> {
  return localStorageManager.set(key, value, config);
}

export function getLocalStorage<T>(key: string, defaultValue?: T, config?: Partial<StorageConfig>): StorageResult<T> {
  return localStorageManager.get(key, defaultValue, config);
}

export function removeLocalStorage(key: string): StorageResult<boolean> {
  return localStorageManager.remove(key);
}

export function clearLocalStorage(): StorageResult<boolean> {
  return localStorageManager.clear();
}

export function isLocalStorageAvailable(): boolean {
  return localStorageManager.isLocalStorageAvailable();
}

// React hooks
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  config?: Partial<StorageConfig>
): [T, (value: T) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    const result = getLocalStorage(key, defaultValue, config);
    return result.success ? result.data! : defaultValue;
  });

  const setValue = useCallback((value: T) => {
    const result = setLocalStorage(key, value, config);
    if (result.success) {
      setState(value);
    } else {
      console.error('Failed to set localStorage value:', result.error);
    }
  }, [key, config]);

  const removeValue = useCallback(() => {
    const result = removeLocalStorage(key);
    if (result.success) {
      setState(defaultValue);
    } else {
      console.error('Failed to remove localStorage value:', result.error);
    }
  }, [key, defaultValue]);

  return [state, setValue, removeValue];
}

// Export all utilities
export const StorageUtils = {
  LocalStorageManager,
  localStorageManager,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  isLocalStorageAvailable,
  useLocalStorage,
  StorageError,
  StorageErrorType
};

export default StorageUtils;
