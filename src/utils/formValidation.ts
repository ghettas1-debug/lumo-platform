'use client';

// Form Validation Utilities
export interface ValidationRule {
  name: string;
  validator: (value: any, formData?: Record<string, any>) => ValidationResult;
  required?: boolean;
  message?: string;
  priority?: number;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  field?: string;
  rule?: string;
  value?: any;
}

export interface FormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  debounceMs?: number;
  stopOnFirstError?: boolean;
  showWarnings?: boolean;
  showInfo?: boolean;
  customValidators?: Record<string, ValidationRule[]>;
  errorMessages?: Record<string, string>;
  successMessages?: Record<string, string>;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationResult[];
  warnings: ValidationResult[];
  info: ValidationResult[];
  success: ValidationResult[];
  fieldResults: Record<string, ValidationResult[]>;
  summary: {
    totalFields: number;
    validFields: number;
    invalidFields: number;
    warningFields: number;
    infoFields: number;
    successFields: number;
  };
}

// Built-in validators
export const validators = {
  // Required field validator
  required: (message?: string): ValidationRule => ({
    name: 'required',
    validator: (value: any) => ({
      isValid: value !== null && value !== undefined && value !== '' && 
              (typeof value === 'string' ? value.trim() !== '' : true),
      message: message || 'هذا الحقل مطلوب',
      type: 'error',
      severity: 'high',
    }),
    required: true,
    priority: 1,
  }),

  // Email validator
  email: (message?: string): ValidationRule => ({
    name: 'email',
    validator: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = !value || emailRegex.test(value);
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال بريد إلكتروني صحيح'),
        type: 'error',
        severity: 'high',
      };
    },
    priority: 2,
  }),

  // Phone validator
  phone: (message?: string, pattern?: RegExp): ValidationRule => ({
    name: 'phone',
    validator: (value: string) => {
      const phoneRegex = pattern || /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      const isValid = !value || phoneRegex.test(value);
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال رقم هاتف صحيح'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 3,
  }),

  // URL validator
  url: (message?: string): ValidationRule => ({
    name: 'url',
    validator: (value: string) => {
      try {
        const url = new URL(value);
        const isValid = url.protocol === 'http:' || url.protocol === 'https:';
        return {
          isValid,
          message: isValid ? undefined : (message || 'الرجاء إدخال رابط صحيح'),
          type: 'error',
          severity: 'medium',
        };
      } catch {
        return {
          isValid: !value,
          message: value ? (message || 'الرجاء إدخال رابط صحيح') : undefined,
          type: 'error',
          severity: 'medium',
        };
      }
    },
    priority: 3,
  }),

  // Min length validator
  minLength: (min: number, message?: string): ValidationRule => ({
    name: 'minLength',
    validator: (value: string) => {
      const isValid = !value || value.length >= min;
      return {
        isValid,
        message: isValid ? undefined : (message || `يجب أن يكون طول الحقل على الأقل ${min} حرف`),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Max length validator
  maxLength: (max: number, message?: string): ValidationRule => ({
    name: 'maxLength',
    validator: (value: string) => {
      const isValid = !value || value.length <= max;
      return {
        isValid,
        message: isValid ? undefined : (message || `يجب أن لا يتجاوز طول الحقل ${max} حرف`),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Min value validator
  minValue: (min: number, message?: string): ValidationRule => ({
    name: 'minValue',
    validator: (value: number) => {
      const isValid = value === undefined || value === null || value >= min;
      return {
        isValid,
        message: isValid ? undefined : (message || `يجب أن تكون القيمة على الأقل ${min}`),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Max value validator
  maxValue: (max: number, message?: string): ValidationRule => ({
    name: 'maxValue',
    validator: (value: number) => {
      const isValid = value === undefined || value === null || value <= max;
      return {
        isValid,
        message: isValid ? undefined : (message || `يجب أن لا تتجاوز القيمة ${max}`),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Pattern validator
  pattern: (regex: RegExp, message?: string): ValidationRule => ({
    name: 'pattern',
    validator: (value: string) => {
      const isValid = !value || regex.test(value);
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال قيمة صحيحة'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 5,
  }),

  // Number validator
  number: (message?: string): ValidationRule => ({
    name: 'number',
    validator: (value: any) => {
      const isValid = value === undefined || value === null || value === '' || !isNaN(Number(value));
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال رقم صحيح'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 3,
  }),

  // Integer validator
  integer: (message?: string): ValidationRule => ({
    name: 'integer',
    validator: (value: any) => {
      const isValid = value === undefined || value === null || value === '' || 
                   (Number.isInteger(Number(value)) && !isNaN(Number(value)));
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال رقم صحيح'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 3,
  }),

  // Positive number validator
  positive: (message?: string): ValidationRule => ({
    name: 'positive',
    validator: (value: number) => {
      const isValid = value === undefined || value === null || value === '' || Number(value) > 0;
      return {
        isValid,
        message: isValid ? undefined : (message || 'يجب أن تكون القيمة موجبة'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Password strength validator
  passwordStrength: (message?: string): ValidationRule => ({
    name: 'passwordStrength',
    validator: (value: string) => {
      if (!value) {
        return { isValid: true };
      }

      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;

      const strength = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
      const isValid = strength >= 4;

      return {
        isValid,
        message: isValid ? undefined : (message || 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل أحرف كبيرة وصغيرة وأرقام ورموز خاصة'),
        type: isValid ? 'success' : 'error',
        severity: isValid ? 'low' : 'high',
      };
    },
    priority: 6,
  }),

  // Password match validator
  passwordMatch: (compareField: string, message?: string): ValidationRule => ({
    name: 'passwordMatch',
    validator: (value: string, formData?: Record<string, any>) => {
      const compareValue = formData?.[compareField];
      const isValid = !value || !compareValue || value === compareValue;
      return {
        isValid,
        message: isValid ? undefined : (message || 'كلمات المرور غير متطابقة'),
        type: 'error',
        severity: 'high',
      };
    },
    priority: 7,
  }),

  // Date validator
  date: (message?: string): ValidationRule => ({
    name: 'date',
    validator: (value: string) => {
      const isValid = !value || !isNaN(Date.parse(value));
      return {
        isValid,
        message: isValid ? undefined : (message || 'الرجاء إدخال تاريخ صحيح'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 3,
  }),

  // Future date validator
  futureDate: (message?: string): ValidationRule => ({
    name: 'futureDate',
    validator: (value: string) => {
      if (!value) {
        return { isValid: true };
      }
      const date = new Date(value);
      const isValid = date > new Date();
      return {
        isValid,
        message: isValid ? undefined : (message || 'يجب أن يكون التاريخ في المستقبل'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // Past date validator
  pastDate: (message?: string): ValidationRule => ({
    name: 'pastDate',
    validator: (value: string) => {
      if (!value) {
        return { isValid: true };
      }
      const date = new Date(value);
      const isValid = date < new Date();
      return {
        isValid,
        message: isValid ? undefined : (message || 'يجب أن يكون التاريخ في الماضي'),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 4,
  }),

  // File type validator
  fileType: (allowedTypes: string[], message?: string): ValidationRule => ({
    name: 'fileType',
    validator: (file: File) => {
      if (!file) {
        return { isValid: true };
      }
      const isValid = allowedTypes.includes(file.type);
      return {
        isValid,
        message: isValid ? undefined : (message || `نوع الملف غير مدعوم. الأنواع المسموحة: ${allowedTypes.join(', ')}`),
        type: 'error',
        severity: 'high',
      };
    },
    priority: 5,
  }),

  // File size validator
  fileSize: (maxSize: number, message?: string): ValidationRule => ({
    name: 'fileSize',
    validator: (file: File) => {
      if (!file) {
        return { isValid: true };
      }
      const isValid = file.size <= maxSize;
      return {
        isValid,
        message: isValid ? undefined : (message || `حجم الملف كبير جداً. الحد الأقصى: ${maxSize / 1024 / 1024}MB`),
        type: 'error',
        severity: 'medium',
      };
    },
    priority: 5,
  }),

  // Custom validator
  custom: (validator: (value: any, formData?: Record<string, any>) => ValidationResult, name: string): ValidationRule => ({
    name,
    validator,
    priority: 10,
  }),
};

// Form Validation Class
export class FormValidator {
  private rules: Record<string, ValidationRule[]> = {};
  private options: FormValidationOptions;
  private debounceTimers: Record<string, NodeJS.Timeout> = {};

  constructor(options: FormValidationOptions = {}) {
    this.options = {
      validateOnChange: true,
      validateOnBlur: true,
      validateOnSubmit: true,
      debounceMs: 300,
      stopOnFirstError: false,
      showWarnings: true,
      showInfo: true,
      ...options,
    };
  }

  // Add validation rules for a field
  addFieldRules(fieldName: string, rules: ValidationRule[]): void {
    this.rules[fieldName] = rules.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  // Remove validation rules for a field
  removeFieldRules(fieldName: string): void {
    delete this.rules[fieldName];
  }

  // Get validation rules for a field
  getFieldRules(fieldName: string): ValidationRule[] {
    return this.rules[fieldName] || [];
  }

  // Validate a single field
  validateField(fieldName: string, value: any, formData?: Record<string, any>): ValidationResult[] {
    const rules = this.getFieldRules(fieldName);
    const results: ValidationResult[] = [];

    for (const rule of rules) {
      const result = rule.validator(value, formData);
      result.field = fieldName;
      result.rule = rule.name;
      result.value = value;

      if (!result.isValid) {
        results.push(result);
        if (this.options.stopOnFirstError) {
          break;
        }
      } else if (result.message) {
        results.push(result);
      }
    }

    return results;
  }

  // Validate entire form
  validateForm(formData: Record<string, any>): FormValidationResult {
    const fieldResults: Record<string, ValidationResult[]> = {};
    const allResults: ValidationResult[] = [];

    // Validate each field
    Object.keys(this.rules).forEach(fieldName => {
      const fieldValidationResults = this.validateField(fieldName, formData[fieldName], formData);
      fieldResults[fieldName] = fieldValidationResults;
      allResults.push(...fieldValidationResults);
    });

    // Categorize results
    const errors = allResults.filter(r => r.type === 'error');
    const warnings = allResults.filter(r => r.type === 'warning');
    const info = allResults.filter(r => r.type === 'info');
    const success = allResults.filter(r => r.type === 'success');

    // Count field statuses
    const validFields = Object.keys(fieldResults).filter(field => 
      !fieldResults[field].some(r => r.type === 'error')
    ).length;
    
    const invalidFields = Object.keys(fieldResults).filter(field => 
      fieldResults[field].some(r => r.type === 'error')
    ).length;
    
    const warningFields = Object.keys(fieldResults).filter(field => 
      fieldResults[field].some(r => r.type === 'warning')
    ).length;
    
    const infoFields = Object.keys(fieldResults).filter(field => 
      fieldResults[field].some(r => r.type === 'info')
    ).length;
    
    const successFields = Object.keys(fieldResults).filter(field => 
      fieldResults[field].some(r => r.type === 'success')
    ).length;

    return {
      isValid: errors.length === 0,
      errors,
      warnings: this.options.showWarnings ? warnings : [],
      info: this.options.showInfo ? info : [],
      success,
      fieldResults,
      summary: {
        totalFields: Object.keys(this.rules).length,
        validFields,
        invalidFields,
        warningFields,
        infoFields,
        successFields,
      },
    };
  }

  // Validate field with debounce
  validateFieldDebounced(fieldName: string, value: any, formData?: Record<string, any>, callback?: (results: ValidationResult[]) => void): void {
    // Clear existing timer
    if (this.debounceTimers[fieldName]) {
      clearTimeout(this.debounceTimers[fieldName]);
    }

    // Set new timer
    this.debounceTimers[fieldName] = setTimeout(() => {
      const results = this.validateField(fieldName, value, formData);
      callback?.(results);
    }, this.options.debounceMs);
  }

  // Get field validation state
  getFieldState(fieldName: string, formData?: Record<string, any>): 'valid' | 'invalid' | 'warning' | 'info' | 'success' | 'default' {
    const results = this.validateField(fieldName, formData?.[fieldName], formData);
    
    if (results.some(r => r.type === 'error')) return 'invalid';
    if (results.some(r => r.type === 'warning')) return 'warning';
    if (results.some(r => r.type === 'info')) return 'info';
    if (results.some(r => r.type === 'success')) return 'success';
    if (results.some(r => !r.isValid)) return 'invalid';
    return 'default';
  }

  // Get field error message
  getFieldError(fieldName: string, formData?: Record<string, any>): string | null {
    const results = this.validateField(fieldName, formData?.[fieldName], formData);
    const error = results.find(r => r.type === 'error');
    return error?.message || null;
  }

  // Check if field is valid
  isFieldValid(fieldName: string, formData?: Record<string, any>): boolean {
    const results = this.validateField(fieldName, formData?.[fieldName], formData);
    return !results.some(r => r.type === 'error');
  }

  // Clear debounce timer for field
  clearDebounceTimer(fieldName: string): void {
    if (this.debounceTimers[fieldName]) {
      clearTimeout(this.debounceTimers[fieldName]);
      delete this.debounceTimers[fieldName];
    }
  }

  // Clear all debounce timers
  clearAllDebounceTimers(): void {
    Object.keys(this.debounceTimers).forEach(fieldName => {
      this.clearDebounceTimer(fieldName);
    });
  }
}

// React hook for form validation
export const useFormValidation = (
  initialData: Record<string, any> = {},
  options: FormValidationOptions = {}
) => {
  const [formData, setFormData] = useState(initialData);
  const [validationResults, setValidationResults] = useState<FormValidationResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldStates, setFieldStates] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const validatorRef = useRef(new FormValidator(options));
  const debounceTimersRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Update form data
  const updateField = useCallback((fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setIsDirty(true);
    
    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(fieldName));
    
    // Validate on change if enabled
    if (options.validateOnChange) {
      if (options.debounceMs && options.debounceMs > 0) {
        // Debounced validation
        if (debounceTimersRef.current[fieldName]) {
          clearTimeout(debounceTimersRef.current[fieldName]);
        }
        
        debounceTimersRef.current[fieldName] = setTimeout(() => {
          const results = validatorRef.current.validateField(fieldName, value, formData);
          updateFieldValidation(fieldName, results);
        }, options.debounceMs);
      } else {
        // Immediate validation
        const results = validatorRef.current.validateField(fieldName, value, formData);
        updateFieldValidation(fieldName, results);
      }
    }
  }, [options.validateOnChange, options.debounceMs, formData]);

  // Update field validation results
  const updateFieldValidation = useCallback((fieldName: string, results: ValidationResult[]) => {
    const error = results.find(r => r.type === 'error');
    const state = validatorRef.current.getFieldState(fieldName, formData);
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error?.message || '',
    }));
    
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: state,
    }));
  }, [formData]);

  // Validate field
  const validateField = useCallback((fieldName: string) => {
    const results = validatorRef.current.validateField(fieldName, formData[fieldName], formData);
    updateFieldValidation(fieldName, results);
    return results;
  }, [formData, updateFieldValidation]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const results = validatorRef.current.validateForm(formData);
    setValidationResults(results);
    
    // Update field errors and states
    const newFieldErrors: Record<string, string> = {};
    const newFieldStates: Record<string, string> = {};
    
    Object.entries(results.fieldResults).forEach(([fieldName, fieldResults]) => {
      const error = fieldResults.find(r => r.type === 'error');
      const state = validatorRef.current.getFieldState(fieldName, formData);
      
      newFieldErrors[fieldName] = error?.message || '';
      newFieldStates[fieldName] = state;
    });
    
    setFieldErrors(newFieldErrors);
    setFieldStates(newFieldStates);
    
    return results;
  }, [formData]);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName: string) => {
    if (options.validateOnBlur) {
      validateField(fieldName);
    }
  }, [options.validateOnBlur, validateField]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setValidationResults(null);
    setFieldErrors({});
    setFieldStates({});
    setIsDirty(false);
    setTouchedFields(new Set());
    
    // Clear all debounce timers
    Object.values(debounceTimersRef.current).forEach(timer => clearTimeout(timer));
    debounceTimersRef.current = {};
  }, [initialData]);

  // Submit form
  const submitForm = useCallback(async (onSubmit?: (data: Record<string, any>) => void | Promise<void>) => {
    setIsSubmitting(true);
    
    const results = validateForm();
    
    if (results.isValid && onSubmit) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
    return results;
  }, [validateForm, onSubmit]);

  // Add validation rules
  const addFieldRules = useCallback((fieldName: string, rules: ValidationRule[]) => {
    validatorRef.current.addFieldRules(fieldName, rules);
  }, []);

  // Remove validation rules
  const removeFieldRules = useCallback((fieldName: string) => {
    validatorRef.current.removeFieldRules(fieldName);
  }, []);

  // Get field validation state
  const getFieldState = useCallback((fieldName: string) => {
    return fieldStates[fieldName] || 'default';
  }, [fieldStates]);

  // Get field error
  const getFieldError = useCallback((fieldName: string) => {
    return fieldErrors[fieldName] || '';
  }, [fieldErrors]);

  // Check if field is valid
  const isFieldValid = useCallback((fieldName: string) => {
    return !fieldErrors[fieldName];
  }, [fieldErrors]);

  // Check if field is touched
  const isFieldTouched = useCallback((fieldName: string) => {
    return touchedFields.has(fieldName);
  }, [touchedFields]);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return Object.values(fieldErrors).every(error => !error);
  }, [fieldErrors]);

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return {
    formData,
    validationResults,
    fieldErrors,
    fieldStates,
    isSubmitting,
    isDirty,
    touchedFields,
    updateField,
    validateField,
    validateForm,
    handleFieldBlur,
    resetForm,
    submitForm,
    addFieldRules,
    removeFieldRules,
    getFieldState,
    getFieldError,
    isFieldValid,
    isFieldTouched,
    isFormValid,
  };
};

// Utility functions
export const formValidationUtils = {
  // Create validator instance
  createValidator: (options?: FormValidationOptions) => {
    return new FormValidator(options);
  },

  // Validate email
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  },

  // Validate URL
  validateURL: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validate password strength
  validatePasswordStrength: (password: string): {
    score: number;
    feedback: string[];
    isValid: boolean;
  } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('يجب أن تحتوي على حرف كبير');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('يجب أن تحتوي على حرف صغير');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('يجب أن تحتوي على رقم');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('يجب أن تحتوي على رمز خاص');
    }

    return {
      score,
      feedback,
      isValid: score >= 4,
    };
  },

  // Sanitize input
  sanitizeInput: (input: string): string => {
    return input
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '');
  },

  // Format phone number
  formatPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  // Format credit card
  formatCreditCard: (card: string): string => {
    const cleaned = card.replace(/\D/g, '');
    const groups = cleaned.match(/\d{4}/g) || [];
    return groups.join(' ');
  },

  // Generate validation rules from schema
  generateRulesFromSchema: (schema: Record<string, any>): Record<string, ValidationRule[]> => {
    const rules: Record<string, ValidationRule[]> = {};

    Object.entries(schema).forEach(([fieldName, fieldSchema]) => {
      const fieldRules: ValidationRule[] = [];

      if (fieldSchema.required) {
        fieldRules.push(validators.required(fieldSchema.requiredMessage));
      }

      if (fieldSchema.type === 'email') {
        fieldRules.push(validators.email(fieldSchema.emailMessage));
      }

      if (fieldSchema.type === 'phone') {
        fieldRules.push(validators.phone(fieldSchema.phoneMessage, fieldSchema.phonePattern));
      }

      if (fieldSchema.type === 'url') {
        fieldRules.push(validators.url(fieldSchema.urlMessage));
      }

      if (fieldSchema.type === 'number') {
        fieldRules.push(validators.number(fieldSchema.numberMessage));
        if (fieldSchema.min !== undefined) {
          fieldRules.push(validators.minValue(fieldSchema.min, fieldSchema.minMessage));
        }
        if (fieldSchema.max !== undefined) {
          fieldRules.push(validators.maxValue(fieldSchema.max, fieldSchema.maxMessage));
        }
      }

      if (fieldSchema.type === 'string') {
        if (fieldSchema.minLength !== undefined) {
          fieldRules.push(validators.minLength(fieldSchema.minLength, fieldSchema.minLengthMessage));
        }
        if (fieldSchema.maxLength !== undefined) {
          fieldRules.push(validators.maxLength(fieldSchema.maxLength, fieldSchema.maxLengthMessage));
        }
        if (fieldSchema.pattern) {
          fieldRules.push(validators.pattern(fieldSchema.pattern, fieldSchema.patternMessage));
        }
      }

      if (fieldSchema.type === 'password') {
        if (fieldSchema.strength) {
          fieldRules.push(validators.passwordStrength(fieldSchema.strengthMessage));
        }
        if (fieldSchema.confirmField) {
          fieldRules.push(validators.passwordMatch(fieldSchema.confirmField, fieldSchema.confirmMessage));
        }
      }

      if (fieldSchema.type === 'date') {
        fieldRules.push(validators.date(fieldSchema.dateMessage));
        if (fieldSchema.future) {
          fieldRules.push(validators.futureDate(fieldSchema.futureMessage));
        }
        if (fieldSchema.past) {
          fieldRules.push(validators.pastDate(fieldSchema.pastMessage));
        }
      }

      if (fieldSchema.type === 'file') {
        if (fieldSchema.allowedTypes) {
          fieldRules.push(validators.fileType(fieldSchema.allowedTypes, fieldSchema.fileTypeMessage));
        }
        if (fieldSchema.maxSize) {
          fieldRules.push(validators.fileSize(fieldSchema.maxSize, fieldSchema.fileSizeMessage));
        }
      }

      if (fieldSchema.customValidators) {
        fieldSchema.customValidators.forEach((validator: any) => {
          fieldRules.push(validators.custom(validator.validator, validator.name));
        });
      }

      rules[fieldName] = fieldRules;
    });

    return rules;
  },
};

export default FormValidator;
