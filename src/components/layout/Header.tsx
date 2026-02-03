'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  BookOpen,
  Heart,
  Award,
  Globe,
  HelpCircle,
  Moon,
  Sun,
  Briefcase, 
  TrendingUp, 
  Languages, 
  Users, 
  ShoppingCart, 
  PlayCircle,
  Building,
  GraduationCap,
  Code,
  Palette,
  Shield,
  FileText,
  Brain,
  Download,
  LogIn,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import EnhancedLogo from '@/components/brand/EnhancedLogo';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import AdvancedSearch from '@/components/ui/AdvancedSearch';
import { logger } from '@/lib/logger';
import { useNotifications } from '@/components/ui/NotificationSystem';

interface HeaderProps {
  isMenuOpen?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
}

export default function Header({ isMenuOpen = false, setIsMenuOpen = () => {} }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMyLearningOpen, setIsMyLearningOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { notifications, unreadCount } = useNotifications();
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const myLearningRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Categories for dropdown
  const categories = [
    { id: 'it', name: 'تكنولوجيا المعلومات', slug: 'it', icon: Code, courses: 1292, color: 'blue' },
    { id: 'health', name: 'الصحة', slug: 'health', icon: Heart, courses: 1102, color: 'red' },
    { id: 'language', name: 'اللغات', slug: 'language', icon: Languages, courses: 316, color: 'green' },
    { id: 'business', name: 'الأعمال', slug: 'business', icon: Briefcase, courses: 1777, color: 'purple' },
    { id: 'management', name: 'الإدارة', slug: 'management', icon: Users, courses: 1098, color: 'indigo' },
    { id: 'personal', name: 'التطوير الشخصي', slug: 'personal-development', icon: TrendingUp, courses: 1350, color: 'yellow' }
  ];

  // Solutions for dropdown
  const solutions = [
    { id: 'enterprise', name: 'للشركات', description: 'حلول للمؤسسات', icon: Building, href: '/enterprise' },
    { id: 'universities', name: 'للجامعات', description: 'حلول أكاديمية', icon: GraduationCap, href: '/universities' },
    { id: 'corporate', name: 'تدريب الشركات', description: 'برامج مخصصة', icon: Users, href: '/corporate-training' },
    { id: 'developers', name: 'للمطورين', description: 'API وأدوات', icon: Code, href: '/developers' }
  ];

  // Resources for dropdown
  const resources = [
    { id: 'features', name: 'المميزات', description: 'AI والتعلم التكيفي', icon: Brain, href: '/resources' },
    { id: 'api', name: 'وثائق API', description: 'للمطورين', icon: FileText, href: '/api-docs' },
    { id: 'downloads', name: 'التنزيلات', description: 'تطبيقات وأدوات', icon: Download, href: '/downloads' }
  ];

  // My Learning items
  const myLearningItems = [
    { id: 'diplomas', name: 'دبلومات', description: 'برامج متقدمة', icon: GraduationCap, href: '/diplomas' },
    { id: 'paths', name: 'مسارات التعلم', description: 'مسارات مهنية', icon: TrendingUp, href: '/career-paths' },
    { id: 'enterprise', name: 'للمؤسسات', description: 'حلول للشركات', icon: Building, href: '/enterprise' },
    { id: 'about', name: 'من نحن', description: 'تعرف علينا', icon: Users, href: '/about' },
    { id: 'contact', name: 'اتصل بنا', description: 'تواصل معنا', icon: HelpCircle, href: '/contact' }
  ];

  const handleSearch = useCallback((query: string) => {
    logger.track('search_performed', { query, source: 'header' });
  }, []);

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsDropdownOpen(false);
    setIsMyLearningOpen(false);
    setIsSolutionsOpen(false);
    setIsResourcesOpen(false);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (myLearningRef.current && !myLearningRef.current.contains(event.target as Node)) {
        setIsMyLearningOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm animate-slide-in-down">
      <div className="container mx-auto px-2 h-12 md:h-16 flex items-center justify-between">
        
        {/* Enhanced Logo */}
        <EnhancedLogo size="md" variant="default" />

        {/* Desktop Navigation - Compact */}
        <nav className="hidden md:flex items-center gap-1">
          {/* الرئيسية */}
          <Link 
            href="/" 
            className="px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
          >
            الرئيسية
          </Link>

          {/* الدورات Dropdown - Smaller */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              الدورات
              <ChevronDown size={12} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
                <div className="grid grid-cols-1 gap-1 px-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Link
                        key={category.id}
                        href={`/courses/${category.slug}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 bg-${category.color}-100 rounded flex items-center justify-center`}>
                            <IconComponent width={12} height={12} className={`text-${category.color}-600`} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-xs">{category.name}</div>
                            <div className="text-xs text-gray-400">{category.courses} دورة</div>
                          </div>
                        </div>
                        <ChevronRight size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 px-3">
                  <Link href="/courses" className="flex items-center justify-between text-blue-600 hover:text-blue-700 font-medium text-xs">
                    <span>عرض جميع الدورات</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* المسارات */}
          <Link 
            href="/learning-paths" 
            className="px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
          >
            المسارات
          </Link>

          {/* المدربون */}
          <Link 
            href="/instructors" 
            className="px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
          >
            المدربون
          </Link>

          {/* للشركات - Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
            >
              للشركات
              <ChevronDown size={12} className={`transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSolutionsOpen && (
              <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
                <div className="space-y-1 px-3">
                  {solutions.map((solution) => {
                    const IconComponent = solution.icon;
                    return (
                      <Link
                        key={solution.id}
                        href={solution.href}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded flex items-center justify-center`}>
                          <IconComponent width={12} height={12} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-xs">{solution.name}</div>
                          <div className="text-xs text-gray-400">{solution.description}</div>
                        </div>
                        <ChevronRight size={12} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* الأسعار */}
          <Link 
            href="/pricing" 
            className="px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
          >
            الأسعار
          </Link>

          {/* المدونة */}
          <Link 
            href="/blog" 
            className="px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
          >
            المدونة
          </Link>

          {/* الموارد - Dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors text-xs"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              الموارد
              <ChevronDown size={12} className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isResourcesOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
                <div className="space-y-1 px-3">
                  {resources.map((resource) => {
                    const IconComponent = resource.icon;
                    return (
                      <Link
                        key={resource.id}
                        href={resource.href}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`w-6 h-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded flex items-center justify-center`}>
                          <IconComponent width={12} height={12} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-xs">{resource.name}</div>
                          <div className="text-xs text-gray-400">{resource.description}</div>
                        </div>
                        <ChevronRight size={12} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Search Bar - Desktop - Smaller */}
        <div className="hidden md:flex flex-1 max-w-lg mx-6">
          <AdvancedSearch onSearch={handleSearch} />
        </div>

        {/* Right Section - Compact */}
        <div className="flex items-center gap-2">
          {/* Search - Mobile */}
          <div className="md:hidden">
            <Search className="w-4 h-4 text-gray-600" />
          </div>

          {/* Language Selector - Smaller */}
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          {/* Theme Toggle - Smaller */}
          <ThemeToggle />

          {/* Shopping Cart - Smaller */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Mobile Menu Toggle - Smaller */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Smaller */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="container mx-auto px-2 py-3 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              الرئيسية
            </Link>
            <Link href="/courses" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              الدورات
            </Link>
            <Link href="/learning-paths" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              المسارات التعليمية
            </Link>
            <Link href="/instructors" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              المدربون
            </Link>
            <Link href="/solutions" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              للشركات
            </Link>
            <Link href="/pricing" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              الأسعار
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              المدونة
            </Link>
            <Link href="/resources" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
              الموارد
            </Link>
            <div className="border-t border-gray-200 pt-2">
              <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600 font-medium text-sm">
                تسجيل الدخول
              </Link>
              <Link href="/signup" className="block py-2 text-blue-600 font-medium text-sm">
                ابدأ مجاناً
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
