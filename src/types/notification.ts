import { BaseEntity } from './common';

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'reminder' | 'achievement' | 'social' | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface NotificationAction {
  id: string;
  label: string;
  action: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: string;
}

export interface Notification extends BaseEntity {
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  read: boolean;
  archived: boolean;
  actions?: NotificationAction[];
  actionUrl?: string;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
  expiresAt?: string;
  scheduledFor?: string;
  userId?: string;
  category: 'study' | 'achievement' | 'social' | 'system' | 'reminder';
}

export interface NotificationSettings {
  enabled: boolean;
  categories: {
    study: boolean;
    achievement: boolean;
    social: boolean;
    system: boolean;
    reminder: boolean;
  };
  priorities: {
    low: boolean;
    medium: boolean;
    high: boolean;
    urgent: boolean;
  };
  delivery: {
    inApp: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface Reminder extends BaseEntity {
  title: string;
  description: string;
  dueDate: string;
  isActive: boolean;
  isCompleted: boolean;
  type: 'study' | 'assignment' | 'exam' | 'meeting' | 'custom';
  priority: NotificationPriority;
  recurring?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  notifications: {
    enabled: boolean;
    timing: number; // minutes before due date
    methods: ('inApp' | 'email' | 'push')[];
  };
  courseId?: string;
  lessonId?: string;
  userId: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  category: string;
  title: string;
  message: string;
  variables: TemplateVariable[];
  actions?: NotificationAction[];
  metadata?: Record<string, unknown>;
  isActive: boolean;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  defaultValue?: unknown;
  description: string;
}

export interface NotificationStats {
  total: number;
  read: number;
  unread: number;
  archived: number;
  byType: Record<NotificationType, number>;
  byCategory: Record<string, number>;
  byPriority: Record<NotificationPriority, number>;
  recent: Notification[];
}

// Notification preferences
export interface NotificationPreferences {
  userId: string;
  settings: NotificationSettings;
  customRules: NotificationRule[];
}

export interface NotificationRule {
  id: string;
  name: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: number;
}

export interface RuleCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: unknown;
}

export interface RuleAction {
  type: 'send' | 'suppress' | 'modify' | 'delay';
  parameters: Record<string, unknown>;
}

// Push notification types
export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  silent?: boolean;
}

export interface PushNotificationSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  userId: string;
  isActive: boolean;
  createdAt: string;
}

// Email notification types
export interface EmailNotification {
  id: string;
  to: string;
  subject: string;
  template: string;
  variables: Record<string, unknown>;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  error?: string;
}

// SMS notification types
export interface SMSNotification {
  id: string;
  to: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  error?: string;
}

// Notification delivery tracking
export interface NotificationDelivery {
  id: string;
  notificationId: string;
  userId: string;
  method: 'inApp' | 'email' | 'push' | 'sms';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

// Notification analytics
export interface NotificationAnalytics {
  id: string;
  notificationId: string;
  userId: string;
  event: 'sent' | 'delivered' | 'read' | 'clicked' | 'dismissed' | 'failed';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Notification batch operations
export interface NotificationBatch {
  id: string;
  name: string;
  type: NotificationType;
  recipients: string[];
  template: string;
  variables: Record<string, unknown>[];
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  createdAt: string;
  sentAt?: string;
  stats?: {
    total: number;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
  };
}
