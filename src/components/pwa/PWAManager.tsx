// PWA Offline Support Component
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  Cloud, 
  CloudOff,
  RefreshCw,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  HardDrive,
  Shield,
  Zap,
  Globe,
  FileText,
  Video,
  Image,
  Music,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff
} from 'lucide-react';

interface OfflineContent {
  id: string;
  title: string;
  type: 'course' | 'video' | 'document' | 'quiz';
  size: number;
  downloadedAt: Date;
  lastAccessed: Date;
  isAvailable: boolean;
  url: string;
}

interface SyncData {
  id: string;
  type: 'progress' | 'notes' | 'quiz_result' | 'bookmark';
  data: any;
  timestamp: Date;
  synced: boolean;
  retryCount: number;
}

export function PWAManager() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineContents, setOfflineContents] = useState<OfflineContent[]>([]);
  const [syncQueue, setSyncQueue] = useState<SyncData[]>([]);
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 0,
    percentage: 0
  });
  const [isInstalling, setIsInstalling] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoDownload, setAutoDownload] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Load offline contents
  useEffect(() => {
    const loadOfflineContents = async () => {
      try {
        const cached = await caches.open('lumo-offline-v1');
        const keys = await cached.keys();
        
        const contents: OfflineContent[] = keys.map((request, index) => ({
          id: request.url,
          title: request.url.split('/').pop() || 'Unknown',
          type: getFileType(request.url),
          size: Math.random() * 10000000, // Mock size
          downloadedAt: new Date(Date.now() - Math.random() * 86400000),
          lastAccessed: new Date(Date.now() - Math.random() * 3600000),
          isAvailable: true,
          url: request.url
        }));

        setOfflineContents(contents);
      } catch (error) {
        console.error('Error loading offline contents:', error);
      }
    };

    loadOfflineContents();
  }, []);

  // Storage info
  useEffect(() => {
    const updateStorageInfo = async () => {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        try {
          const estimate = await navigator.storage.estimate();
          const used = estimate.usage || 0;
          const total = estimate.quota || 0;
          
          setStorageInfo({
            used,
            total,
            percentage: total > 0 ? (used / total) * 100 : 0
          });
        } catch (error) {
          console.error('Error getting storage info:', error);
        }
      }
    };

    updateStorageInfo();
    const interval = setInterval(updateStorageInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const getFileType = (url: string): 'course' | 'video' | 'document' | 'quiz' => {
    if (url.includes('/courses/')) return 'course';
    if (url.includes('/videos/')) return 'video';
    if (url.includes('/documents/')) return 'document';
    if (url.includes('/quizzes/')) return 'quiz';
    return 'document';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'course': return <FileText size={16} className="text-blue-500" />;
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'document': return <FileText size={16} className="text-green-500" />;
      case 'quiz': return <FileText size={16} className="text-purple-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleInstall = async () => {
    if (!installPrompt) return;

    setIsInstalling(true);
    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleSync = async () => {
    if (!isOnline) return;

    setSyncQueue(prev => prev.map(item => ({ ...item, synced: true })));
    
    // Simulate sync process
    setTimeout(() => {
      setSyncQueue([]);
    }, 2000);
  };

  const handleClearCache = async () => {
    try {
      const caches = await window.caches.keys();
      await Promise.all(caches.map(cache => window.caches.delete(cache)));
      setOfflineContents([]);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  };

  const getDeviceIcon = () => {
    const type = getDeviceType();
    switch (type) {
      case 'mobile': return <Smartphone size={16} />;
      case 'tablet': return <Tablet size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isOnline ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isOnline ? (
                  <Wifi className="text-green-600" size={24} />
                ) : (
                  <WifiOff className="text-red-600" size={24} />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إعدادات PWA</h1>
                <p className="text-gray-600">
                  {isOnline ? 'متصل بالإنترنت' : 'وضع عدم الاتصال'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {installPrompt && (
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download size={18} />
                  {isInstalling ? 'جاري التثبيت...' : 'تثبيت التطبيق'}
                </button>
              )}
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Database size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">التخزين</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatFileSize(storageInfo.used)}
              </div>
              <div className="text-xs text-gray-500">
                من {formatFileSize(storageInfo.total)}
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Download size={20} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">المحتوى المحمل</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {offlineContents.length}
              </div>
              <div className="text-xs text-gray-500">ملف/فيديو</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw size={20} className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">قائمة المزامنة</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {syncQueue.length}
              </div>
              <div className="text-xs text-gray-500">بانتظار المزامنة</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                {getDeviceIcon()}
                <span className="text-sm font-medium text-gray-700">نوع الجهاز</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 capitalize">
                {getDeviceType()}
              </div>
              <div className="text-xs text-gray-500">متوافق مع PWA</div>
            </div>
          </div>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">إعدادات متقدمة</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">التحميل التلقائي</p>
                      <p className="text-sm text-gray-600">تحميل المحتوى تلقائياً عند الاتصال</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoDownload(!autoDownload)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      autoDownload ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      autoDownload ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wifi size={20} className="text-green-600" />
                    <div>
                      <p className="font-medium">Wi-Fi فقط</p>
                      <p className="text-sm text-gray-600">التحميل عبر Wi-Fi فقط لتوفير البيانات</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setWifiOnly(!wifiOnly)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      wifiOnly ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      wifiOnly ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-purple-600" />
                    <div>
                      <p className="font-medium">الإشعارات</p>
                      <p className="text-sm text-gray-600">تلقي إشعارات عند التحديثات</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <RefreshCw size={20} className="text-orange-600" />
                    <div>
                      <p className="font-medium">المزامنة الخلفية</p>
                      <p className="text-sm text-gray-600">مزامنة البيانات تلقائياً</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBackgroundSync(!backgroundSync)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      backgroundSync ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      backgroundSync ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offline Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HardDrive className="text-blue-600" size={24} />
              المحتوى المتاح بدون اتصال
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCache}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                مسح التخزين المؤقت
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offlineContents.map((content) => (
              <div
                key={content.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(content.type)}
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">{content.type}</p>
                    </div>
                  </div>
                  {content.isAvailable ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <AlertCircle size={16} className="text-red-600" />
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} />
                    <span>{formatFileSize(content.size)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download size={14} />
                    <span>تم التحميل {content.downloadedAt.toLocaleDateString('ar')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    <span>آخر وصول {content.lastAccessed.toLocaleDateString('ar')}</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    فتح
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sync Queue */}
        {syncQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <RefreshCw className="text-orange-600" size={24} />
                قائمة المزامنة
              </h2>
              <button
                onClick={handleSync}
                disabled={!isOnline}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                مزامنة الآن
              </button>
            </div>

            <div className="space-y-3">
              {syncQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.synced ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium capitalize">{item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.timestamp.toLocaleString('ar')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.synced ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <AlertCircle size={16} className="text-orange-600" />
                    )}
                    <span className="text-sm text-gray-600">
                      {item.retryCount} محاولات
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Offline Banner Component
export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-50 p-4 ${
            isOnline ? 'bg-green-600' : 'bg-red-600'
          } text-white`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi size={20} />
              ) : (
                <WifiOff size={20} />
              )}
              <span className="font-medium">
                {isOnline ? 'تم استعادة الاتصال بالإنترنت' : 'أنت الآن في وضع عدم الاتصال'}
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/20 rounded"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Service Worker Registration Hook
export function useServiceWorker() {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          setSwRegistration(registration);
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    } else {
      setIsSupported(false);
    }
  }, []);

  const updateSW = async () => {
    if (!swRegistration) return;

    try {
      await swRegistration.update();
      console.log('Service Worker updated');
    } catch (error) {
      console.error('Service Worker update failed:', error);
    }
  };

  return { swRegistration, isSupported, updateSW };
}
