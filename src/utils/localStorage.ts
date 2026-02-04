'use client';

// LocalStorage Error Handling Utilities
export interface LocalStorageOptions {
  key?: string;
  defaultValue?: any;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  encrypt?: boolean;
  compress?: boolean;
  ttl?: number; // Time to live in milliseconds
  version?: number;
  namespace?: string;
  onQuotaExceeded?: (error: DOMException) => void;
  onSecurityError?: (error: DOMException) => void;
  onParseError?: (error: Error) => void;
  onSetError?: (error: Error) => void;
  onGetError?: (error: Error) => void;
  onRemoveError?: (error: Error) => void;
  onClearError?: (error: Error) => void;
}

export interface LocalStorageResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  errorType?: 'quota_exceeded' | 'security_error' | 'parse_error' | 'set_error' | 'get_error' | 'remove_error' | 'clear_error' | 'storage_unavailable' | 'invalid_key' | 'invalid_value' | 'encryption_error' | 'decompression_error' | 'ttl_expired' | 'version_mismatch';
  timestamp?: number;
  metadata?: {
    size: number;
    compressed: boolean;
    encrypted: boolean;
    ttl?: number;
    version?: number;
    namespace?: string;
  };
}

export interface LocalStorageMetadata {
  created: number;
  updated: number;
  expires?: number;
  version: number;
  namespace?: string;
  compressed: boolean;
  encrypted: boolean;
  size: number;
  checksum?: string;
}

// LocalStorage Error Types
export class LocalStorageError extends Error {
  constructor(
    message: string,
    public type: LocalStorageResult['errorType'],
    public originalError?: Error | DOMException
  ) {
    super(message);
    this.name = 'LocalStorageError';
  }
}

