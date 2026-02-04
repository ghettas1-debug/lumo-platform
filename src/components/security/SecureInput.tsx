'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { xssProtectionUtils, useXSSProtection } from '@/utils/xssProtection';

// Secure Input Props
interface SecureInputProps {
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean, threats: any[], warnings: string[]) => void;
  onBlur?: (value: string, isValid: boolean, threats: any[], warnings: string[]) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  error?: string;
  helperText?: string;
  showSecurityIndicator?: boolean;
  realTimeValidation?: boolean;
  debounceMs?: number;
  allowedTags?: string[];
  allowedAttributes?: string[];
  sanitizeOnBlur?: boolean;
  sanitizeOnChange?: boolean;
}

// Security Indicator Props
interface SecurityIndicatorProps {
  isValid: boolean;
  threats: any[];
  warnings: string[];
  showDetails?: boolean;
  className?: string;
}

// Security Indicator Component
export const SecurityIndicator: React.FC<SecurityIndicatorProps> = ({
  isValid,
  threats,
  warnings,
  showDetails = false,
  className = '',
}) => {
    if (isValid && threats.length === 0 && warnings.length === 0) {
      return null;
    }

    const getSeverity = () => {
      if (threats.some(t => t.severity === 'critical')) return 'critical';
      if (threats.some(t => t.severity === 'high')) return 'high';
      if (threats.some(t => t.severity === 'medium')) return 'medium';
      if (threats.some(t => t.severity === 'low')) return 'low';
      return warnings.length > 0 ? 'warning' : 'info';
    };

    const severity = getSeverity();
    const threatCount = threats.length;
    const warningCount = warnings.length;

    const getIcon = () => {
      switch (severity) {
        case 'critical':
          return (
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 3.729-3.49 1.209-2.087 1.858-3.8.055-.74 1.485-1.485 1.485H4.75c-.827 0-1.485.658-1.485 1.485v7.485C3.265 18.09 6.865 20.5 10.875 20.5c4.014 0 7.61-2.41 8.875-6.249l1.09-1.09c.428-.428.74-1.02.74-1.61V8.5c0-.59-.458-1.065-1.065-1.065H4.75z" />
            </svg>
          );
        case 'high':
          return (
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        case 'medium':
          return (
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 3.729-3.49 1.209-2.087 1.858-3.8.055-.74 1.485-1.485 1.485H4.75c-.827 0-1.485.658-1.485 1.485v7.485C3.265 18.09 6.865 20.5 10.875 20.5c4.014 0 7.61-2.41 8.875-6.249l1.09-1.09c.428-.428.74-1.02.74-1.61V8.5c0-.59-.458-1.065-1.065-1.065H4.75z" />
            </svg>
          );
        case 'low':
          return (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        case 'warning':
          return (
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 3.729-3.49 1.209-2.087 1.858-3.8.055-.74 1.485-1.485 1.485H4.75c-.827 0-1.485.658-1.485 1.485v7.485C3.265 18.09 6.865 20.5 10.875 20.5c4.014 0 7.61-2.41 8.875-6.249l1.09-1.09c.428-.428.74-1.02.74-1.61V8.5c0-.59-.458-1.065-1.065-1.065H4.75z" />
            </svg>
          );
        default:
          return (
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
      }
    };

    const getMessage = () => {
      if (threatCount > 0) {
        return `${threatCount} security threat${threatCount > 1 ? 's' : ''} detected`;
      }
      if (warningCount > 0) {
        return `${warningCount} warning${warningCount > 1 ? 's' : ''}`;
      }
      return 'Security check passed';
    };

    const getColor = () => {
      switch (severity) {
        case 'critical': return 'text-red-600';
        case 'high': return 'text-orange-600';
        case 'medium': return 'text-yellow-600';
        case 'low': return 'text-blue-600';
        case 'warning': return 'text-yellow-600';
        default: return 'text-gray-600';
      }
    };

    return (
      <div className={`security-indicator flex items-center gap-2 ${className}`}>
        <div className="security-icon">
          {getIcon()}
        </div>
        <div className={`security-message text-sm ${getColor()}`}>
          {getMessage()}
        </div>
        {showDetails && (
          <div className="security-details">
            {threats.map((threat, index) => (
              <div key={index} className="text-xs text-gray-600">
                {threat.type}: {threat.description}
              </div>
            ))}
            {warnings.map((warning, index) => (
              <div key={index} className="text-xs text-yellow-600">
                Warning: {warning}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
};

// Secure Input Component
export const SecureInput: React.FC<SecureInputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  className = '',
  id,
  name,
  ariaLabel,
  ariaDescribedBy,
  error,
  helperText,
  showSecurityIndicator = true,
  realTimeValidation = true,
  debounceMs = 300,
  allowedTags,
  allowedAttributes,
  sanitizeOnBlur = true,
  sanitizeOnChange = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { sanitize, quickValidate } = useXSSProtection({
    maxInputLength: maxLength,
    stripWhitespace: true,
    normalizeUnicode: true,
    escapeQuotes: true,
    escapeApostrophes: true,
  });

  // Handle value changes
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (sanitizeOnChange) {
      const result = sanitize(newValue);
      setValidationResult(result);
      onChange?.(newValue, result.isValid, result.threats, result.warnings);
    } else {
      onChange?.(newValue, true, [], []);
    }
  }, [sanitize, onChange, sanitizeOnChange]);

  // Handle blur
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    const finalValue = event.target.value;
    
    if (sanitizeOnBlur) {
      const result = sanitize(finalValue);
      setValidationResult(result);
      onBlur?.(finalValue, result.isValid, result.threats, result.warnings);
    } else {
      onBlur?.(finalValue, true, [], []);
    }
  }, [sanitize, onBlur, sanitizeOnBlur]);

  // Handle focus
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);

  // Debounced validation for real-time validation
  useEffect(() => {
    if (realTimeValidation && debounceMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(internalValue);
      }, debounceMs);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [internalValue, realTimeValidation, debounceMs]);

  // Real-time validation
  useEffect(() => {
    if (realTimeValidation && debouncedValue) {
      const result = sanitize(debouncedValue);
      setValidationResult(result);
      
      if (onChange && !sanitizeOnChange) {
        onChange(debouncedValue, result.isValid, result.threats, result.warnings);
      }
    }
  }, [debouncedValue, realTimeValidation, sanitize, onChange, sanitizeOnChange]);

  // Sync external value changes
  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  // Validate on mount
  useEffect(() => {
    if (defaultValue) {
      const result = sanitize(defaultValue);
      setValidationResult(result);
    }
  }, [defaultValue, sanitize]);

  // Get input validation state
  const getValidationState = () => {
    if (!validationResult) return 'default';
    
    if (!validationResult.isValid) {
      return validationResult.threats.some(t => t.severity === 'critical') ? 'error' : 'warning';
    }
    
    if (validationResult.warnings.length > 0) {
      return 'warning';
    }
    
    return 'success';
  };

  const validationState = getValidationState();

  // Get input classes
  const getInputClasses = () => {
    const baseClasses = 'secure-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200';
    
    const stateClasses = {
      default: 'border-gray-300',
      error: 'border-red-500 focus:ring-red-500',
      warning: 'border-yellow-500 focus:ring-yellow-500',
      success: 'border-green-500 focus:ring-green-500',
    };

    const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900';
    
    return `${baseClasses} ${stateClasses[validationState]} ${disabledClasses} ${className}`;
  };

  return (
    <div className="secure-input-container">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={internalValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        className={getInputClasses()}
        id={id}
        name={name}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={validationState === 'error'}
        aria-describedby={`${ariaDescribedBy || ''} ${error ? 'input-error' : ''} ${helperText ? 'input-helper' : ''}`}
      />
      
      {showSecurityIndicator && validationResult && (
        <SecurityIndicator
          isValid={validationResult.isValid}
          threats={validationResult.threats}
          warnings={validationResult.warnings}
          className="mt-2"
        />
      )}
      
      {error && (
        <div id="input-error" className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
      
      {helperText && (
        <div id="input-helper" className="text-gray-500 text-sm mt-1">
          {helperText}
        </div>
      )}
    </div>
  );
};

// Secure Textarea Component
export const SecureTextarea: React.FC<Omit<SecureInputProps, 'type'> & {
  rows?: number;
  cols?: number;
}> = ({
  rows = 4,
  cols,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(props.defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { sanitize, quickValidate } = useXSSProtection({
    maxInputLength: props.maxLength,
    stripWhitespace: true,
    normalizeUnicode: true,
    escapeQuotes: true,
    escapeApostrophes: true,
  });

  // Handle value changes
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (props.sanitizeOnChange) {
      const result = sanitize(newValue);
      setValidationResult(result);
      props.onChange?.(newValue, result.isValid, result.threats, result.warnings);
    } else {
      props.onChange?.(newValue, true, [], []);
    }
  }, [sanitize, props.onChange, props.sanitizeOnChange]);

  // Handle blur
  const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    
    const finalValue = event.target.value;
    
    if (props.sanitizeOnBlur) {
      const result = sanitize(finalValue);
      setValidationResult(result);
      props.onBlur?.(finalValue, result.isValid, result.threats, result.warnings);
    } else {
      props.onBlur?.(finalValue, true, [], []);
    }
  }, [sanitize, props.onBlur, props.sanitizeOnBlur]);

  // Handle focus
  const handleFocus = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(event);
  }, [props.onFocus]);

  // Debounced validation for real-time validation
  useEffect(() => {
    if (props.realTimeValidation && props.debounceMs && props.debounceMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(internalValue);
      }, props.debounceMs);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [internalValue, props.realTimeValidation, props.debounceMs]);

  // Real-time validation
  useEffect(() => {
    if (props.realTimeValidation && debouncedValue && props.debounceMs) {
      const result = sanitize(debouncedValue);
      setValidationResult(result);
      
      if (props.onChange && !props.sanitizeOnChange) {
        props.onChange(debouncedValue, result.isValid, result.threats, result.warnings);
      }
    }
  }, [debouncedValue, props.realTimeValidation, props.debounceMs, sanitize, props.onChange, props.sanitizeOnChange]);

  // Sync external value changes
  useEffect(() => {
    if (props.value !== undefined && props.value !== internalValue) {
      setInternalValue(props.value);
    }
  }, [props.value, internalValue]);

  // Validate on mount
  useEffect(() => {
    if (props.defaultValue) {
      const result = sanitize(props.defaultValue);
      setValidationResult(result);
    }
  }, [props.defaultValue, sanitize]);

  // Get input validation state
  const getValidationState = () => {
    if (!validationResult) return 'default';
    
    if (!validationResult.isValid) {
      return validationResult.threats.some(t => t.severity === 'critical') ? 'error' : 'warning';
    }
    
    if (validationResult.warnings.length > 0) {
      return 'warning';
    }
    
    return 'success';
  };

  const validationState = getValidationState();

  // Get textarea classes
  const getTextareaClasses = () => {
    const baseClasses = 'secure-textarea w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none';
    
    const stateClasses = {
      default: 'border-gray-300',
      error: 'border-red-500 focus:ring-red-500',
      warning: 'border-yellow-500 focus:ring-yellow-500',
      success: 'border-green-500 focus:ring-green-500',
    };

    const disabledClasses = props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900';
    
    return `${baseClasses} ${stateClasses[validationState]} ${disabledClasses} ${props.className}`;
  };

  return (
    <div className="secure-textarea-container">
      <textarea
        ref={textareaRef}
        placeholder={props.placeholder}
        value={internalValue}
        defaultValue={props.defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={props.disabled}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
        pattern={props.pattern}
        autoComplete={props.autoComplete}
        rows={rows}
        cols={cols}
        className={getTextareaClasses()}
        id={props.id}
        name={props.name}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
        aria-invalid={validationState === 'error'}
        aria-describedby={`${props.ariaDescribedBy || ''} ${props.error ? 'textarea-error' : ''} ${props.helperText ? 'textarea-helper' : ''}`}
      />
      
      {props.showSecurityIndicator && validationResult && (
        <SecurityIndicator
          isValid={validationResult.isValid}
          threats={validationResult.threats}
          warnings={validationResult.warnings}
          className="mt-2"
        />
      )}
      
      {props.error && (
        <div id="textarea-error" className="text-red-500 text-sm mt-1">
          {props.error}
        </div>
      )}
      
      {props.helperText && (
        <div id="textarea-helper" className="text-gray-500 text-sm mt-1">
          {props.helperText}
        </div>
      )}
    </div>
  );
};

// Secure Form Component
export const SecureForm: React.FC<{
  children: React.ReactNode;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
  validateOnSubmit?: boolean;
  showSecuritySummary?: boolean;
}> = ({
  children,
  onSubmit,
  className = '',
  validateOnSubmit = true,
  showSecuritySummary = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formValidation, setFormValidation] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securitySummary, setSecuritySummary] = useState<any>(null);

  const { sanitize } = useXSSProtection();

  // Handle form submission
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validate all form data if required
    if (validateOnSubmit) {
      const validationResults: Record<string, any> = {};
      let hasErrors = false;

      Object.entries(formData).forEach(([key, value]) => {
        const result = sanitize(value);
        validationResults[key] = result;
        if (!result.isValid) {
          hasErrors = true;
        }
      });

      setFormValidation(validationResults);

      if (hasErrors) {
        setIsSubmitting(false);
        return;
      }
    }

    // Generate security summary
    if (showSecuritySummary) {
      const allThreats = Object.values(formValidation).flatMap(result => result.threats);
      const allWarnings = Object.values(formValidation).flatMap(result => result.warnings);
      
      setSecuritySummary({
        totalFields: Object.keys(formData).length,
        validFields: Object.values(formValidation).filter(result => result.isValid).length,
        invalidFields: Object.values(formValidation).filter(result => !result.isValid).length,
        totalThreats: allThreats.length,
        threatsByType: allThreats.reduce((acc, threat) => {
          acc[threat.type] = (acc[threat.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        threatsBySeverity: allThreats.reduce((acc, threat) => {
          acc[threat.severity] = (acc[threat.severity] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        totalWarnings: allWarnings.length,
        warnings: allWarnings,
      });
    }

    // Submit form data
    onSubmit?.(formData);
    setIsSubmitting(false);
  }, [formData, formValidation, validateOnSubmit, showSecuritySummary, sanitize, onSubmit]);

  // Handle field changes
  const handleFieldChange = useCallback((name: string, value: string, isValid: boolean, threats: any[], warnings: string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormValidation(prev => ({ ...prev, [name]: { isValid, threats, warnings } }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`secure-form ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child, {
            key: index,
            onChange: (e: any) => {
              const value = e.target.value;
              const result = sanitize(value);
              handleFieldChange(child.props.name, value, result.isValid, result.threats, result.warnings);
              child.props.onChange?.(e);
            },
          });
        }
        return child;
      })}
      
      {showSecuritySummary && securitySummary && (
        <div className="security-summary mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Security Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Fields:</span> {securitySummary.totalFields}
            </div>
            <div>
              <span className="font-medium text-green-600">Valid Fields:</span> {securitySummary.validFields}
            </div>
            <div>
              <span className="font-medium text-red-600">Invalid Fields:</span> {securitySummary.invalidFields}
            </div>
            <div>
              <span className="font-medium text-orange-600">Total Threats:</span> {securitySummary.totalThreats}
            </div>
            <div>
              <span className="font-medium text-yellow-600">Total Warnings:</span> {securitySummary.totalWarnings}
            </div>
          </div>
          
          {Object.entries(securitySummary.threatsByType).length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Threats by Type:</h4>
              <div className="space-y-1">
                {Object.entries(securitySummary.threatsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between">
                    <span className="capitalize">{type}:</span>
                    <span className="font-medium text-red-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {Object.entries(securitySummary.threatsBySeverity).length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Threats by Severity:</h4>
              <div className="space-y-1">
                {Object.entries(securitySummary.threatsBySeverity).map(([severity, count]) => (
                  <div key={severity} className="flex justify-between">
                    <span className="capitalize">{severity}:</span>
                    <span className={`font-medium ${
                      severity === 'critical' ? 'text-red-600' :
                      severity === 'high' ? 'text-orange-600' :
                      severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SecureInput;
