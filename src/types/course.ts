import { BaseEntity, SelectOption } from './common';

// Course-related types
export interface CourseLevel {
  id: string;
  name: string;
  order: number;
}

export interface CourseCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  courseCount: number;
  isActive: boolean;
  order: number;
}

export interface CourseInstructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  coursesCount: number;
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface Course extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  instructor: CourseInstructor;
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
  category: CourseCategory;
  categoryId: string;
  tags: string[];
  learningObjectives: string[];
  requirements: string[];
  whatYouLearn: string[];
  targetAudience: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  badge?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  chapters: CourseChapter[];
  enrollmentCount: number;
  completionRate: number;
  lastUpdated: string;
  isBookmarked?: boolean;
  isEnrolled?: boolean;
  progress?: number;
}

export interface CourseChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  lessons: CourseLesson[];
  isPreview?: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  videoUrl?: string;
  content?: string;
  resources: CourseResource[];
  isPreview?: boolean;
  completed?: boolean;
  progress?: number;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'image';
  url: string;
  size?: number;
  downloadable?: boolean;
}

export interface CourseReview extends BaseEntity {
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

export interface CourseEnrollment extends BaseEntity {
  courseId: string;
  userId: string;
  status: 'active' | 'completed' | 'dropped' | 'paused';
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
  completedAt?: string;
  certificateUrl?: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  overallProgress: number;
  chapterProgress: Record<string, number>;
  lessonProgress: Record<string, {
    completed: boolean;
    progress: number;
    timeSpent: number;
    lastAccessed: string;
  }>;
  timeSpent: number;
  lastAccessed: string;
}

export interface CourseCertificate extends BaseEntity {
  courseId: string;
  userId: string;
  certificateUrl: string;
  issuedAt: string;
  verifiedAt?: string;
  verificationCode: string;
  metadata: {
    courseName: string;
    studentName: string;
    instructorName: string;
    completionDate: string;
    totalHours: number;
  };
}

export interface CourseFilterOptions {
  categories: SelectOption[];
  levels: SelectOption[];
  prices: SelectOption[];
  durations: SelectOption[];
  languages: SelectOption[];
  ratings: number[];
  hasCertificate: boolean;
  sortBy: 'popularity' | 'rating' | 'newest' | 'price_low' | 'price_high' | 'duration';
  sortOrder: 'asc' | 'desc';
}

export interface CourseSearchParams {
  query?: string;
  category?: string;
  level?: string;
  price?: string;
  duration?: string;
  rating?: number;
  language?: string;
  hasCertificate?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CourseSearchResult {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: CourseFilterOptions;
  suggestions?: string[];
}

// Course player types
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  quality: string;
  isFullscreen: boolean;
  buffered: number;
}

export interface VideoAnalytics {
  videoId: string;
  watchTime: number;
  pauseCount: number;
  seekCount: number;
  qualityChanges: number;
  completionRate: number;
  dropOffPoints: number[];
}

// Course creation types
export interface CreateCourseData {
  title: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  levelId: string;
  language: string;
  price: number;
  isFree: boolean;
  hasCertificate: boolean;
  tags: string[];
  learningObjectives: string[];
  requirements: string[];
  whatYouLearn: string[];
  targetAudience: string[];
  thumbnail: File;
  previewVideo?: File;
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  id: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
}
