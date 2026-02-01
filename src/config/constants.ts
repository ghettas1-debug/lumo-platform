// App Constants
export const APP_NAME = 'لumo';
export const APP_DESCRIPTION = 'منصة التعلم المجانية الرائدة في العالم';
export const APP_URL = 'https://lumo.com';

// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.lumo.com';
export const API_VERSION = 'v1';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// Cache
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const SEARCH_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// Animation
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Colors
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#6b7280',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4'
};

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'مبتدئ',
  INTERMEDIATE: 'متوسط',
  ADVANCED: 'متقدم',
  EXPERT: 'خبير'
} as const;

// Course Status
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  FEATURED: 'featured'
} as const;

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
} as const;

// Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'en', name: 'English', rtl: false },
  { code: 'fr', name: 'Français', rtl: false },
  { code: 'es', name: 'Español', rtl: false },
  { code: 'de', name: 'Deutsch', rtl: false }
];

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/lumo',
  TWITTER: 'https://twitter.com/lumo',
  LINKEDIN: 'https://linkedin.com/company/lumo',
  INSTAGRAM: 'https://instagram.com/lumo',
  YOUTUBE: 'https://youtube.com/lumo'
};

// App Store Links
export const APP_STORE_LINKS = {
  IOS: 'https://apps.apple.com/app/lumo',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.lumo.app'
};

// Contact Info
export const CONTACT_INFO = {
  EMAIL: 'support@lumo.com',
  PHONE: '+966-50-123-4567',
  ADDRESS: 'الرياض، المملكة العربية السعودية'
};

// SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'لumo - منصة التعلم المجانية الرائدة في العالم',
  DEFAULT_DESCRIPTION: 'تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني.',
  DEFAULT_KEYWORDS: 'دورات مجانية, تعلم أونلاين, شهادات معتمدة, تطوير الويب, الذكاء الاصطناعي, إدارة الأعمال',
  OG_IMAGE: '/images/og-default.jpg'
};

// Analytics
export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID
};

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_PWA: true,
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
  SERVER_ERROR: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.',
  NOT_FOUND: 'الصفحة المطلوبة غير موجودة.',
  UNAUTHORIZED: 'غير مصرح لك بالوصول إلى هذه الصفحة.',
  VALIDATION_ERROR: 'البيانات المدخلة غير صحيحة.',
  UPLOAD_ERROR: 'فشل رفع الملف. يرجى المحاولة مرة أخرى.',
  DOWNLOAD_ERROR: 'فشل تحميل الملف. يرجى المحاولة مرة أخرى.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي بنجاح.',
  PASSWORD_CHANGED: 'تم تغيير كلمة المرور بنجاح.',
  EMAIL_VERIFIED: 'تم تأكيد البريد الإلكتروني بنجاح.',
  COURSE_ENROLLED: 'تم التسجيل في الدورة بنجاح.',
  CERTIFICATE_DOWNLOADED: 'تم تحميل الشهادة بنجاح.',
  PAYMENT_SUCCESSFUL: 'تمت عملية الدفع بنجاح.'
};

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING: 'جاري التحميل...',
  SAVING: 'جاري الحفظ...',
  UPLOADING: 'جاري الرفع...',
  DOWNLOADING: 'جاري التحميل...',
  PROCESSING: 'جاري المعالجة...',
  SEARCHING: 'جاري البحث...'
};

// Validation Rules
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  BIO_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 2000
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Time Formats
export const TIME_FORMATS = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  DISPLAY_DATE: 'DD/MM/YYYY',
  DISPLAY_DATETIME: 'DD/MM/YYYY HH:mm'
};

// Currency
export const CURRENCY = {
  CODE: 'SAR',
  SYMBOL: 'ر.س',
  DECIMAL_PLACES: 2
};

// Pagination Labels
export const PAGINATION_LABELS = {
  FIRST: 'الأول',
  LAST: 'الأخير',
  NEXT: 'التالي',
  PREVIOUS: 'السابق',
  PAGE: 'صفحة',
  OF: 'من',
  SHOWING: 'عرض',
  RESULTS: 'نتيجة'
};
