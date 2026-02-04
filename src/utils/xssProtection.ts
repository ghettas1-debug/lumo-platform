'use client';

// XSS Protection Utilities
export interface XSSProtectionOptions {
  allowHTML?: boolean;
  allowJavaScript?: boolean;
  allowCSS?: boolean;
  allowStyle?: boolean;
  allowComments?: boolean;
  allowDataAttributes?: boolean;
  allowCustomTags?: string[];
  maxInputLength?: number;
  stripWhitespace?: boolean;
  normalizeUnicode?: boolean;
  escapeQuotes?: boolean;
  escapeApostrophes?: boolean;
}

interface XSSValidationResult {
  isValid: boolean;
  sanitized: string;
  threats: XSSThreat[];
  warnings: string[];
}

interface XSSThreat {
  type: 'script' | 'style' | 'iframe' | 'object' | 'embed' | 'link' | 'meta' | 'form' | 'input' | 'textarea' | 'button' | 'img' | 'svg' | 'math' | 'data' | 'event' | 'expression' | 'javascript' | 'vbscript' | 'onload' | 'onerror' | 'onclick' | 'onmouseover';
  severity: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  position: number;
  description: string;
}

class XSSProtection {
  private static readonly DANGEROUS_TAGS = [
    'script', 'iframe', 'object', 'embed', 'link', 'meta', 'form', 
    'input', 'textarea', 'button', 'img', 'svg', 'math', 'style', 'video', 'audio'
  ];

  private static readonly DANGEROUS_ATTRIBUTES = [
    'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown',
    'onkeyup', 'onkeypress', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset',
    'onabort', 'oncanplay', 'oncanplaythrough', 'ondurationchange', 'onemptied',
    'onended', 'onerror', 'onloadeddata', 'onloadedmetadata', 'onloadstart',
    'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onseeked',
    'onseeking', 'onstalled', 'onsuspend', 'ontimeupdate', 'onvolumechange',
    'onwaiting', 'onwheel', 'oncopy', 'oncut', 'onpaste', 'ondrag', 'ondragend',
    'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop',
    'onscroll', 'onresize', 'onunload', 'onhashchange', 'onmessage', 'onoffline',
    'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onstorage',
    'onbeforeunload', 'onrejectionhandled', 'onunhandledrejection'
  ];

  private static readonly DANGEROUS_PROTOCOLS = [
    'javascript:', 'vbscript:', 'data:', 'file:', 'ftp:', 'mailto:', 'tel:', 'sms:',
    'call:', 'cap:', 'fax:', 'go:', 'h323:', 'imap:', 'ldap:', 'mid:', 'mms:',
    'news:', 'nntp:', 'pop3:', 'prospero:', 'rsync:', 'rtsp:', 'sip:', 'sips:',
    'snews:', 'ssh:', 'telnet:', 'urn:', 'webcal:', 'wais:', 'xmpp:', 'xri:'
  ];

