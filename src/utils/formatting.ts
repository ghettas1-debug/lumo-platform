'use client';

// Date, Number, and Currency Formatting Utilities for Lumo Platform
import { useTextDirection } from './textDirection';

// Date formatting interface
export interface DateFormatOptions {
  locale?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  weekday?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean;
  timeZone?: string;
  era?: 'long' | 'short' | 'narrow';
}

// Number formatting interface
export interface NumberFormatOptions {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  useGrouping?: boolean;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  compactDisplay?: 'short' | 'long';
  unit?: string;
  unitDisplay?: 'short' | 'long' | 'narrow';
}

// Currency information interface
export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  symbolPosition: 'before' | 'after';
  decimalDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
}

// Date formatter class
export class DateFormatter {
  private static instance: DateFormatter;
  private defaultLocale: string = 'en-US';
  private timeZones: Map<string, string> = new Map();

  private constructor() {
    this.initializeTimeZones();
  }

  public static getInstance(): DateFormatter {
    if (!DateFormatter.instance) {
      DateFormatter.instance = new DateFormatter();
    }
    return DateFormatter.instance;
  }

  // Initialize time zones
  private initializeTimeZones(): void {
    this.timeZones.set('UTC', 'UTC');
    this.timeZones.set('EST', 'America/New_York');
    this.timeZones.set('PST', 'America/Los_Angeles');
    this.timeZones.set('GMT', 'Europe/London');
    this.timeZones.set('CET', 'Europe/Paris');
    this.timeZones.set('JST', 'Asia/Tokyo');
    this.timeZones.set('IST', 'Asia/Kolkata');
    this.timeZones.set('CST', 'Asia/Shanghai');
    this.timeZones.set('AST', 'Asia/Riyadh');
  }

  // Format date
  public formatDate(date: Date | string | number, options: DateFormatOptions = {}): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const locale = options.locale || this.defaultLocale;
    