// LocalStorage Manager Class
export class LocalStorageManager {
  private static instance: LocalStorageManager;
  private isAvailable: boolean = false;
  private namespace: string = '';
  private version: number = 1;
  private encryptionKey: string | null = null;
  private compressionEnabled: boolean = false;
  private defaultOptions: LocalStorageOptions = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    encrypt: false,
    compress: false,
    ttl: undefined,
    version: 1,
    namespace: '',
  };

  private constructor() {
    this.checkAvailability();
    this.setupEventListeners();
  }

  // Singleton pattern
  public static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  // Check if localStorage is available
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

  // Setup event listeners for storage changes
  private setupEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key && event.key.startsWith(this.namespace)) {
          this.handleStorageChange(event);
        }
      });
    }
  }

  // Handle storage changes from other tabs
  private handleStorageChange(event: StorageEvent): void {
    // This can be used to notify subscribers about changes
    console.debug('Storage changed:', event.key, event.newValue);
  }

  // Check if localStorage is available
  public isLocalStorageAvailable(): boolean {
    return this.isAvailable;
  }

  // Set default options
  public setDefaultOptions(options: Partial<LocalStorageOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  // Set namespace
  public setNamespace(namespace: string): void {
    this.namespace = namespace;
  }

  // Set version
  public setVersion(version: number): void {
    this.version = version;
  }

  // Set encryption key
  public setEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  // Enable/disable compression
  public setCompression(enabled: boolean): void {
    this.compressionEnabled = enabled;
  }

  // Get full key with namespace
  private getFullKey(key: string): string {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  // Validate key
  private validateKey(key: string): LocalStorageResult<null> {
    if (!key || typeof key !== 'string') {
      return {
        success: false,
        error: new LocalStorageError('Invalid key: must be a non-empty string', 'invalid_key'),
        errorType: 'invalid_key',
      };
    }

    if (key.length > 1024) {
      return {
        success: false,
        error: new LocalStorageError('Key too long: maximum 1024 characters', 'invalid_key'),
        errorType: 'invalid_key',
      };
    }

    return { success: true, data: null };
  }

  // Validate value
  private validateValue(value: any): LocalStorageResult<null> {
    if (value === undefined) {
      return {
        success: false,
        error: new LocalStorageError('Invalid value: undefined is not allowed', 'invalid_value'),
        errorType: 'invalid_value',
      };
    }

    // Check size limit (roughly 5MB for localStorage)
    const serialized = JSON.stringify(value);
    if (serialized.length > 5 * 1024 * 1024) {
      return {
        success: false,
        error: new LocalStorageError('Value too large: maximum 5MB', 'invalid_value'),
        errorType: 'invalid_value',
      };
    }

    return { success: true, data: null };
  }

  // Simple encryption (XOR-based for demo - use proper encryption in production)
  private encrypt(data: string): string {
    if (!this.encryptionKey) {
      return data;
    }

    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(
        data.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
      );
    }
    return btoa(result);
  }

  // Simple decryption
  private decrypt(data: string): string {
    if (!this.encryptionKey) {
      return data;
    }

    try {
      const decoded = atob(data);
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(
          decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
        );
      }
      return result;
    } catch (error) {
      throw new LocalStorageError('Decryption failed', 'encryption_error', error as Error);
    }
  }

  // Simple compression (run-length encoding for demo)
  private compress(data: string): string {
    if (!this.compressionEnabled) {
      return data;
    }

    let result = '';
    let count = 1;
    let prevChar = data[0];

    for (let i = 1; i < data.length; i++) {
      const char = data[i];
      if (char === prevChar && count < 255) {
        count++;
      } else {
        result += prevChar + (count > 1 ? count.toString(16).padStart(2, '0') : '');
        prevChar = char;
        count = 1;
      }
    }
    result += prevChar + (count > 1 ? count.toString(16).padStart(2, '0') : '');

    return btoa(result);
  }

  // Simple decompression
  private decompress(data: string): string {
    if (!this.compressionEnabled) {
      return data;
    }

    try {
      const decoded = atob(data);
      let result = '';
      let i = 0;

      while (i < decoded.length) {
        const char = decoded[i];
        i++;

        // Check if next two characters are hex digits (count)
        if (i + 1 < decoded.length && /[0-9a-fA-F]/.test(decoded[i]) && /[0-9a-fA-F]/.test(decoded[i + 1])) {
          const count = parseInt(decoded.substr(i, 2), 16);
          i += 2;
          result += char.repeat(count);
        } else {
          result += char;
        }
      }

      return result;
    } catch (error) {
      throw new LocalStorageError('Decompression failed', 'decompression_error', error as Error);
    }
  }

  // Create metadata
  private createMetadata(options: LocalStorageOptions): LocalStorageMetadata {
    const now = Date.now();
    return {
      created: now,
      updated: now,
      expires: options.ttl ? now + options.ttl : undefined,
      version: options.version || this.version,
      namespace: options.namespace || this.namespace,
      compressed: options.compress || false,
      encrypted: options.encrypt || false,
      size: 0, // Will be set after serialization
      checksum: '', // Will be set after serialization
    };
  }

  // Calculate checksum
  private calculateChecksum(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  // Set item in localStorage
  public set<T>(key: string, value: T, options: LocalStorageOptions = {}): LocalStorageResult<T> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      // Validate key
      const keyValidation = this.validateKey(key);
      if (!keyValidation.success) {
        return keyValidation;
      }

      // Validate value
      const valueValidation = this.validateValue(value);
      if (!valueValidation.success) {
        return valueValidation;
      }

      // Merge options
      const mergedOptions = { ...this.defaultOptions, ...options };
      const fullKey = this.getFullKey(key);

      // Create metadata
      const metadata = this.createMetadata(mergedOptions);

      // Serialize value
      let serialized: string;
      try {
        serialized = mergedOptions.serialize!(value);
      } catch (error) {
        const errorObj = new LocalStorageError('Serialization failed', 'parse_error', error as Error);
        mergedOptions.onParseError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'parse_error',
        };
      }

      // Update metadata size
      metadata.size = serialized.length;

      // Compress if enabled
      if (mergedOptions.compress) {
        try {
          serialized = this.compress(serialized);
          metadata.compressed = true;
        } catch (error) {
          const errorObj = new LocalStorageError('Compression failed', 'decompression_error', error as Error);
          mergedOptions.onSetError?.(errorObj);
          return {
            success: false,
            error: errorObj,
            errorType: 'decompression_error',
          };
        }
      }

      // Encrypt if enabled
      if (mergedOptions.encrypt) {
        try {
          serialized = this.encrypt(serialized);
          metadata.encrypted = true;
        } catch (error) {
          const errorObj = new LocalStorageError('Encryption failed', 'encryption_error', error as Error);
          mergedOptions.onSetError?.(errorObj);
          return {
            success: false,
            error: errorObj,
            errorType: 'encryption_error',
          };
        }
      }

      // Calculate checksum
      metadata.checksum = this.calculateChecksum(serialized);

      // Create storage object
      const storageObject = {
        data: serialized,
        metadata,
      };

      // Final serialization
      let finalSerialized: string;
      try {
        finalSerialized = JSON.stringify(storageObject);
      } catch (error) {
        const errorObj = new LocalStorageError('Final serialization failed', 'parse_error', error as Error);
        mergedOptions.onParseError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'parse_error',
        };
      }

      // Store in localStorage
      try {
        localStorage.setItem(fullKey, finalSerialized);
      } catch (error) {
        const domError = error as DOMException;
        
        if (domError.name === 'QuotaExceededError') {
          const errorObj = new LocalStorageError('Storage quota exceeded', 'quota_exceeded', domError);
          mergedOptions.onQuotaExceeded?.(domError);
          return {
            success: false,
            error: errorObj,
            errorType: 'quota_exceeded',
          };
        } else if (domError.name === 'SecurityError') {
          const errorObj = new LocalStorageError('Security error', 'security_error', domError);
          mergedOptions.onSecurityError?.(domError);
          return {
            success: false,
            error: errorObj,
            errorType: 'security_error',
          };
        } else {
          const errorObj = new LocalStorageError('Failed to set item', 'set_error', domError);
          mergedOptions.onSetError?.(errorObj);
          return {
            success: false,
            error: errorObj,
            errorType: 'set_error',
          };
        }
      }

      return {
        success: true,
        data: value,
        timestamp: Date.now(),
        metadata: {
          size: metadata.size,
          compressed: metadata.compressed,
          encrypted: metadata.encrypted,
          ttl: metadata.expires,
          version: metadata.version,
          namespace: metadata.namespace,
        },
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Unexpected error', 'set_error', error as Error);
      options.onSetError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'set_error',
      };
    }
  }

  // Get item from localStorage
  public get<T>(key: string, options: LocalStorageOptions = {}): LocalStorageResult<T> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      // Validate key
      const keyValidation = this.validateKey(key);
      if (!keyValidation.success) {
        return keyValidation;
      }

      // Merge options
      const mergedOptions = { ...this.defaultOptions, ...options };
      const fullKey = this.getFullKey(key);

      // Get from localStorage
      let storedValue: string | null;
      try {
        storedValue = localStorage.getItem(fullKey);
      } catch (error) {
        const errorObj = new LocalStorageError('Failed to get item', 'get_error', error as Error);
        mergedOptions.onGetError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'get_error',
        };
      }

      if (storedValue === null) {
        return {
          success: true,
          data: mergedOptions.defaultValue,
          timestamp: Date.now(),
        };
      }

      // Parse storage object
      let storageObject: { data: string; metadata: LocalStorageMetadata };
      try {
        storageObject = JSON.parse(storedValue);
      } catch (error) {
        const errorObj = new LocalStorageError('Failed to parse stored data', 'parse_error', error as Error);
        mergedOptions.onParseError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'parse_error',
        };
      }

      // Check metadata
      const metadata = storageObject.metadata;

      // Check version
      if (metadata.version !== (mergedOptions.version || this.version)) {
        return {
          success: false,
          error: new LocalStorageError('Version mismatch', 'version_mismatch'),
          errorType: 'version_mismatch',
        };
      }

      // Check TTL
      if (metadata.expires && Date.now() > metadata.expires) {
        // Remove expired item
        this.remove(key, options);
        return {
          success: false,
          error: new LocalStorageError('Item has expired', 'ttl_expired'),
          errorType: 'ttl_expired',
        };
      }

      // Verify checksum
      const currentChecksum = this.calculateChecksum(storageObject.data);
      if (metadata.checksum && metadata.checksum !== currentChecksum) {
        return {
          success: false,
          error: new LocalStorageError('Data corruption detected', 'parse_error'),
          errorType: 'parse_error',
        };
      }

      // Decrypt if needed
      let decryptedData = storageObject.data;
      if (metadata.encrypted) {
        try {
          decryptedData = this.decrypt(decryptedData);
        } catch (error) {
          const errorObj = new LocalStorageError('Decryption failed', 'encryption_error', error as Error);
          mergedOptions.onGetError?.(errorObj);
          return {
            success: false,
            error: errorObj,
            errorType: 'encryption_error',
          };
        }
      }

      // Decompress if needed
      let decompressedData = decryptedData;
      if (metadata.compressed) {
        try {
          decompressedData = this.decompress(decompressedData);
        } catch (error) {
          const errorObj = new LocalStorageError('Decompression failed', 'decompression_error', error as Error);
          mergedOptions.onGetError?.(errorObj);
          return {
            success: false,
            error: errorObj,
            errorType: 'decompression_error',
          };
        }
      }

      // Deserialize value
      let value: T;
      try {
        value = mergedOptions.deserialize!(decompressedData);
      } catch (error) {
        const errorObj = new LocalStorageError('Deserialization failed', 'parse_error', error as Error);
        mergedOptions.onParseError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'parse_error',
        };
      }

      return {
        success: true,
        data: value,
        timestamp: Date.now(),
        metadata: {
          size: metadata.size,
          compressed: metadata.compressed,
          encrypted: metadata.encrypted,
          ttl: metadata.expires,
          version: metadata.version,
          namespace: metadata.namespace,
        },
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Unexpected error', 'get_error', error as Error);
      options.onGetError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'get_error',
      };
    }
  }

  // Remove item from localStorage
  public remove(key: string, options: LocalStorageOptions = {}): LocalStorageResult<boolean> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      // Validate key
      const keyValidation = this.validateKey(key);
      if (!keyValidation.success) {
        return keyValidation;
      }

      const fullKey = this.getFullKey(key);

      try {
        localStorage.removeItem(fullKey);
      } catch (error) {
        const errorObj = new LocalStorageError('Failed to remove item', 'remove_error', error as Error);
        options.onRemoveError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'remove_error',
        };
      }

      return {
        success: true,
        data: true,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Unexpected error', 'remove_error', error as Error);
      options.onRemoveError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'remove_error',
      };
    }
  }

  // Clear all items
  public clear(options: LocalStorageOptions = {}): LocalStorageResult<boolean> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      try {
        if (this.namespace) {
          // Clear only items with this namespace
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.namespace + ':')) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
        } else {
          localStorage.clear();
        }
      } catch (error) {
        const errorObj = new LocalStorageError('Failed to clear localStorage', 'clear_error', error as Error);
        options.onClearError?.(errorObj);
        return {
          success: false,
          error: errorObj,
          errorType: 'clear_error',
        };
      }

      return {
        success: true,
        data: true,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Unexpected error', 'clear_error', error as Error);
      options.onClearError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'clear_error',
      };
    }
  }

  // Get all keys
  public getKeys(options: LocalStorageOptions = {}): LocalStorageResult<string[]> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          if (this.namespace) {
            if (key.startsWith(this.namespace + ':')) {
              keys.push(key.substring(this.namespace.length + 1));
            }
          } else {
            keys.push(key);
          }
        }
      }

      return {
        success: true,
        data: keys,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Failed to get keys', 'get_error', error as Error);
      options.onGetError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'get_error',
      };
    }
  }

  // Get storage size
  public getSize(options: LocalStorageOptions = {}): LocalStorageResult<number> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      let totalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          if (this.namespace) {
            if (key.startsWith(this.namespace + ':')) {
              const value = localStorage.getItem(key);
              if (value) {
                totalSize += key.length + value.length;
              }
            }
          } else {
            const value = localStorage.getItem(key);
            if (value) {
              totalSize += key.length + value.length;
            }
          }
        }
      }

      return {
        success: true,
        data: totalSize,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Failed to get storage size', 'get_error', error as Error);
      options.onGetError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'get_error',
      };
    }
  }

  // Cleanup expired items
  public cleanup(options: LocalStorageOptions = {}): LocalStorageResult<number> {
    try {
      // Check availability
      if (!this.isAvailable) {
        return {
          success: false,
          error: new LocalStorageError('localStorage is not available', 'storage_unavailable'),
          errorType: 'storage_unavailable',
        };
      }

      let cleanedCount = 0;
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          if (this.namespace) {
            if (key.startsWith(this.namespace + ':')) {
              const value = localStorage.getItem(key);
              if (value) {
                try {
                  const storageObject = JSON.parse(value);
                  const metadata = storageObject.metadata;
                  if (metadata.expires && Date.now() > metadata.expires) {
                    keysToRemove.push(key);
                  }
                } catch {
                  // Invalid data, remove it
                  keysToRemove.push(key);
                }
              }
            }
          } else {
            const value = localStorage.getItem(key);
            if (value) {
              try {
                const storageObject = JSON.parse(value);
                const metadata = storageObject.metadata;
                if (metadata.expires && Date.now() > metadata.expires) {
                  keysToRemove.push(key);
                }
              } catch {
                // Invalid data, remove it
                keysToRemove.push(key);
              }
            }
          }
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      cleanedCount = keysToRemove.length;

      return {
        success: true,
        data: cleanedCount,
        timestamp: Date.now(),
      };
    } catch (error) {
      const errorObj = new LocalStorageError('Failed to cleanup expired items', 'clear_error', error as Error);
      options.onClearError?.(errorObj);
      return {
        success: false,
        error: errorObj,
        errorType: 'clear_error',
      };
    }
  }
}

