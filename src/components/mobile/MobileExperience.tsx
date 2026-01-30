// Mobile Experience Component
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Tablet, 
  Monitor,
  FlipHorizontal,
  Pin,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  BookOpen,
  User,
  Settings
} from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Detect device type and orientation
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Handle swipe gestures
  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next tab
          const tabs = ['home', 'courses', 'profile', 'settings'];
          const currentIndex = tabs.indexOf(activeTab);
          if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
          }
        } else {
          // Swipe right - previous tab
          const tabs = ['home', 'courses', 'profile', 'settings'];
          const currentIndex = tabs.indexOf(activeTab);
          if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, activeTab]);

  // Bottom navigation for mobile
  const MobileBottomNav = () => (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden"
    >
      <div className="flex items-center justify-around py-2">
        {[
          { id: 'home', icon: Home, label: 'الرئيسية' },
          { id: 'courses', icon: BookOpen, label: 'الدورات' },
          { id: 'profile', icon: User, label: 'الملف' },
          { id: 'settings', icon: Settings, label: 'الإعدادات' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Hamburger menu for tablet
  const TabletMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 lg:hidden"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">القائمة</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'home', icon: Home, label: 'الرئيسية' },
                { id: 'courses', icon: BookOpen, label: 'الدورات' },
                { id: 'profile', icon: User, label: 'الملف الشخصي' },
                { id: 'settings', icon: Settings, label: 'الإعدادات' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Device indicator
  const DeviceIndicator = () => (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
      {isMobile ? (
        <Smartphone size={16} className="text-green-600" />
      ) : isTablet ? (
        <Tablet size={16} className="text-blue-600" />
      ) : (
        <Monitor size={16} className="text-gray-600" />
      )}
      <span className="text-xs font-medium">
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
      </span>
      <span className="text-xs text-gray-500">
        {orientation === 'portrait' ? '📱' : '📱'}
      </span>
    </div>
  );

  // Gesture hints
  const GestureHints = () => {
    if (!isMobile) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-20 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-40"
      >
        <div className="flex items-center justify-center gap-4 text-xs text-blue-700">
          <div className="flex items-center gap-1">
            <FlipHorizontal size={14} />
            <span>اسحب للتنقل</span>
          </div>
          <div className="flex items-center gap-1">
            <Pin size={14} />
            <span>قرص للتكبير</span>
          </div>
          <div className="flex items-center gap-1">
            <RotateCw size={14} />
            <span>دور للعرض</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-16' : ''}`}>
      {/* Device Indicator */}
      <DeviceIndicator />

      {/* Tablet Menu Button */}
      {isTablet && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 right-4 z-40 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Tablet Menu */}
      <TabletMenu />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isTablet && isMenuOpen ? 'ml-64' : ''}`}>
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Gesture Hints */}
      <GestureHints />

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

// Mobile-specific components
export function MobileCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      {children}
    </div>
  );
}

export function MobileButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}) {
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 active:scale-95';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Hook for mobile detection
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
}
