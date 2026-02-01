'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, LogIn, ChevronDown, BookOpen, Briefcase, Heart, Languages, TrendingUp, Users, Bell, ShoppingCart, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import AdvancedSearch from '@/components/ui/AdvancedSearch';
import { logger } from '@/lib/logger';
import { Category } from '@/types';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMyLearningOpen, setIsMyLearningOpen] = useState(false);

  const categories: Category[] = [
    { id: 'it', name: 'تكنولوجيا المعلومات', slug: 'it', description: 'دورات في البرمجة والشبكات', icon: 'book-open', color: 'blue', courseCount: 1292, isActive: true, order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'health', name: 'الصحة', slug: 'health', description: 'دورات في الطب والصحة', icon: 'heart', color: 'red', courseCount: 1102, isActive: true, order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'language', name: 'اللغات', slug: 'language', description: 'دورات في تعلم اللغات', icon: 'languages', color: 'green', courseCount: 316, isActive: true, order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'business', name: 'الأعمال', slug: 'business', description: 'دورات في الأعمال والإدارة', icon: 'briefcase', color: 'purple', courseCount: 1777, isActive: true, order: 4, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'management', name: 'الإدارة', slug: 'management', description: 'دورات في الإدارة والقيادة', icon: 'users', color: 'indigo', courseCount: 1098, isActive: true, order: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'personal-development', name: 'التطوير الشخصي', slug: 'personal-development', description: 'دورات في التطوير الذاتي', icon: 'trending-up', color: 'yellow', courseCount: 1350, isActive: true, order: 6, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  const handleSearch = useCallback((query: string) => {
    logger.track('search_performed', { query, source: 'header' });
    // TODO: Implement actual search logic
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter italic transition-transform group-hover:scale-105">
            LUMO
          </span>
        </Link>

        {/* Advanced Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <AdvancedSearch 
            onSearch={handleSearch}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              الفئات
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="grid grid-cols-1 gap-2 px-4">
                  {categories.map((category) => {
                    const IconComponent = category.icon === 'book-open' ? BookOpen : 
                                          category.icon === 'heart' ? Heart :
                                          category.icon === 'languages' ? Languages :
                                          category.icon === 'briefcase' ? Briefcase :
                                          category.icon === 'users' ? Users :
                                          TrendingUp;
                    return (
                      <Link
                        key={category.id}
                        href={`/courses/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent width={20} height={20} className="text-blue-600" />
                          <span className="font-medium text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{category.courseCount} دورة</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 px-4">
                  <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    عرض جميع الفئات →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* My Learning Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onMouseEnter={() => setIsMyLearningOpen(true)}
              onMouseLeave={() => setIsMyLearningOpen(false)}
            >
              تعلمي
              <ChevronDown size={16} className={`transition-transform ${isMyLearningOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isMyLearningOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4"
                onMouseEnter={() => setIsMyLearningOpen(true)}
                onMouseLeave={() => setIsMyLearningOpen(false)}
              >
                <div className="grid grid-cols-1 gap-2 px-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <PlayCircle size={20} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-700">لوحة التحكم</div>
                      <div className="text-sm text-gray-500">تقدمك وإحصائياتك</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="/my-courses"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen size={20} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-700">دوراتي</div>
                      <div className="text-sm text-gray-500">12 دورة مسجلة</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="/certificates"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users size={20} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-700">شهاداتي</div>
                      <div className="text-sm text-gray-500">6 شهادات مكتملة</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={20} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-700">قائمة الرغبات</div>
                      <div className="text-sm text-gray-500">8 دورات محفوظة</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            href="/diplomas" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            دبلومات
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            من نحن
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          
          <ThemeToggle />
          <LanguageSelector />
          <Link href="/login">
            <Button variant="outline" size="sm">
              <LogIn size={16} className="ml-2" />
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">
              ابدأ مجاناً
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-6 shadow-xl">
          <div className="space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Link href="/search">
                <input
                  type="text"
                  placeholder="ابحث عن دورات..."
                  className="w-full bg-gray-100 rounded-lg py-3 pr-12 pl-4 text-sm outline-none cursor-pointer"
                  readOnly
                />
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              <Link href="/courses" className="block text-gray-600 font-medium py-2">
                الدورات
              </Link>
              <Link href="/features" className="block text-gray-600 font-medium py-2">
                الميزات
              </Link>
              <Link href="/pricing" className="block text-gray-600 font-medium py-2">
                الأسعار
              </Link>
            </nav>
            
            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSelector />
              </div>
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    <LogIn size={16} className="ml-2" />
                    دخول
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    انضم
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
