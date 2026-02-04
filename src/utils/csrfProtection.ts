'use client';

// CSRF Protection Utilities
export interface CSRFToken {
  token: string;
  headerName: string;
  expiresAt: number;
  issuedAt: number;
  domain?: string;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

export interface CSRFProtectionOptions {
  tokenLength?: number;
  tokenExpiry?: number;
  headerName?: string;
  cookieName?: string;
  domain?: string;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  httpOnly?: boolean;
  validateOnRequest?: boolean;
  validateOnResponse?: boolean;
  regenerateOnExpiry?: boolean;
  doubleSubmitCookie?: boolean;
  customTokenGenerator?: () => string;
  customValidator?: (token: string, request: Request) => boolean;
}

export interface CSRFValidationResult {
  isValid: boolean;
  token?: string;
  error?: string;
  type?: 'missing' | 'invalid' | 'expired' | 'mismatch' | 'domain' | 'path' | 'method' | 'custom';
  details?: any;
}

// CSRF Protection Class
export class CSRFProtection {
  private options: Required<CSRFProtectionOptions>;
  private currentToken: CSRFToken | null = null;
  private tokenStore: Map<string, CSRFToken> = new Map();

  constructor(options: CSRFProtectionOptions = {}) {
    this.options = {
      tokenLength: 32,
      tokenExpiry: 3600000, // 1 hour in milliseconds
      headerName: 'X-CSRF-Token',
      cookieName: 'csrf-token',
      domain: undefined,
      path: '/',
      sameSite: 'strict',
      secure: true,
      httpOnly: false,
      validateOnRequest: true,
      validateOnResponse: false,
      regenerateOnExpiry: true,
      doubleSubmitCookie: true,
      customTokenGenerator: undefined,
      customValidator: undefined,
      ...options,
    };
  }

  // Generate secure random token
  private generateToken(): string {
    if (this.options.customTokenGenerator) {
      return this.options.customTokenGenerator();
    }

    const array = new Uint8Array(this.options.tokenLength);
    crypto.getRandomValues(array);
    
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Create CSRF token
  createToken(): CSRFToken {
    const now = Date.now();
    const token = this.generateToken();
    
    const csrfToken: CSRFToken = {
      token,
      headerName: this.options.headerName,
      expiresAt: now + this.options.tokenExpiry,
      issuedAt: now,
      domain: this.options.domain,
      path: this.options.path,
      sameSite: this.options.sameSite,
      secure: this.options.secure,
    };

    this.currentToken = csrfToken;
    this.tokenStore.set(token, csrfToken);

    return csrfToken;
  }

  // Get current token
  getCurrentToken(): CSRFToken | null {
    if (!this.currentToken) {
      return null;
    }

    // Check if token is expired
    if (Date.now() > this.currentToken.expiresAt) {
      if (this.options.regenerateOnExpiry) {
        return this.createToken();
      } else {
        this.currentToken = null;
        return null;
      }
    }

    return this.currentToken;
  }

  // Validate CSRF token
  validateToken(token: string, request?: Request): CSRFValidationResult {
    if (!token) {
      return {
        isValid: false,
        error: 'CSRF token is missing',
        type: 'missing',
      };
    }

    const storedToken = this.tokenStore.get(token);
    
    if (!storedToken) {
      return {
        isValid: false,
        token,
        error: 'Invalid CSRF token',
        type: 'invalid',
      };
    }

    // Check if token is expired
    if (Date.now() > storedToken.expiresAt) {
      return {
        isValid: false,
        token,
        error: 'CSRF token has expired',
        type: 'expired',
        details: {
          expiresAt: storedToken.expiresAt,
          issuedAt: storedToken.issuedAt,
        },
      };
    }

    // Check domain if specified
    if (storedToken.domain && request) {
      const requestDomain = this.extractDomainFromRequest(request);
      if (requestDomain !== storedToken.domain) {
        return {
          isValid: false,
          token,
          error: 'CSRF token domain mismatch',
          type: 'domain',
          details: {
            expectedDomain: storedToken.domain,
            actualDomain: requestDomain,
          },
        };
      }
    }

    // Check path if specified
    if (storedToken.path && request) {
      const requestPath = this.extractPathFromRequest(request);
      if (!requestPath.startsWith(storedToken.path)) {
        return {
          isValid: false,
          token,
          error: 'CSRF token path mismatch',
          type: 'path',
          details: {
            expectedPath: storedToken.path,
            actualPath: requestPath,
          },
        };
      }
    }

    // Check method if request provided
    if (request) {
      const method = request.method.toUpperCase();
      const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
      
      if (!safeMethods.includes(method) && this.options.validateOnRequest) {
        // For unsafe methods, token must be present and valid
        if (!token) {
          return {
            isValid: false,
            error: 'CSRF token required for unsafe methods',
            type: 'method',
            details: { method },
          };
        }
      }
    }

    // Custom validation if provided
    if (this.options.customValidator && request) {
      const customResult = this.options.customValidator(token, request);
      if (!customResult) {
        return {
          isValid: false,
          token,
          error: 'Custom CSRF validation failed',
          type: 'custom',
        };
      }
    }

    return {
      isValid: true,
      token,
    };
  }

  // Extract domain from request
  private extractDomainFromRequest(request: Request): string {
    try {
      const url = new URL(request.url);
      return url.hostname;
    } catch {
      return '';
    }
  }

  // Extract path from request
  private extractPathFromRequest(request: Request): string {
    try {
      const url = new URL(request.url);
      return url.pathname;
    } catch {
      return '/';
    }
  }

  // Set CSRF token in cookie
  setTokenCookie(token: CSRFToken): void {
    if (typeof document === 'undefined') {
      return; // Not in browser environment
    }

    const cookieString = [
      `${this.options.cookieName}=${token.token}`,
      `Expires=${new Date(token.expiresAt).toUTCString()}`,
      `Path=${token.path || '/'}`,
      token.domain ? `Domain=${token.domain}` : '',
      token.sameSite ? `SameSite=${token.sameSite}` : '',
      token.secure ? 'Secure' : '',
      this.options.httpOnly ? 'HttpOnly' : '',
    ]
    .filter(Boolean)
    .join('; ');

    document.cookie = cookieString;
  }

  // Get CSRF token from cookie
  getTokenCookie(): string | null {
    if (typeof document === 'undefined') {
      return null; // Not in browser environment
    }

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.options.cookieName) {
        return value || null;
      }
    }