    try {
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    } catch (error) {
      console.warn('Date formatting error:', error);
      return dateObj.toLocaleDateString();
    }
  }

  // Format time
  public formatTime(date: Date | string | number, options: DateFormatOptions = {}): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const locale = options.locale || this.defaultLocale;
    
    const timeOptions: DateFormatOptions = {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
    };
    
    try {
      return new Intl.DateTimeFormat(locale, timeOptions).format(dateObj);
    } catch (error) {
      console.warn('Time formatting error:', error);
      return dateObj.toLocaleTimeString();
    }
  }

  // Format date and time
  public formatDateTime(date: Date | string | number, options: DateFormatOptions = {}): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const locale = options.locale || this.defaultLocale;
    
    const dateTimeOptions: DateFormatOptions = {
      ...options,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    try {
      return new Intl.DateTimeFormat(locale, dateTimeOptions).format(dateObj);
    } catch (error) {
      console.warn('DateTime formatting error:', error);
      return dateObj.toLocaleString();
    }
  }

  // Format relative time
  public formatRelativeTime(date: Date | string | number, locale: string = 'en-US'): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      if (diffYears > 0) return rtf.format(-diffYears, 'year');
      if (diffMonths > 0) return rtf.format(-diffMonths, 'month');
      if (diffWeeks > 0) return rtf.format(-diffWeeks, 'week');
      if (diffDays > 0) return rtf.format(-diffDays, 'day');
      if (diffHours > 0) return rtf.format(-diffHours, 'hour');
      if (diffMinutes > 0) return rtf.format(-diffMinutes, 'minute');
      return rtf.format(-diffSeconds, 'second');
    } catch (error) {
      console.warn('Relative time formatting error:', error);
      return dateObj.toLocaleDateString();
    }
  }

  // Format date range
  public formatDateRange(startDate: Date | string | number, endDate: Date | string | number, options: DateFormatOptions = {}): string {
    const start = typeof startDate === 'string' || typeof startDate === 'number' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' || typeof endDate === 'number' ? new Date(endDate) : endDate;
    const locale = options.locale || this.defaultLocale;
    
    try {
      const rangeFormat = new Intl.DateTimeFormat(locale, {
        ...options,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      
      return rangeFormat.formatRange(start, end);
    } catch (error) {
      console.warn('Date range formatting error:', error);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
  }

  // Get time zone
  public getTimeZone(timeZone: string): string {
    return this.timeZones.get(timeZone) || timeZone;
  }

  // Add time zone
  public addTimeZone(code: string, ianaCode: string): void {
    this.timeZones.set(code, ianaCode);
  }

  // Set default locale
  public setDefaultLocale(locale: string): void {
    this.defaultLocale = locale;
  }

  // Get default locale
  public getDefaultLocale(): string {
    return this.defaultLocale;
  }
}

// Number formatter class
export class NumberFormatter {
  private static instance: NumberFormatter;
  private defaultLocale: string = 'en-US';
  private currencies: Map<string, CurrencyInfo> = new Map();

  private constructor() {
    this.initializeCurrencies();
  }

  public static getInstance(): NumberFormatter {
    if (!NumberFormatter.instance) {
      NumberFormatter.instance = new NumberFormatter();
    }
    return NumberFormatter.instance;
  }

  // Initialize currencies
  private initializeCurrencies(): void {
    const currencies: CurrencyInfo[] = [
      { code: 'USD', symbol: '$', name: 'US Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'EUR', symbol: '€', name: 'Euro', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'GBP', symbol: '£', name: 'British Pound', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'INR', symbol: '₹', name: 'Indian Rupee', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: ' ', decimalSeparator: ',' },
      { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: ' ', decimalSeparator: ',' },
      { code: 'DKK', symbol: 'kr', name: 'Danish Krone', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: ' ', decimalSeparator: ',' },
      { code: 'RUB', symbol: '₽', name: 'Russian Ruble', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: ' ', decimalSeparator: ',' },
      { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'MXN', symbol: '$', name: 'Mexican Peso', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'ARS', symbol: '$', name: 'Argentine Peso', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'CLP', symbol: '$', name: 'Chilean Peso', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'COP', symbol: '$', name: 'Colombian Peso', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'UYU', symbol: '$', name: 'Uruguayan Peso', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'VES', symbol: 'Bs', name: 'Venezuelan Bolívar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'SYP', symbol: 'ل.س', name: 'Syrian Pound', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'IQD', symbol: 'د.ع', name: 'Iraqi Dinar', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'YER', symbol: 'ر.ي', name: 'Yemeni Rial', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'MAD', symbol: 'د.م', name: 'Moroccan Dirham', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'LYD', symbol: 'د.ل', name: 'Libyan Dinar', symbolPosition: 'before', decimalDigits: 3, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'TRY', symbol: '₺', name: 'Turkish Lira', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'IRR', symbol: 'ریال', name: 'Iranian Rial', symbolPosition: 'after', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'AFN', symbol: '؋', name: 'Afghan Afghani', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'LKR', symbol: 'රු', name: 'Sri Lankan Rupee', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', symbolPosition: 'after', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'THB', symbol: '฿', name: 'Thai Baht', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: '.', decimalSeparator: ',' },
      { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'PHP', symbol: '₱', name: 'Philippine Peso', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'KRW', symbol: '₩', name: 'South Korean Won', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'ZAR', symbol: 'R', name: 'South African Rand', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ' ', decimalSeparator: ',' },
      { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', symbolPosition: 'before', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', symbolPosition: 'before', decimalDigits: 0, thousandsSeparator: ',', decimalSeparator: '.' },
      { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', symbolPosition: 'after', decimalDigits: 2, thousandsSeparator: ',', decimalSeparator: '.' },
    ];

    currencies.forEach(currency => {
      this.currencies.set(currency.code, currency);
    });
  }

  // Format number
  public formatNumber(number: number | string, options: NumberFormatOptions = {}): string {
    const num = typeof number === 'string' ? parseFloat(number) : number;
    const locale = options.locale || this.defaultLocale;
    
    try {
      return new Intl.NumberFormat(locale, options).format(num);
    } catch (error) {
      console.warn('Number formatting error:', error);
      return num.toLocaleString();
    }
  }

  // Format currency
  public formatCurrency(amount: number | string, currency: string, options: NumberFormatOptions = {}): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    const locale = options.locale || this.defaultLocale;
    const currencyInfo = this.currencies.get(currency);
    
    const currencyOptions: NumberFormatOptions = {
      ...options,
      style: 'currency',
      currency: currency,
      currencyDisplay: options.currencyDisplay || 'symbol',
    };
    
    try {
      return new Intl.NumberFormat(locale, currencyOptions).format(num);
    } catch (error) {
      console.warn('Currency formatting error:', error);
      // Fallback formatting
      const symbol = currencyInfo?.symbol || currency;
      const formattedNum = num.toLocaleString(locale, {
        minimumFractionDigits: currencyInfo?.decimalDigits || 2,
        maximumFractionDigits: currencyInfo?.decimalDigits || 2,
      });
      
      return currencyInfo?.symbolPosition === 'after' 
        ? `${formattedNum} ${symbol}`
        : `${symbol} ${formattedNum}`;
    }
  }

  // Format percentage
  public formatPercentage(number: number | string, options: NumberFormatOptions = {}): string {
    const num = typeof number === 'string' ? parseFloat(number) : number;
    const locale = options.locale || this.defaultLocale;
    
    const percentOptions: NumberFormatOptions = {
      ...options,
      style: 'percent',
    };
    
    try {
      return new Intl.NumberFormat(locale, percentOptions).format(num);
    } catch (error) {
      console.warn('Percentage formatting error:', error);
      return `${num}%`;
    }
  }

  // Format unit
  public formatUnit(number: number | string, unit: string, options: NumberFormatOptions = {}): string {
    const num = typeof number === 'string' ? parseFloat(number) : number;
    const locale = options.locale || this.defaultLocale;
    
    const unitOptions: NumberFormatOptions = {
      ...options,
      style: 'unit',
      unit,
    };
    
    try {
      return new Intl.NumberFormat(locale, unitOptions).format(num);
    } catch (error) {
      console.warn('Unit formatting error:', error);
      return `${num} ${unit}`;
    }
  }

  // Format compact number
  public formatCompact(number: number | string, options: NumberFormatOptions = {}): string {
    const num = typeof number === 'string' ? parseFloat(number) : number;
    const locale = options.locale || this.defaultLocale;
    
    const compactOptions: NumberFormatOptions = {
      ...options,
      notation: 'compact',
      compactDisplay: options.compactDisplay || 'short',
    };
    
    try {
      return new Intl.NumberFormat(locale, compactOptions).format(num);
    } catch (error) {
      console.warn('Compact formatting error:', error);
      return num.toLocaleString();
    }
  }

  // Get currency info
  public getCurrencyInfo(currency: string): CurrencyInfo | undefined {
    return this.currencies.get(currency);
  }

  // Add currency
  public addCurrency(currency: CurrencyInfo): void {
    this.currencies.set(currency.code, currency);
  }

  // Get all currencies
  public getAllCurrencies(): CurrencyInfo[] {
    return Array.from(this.currencies.values());
  }

  // Set default locale
  public setDefaultLocale(locale: string): void {
    this.defaultLocale = locale;
  }

  // Get default locale
  public getDefaultLocale(): string {
    return this.defaultLocale;
  }
}

// React hooks
export const useFormatting = () => {
  const dateFormatter = DateFormatter.getInstance();
  const numberFormatter = NumberFormatter.getInstance();
  const { language } = useTextDirection();

  return {
    // Date formatting
    formatDate: (date: Date | string | number, options?: DateFormatOptions) => 
      dateFormatter.formatDate(date, { ...options, locale: options?.locale || language }),
    
    formatTime: (date: Date | string | number, options?: DateFormatOptions) => 
      dateFormatter.formatTime(date, { ...options, locale: options?.locale || language }),
    
    formatDateTime: (date: Date | string | number, options?: DateFormatOptions) => 
      dateFormatter.formatDateTime(date, { ...options, locale: options?.locale || language }),
    
    formatRelativeTime: (date: Date | string | number, locale?: string) => 
      dateFormatter.formatRelativeTime(date, locale || language),
    
    formatDateRange: (startDate: Date | string | number, endDate: Date | string | number, options?: DateFormatOptions) => 
      dateFormatter.formatDateRange(startDate, endDate, { ...options, locale: options?.locale || language }),
    
    // Number formatting
    formatNumber: (number: number | string, options?: NumberFormatOptions) => 
      numberFormatter.formatNumber(number, { ...options, locale: options?.locale || language }),
    
    formatCurrency: (amount: number | string, currency: string, options?: NumberFormatOptions) => 
      numberFormatter.formatCurrency(amount, currency, { ...options, locale: options?.locale || language }),
    
    formatPercentage: (number: number | string, options?: NumberFormatOptions) => 
      numberFormatter.formatPercentage(number, { ...options, locale: options?.locale || language }),
    
    formatUnit: (number: number | string, unit: string, options?: NumberFormatOptions) => 
      numberFormatter.formatUnit(number, unit, { ...options, locale: options?.locale || language }),
    
    formatCompact: (number: number | string, options?: NumberFormatOptions) => 
      numberFormatter.formatCompact(number, { ...options, locale: options?.locale || language }),
    
    // Currency info
    getCurrencyInfo: (currency: string) => numberFormatter.getCurrencyInfo(currency),
    getAllCurrencies: () => numberFormatter.getAllCurrencies(),
  };
};

// Utility functions
export const formattingUtils = {
  // Create formatters
  createDateFormatter: () => DateFormatter.getInstance(),
  createNumberFormatter: () => NumberFormatter.getInstance(),

  // Quick date formatting
  formatDate: (date: Date | string | number, locale: string = 'en-US') => {
    const formatter = DateFormatter.getInstance();
    return formatter.formatDate(date, { locale });
  },

  formatTime: (date: Date | string | number, locale: string = 'en-US') => {
    const formatter = DateFormatter.getInstance();
    return formatter.formatTime(date, { locale });
  },

  formatDateTime: (date: Date | string | number, locale: string = 'en-US') => {
    const formatter = DateFormatter.getInstance();
    return formatter.formatDateTime(date, { locale });
  },

  // Quick number formatting
  formatNumber: (number: number | string, locale: string = 'en-US') => {
    const formatter = NumberFormatter.getInstance();
    return formatter.formatNumber(number, { locale });
  },

  formatCurrency: (amount: number | string, currency: string, locale: string = 'en-US') => {
    const formatter = NumberFormatter.getInstance();
    return formatter.formatCurrency(amount, currency, { locale });
  },

  formatPercentage: (number: number | string, locale: string = 'en-US') => {
    const formatter = NumberFormatter.getInstance();
    return formatter.formatPercentage(number, { locale });
  },

  // Parse date string
  parseDate: (dateString: string): Date | null => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  },

  // Check if date is valid
  isValidDate: (date: Date | string | number): boolean => {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  },

  // Get date parts
  getDateParts: (date: Date | string | number) => {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
      hours: dateObj.getHours(),
      minutes: dateObj.getMinutes(),
      seconds: dateObj.getSeconds(),
      milliseconds: dateObj.getMilliseconds(),
      dayOfWeek: dateObj.getDay(),
      dayOfYear: Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
      weekOfYear: Math.ceil((((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)) + 1) / 7),
    };
  },

  // Add time to date
  addTime: (date: Date | string | number, amount: number, unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'): Date => {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const result = new Date(dateObj);
    
    switch (unit) {
      case 'years':
        result.setFullYear(result.getFullYear() + amount);
        break;
      case 'months':
        result.setMonth(result.getMonth() + amount);
        break;
      case 'days':
        result.setDate(result.getDate() + amount);
        break;
      case 'hours':
        result.setHours(result.getHours() + amount);
        break;
      case 'minutes':
        result.setMinutes(result.getMinutes() + amount);
        break;
      case 'seconds':
        result.setSeconds(result.getSeconds() + amount);
        break;
      case 'milliseconds':
        result.setMilliseconds(result.getMilliseconds() + amount);
        break;
    }
    
    return result;
  },

  // Get age from date
  getAge: (birthDate: Date | string | number): number => {
    const birth = typeof birthDate === 'string' || typeof birthDate === 'number' ? new Date(birthDate) : birthDate;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },

  // Format file size
  formatFileSize: (bytes: number, locale: string = 'en-US'): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    const formatter = NumberFormatter.getInstance();
    return formatter.formatNumber(size, {
      locale,
      minimumFractionDigits: unitIndex === 0 ? 0 : 2,
      maximumFractionDigits: unitIndex === 0 ? 0 : 2,
    }) + ' ' + units[unitIndex];
  },

  // Format duration
  formatDuration: (milliseconds: number, locale: string = 'en-US'): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  },
};

// Default instances
export const defaultDateFormatter = DateFormatter.getInstance();
export const defaultNumberFormatter = NumberFormatter.getInstance();

export default {
  DateFormatter,
  NumberFormatter,
  useFormatting,
  formattingUtils,
  defaultDateFormatter,
  defaultNumberFormatter,
};
