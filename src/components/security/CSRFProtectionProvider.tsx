'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CSRFProtection, useCSRFProtection, csrfProtectionUtils } from '@/utils/csrfProtection';

// CSRF Protection Context
interface CSRFProtectionContextType {
  token: string | null;
  isReady: boolean;
  error: string | null;
  regenerateToken: () => void;
  validateToken: (token: string, request?: Request) => any;
  getCurrentToken: () => any;
  clearTokens: () => void;
  setTokenHeader: (headers: Record<string, string>) => void;
  getTokenHeader: (headers: Record<string, string> | Headers) => string | null;
  validateRequest: (request: Request) => boolean;
  generateSecurityHeaders: () => Record<string, string>;
}

const CSRFProtectionContext = createContext<CSRFProtectionContextType | undefined>(undefined);

// CSRF Protection Provider Component
export const CSRFProtectionProvider: React.FC<{
  children: React.ReactNode;
  options?: {
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
    allowedOrigins?: string[];
    enableCSP?: boolean;
    enableHSTS?: boolean;
    enableXSSProtection?: boolean;
    enableFrameProtection?: boolean;
  };
}> = ({ children, options = {} }) => {
  const {
    token,
    isReady,
    error,
    regenerateToken,
    validateToken,
    getCurrentToken,
    clearTokens,
    csrfProtection,
  } = useCSRFProtection(options);

  // Set token in header
  const setTokenHeader = useCallback((headers: Record<string, string>) => {
    const currentToken = getCurrentToken();
    if (currentToken) {
      headers[currentToken.headerName] = currentToken.token;
    }
  }, [getCurrentToken]);

  // Get token from header
  const getTokenHeader = useCallback((headers: Record<string, string> | Headers) => {
    const currentToken = getCurrentToken();
    if (!currentToken) {
      return null;
    }

    const headerName = currentToken.headerName.toLowerCase();
    
    if (headers instanceof Headers) {
      return headers.get(headerName) || null;
    }
    
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() === headerName) {
        return value || null;
      }
    }
    
    return null;
  }, [getCurrentToken]);

  // Validate request
  const validateRequest = useCallback((request: Request) => {
    const method = request.method.toUpperCase();
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    
    // Skip validation for safe methods
    if (safeMethods.includes(method)) {
      return true;
    }

    // Validate origin if allowed origins are specified
    if (options.allowedOrigins && options.allowedOrigins.length > 0) {
      const isValidOrigin = csrfProtection.validateOrigin(request, options.allowedOrigins);
      if (!isValidOrigin) {
        console.error('CSRF: Invalid origin', {
          origin: request.headers.get('origin'),
          referer: request.headers.get('referer'),
          allowedOrigins: options.allowedOrigins,
        });
        return false;
      }
    }

    // Get token from header
    const headerToken = request.headers.get(csrfProtection.options.headerName.toLowerCase());
    
    // Get token from cookie (for double submit cookie pattern)
    let cookieToken = null;
    if (csrfProtection.options.doubleSubmitCookie) {
      cookieToken = csrfProtection.getTokenCookie();
    }

    // Validate token
    const tokenToValidate = headerToken || cookieToken;
    const validationResult = validateToken(tokenToValidate, request);

    if (!validationResult.isValid) {
      console.error('CSRF validation failed', validationResult);
      return false;
    }

    return true;
  }, [csrfProtection, options.allowedOrigins, validateToken]);

  // Generate security headers
  const generateSecurityHeaders = useCallback(() => {
    const headers = csrfProtection.generateSecurityHeaders();
    
    // Add CSRF token if available
    const currentToken = getCurrentToken();
    if (currentToken) {
      headers[currentToken.headerName] = currentToken.token;
    }

    // Add CSP if enabled
    if (options.enableCSP !== false) {
      const nonce = csrfProtection.generateNonce();
      headers['Content-Security-Policy'] = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';`;
    }

    // Add HSTS if enabled
    if (options.enableHSTS !== false) {
      headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
    }

    // Add XSS protection if enabled
    if (options.enableXSSProtection !== false) {
      headers['X-XSS-Protection'] = '1; mode=block';
    }

    // Add frame protection if enabled
    if (options.enableFrameProtection !== false) {
      headers['X-Frame-Options'] = 'DENY';
      headers['X-Content-Type-Options'] = 'nosniff';
    }

    return headers;
  }, [csrfProtection, getCurrentToken, options.enableCSP, options.enableHSTS, options.enableXSSProtection, options.enableFrameProtection]);

  // Auto-regenerate token before expiry
  useEffect(() => {
    if (!isReady || !token) return;

    const currentToken = getCurrentToken();
    if (!currentToken) return;

    const timeUntilExpiry = currentToken.expiresAt - Date.now();
    const regenerateTime = timeUntilExpiry - (5 * 60 * 1000); // 5 minutes before expiry

    if (regenerateTime > 0) {
      const timeoutId = setTimeout(() => {
        regenerateToken();
      }, regenerateTime);

      return () => clearTimeout(timeoutId);
    }
  }, [isReady, token, getCurrentToken, regenerateToken]);

  // Cleanup expired tokens periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      csrfProtection.clearExpiredTokens();
    }, 60000); // Every minute

    return () => clearInterval(cleanupInterval);
  }, [csrfProtection]);

  const value: CSRFProtectionContextType = {
    token,
    isReady,
    error,
    regenerateToken,
    validateToken,
    getCurrentToken,
    clearTokens,
    setTokenHeader,
    getTokenHeader,
    validateRequest,
    generateSecurityHeaders,
  };

  return (
    <CSRFProtectionContext.Provider value={value}>
      {children}
    </CSRFProtectionContext.Provider>
  );
};

