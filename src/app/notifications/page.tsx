'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Clock, Calendar, BookOpen, Award, MessageSquare, Users, Settings, Trash2, Archive, Filter, Search, ChevronDown, Info, AlertCircle, CheckCircle, Star, TrendingUp } from 'lucide-react';

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
  category: string;
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeTab, setActiveTab] = useState<'notifications' | 'reminders'>('notifications');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'study' | 'social' | 'system' | 'achievements'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    achievementAlerts: true,
    socialNotifications: true,
    weeklyReports: true,
    dailyDigest: false
  });

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Initialize with sample notifications
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          title: 'جلسة دراسة مجدولة',
          message: 'تبدأ جلسة دراسة React.js بعد 30 دقيقة',
          type: 'reminder',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read: false,
          priority: 'high',
          category: 'study',
          icon: <Clock className="w-5 h-5" />
        },
        {
          id: '2',
          title: 'إنجاز جديد! 🎉',
          message: 'لقد أكملت 5 دروس في دورة JavaScript',
          type: 'achievement',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: 'medium',
          category: 'achievements',
          icon: <Award className="w-5 h-5" />
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
          category: 'social',
          icon: <MessageSquare className="w-5 h-5" />
        },
        {
          id: '4',
          title: 'تذكير: مراجعة أسبوعية',
          message: 'حان وقت مراجعة الدروس التي تعلمتها هذا الأسبوع',
          type: 'reminder',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'medium',
          category: 'study',
          icon: <BookOpen className="w-5 h-5" />
        },
        {
          id: '5',
          title: 'تحديث النظام',
          message: 'تم إضافة ميزات جديدة إلى لوحة التحكم',
          type: 'info',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'low',
          category: 'system',
          icon: <Info className="w-5 h-5" />
        }
      ];
      setNotifications(sampleNotifications);
    }

    // Load reminders from localStorage
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Initialize with sample reminders
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
          enabled: true,
          type: 'break'
        },
        {
          id: '3',
          title: 'مراجعة المساء',
          description: 'مراجعة ما تعلمته خلال اليوم',
          time: '20:00',
          days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
          enabled: false,
          type: 'review'
        }
      ];
      setReminders(sampleReminders);
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('reminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const archiveNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: 'تذكير جديد',
      description: 'وصف التذكير',
      time: '12:00',
      days: ['السبت', 'الأحد', 'الاثنين'],
      enabled: true,
      type: 'study'
    };
    setReminders([...reminders, newReminder]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'social':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'achievement':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'social':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'الآن';
    if (diffInMins < 60) return `منذ ${diffInMins} دقيقة`;
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    return date.toLocaleDateString('ar-SA');
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || 
                       (filterType === 'unread' && !notification.read) ||
                       (filterType === 'read' && notification.read);
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <Bell className="w-6 h-6" />
                <span>الإشعارات والتذكيرات</span>
              </h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} غير مقروء
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="font-medium mb-4">إعدادات الإشعارات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">الإشعارات البريدية</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">الإشعارات الفورية</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.studyReminders}
                  onChange={(e) => setNotificationSettings({...notificationSettings, studyReminders: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">تذكيرات الدراسة</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.achievementAlerts}
                  onChange={(e) => setNotificationSettings({...notificationSettings, achievementAlerts: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">تنبيهات الإنجازات</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.socialNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, socialNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">الإشعارات الاجتماعية</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyReports}
                  onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReports: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm">التقارير الأسبوعية</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'notifications'
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            الإشعارات ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'reminders'
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            التذكيرات ({reminders.filter(r => r.enabled).length})
          </button>
        </div>

        {activeTab === 'notifications' && (
          <>
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث في الإشعارات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">الكل</option>
                  <option value="unread">غير مقروء</option>
                  <option value="read">مقروء</option>
                </select>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
                  >
                    <Check className="w-4 h-4" />
                    <span>تعيين الكل كمقروء</span>
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">لا توجد إشعارات</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all ${
                      notification.read ? 'bg-white dark:bg-gray-800' : getNotificationBgColor(notification.type)
                    } ${!notification.read ? 'border-l-4 border-l-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="flex-shrink-0">
                        {notification.icon || getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-3 space-x-reverse mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.priority === 'high' && (
                                <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                                  عالي
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse mr-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                title="تعيين كمقروء"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => archiveNotification(notification.id)}
                              className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                              title="أرشفة"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <a
                              href={notification.actionUrl}
                              className="inline-flex items-center space-x-1 space-x-reverse text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                            >
                              <span>{notification.actionText}</span>
                              <ChevronDown className="w-3 h-3 rotate-180" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'reminders' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">التذكيرات المجدولة</h2>
              <button
                onClick={addReminder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <span>إضافة تذكير</span>
                <span className="text-xl">+</span>
              </button>
            </div>

            <div className="space-y-4">
              {reminders.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">لا توجد تذكيرات مجدولة</p>
                </div>
              ) : (
                reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`p-4 rounded-lg border ${
                      reminder.enabled
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`p-2 rounded-lg ${
                          reminder.type === 'study' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          reminder.type === 'break' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          reminder.type === 'review' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                          'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        }`}>
                          {reminder.type === 'study' ? <BookOpen className="w-5 h-5" /> :
                           reminder.type === 'break' ? <Clock className="w-5 h-5" /> :
                           reminder.type === 'review' ? <TrendingUp className="w-5 h-5" /> :
                           <Calendar className="w-5 h-5" />}
                        </div>
                        
                        <div>
                          <h3 className="font-medium">{reminder.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {reminder.description}
                          </p>
                          <div className="flex items-center space-x-4 space-x-reverse mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-3 h-3" />
                              <span>{reminder.time}</span>
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {reminder.days.join(', ')}
                            </span>
                            {reminder.courseName && (
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                {reminder.courseName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => toggleReminder(reminder.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            reminder.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              reminder.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