// React hook for localStorage
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options: LocalStorageOptions = {}
) => {
  const [state, setState] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const storageManager = LocalStorageManager.getInstance();

  // Load initial value
  useEffect(() => {
    const result = storageManager.get<T>(key, { ...options, defaultValue });
    
    if (result.success && result.data !== undefined) {
      setState(result.data);
    } else if (result.error) {
      setError(result.error.message);
      console.error('LocalStorage get error:', result.error);
    }
    
    setLoading(false);
    setLastUpdate(Date.now());
  }, [key, defaultValue, options]);

  // Update value
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const newValue = value instanceof Function ? value(state) : value;
    
    const result = storageManager.set<T>(key, newValue, options);
    
    if (result.success) {
      setState(newValue);
      setError(null);
      setLastUpdate(Date.now());
    } else {
      setError(result.error?.message || 'Failed to save value');
      console.error('LocalStorage set error:', result.error);
    }
    
    return result;
  }, [key, state, options]);

  // Remove value
  const removeValue = useCallback(() => {
    const result = storageManager.remove(key, options);
    
    if (result.success) {
      setState(defaultValue);
      setError(null);
      setLastUpdate(Date.now());
    } else {
      setError(result.error?.message || 'Failed to remove value');
      console.error('LocalStorage remove error:', result.error);
    }
    
    return result;
  }, [key, defaultValue, options]);

  // Clear all
  const clearAll = useCallback(() => {
    const result = storageManager.clear(options);
    
    if (result.success) {
      setState(defaultValue);
      setError(null);
      setLastUpdate(Date.now());
    } else {
      setError(result.error?.message || 'Failed to clear storage');
      console.error('LocalStorage clear error:', result.error);
    }
    
    return result;
  }, [defaultValue, options]);

  return {
    value: state,
    setValue,
    removeValue,
    clearAll,
    loading,
    error,
    lastUpdate,
    isAvailable: storageManager.isLocalStorageAvailable(),
  };
};

