// Base Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Course Types
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  courseCount: number;
  isActive: boolean;
  order: number;
}

export interface Course extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  provider: string;
  instructor: string;
  instructorId: string;
  thumbnail: string;
  previewVideo?: string;
  level: CourseLevel;
  duration: string;
  durationMinutes: number;
  language: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  hasCertificate: boolean;
  rating: number;
  reviewCount: number;
  studentCount: number;
  category: Category;
  categoryId: string;
  tags: string[];
  learningObjectives: string[];
  requirements: string[];
  whatYouLearn: string[];
  targetAudience: string[];
  status: CourseStatus;
  featured: boolean;
  badge?: string;
  lastUpdated: string;
}

export type CourseLevel = 'مبتدئ' | 'متوسط' | 'متقدم' | 'خبير';
export type CourseStatus = 'draft' | 'published' | 'archived' | 'featured';

// Filter Types
export interface FilterState {
  search: string;
  categories: string[];
  level: CourseLevel | '';
  duration: string;
  rating: number;
  price: string;
  language: string;
  hasCertificate: boolean;
  sortBy: SortOption;
}

export type SortOption = 
  | 'الأكثر شهرة' 
  | 'الأحدث' 
  | 'التقييم' 
  | 'المدة' 
  | 'السعر' 
  | 'عدد الطلاب';

// User Types
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  wishlist: string[];
  progress: Record<string, CourseProgress>;
}

export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  courseUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

export interface PrivacySettings {
  profileVisible: boolean;
  progressVisible: boolean;
  certificatesVisible: boolean;
}

// Progress Types
export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  totalLessons: number;
  completedQuizzes: string[];
  totalQuizzes: number;
  currentLesson?: string;
  timeSpent: number;
  lastAccessed: string;
  certificateEarned: boolean;
  certificateId?: string;
  overallProgress: number;
}

// Search Types
export interface SearchResult {
  courses: Course[];
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchSuggestion {
  text: string;
  type: 'course' | 'category' | 'instructor';
  count?: number;
  url: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
  external?: boolean;
}

// UI Component Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success' | 'warning' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string;
    heading: string;
    mono: string;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
