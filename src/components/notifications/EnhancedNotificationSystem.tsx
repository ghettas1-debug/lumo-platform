'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Bell, X, Check, Clock, Calendar, BookOpen, Award, MessageSquare, Users, 
  Settings, Trash2, Archive, Filter, Search, ChevronDown, Info, AlertCircle, 
  CheckCircle, Star, TrendingUp, RotateCcw, Plus, ToggleLeft, ToggleRight 
} from 'lucide-react';

// Types
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder' | 'achievement' | 'social';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'study' | 'social' | 'system' | 'achievements';
  icon?: React.ReactNode;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  enabled: boolean;
  type: 'study' | 'break' | 'review' | 'deadline';
  courseId?: string;
  courseName?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
  achievementAlerts: boolean;
  socialNotifications: boolean;
  weeklyReports: boolean;
  dailyDigest: boolean;
}

// Utility Functions
const normalizeArabicText = (text: string): string => {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ة]/g, 'ه')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي');
};

const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'الآن';
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  
  return time.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getNotificationColor = (type: Notification['type'], read: boolean) => {
  const baseColors = {
    info: read ? 'bg-blue-50 border-blue-100' : 'bg-blue-100 border-blue-200',
    success: read ? 'bg-green-50 border-green-100' : 'bg-green-100 border-green-200',
    warning: read ? 'bg-yellow-50 border-yellow-100' : 'bg-yellow-100 border-yellow-200',
    error: read ? 'bg-red-50 border-red-100' : 'bg-red-100 border-red-200',
    reminder: read ? 'bg-purple-50 border-purple-100' : 'bg-purple-100 border-purple-200',
    achievement: read ? 'bg-amber-50 border-amber-100' : 'bg-amber-100 border-amber-200',
    social: read ? 'bg-indigo-50 border-indigo-100' : 'bg-indigo-100 border-indigo-200'
  };
  
  return baseColors[type] || baseColors.info;
};

const getNotificationIcon = (type: Notification['type']) => {
  const icons = {
    info: <Info className="w-5 h-5 text-blue-600" />,
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    reminder: <Clock className="w-5 h-5 text-purple-600" />,
    achievement: <Award className="w-5 h-5 text-amber-600" />,
    social: <MessageSquare className="w-5 h-5 text-indigo-600" />
  };
  
  return icons[type] || icons.info;
};

import AddReminderModal from './AddReminderModal';