// Utility functions
export const localStorageUtils = {
  // Get storage manager instance
  getManager: () => LocalStorageManager.getInstance(),

  // Quick set
  set: <T>(key: string, value: T, options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().set(key, value, options);
  },

  // Quick get
  get: <T>(key: string, defaultValue?: T, options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().get<T>(key, { ...options, defaultValue });
  },

  // Quick remove
  remove: (key: string, options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().remove(key, options);
  },

  // Quick clear
  clear: (options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().clear(options);
  },

  // Check availability
  isAvailable: () => {
    return LocalStorageManager.getInstance().isLocalStorageAvailable();
  },

  // Get all keys
  getKeys: (options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().getKeys(options);
  },

  // Get storage size
  getSize: (options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().getSize(options);
  },

  // Cleanup expired items
  cleanup: (options?: LocalStorageOptions) => {
    return LocalStorageManager.getInstance().cleanup(options);
  },

  // Format bytes
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Check quota
  checkQuota: (): { used: number; available: number; percentage: number } => {
    const sizeResult = LocalStorageManager.getInstance().getSize();
    if (!sizeResult.success) {
      return { used: 0, available: 0, percentage: 0 };
    }

    const used = sizeResult.data || 0;
    const total = 5 * 1024 * 1024; // 5MB approximate limit
    const available = total - used;
    const percentage = (used / total) * 100;

    return { used, available, percentage };
  },
};

export default LocalStorageManager;