    return null;
  }

  // Set CSRF token in header
  setTokenHeader(headers: Record<string, string>, token: CSRFToken): void {
    headers[token.headerName] = token.token;
  }

  // Get CSRF token from header
  getTokenHeader(headers: Record<string, string> | Headers): string | null {
    const headerName = this.options.headerName.toLowerCase();
    
    if (headers instanceof Headers) {
      return headers.get(headerName) || null;
    }
    
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() === headerName) {
        return value || null;
      }
    }
    
    return null;
  }

  // Middleware for Express.js
  expressMiddleware() {
    return (req: any, res: any, next: any) => {
      // Skip validation for safe methods
      const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
      const method = req.method?.toUpperCase();
      
      if (safeMethods.includes(method)) {
        return next();
      }

      // Get token from header
      const headerToken = req.headers[this.options.headerName.toLowerCase()];
      
      // Get token from cookie (for double submit cookie pattern)
      let cookieToken = null;
      if (this.options.doubleSubmitCookie && req.cookies) {
        cookieToken = req.cookies[this.options.cookieName];
      }

      // Validate token
      const tokenToValidate = headerToken || cookieToken;
      const validationResult = this.validateToken(tokenToValidate, req);

      if (!validationResult.isValid) {
        return res.status(403).json({
          error: 'CSRF validation failed',
          message: validationResult.error,
          type: validationResult.type,
        });
      }

      // Add token to response headers for next request
      const currentToken = this.getCurrentToken();
      if (currentToken) {
        res.set(this.options.headerName, currentToken.token);
        
        if (this.options.doubleSubmitCookie) {
          res.cookie(this.options.cookieName, currentToken.token, {
            expires: new Date(currentToken.expiresAt),
            domain: currentToken.domain,
            path: currentToken.path,
            sameSite: currentToken.sameSite,
            secure: currentToken.secure,
            httpOnly: this.options.httpOnly,
          });
        }
      }

      next();
    };
  }

  // Middleware for Next.js API routes
  nextMiddleware() {
    return async (req: any, res: any, next: any) => {
      // Skip validation for safe methods
      const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
      const method = req.method?.toUpperCase();
      
      if (safeMethods.includes(method)) {
        return next();
      }

      // Get token from header
      const headerToken = req.headers[this.options.headerName.toLowerCase()];
      
      // Get token from cookie (for double submit cookie pattern)
      let cookieToken = null;
      if (this.options.doubleSubmitCookie && req.cookies) {
        cookieToken = req.cookies[this.options.cookieName];
      }

      // Validate token
      const tokenToValidate = headerToken || cookieToken;
      const validationResult = this.validateToken(tokenToValidate, req);

      if (!validationResult.isValid) {
        return res.status(403).json({
          error: 'CSRF validation failed',
          message: validationResult.error,
          type: validationResult.type,
        });
      }

      // Add token to response headers for next request
      const currentToken = this.getCurrentToken();
      if (currentToken) {
        res.setHeader(this.options.headerName, currentToken.token);
        
        if (this.options.doubleSubmitCookie) {
          res.cookie(this.options.cookieName, currentToken.token, {
            expires: new Date(currentToken.expiresAt),
            domain: currentToken.domain,
            path: currentToken.path,
            sameSite: currentToken.sameSite,
            secure: currentToken.secure,
            httpOnly: this.options.httpOnly,
          });
        }
      }

      next();
    };
  }

  // Generate nonce for CSP
  generateNonce(length: number = 16): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validate origin
  validateOrigin(request: Request, allowedOrigins: string[]): boolean {
    try {
      const origin = request.headers.get('origin');
      const referer = request.headers.get('referer');
      
      const requestOrigin = origin || referer;
      
      if (!requestOrigin) {
        return false;
      }

      const url = new URL(requestOrigin);
      const hostname = url.hostname;

      return allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin === '*') return true;
        
        const allowedUrl = new URL(allowedOrigin);
        return hostname === allowedUrl.hostname;
      });
    } catch {
      return false;
    }
  }

  // Generate security headers
  generateSecurityHeaders(): Record<string, string> {
    const nonce = this.generateNonce();
    
    return {
      'Content-Security-Policy': `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';`,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };
  }

  // Clear expired tokens
  clearExpiredTokens(): void {
    const now = Date.now();
    
    for (const [token, csrfToken] of this.tokenStore.entries()) {
      if (now > csrfToken.expiresAt) {
        this.tokenStore.delete(token);
      }
    }
  }

  // Clear all tokens
  clearAllTokens(): void {
    this.tokenStore.clear();
    this.currentToken = null;
    
    if (typeof document !== 'undefined') {
      // Clear cookie
      document.cookie = `${this.options.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
  }

  // Get token statistics
  getTokenStats(): {
    totalTokens: number;
    expiredTokens: number;
    validTokens: number;
    currentToken: CSRFToken | null;
  } {
    const now = Date.now();
    let expiredCount = 0;
    let validCount = 0;

    for (const token of this.tokenStore.values()) {
      if (now > token.expiresAt) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    return {
      totalTokens: this.tokenStore.size,
      expiredTokens: expiredCount,
      validTokens: validCount,
      currentToken: this.currentToken,
    };
  }
}

// React hook for CSRF protection
export const useCSRFProtection = (options: CSRFProtectionOptions = {}) => {
  const [csrfProtection] = useState(() => new CSRFProtection(options));
  const [token, setToken] = useState<CSRFToken | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize CSRF protection
    const initToken = csrfProtection.createToken();
    setToken(initToken);
    
    // Set token in cookie
    csrfProtection.setTokenCookie(initToken);
    setIsReady(true);

    // Cleanup expired tokens periodically
    const cleanupInterval = setInterval(() => {
      csrfProtection.clearExpiredTokens();
    }, 60000); // Every minute

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [csrfProtection]);

  // Regenerate token
  const regenerateToken = useCallback(() => {
    try {
      const newToken = csrfProtection.createToken();
      setToken(newToken);
      csrfProtection.setTokenCookie(newToken);
      setError(null);
    } catch (err) {
      setError('Failed to regenerate CSRF token');
      console.error('CSRF token regeneration error:', err);
    }
  }, [csrfProtection]);

  // Validate token
  const validateToken = useCallback((tokenToValidate: string, request?: Request) => {
    const result = csrfProtection.validateToken(tokenToValidate, request);
    
    if (!result.isValid) {
      setError(result.error || 'CSRF validation failed');
    } else {
      setError(null);
    }
    
    return result;
  }, [csrfProtection]);

  // Get current token
  const getCurrentToken = useCallback(() => {
    return csrfProtection.getCurrentToken();
  }, [csrfProtection]);

  // Clear tokens
  const clearTokens = useCallback(() => {
    csrfProtection.clearAllTokens();
    setToken(null);
    setError(null);
  }, [csrfProtection]);

  return {
    token,
    isReady,
    error,
    regenerateToken,
    validateToken,
    getCurrentToken,
    clearTokens,
    csrfProtection,
  };
};

// Utility functions
export const csrfProtectionUtils = {
  // Create CSRF protection instance
  createProtection: (options?: CSRFProtectionOptions) => {
    return new CSRFProtection(options);
  },

  // Generate secure token
  generateToken: (length: number = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Validate token format
  validateTokenFormat: (token: string): boolean => {
    return typeof token === 'string' && 
           token.length > 0 && 
           /^[a-f0-9]+$/i.test(token);
  },

  // Extract token from cookie
  extractTokenFromCookie: (cookieString: string, cookieName: string): string | null => {
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value || null;
      }
    }
    return null;
  },

  // Set token in cookie
  setTokenInCookie: (token: string, options: {
    cookieName?: string;
    expires?: Date;
    domain?: string;
    path?: string;
    sameSite?: 'strict' | 'lax' | 'none';
    secure?: boolean;
    httpOnly?: boolean;
  } = {}): void => {
    if (typeof document === 'undefined') {
      return;
    }

    const cookieOptions = {
      cookieName: 'csrf-token',
      expires: new Date(Date.now() + 3600000), // 1 hour
      path: '/',
      sameSite: 'strict' as const,
      secure: true,
      httpOnly: false,
      ...options,
    };

    const cookieString = [
      `${cookieOptions.cookieName}=${token}`,
      cookieOptions.expires ? `Expires=${cookieOptions.expires.toUTCString()}` : '',
      `Path=${cookieOptions.path}`,
      cookieOptions.domain ? `Domain=${cookieOptions.domain}` : '',
      cookieOptions.sameSite ? `SameSite=${cookieOptions.sameSite}` : '',
      cookieOptions.secure ? 'Secure' : '',
      cookieOptions.httpOnly ? 'HttpOnly' : '',
    ]
    .filter(Boolean)
    .join('; ');

    document.cookie = cookieString;
  },

  // Generate CSP nonce
  generateCSPNonce: (length: number = 16): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  // Validate request origin
  validateRequestOrigin: (request: Request, allowedOrigins: string[]): boolean => {
    try {
      const origin = request.headers.get('origin');
      const referer = request.headers.get('referer');
      
      const requestOrigin = origin || referer;
      
      if (!requestOrigin) {
        return false;
      }

      const url = new URL(requestOrigin);
      const hostname = url.hostname;

      return allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin === '*') return true;
        
        const allowedUrl = new URL(allowedOrigin);
        return hostname === allowedUrl.hostname;
      });
    } catch {
      return false;
    }
  },

  // Generate security headers
  generateSecurityHeaders: (nonce?: string): Record<string, string> => {
    const cspNonce = nonce || csrfProtectionUtils.generateCSPNonce();
    
    return {
      'Content-Security-Policy': `default-src 'self'; script-src 'self' 'nonce-${cspNonce}'; style-src 'self' 'nonce-${cspNonce}'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';`,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };
  },

  // Check if request needs CSRF protection
  requestNeedsProtection: (method: string): boolean => {
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    return !safeMethods.includes(method.toUpperCase());
  },

  // Create CSRF middleware for fetch
  createCSRFMiddleware: (csrfProtection: CSRFProtection) => {
    return async (request: Request, init?: RequestInit): Promise<RequestInit> => {
      const method = request.method.toUpperCase();
      const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
      
      if (!safeMethods.includes(method)) {
        // Get current token
        const token = csrfProtection.getCurrentToken();
        
        if (token) {
          // Add token to headers
          const headers = new Headers(init?.headers);
          headers.set(token.headerName, token.token);
          
          return {
            ...init,
            headers,
          };
        }
      }
      
      return init || {};
    };
  },
};

export default CSRFProtection;