// Hook to use CSRF protection context
export const useCSRFProtectionContext = () => {
  const context = useContext(CSRFProtectionContext);
  if (!context) {
    throw new Error('useCSRFProtectionContext must be used within CSRFProtectionProvider');
  }
  return context;
};

// HOC to add CSRF protection to components
export const withCSRFProtection = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    validateOnRender?: boolean;
    requireToken?: boolean;
    allowedOrigins?: string[];
  } = {}
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { validateRequest, generateSecurityHeaders, error } = useCSRFProtectionContext();
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
      if (options.validateOnRender) {
        // Create a mock request for validation
        const mockRequest = new Request(window.location.href, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const isValid = validateRequest(mockRequest);
        
        if (!isValid) {
          setValidationError('CSRF validation failed');
        } else {
          setValidationError(null);
        }
      }
    }, [validateRequest, options.validateOnRender]);

    if (options.requireToken && !validateRequest) {
      return (
        <div className="csrf-error">
          <h2>CSRF Protection Error</h2>
          <p>CSRF token is required but not available.</p>
          <p>Please refresh the page and try again.</p>
          {error && <p className="error-details">{error}</p>}
        </div>
      );
    }

    if (validationError) {
      return (
        <div className="csrf-error">
          <h2>CSRF Validation Error</h2>
          <p>{validationError}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return <Component {...props} ref={ref} />;
  });
};