  private static readonly DANGEROUS_PATTERNS = [
    // Script patterns
    /<script[^>]*>.*?<\/script>/gi,
    /<script[^>]*\/>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /url\s*\(\s*javascript:/gi,
    /@import/gi,
    /binding\s*:/gi,
    
    // HTML injection patterns
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /<form[^>]*>.*?<\/form>/gi,
    /<input[^>]*>/gi,
    /<textarea[^>]*>.*?<\/textarea>/gi,
    /<button[^>]*>.*?<\/button>/gi,
    /<img[^>]*>/gi,
    /<svg[^>]*>.*?<\/svg>/gi,
    /<math[^>]*>.*?<\/math>/gi,
    
    // CSS injection patterns
    /<style[^>]*>.*?<\/style>/gi,
    /<[^>]*style\s*=/gi,
    /<[^>]*on\w+\s*=/gi,
    
    // Data URI patterns
    /data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/gi,
    /data:text\/[^;]+;base64,[a-zA-Z0-9+/=]+/gi,
    
    // Unicode and encoding patterns
    /%3cscript%3e/gi, // %3Cscript%3E
    /%3c\/script%3e/gi, // %3C/script%3E
    /&#x3c;script&#x3e;/gi, // &#x3C;script&#x3E;
    /&#60;script&#62;/gi, // &#60;script&#62;
    
    // SQL injection patterns (for context)
    /union\s+select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /update\s+set/gi,
    /delete\s+from/gi,
    
    // Command injection patterns
    /\|\s*&&\s*\|/gi,
    /;\s*rm\s+-rf/gi,
    /\$\(/gi,
    /`[^`]*`/gi,
    
    // Path traversal patterns
    /\.\.\//gi,
    /\.\.\\/gi,
    /%2e%2e\//gi,
    /%2e%2e\\/gi,
  ];

  // Main sanitization function
  static sanitize(input: string, options: XSSProtectionOptions = {}): XSSValidationResult {
    const {
      allowHTML = false,
      allowJavaScript = false,
      allowCSS = false,
      allowStyle = false,
      allowComments = false,
      allowDataAttributes = false,
      allowCustomTags = [],
      maxInputLength = 10000,
      stripWhitespace = true,
      normalizeUnicode = true,
      escapeQuotes = true,
      escapeApostrophes = true,
    } = options;

    const threats: XSSThreat[] = [];
    const warnings: string[] = [];
    let sanitized = input;

    // Check input length
    if (sanitized.length > maxInputLength) {
      warnings.push(`Input length (${sanitized.length}) exceeds maximum allowed (${maxInputLength})`);
      sanitized = sanitized.substring(0, maxInputLength);
    }

    // Normalize Unicode
    if (normalizeUnicode) {
      sanitized = sanitized.normalize('NFKC');
    }

    // Strip whitespace
    if (stripWhitespace) {
      sanitized = sanitized.trim();
    }

    // Detect threats
    this.detectThreats(sanitized, threats, warnings, options);

    // Remove dangerous content
    sanitized = this.removeDangerousContent(sanitized, options);

    // Escape special characters
    sanitized = this.escapeSpecialCharacters(sanitized, {
      escapeQuotes,
      escapeApostrophes,
    });

    // Validate final result
    const isValid = threats.length === 0;

    return {
      isValid,
      sanitized,
      threats,
      warnings,
    };
  }

  // Detect XSS threats
  private static detectThreats(
    input: string, 
    threats: XSSThreat[], 
    warnings: string[], 
    options: XSSProtectionOptions
  ): void {
    const { allowHTML, allowJavaScript, allowCSS, allowStyle, allowDataAttributes } = options;

    // Check for dangerous patterns
    this.DANGEROUS_PATTERNS.forEach((pattern, index) => {
      const matches = input.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const position = input.indexOf(match);
          const threat = this.classifyThreat(match, position);
          threats.push(threat);
        });
      }
    });

    // Check for dangerous tags
    if (!allowHTML) {
      const tagPattern = /<(\w+)[^>]*>/gi;
      let match;
      while ((match = tagPattern.exec(input)) !== null) {
        const tagName = match[1].toLowerCase();
        if (this.DANGEROUS_TAGS.includes(tagName) && !allowCustomTags.includes(tagName)) {
          threats.push({
            type: this.getThreatType(tagName),
            severity: 'high',
            content: match[0],
            position: match.index,
            description: `Dangerous HTML tag: ${tagName}`,
          });
        }
      }
    }

    // Check for dangerous attributes
    const attributePattern = /(\w+)\s*=\s*["']([^"']*)["']/gi;
    while ((match = attributePattern.exec(input)) !== null) {
      const attributeName = match[1].toLowerCase();
      const attributeValue = match[2];

      if (this.DANGEROUS_ATTRIBUTES.includes(attributeName)) {
        threats.push({
          type: 'event',
          severity: 'critical',
          content: match[0],
          position: match.index,
          description: `Dangerous event handler: ${attributeName}`,
        });
      }

      // Check for dangerous protocols in attributes
      if (this.DANGEROUS_PROTOCOLS.some(protocol => attributeValue.toLowerCase().startsWith(protocol))) {
        threats.push({
          type: 'javascript',
          severity: 'high',
          content: match[0],
          position: match.index,
          description: `Dangerous protocol in attribute: ${attributeValue}`,
        });
      }

      // Check for JavaScript in attributes
      if (attributeValue.toLowerCase().includes('javascript:') || 
          attributeValue.toLowerCase().includes('vbscript:')) {
        threats.push({
          type: 'javascript',
          severity: 'high',
          content: match[0],
          position: match.index,
          description: `JavaScript in attribute: ${attributeName}`,
        });
      }

      // Check for data attributes (if not allowed)
      if (!allowDataAttributes && attributeName.startsWith('data-')) {
        warnings.push(`Data attribute found: ${attributeName}`);
      }
    }

    // Check for CSS injection
    if (!allowCSS && !allowStyle) {
      const stylePattern = /style\s*=\s*["']([^"']*)["']/gi;
      let match;
      while ((match = stylePattern.exec(input)) !== null) {
        threats.push({
          type: 'style',
          severity: 'medium',
          content: match[0],
          position: match.index,
          description: 'Inline style detected',
        });
      }
    }

    // Check for JavaScript in URLs
    const urlPattern = /href\s*=\s*["']([^"']*)["']/gi;
    while ((match = urlPattern.exec(input)) !== null) {
      const url = match[1];
      if (this.DANGEROUS_PROTOCOLS.some(protocol => url.toLowerCase().startsWith(protocol))) {
        threats.push({
          type: 'javascript',
          severity: 'high',
          content: match[0],
          position: match.index,
          description: `Dangerous URL: ${url}`,
        });
      }
    }

    // Check for script content in text
    if (!allowJavaScript) {
      const scriptKeywords = ['eval', 'Function', 'setTimeout', 'setInterval', 'alert', 'confirm', 'prompt'];
      scriptKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\s*\\(`, 'gi');
        if (regex.test(input)) {
          warnings.push(`Potential JavaScript function call: ${keyword}`);
        }
      });
    }
  }

  // Remove dangerous content
  private static removeDangerousContent(input: string, options: XSSProtectionOptions): string {
    const { allowHTML, allowJavaScript, allowCSS, allowStyle, allowComments } = options;
    let sanitized = input;

    // Remove HTML tags if not allowed
    if (!allowHTML) {
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    // Remove comments if not allowed
    if (!allowComments) {
      sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');
      sanitized = sanitized.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    // Remove style attributes if not allowed
    if (!allowStyle) {
      sanitized = sanitized.replace(/style\s*=\s*["'][^"']*["']/gi, '');
    }

    // Remove CSS if not allowed
    if (!allowCSS) {
      sanitized = sanitized.replace(/<style[^>]*>.*?<\/style>/gi, '');
      sanitized = sanitized.replace(/<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi, '');
    }

    // Remove script content
    if (!allowJavaScript) {
      sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
      sanitized = sanitized.replace(/<script[^>]*\/>/gi, '');
      sanitized = sanitized.replace(/javascript:/gi, '');
      sanitized = sanitized.replace(/vbscript:/gi, '');
      sanitized = sanitized.replace(/on\w+\s*=/gi, '');
      sanitized = sanitized.replace(/expression\s*\(/gi, '');
    }

    return sanitized;
  }

  // Escape special characters
  private static escapeSpecialCharacters(input: string, options: { escapeQuotes: boolean; escapeApostrophes: boolean }): string {
    const { escapeQuotes, escapeApostrophes } = options;
    let sanitized = input;

    // Escape HTML entities
    sanitized = sanitized.replace(/&/g, '&amp;');
    sanitized = sanitized.replace(/</g, '&lt;');
    sanitized = sanitized.replace(/>/g, '&gt;');
    sanitized = sanitized.replace(/"/g, '&quot;');

    // Escape quotes if requested
    if (escapeQuotes) {
      sanitized = sanitized.replace(/'/g, '&#x27;');
      sanitized = sanitized.replace(/"/g, '&quot;');
    }

    // Escape apostrophes if requested
    if (escapeApostrophes) {
      sanitized = sanitized.replace(/'/g, '&#x27;');
    }

    // Escape backslashes
    sanitized = sanitized.replace(/\\/g, '&#x5C;');

    // Escape null bytes
    sanitized = sanitized.replace(/\0/g, '&#x0;');

    return sanitized;
  }

  // Classify threat type
  private static classifyThreat(content: string, position: number): XSSThreat {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('script') || lowerContent.includes('javascript') || lowerContent.includes('vbscript')) {
      return {
        type: 'script',
        severity: 'critical',
        content,
        position,
        description: 'Script injection detected',
      };
    }

    if (lowerContent.includes('style') || lowerContent.includes('css')) {
      return {
        type: 'style',
        severity: 'medium',
        content,
        position,
        description: 'Style injection detected',
      };
    }

    if (lowerContent.includes('iframe') || lowerContent.includes('object') || lowerContent.includes('embed')) {
      return {
        type: 'iframe',
        severity: 'high',
        content,
        position,
        description: 'Object/iframe injection detected',
      };
    }

    if (lowerContent.includes('on') && lowerContent.includes('=')) {
      return {
        type: 'event',
        severity: 'critical',
        content,
        position,
        description: 'Event handler injection detected',
      };
    }

    if (lowerContent.includes('data:')) {
      return {
        type: 'data',
        severity: 'medium',
        content,
        position,
        description: 'Data URI detected',
      };
    }

    if (lowerContent.includes('expression')) {
      return {
        type: 'expression',
        severity: 'high',
        content,
        position,
        description: 'CSS expression detected',
      };
    }

    return {
      type: 'javascript',
      severity: 'medium',
      content,
      position,
      description: 'Potential XSS threat detected',
    };
  }

  // Get threat type from tag name
  private static getThreatType(tagName: string): XSSThreat['type'] {
    const tagMap: Record<string, XSSThreat['type']> = {
      script: 'script',
      style: 'style',
      iframe: 'iframe',
      object: 'object',
      embed: 'embed',
      link: 'link',
      meta: 'meta',
      form: 'form',
      input: 'input',
      textarea: 'textarea',
      button: 'button',
      img: 'img',
      svg: 'svg',
      math: 'math',
    };

    return tagMap[tagName] || 'javascript';
  }

  // Quick validation for common XSS patterns
  static quickValidate(input: string): boolean {
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i,
      /expression\s*\(/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<link/i,
      /<meta/i,
      /<form/i,
      /<input/i,
      /<textarea/i,
      /<button/i,
      /<img/i,
      /<svg/i,
      /<math/i,
      /<style/i,
      /data:/i,
      /%3cscript%3e/i,
      /%3c\/script%3e/i,
      /&#x3c;script&#x3e;/i,
      /&#60;script&#62;/i,
    ];

    return !dangerousPatterns.some(pattern => pattern.test(input));
  }

  // Sanitize HTML content
  static sanitizeHTML(html: string, allowedTags: string[] = [], allowedAttributes: string[] = []): string {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = html;
    
    // Basic HTML entity encoding
    let sanitized = tempDiv.innerHTML;
    
    // Remove all tags except allowed ones
    if (allowedTags.length > 0) {
      const tagPattern = new RegExp(`<(?!${allowedTags.join('|')})\\w+[^>]*>.*?<\\/\\1>`, 'gi');
      sanitized = sanitized.replace(tagPattern, '');
    }

    // Remove dangerous attributes
    const dangerousAttrs = this.DANGEROUS_ATTRIBUTES.filter(attr => !allowedAttributes.includes(attr));
    dangerousAttrs.forEach(attr => {
      const attrPattern = new RegExp(`\\s*${attr}\\s*=\\s*["'][^"']*["']`, 'gi');
      sanitized = sanitized.replace(attrPattern, '');
    });

    return sanitized;
  }

  // Sanitize URL
  static sanitizeURL(url: string): XSSValidationResult {
    const threats: XSSThreat[] = [];
    const warnings: string[] = [];
    let sanitized = url.trim();

    // Check for dangerous protocols
    if (this.DANGEROUS_PROTOCOLS.some(protocol => sanitized.toLowerCase().startsWith(protocol))) {
      threats.push({
        type: 'javascript',
        severity: 'high',
        content: sanitized,
        position: 0,
        description: `Dangerous protocol: ${sanitized}`,
      });
      return {
        isValid: false,
        sanitized: '',
        threats,
        warnings,
      };
    }

    // Check for JavaScript in URL
    if (sanitized.toLowerCase().includes('javascript:') || 
        sanitized.toLowerCase().includes('vbscript:')) {
      threats.push({
        type: 'javascript',
        severity: 'high',
        content: sanitized,
        position: 0,
        description: 'JavaScript in URL',
      });
    }

    // Basic URL validation
    try {
      new URL(sanitized);
    } catch {
      warnings.push('Invalid URL format');
      return {
        isValid: false,
        sanitized: '',
        threats,
        warnings,
      };
    }

    return {
      isValid: threats.length === 0,
      sanitized,
      threats,
      warnings,
    };
  }

  // Sanitize CSS
  static sanitizeCSS(css: string): XSSValidationResult {
    const threats: XSSThreat[] = [];
    const warnings: string[] = [];
    let sanitized = css.trim();

    // Check for dangerous CSS patterns
    const dangerousPatterns = [
      /javascript:/gi,
      /vbscript:/gi,
      /expression\s*\(/gi,
      /@import/gi,
      /binding\s*:/gi,
      /url\s*\(\s*javascript:/gi,
      /behavior\s*:/gi,
    ];

    dangerousPatterns.forEach((pattern, index) => {
      if (pattern.test(sanitized)) {
        threats.push({
          type: 'style',
          severity: 'medium',
          content: sanitized,
          position: 0,
          description: 'Dangerous CSS pattern detected',
        });
      }
    });

    // Remove dangerous content
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/vbscript:/gi, '');
    sanitized = sanitized.replace(/expression\s*\(/gi, '');
    sanitized = sanitized.replace(/@import/gi, '');

    return {
      isValid: threats.length === 0,
      sanitized,
      threats,
      warnings,
    };
  }

  // Validate file upload
  static validateFileUpload(file: File): XSSValidationResult {
    const threats: XSSThreat[] = [];
    const warnings: string[] = [];

    // Check file type
    const dangerousTypes = [
      'text/html',
      'text/javascript',
      'text/vbscript',
      'application/javascript',
      'application/x-javascript',
      'application/x-vbscript',
      'text/css',
      'application/css',
    ];

    if (dangerousTypes.includes(file.type)) {
      threats.push({
        type: 'script',
        severity: 'high',
        content: file.type,
        position: 0,
        description: `Dangerous file type: ${file.type}`,
      });
    }

    // Check file name
    const dangerousExtensions = ['.html', '.htm', '.js', '.vbs', '.css', '.svg', '.xml'];
    const fileName = file.name.toLowerCase();
    
    if (dangerousExtensions.some(ext => fileName.endsWith(ext))) {
      threats.push({
        type: 'script',
        severity: 'medium',
        content: fileName,
        position: 0,
        description: `Dangerous file extension: ${fileName}`,
      });
    }

    // Check file size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      warnings.push(`File size (${file.size} bytes) exceeds maximum allowed (${maxSize} bytes)`);
    }

    return {
      isValid: threats.length === 0,
      sanitized: file.name,
      threats,
      warnings,
    };
  }

  // Generate security report
  static generateSecurityReport(results: XSSValidationResult[]): {
    totalInputs: number;
    validInputs: number;
    invalidInputs: number;
    threatsByType: Record<string, number>;
    threatsBySeverity: Record<string, number>;
    warnings: string[];
    recommendations: string[];
  } {
    const threatsByType: Record<string, number> = {};
    const threatsBySeverity: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };
    const allWarnings: string[] = [];
    const recommendations: string[] = [];

    let validCount = 0;
    let invalidCount = 0;

    results.forEach(result => {
      if (result.isValid) {
        validCount++;
      } else {
        invalidCount++;
      }

      result.threats.forEach(threat => {
        threatsByType[threat.type] = (threatsByType[threat.type] || 0) + 1;
        threatsBySeverity[threat.severity] = (threatsBySeverity[threat.severity] || 0) + 1;
      });

      allWarnings.push(...result.warnings);
    });

    // Generate recommendations
    if (threatsBySeverity.critical > 0) {
      recommendations.push('CRITICAL: Immediate action required - Critical XSS threats detected');
    }
    if (threatsBySeverity.high > 0) {
      recommendations.push('HIGH: High priority XSS threats detected - Review and fix immediately');
    }
    if (threatsBySeverity.medium > 0) {
      recommendations.push('MEDIUM: Medium priority XSS threats detected - Review recommended');
    }
    if (threatsBySeverity.low > 0) {
      recommendations.push('LOW: Low priority XSS threats detected - Monitor and consider fixing');
    }
    if (allWarnings.length > 0) {
      recommendations.push('WARNINGS: Security warnings detected - Review recommended');
    }

    return {
      totalInputs: results.length,
      validInputs: validCount,
      invalidInputs: invalidCount,
      threatsByType,
      threatsBySeverity,
      warnings: allWarnings,
      recommendations,
    };
  }
}

// Export XSS protection utilities
export const xssProtectionUtils = {
  sanitize: (input: string, options?: XSSProtectionOptions) => {
    return XSSProtection.sanitize(input, options);
  },

  quickValidate: (input: string) => {
    return XSSProtection.quickValidate(input);
  },

  sanitizeHTML: (html: string, allowedTags?: string[], allowedAttributes?: string[]) => {
    return XSSProtection.sanitizeHTML(html, allowedTags, allowedAttributes);
  },

  sanitizeURL: (url: string) => {
    return XSSProtection.sanitizeURL(url);
  },

  sanitizeCSS: (css: string) => {
    return XSSProtection.sanitizeCSS(css);
  },

  validateFileUpload: (file: File) => {
    return XSSProtection.validateFileUpload(file);
  },

  generateSecurityReport: (results: XSSValidationResult[]) => {
    return XSSProtection.generateSecurityReport(results);
  },
};

// React hook for XSS protection
export const useXSSProtection = (options: XSSProtectionOptions = {}) => {
  const [lastValidation, setLastValidation] = useState<XSSValidationResult | null>(null);

  const sanitize = useCallback((input: string): XSSValidationResult => {
    const result = XSSProtection.sanitize(input, options);
    setLastValidation(result);
    
    // Log warnings and threats in development
    if (process.env.NODE_ENV === 'development') {
      if (result.warnings.length > 0) {
        console.warn('XSS Protection Warnings:', result.warnings);
      }
      if (result.threats.length > 0) {
        console.error('XSS Protection Threats:', result.threats);
      }
    }
    
    return result;
  }, [options]);

  const quickValidate = useCallback((input: string): boolean => {
    return XSSProtection.quickValidate(input);
  }, []);

  const validateHTML = useCallback((html: string, allowedTags?: string[], allowedAttributes?: string[]) => {
    return XSSProtection.sanitizeHTML(html, allowedTags, allowedAttributes);
  }, []);

  const validateURL = useCallback((url: string) => {
    return XSSProtection.sanitizeURL(url);
  }, []);

  const validateCSS = useCallback((css: string) => {
    return XSSProtection.sanitizeCSS(css);
  }, []);

  const validateFile = useCallback((file: File) => {
    return XSSProtection.validateFileUpload(file);
  }, []);

  return {
    sanitize,
    quickValidate,
    validateHTML,
    validateURL,
    validateCSS,
    validateFile,
    lastValidation,
  };
};

export default XSSProtection;
