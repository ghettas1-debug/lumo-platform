'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { logger } from '@/lib/logger';
import { NotificationProvider, useNotifications, ConnectionStatus } from '@/components/ui/NotificationSystem';

// Lazy load components for better performance
const HeroSection = dynamic(() => import('@/components/features/HeroSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
});

const Stats = dynamic(() => import('@/components/features/Stats'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />
});

const QuickLinks = dynamic(() => import('@/components/features/QuickLinksUpdated'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
});

const Courses = dynamic(() => import('@/components/features/Courses'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
});

const Testimonials = dynamic(() => import('@/components/features/Testimonials'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
});

const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-16 bg-gray-100 animate-pulse rounded-xl" />
});

const TrustBadges = dynamic(() => import('@/components/features/TrustBadges'), {
  loading: () => <div className="h-20 bg-gray-100 animate-pulse" />
});

const FeaturedInstructors = dynamic(() => import('@/components/features/FeaturedInstructors'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
});

const LearningPaths = dynamic(() => import('@/components/features/LearningPaths'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
});

const SuccessStories = dynamic(() => import('@/components/features/SuccessStories'), {
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-xl" />
});

const Newsletter = dynamic(() => import('@/components/features/Newsletter'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />
});

const RightActions = dynamic(() => import('@/components/features/RightActions'), {
  loading: () => <div className="h-16 bg-gray-100 animate-pulse rounded-xl" />
});

const InteractiveCourseCards = dynamic(() => import('@/components/features/InteractiveCourseCardsNew'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
});

const AdvancedSearchComponent = dynamic(() => import('@/components/features/AdvancedSearch'), {
  loading: () => <div className="h-16 bg-gray-100 animate-pulse rounded-xl" />
});

// Mock data for InteractiveCourseCards
const mockCourses = [
  {
    id: '1',
    title: 'تطوير الويب الكامل',
    description: 'تعلم HTML, CSS, JavaScript من الصفر إلى الاحتراف',
    instructor: 'أحمد محمد',
    instructorAvatar: '/images/instructors/ahmed.jpg',
    rating: 4.8,
    students: 15420,
    duration: '40 ساعة',
    level: 'مبتدئ',
    price: 49.99,
    originalPrice: 99.99,
    image: '/images/courses/web-dev.jpg',
    category: 'تطوير الويب',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    isEnrolled: false,
    progress: 0
  },
  {
    id: '2',
    title: 'Python للمبتدئين',
    description: 'دورة شاملة لتعلم بايثون من البداية',
    instructor: 'فاطمة علي',
    instructorAvatar: '/images/instructors/fatima.jpg',
    rating: 4.9,
    students: 12340,
    duration: '30 ساعة',
    level: 'مبتدئ',
    price: 39.99,
    originalPrice: 79.99,
    image: '/images/courses/python.jpg',
    category: 'برمجة',
    tags: ['Python', 'برمجة', 'مبتدئ'],
    isEnrolled: true,
    progress: 65
  },
  {
    id: '3',
    title: 'تصميم UI/UX الاحترافي',
    description: 'تعلم تصميم واجهات المستخدم وتجربة المستخدم',
    instructor: 'محمد سعيد',
    instructorAvatar: '/images/instructors/mohammed.jpg',
    rating: 4.7,
    students: 8900,
    duration: '25 ساعة',
    level: 'متوسط',
    price: 59.99,
    image: '/images/courses/ux-design.jpg',
    category: 'التصميم',
    tags: ['UI', 'UX', 'Figma', 'Adobe XD'],
    isEnrolled: false,
    progress: 0
  }
];

function HomePageContent() {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    logger.track('page_view', { page: 'home' });
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Welcome notification
      addNotification({
        type: 'info',
        title: 'مرحباً بك في Lumo!',
        message: 'استكشف أفضل الدورات التعليمية وابدأ رحلتك المهنية.',
        duration: 5000
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">جاري التحميل...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Advanced Search */}
      <div className="container mx-auto px-6 py-4">
        <AdvancedSearchComponent 
          onSearch={(query, filters) => {
            logger.track('search', { query, filters, page: 'home' });
            addNotification({
              type: 'info',
              title: 'بحث',
              message: `جاري البحث عن: ${query}`,
              duration: 2000
            });
          }}
        />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats */}
      <Stats />

      {/* Quick Links */}
      <QuickLinks />

      {/* Interactive Course Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            دورات مميزة لك
          </h2>
          <p className="text-xl text-gray-600">
            اكتشف أفضل الدورات التعليمية من خبراء عالميين
          </p>
        </div>
        <InteractiveCourseCards courses={mockCourses} variant="default" />
      </div>

      {/* Learning Paths */}
      <LearningPaths />

      {/* Featured Instructors */}
      <FeaturedInstructors />

      {/* Success Stories */}
      <SuccessStories />

      {/* Testimonials */}
      <Testimonials />

      {/* Right Actions */}
      <div className="container mx-auto px-6 py-8">
        <RightActions />
      </div>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Connection Status */}
      <ConnectionStatus />

      {/* Floating Action Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default function HomePage() {
  return (
    <NotificationProvider>
      <HomePageContent />
    </NotificationProvider>
  );
}