// Main Component
export default function EnhancedNotificationSystem() {
  // State
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [archivedNotifications, setArchivedNotifications] = useState<Notification[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeTab, setActiveTab] = useState<'notifications' | 'reminders' | 'archived'>('notifications');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'study' | 'social' | 'system' | 'achievements'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    achievementAlerts: true,
    socialNotifications: true,
    weeklyReports: true,
    dailyDigest: false
  });

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize data
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    const savedArchived = localStorage.getItem('archivedNotifications');
    const savedReminders = localStorage.getItem('reminders');
    const savedSettings = localStorage.getItem('notificationSettings');

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Sample notifications
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          title: 'جلسة دراسة مجدولة',
          message: 'تبدأ جلسة دراسة React.js بعد 30 دقيقة',
          type: 'reminder',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read: false,
          priority: 'high',
          category: 'study'
        },
        {
          id: '2',
          title: 'إنجاز جديد! 🎉',
          message: 'لقد أكملت 5 دروس في دورة JavaScript',
          type: 'achievement',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: 'medium',
          category: 'achievements'
        },
        {
          id: '3',
          title: 'رد جديد على سؤالك',
          message: 'أجاب أحمد محمد على سؤالك في منتدى البرمجة',
          type: 'social',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: true,
          actionUrl: '/forums/question/123',
          actionText: 'عرض الرد',
          priority: 'low',
          category: 'social'
        }
      ];
      setNotifications(sampleNotifications);
    }

    if (savedArchived) {
      setArchivedNotifications(JSON.parse(savedArchived));
    }

    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Sample reminders
      const sampleReminders: Reminder[] = [
        {
          id: '1',
          title: 'جلسة دراسة صباحية',
          description: 'وقت الدراسة المخصص لدورة React.js',
          time: '09:00',
          days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
          enabled: true,
          type: 'study',
          courseId: 'react-course',
          courseName: 'React.js الشامل'
        },
        {
          id: '2',
          title: 'استراحة قصيرة',
          description: 'خذ استراحة 5 دقائق كل 25 دقيقة دراسة',
          time: 'كل 25 دقيقة',
          days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
          enabled: false,
          type: 'break'
        }
      ];
      setReminders(sampleReminders);
    }

    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('archivedNotifications', JSON.stringify(archivedNotifications));
  }, [archivedNotifications]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Filter and search notifications
  const filteredNotifications = useCallback(() => {
    let filtered = notifications;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(n => 
        filterType === 'unread' ? !n.read : n.read
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(n => n.category === filterCategory);
    }

    // Apply search
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeArabicText(searchQuery.toLowerCase());
      filtered = filtered.filter(n => 
        normalizeArabicText(n.title.toLowerCase()).includes(normalizedQuery) ||
        normalizeArabicText(n.message.toLowerCase()).includes(normalizedQuery)
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [notifications, filterType, filterCategory, searchQuery]);

  // Get unread count
  const getUnreadCount = useCallback(() => {
    return filteredNotifications().filter(n => !n.read).length;
  }, [filteredNotifications]);

  // Actions
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const archiveNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setArchivedNotifications(prev => [notification, ...prev]);
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const restoreNotification = (id: string) => {
    const notification = archivedNotifications.find(n => n.id === id);
    if (notification) {
      setNotifications(prev => [notification, ...prev]);
      setArchivedNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const deleteNotification = (id: string, isArchived = false) => {
    if (confirm('هل أنت متأكد من حذف هذا الإشعار نهائياً؟')) {
      if (isArchived) {
        setArchivedNotifications(prev => prev.filter(n => n.id !== id));
      } else {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString()
    };
    setReminders(prev => [newReminder, ...prev]);
    setShowAddReminder(false);
  };

  const updateNotificationSettings = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  // Render
  const currentNotifications = activeTab === 'archived' ? archivedNotifications : filteredNotifications();
  const unreadCount = getUnreadCount();

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="sr-only">
          <span>Home</span>
          <span>Notifications</span>
        </nav>
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الإشعارات والتذكيرات</h1>
                <p className="text-gray-600">
                  {activeTab === 'notifications' && `${unreadCount} غير مقروء من ${currentNotifications.length} إشعار`}
                  {activeTab === 'reminders' && `${reminders.filter(r => r.enabled).length} تذكير مفعل من ${reminders.length}`}
                  {activeTab === 'archived' && `${archivedNotifications.length} إشعار مؤرشف`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b">
            {[
              { id: 'notifications', label: 'الإشعارات', count: unreadCount },
              { id: 'reminders', label: 'التذكيرات', count: reminders.filter(r => r.enabled).length },
              { id: 'archived', label: 'الأرشيف', count: archivedNotifications.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.count > 9 ? '9+' : tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div data-testid="notification-settings" className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">إعدادات الإشعارات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                emailNotifications: 'Email Notifications',
                pushNotifications: 'Push Notifications',
                studyReminders: 'تذكيرات الدراسة',
                achievementAlerts: 'تنبيهات الإنجازات',
                socialNotifications: 'الإشعارات الاجتماعية',
                weeklyReports: 'التقارير الأسبوعية',
                dailyDigest: 'ملخص يومي'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="font-medium">{label}</span>
                  <button
                    onClick={() => updateNotificationSettings(key as keyof NotificationSettings, !notificationSettings[key as keyof NotificationSettings])}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {notificationSettings[key as keyof NotificationSettings] ? (
                      <ToggleRight className="w-6 h-6" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="البحث في الإشعارات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">الكل</option>
                  <option value="unread">غير مقروء</option>
                  <option value="read">مقروء</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">كل الفئات</option>
                  <option value="study">الدراسة</option>
                  <option value="social">اجتماعي</option>
                  <option value="system">النظام</option>
                  <option value="achievements">الإنجازات</option>
                </select>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    تعيين الكل كمقروء
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reminders Header */}
        {activeTab === 'reminders' && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">التذكيرات</h2>
              <button
                onClick={() => setShowAddReminder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                إضافة تذكير
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'notifications' && currentNotifications.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد إشعارات</h3>
              <p className="text-gray-600">
                {searchQuery ? 'لم يتم العثور على إشعارات تطابق بحثك' : 'ستظهر الإشعارات الجديدة هنا'}
              </p>
            </div>
          )}

          {activeTab === 'reminders' && reminders.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد تذكيرات</h3>
              <p className="text-gray-600">أضف تذكيرات جديدة لتنظيم وقتك</p>
            </div>
          )}

          {activeTab === 'archived' && archivedNotifications.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Archive className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">الأرشيف فارغ</h3>
              <p className="text-gray-600">الإشعارات المؤرشفة ستظهر هنا</p>
            </div>
          )}

          {/* Notifications List */}
          {(activeTab === 'notifications' || activeTab === 'archived') && currentNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm p-4 border-2 transition-all hover:shadow-md ${
                getNotificationColor(notification.type, notification.read)
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {notification.icon || getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <p className={`${!notification.read ? 'text-gray-800' : 'text-gray-600'} mt-1`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{formatRelativeTime(notification.timestamp)}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {notification.category === 'study' && 'الدراسة'}
                          {notification.category === 'social' && 'اجتماعي'}
                          {notification.category === 'system' && 'النظام'}
                          {notification.category === 'achievements' && 'الإنجازات'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mr-4">
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {notification.actionText || 'عرض'}
                        </a>
                      )}
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="تعيين كمقروء"
                        >
                          <Check className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      
                      {activeTab === 'notifications' && (
                        <button
                          onClick={() => archiveNotification(notification.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="أرشفة"
                        >
                          <Archive className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      
                      {activeTab === 'archived' && (
                        <button
                          onClick={() => restoreNotification(notification.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="استعادة"
                        >
                          <RotateCcw className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id, activeTab === 'archived')}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Reminders List */}
          {activeTab === 'reminders' && reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`bg-white rounded-lg shadow-sm p-4 border-2 transition-all ${
                reminder.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${reminder.enabled ? 'bg-green-100' : 'bg-gray-200'}`}>
                    <Clock className={`w-5 h-5 ${reminder.enabled ? 'text-green-600' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${reminder.enabled ? 'text-gray-900' : 'text-gray-600'}`}>
                      {reminder.title}
                    </h3>
                    <p className={`${reminder.enabled ? 'text-gray-700' : 'text-gray-500'} text-sm mt-1`}>
                      {reminder.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{reminder.time}</span>
                      <span>{reminder.days.join(', ')}</span>
                      {reminder.courseName && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {reminder.courseName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      reminder.enabled 
                        ? 'bg-green-100 hover:bg-green-200 text-green-600' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-500'
                    }`}
                  >
                    {reminder.enabled ? (
                      <ToggleRight className="w-6 h-6" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => deleteNotification(reminder.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Reminder Modal */}
        <AddReminderModal
          isOpen={showAddReminder}
          onClose={() => setShowAddReminder(false)}
          onAdd={addReminder}
        />
      </div>
    </div>
  );
}