// CSRF Protected Form Component
export const CSRFProtectedForm: React.FC<{
  children: React.ReactNode;
  onSubmit?: (data: Record<string, any>, headers: Record<string, string>) => void | Promise<void>;
  action?: string;
  method?: string;
  className?: string;
  encType?: string;
  target?: string;
  autoComplete?: string;
  noValidate?: boolean;
}> = ({
  children,
  onSubmit,
  action,
  method = 'POST',
  className = '',
  encType,
  target,
  autoComplete,
  noValidate = false,
}) => {
  const { token, setTokenHeader, validateRequest, generateSecurityHeaders, error } = useCSRFProtectionContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const data: Record<string, any> = {};
      
      // Convert FormData to object
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Validate request
      const mockRequest = new Request(action || window.location.href, {
        method,
        headers: {
          'Content-Type': encType || 'application/json',
        },
      });

      const isValid = validateRequest(mockRequest);
      
      if (!isValid) {
        throw new Error('CSRF validation failed');
      }

      // Generate security headers
      const headers = generateSecurityHeaders();
      
      // Add form data headers
      if (encType === 'multipart/form-data') {
        // Don't set Content-Type for multipart/form-data, let browser set it
        delete headers['Content-Type'];
      }

      // Call onSubmit with data and headers
      await onSubmit?.(data, headers);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [action, method, encType, validateRequest, generateSecurityHeaders, onSubmit]);

  return (
    <form
      action={action}
      method={method}
      className={className}
      encType={encType}
      target={target}
      autoComplete={autoComplete}
      noValidate={noValidate}
      onSubmit={handleSubmit}
    >
      {/* Hidden CSRF token input */}
      <input
        type="hidden"
        name="csrf-token"
        value={token || ''}
        readOnly
      />
      
      {children}
      
      {isSubmitting && (
        <div className="csrf-submitting">
          <div className="loading-spinner">Submitting...</div>
        </div>
      )}
      
      {submitError && (
        <div className="csrf-error">
          <p className="error-message">{submitError}</p>
        </div>
      )}
      
      {error && (
        <div className="csrf-error">
          <p className="error-message">{error}</p>
        </div>
      )}
    </form>
  );
};

// CSRF Protected Fetch Hook
export const useCSRFProtectedFetch = () => {
  const { validateRequest, generateSecurityHeaders } = useCSRFProtectionContext();

  const protectedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    // Create request object for validation
    const request = new Request(url, options);
    
    // Validate request
    const isValid = validateRequest(request);
    if (!isValid) {
      throw new Error('CSRF validation failed');
    }

    // Generate security headers
    const securityHeaders = generateSecurityHeaders();
    
    // Merge with existing headers
    const headers = new Headers(options.headers);
    Object.entries(securityHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Make fetch request with security headers
    return fetch(url, {
      ...options,
      headers,
    });
  }, [validateRequest, generateSecurityHeaders]);

  return { protectedFetch };
};

// CSRF Protected API Hook
export const useCSRFProtectedAPI = () => {
  const { protectedFetch } = useCSRFProtectedFetch();

  const get = useCallback(async (url: string, options?: RequestInit) => {
    return protectedFetch(url, { ...options, method: 'GET' });
  }, [protectedFetch]);

  const post = useCallback(async (url: string, data?: any, options?: RequestInit) => {
    return protectedFetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }, [protectedFetch]);

  const put = useCallback(async (url: string, data?: any, options?: RequestInit) => {
    return protectedFetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }, [protectedFetch]);

  const patch = useCallback(async (url: string, data?: any, options?: RequestInit) => {
    return protectedFetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }, [protectedFetch]);

  const del = useCallback(async (url: string, options?: RequestInit) => {
    return protectedFetch(url, { ...options, method: 'DELETE' });
  }, [protectedFetch]);

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

// CSRF Status Component
export const CSRFStatus: React.FC<{
  showDetails?: boolean;
  className?: string;
}> = ({ showDetails = false, className = '' }) => {
  const { token, isReady, error, getCurrentToken } = useCSRFProtectionContext();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (isReady) {
      const currentToken = getCurrentToken();
      if (currentToken) {
        setStats({
          tokenLength: currentToken.token.length,
          expiresAt: currentToken.expiresAt,
          issuedAt: currentToken.issuedAt,
          timeUntilExpiry: currentToken.expiresAt - Date.now(),
          headerName: currentToken.headerName,
        });
      }
    }
  }, [isReady, getCurrentToken]);

  if (!isReady) {
    return (
      <div className={`csrf-status loading ${className}`}>
        <div className="status-indicator">Initializing CSRF protection...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`csrf-status error ${className}`}>
        <div className="status-indicator">CSRF Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`csrf-status success ${className}`}>
      <div className="status-indicator">
        CSRF Protection Active
        {showDetails && stats && (
          <div className="status-details">
            <p>Token Length: {stats.tokenLength}</p>
            <p>Expires in: {Math.ceil(stats.timeUntilExpiry / 1000 / 60)} minutes</p>
            <p>Header: {stats.headerName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSRFProtectionProvider;
