'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  MoreHorizontal,
  User, 
  Globe,
  LogIn,
  UserPlus,
  BookOpen,
  GraduationCap,
  Building,
  FileText,
  DollarSign,
  Briefcase,
  Code,
  Palette,
  Heart,
  Award,
  TrendingUp,
  HelpCircle,
  Settings,
  LogOut,
  ShoppingCart,
  Moon,
  Sun,
  Monitor,
  Users,
  Star,
  MessageSquare,
  Download,
  Shield,
  Zap,
  Target,
  BarChart,
  Clock,
  CheckCircle,
  PlayCircle,
  Video,
  Headphones,
  BookMarked,
  Lightbulb,
  Rocket,
  Trophy,
  Gift,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { 
  HoverEffect, 
  SlideInAnimation, 
  StaggeredAnimation 
} from '@/components/design-system/MicroInteractions';
import { useEnhancedTheme } from '@/components/design-system/EnhancedThemeProvider';
import { useBreakpoint } from '@/components/design-system/ResponsiveGrid';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  
  const { theme, setTheme, resolvedTheme } = useEnhancedTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown enter - immediate response
  const handleDropdownEnter = useCallback((dropdownId: string) => {
    setActiveDropdown(dropdownId);
  }, []);

  // Handle dropdown leave - immediate close
  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items structure - Updated to match the integrated navigation map
  const navItems = [
    {
      id: 'learn',
      label: 'تعلم',
      icon: BookOpen,
      dropdown: [
        { label: 'الدورات', href: '/courses', icon: BookOpen, badge: '6000+' },
        { label: 'المسارات التعليمية', href: '/learning-paths', icon: GraduationCap },
        { label: 'الشهادات', href: '/certificates', icon: Award },
        { label: 'المختبرات', href: '/labs', icon: Code },
        { label: 'المدربون', href: '/instructors', icon: Users },
      ]
    },
    {
      id: 'business',
      label: 'للشركات',
      icon: Building,
      dropdown: [
        { label: 'حلول الشركات', href: '/enterprise', icon: Building },
        { label: 'التدريب المؤسسي', href: '/corporate-training', icon: Briefcase },
        { label: 'الأسعار للشركات', href: '/enterprise/pricing', icon: DollarSign },
        { label: 'نجاح العملاء', href: '/success-stories', icon: TrendingUp },
      ]
    },
    {
      id: 'resources',
      label: 'الموارد',
      icon: FileText,
      dropdown: [
        { label: 'المدونة', href: '/blog', icon: FileText },
        { label: 'مركز المساعدة', href: '/help', icon: HelpCircle },
        { label: 'المجتمع', href: '/community', icon: Users },
        { label: 'الأسئلة الشائعة', href: '/faq', icon: HelpCircle },
        { label: 'للمطورين', href: '/developers', icon: Code },
      ]
    },
    {
      id: 'pricing',
      label: 'الأسعار',
      icon: DollarSign,
      dropdown: [
        { label: 'خطط الأفراد', href: '/pricing', icon: User },
        { label: 'خطط الشركات', href: '/enterprise/pricing', icon: Building },
      ]
    }
  ];

  // Render dropdown with perfect wrapper approach
  const renderDropdown = (items: any[], dropdownId: string) => {
    if (activeDropdown !== dropdownId) return null;

    const isMoreDropdown = dropdownId === 'more';
    const dropdownWidth = isMoreDropdown ? 'w-96' : 'w-72';
    const maxHeight = isMoreDropdown ? 'max-h-96 overflow-y-auto' : '';

    return (
      <SlideInAnimation direction="down" duration={0.15}>
        <div 
          className={`absolute top-full left-0 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden ${dropdownWidth} ${maxHeight}`}
          data-dropdown-container="true"
          style={{ 
            pointerEvents: 'auto',
            zIndex: 100
            // No marginTop - no gap between button and dropdown
          }}
        >
          <div className="py-2">
            {items.map((item, index) => (
              <Link
                key={`${item.href}-${index}`} // Use composite key to ensure uniqueness
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 group`}
                onClick={() => setActiveDropdown(null)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" size="sm" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </SlideInAnimation>
    );
  };

  return (
    <header 
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled 
          ? "bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-neutral-700/30"
          : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg border-b border-white/20 dark:border-neutral-700/30"
      )}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="hidden sm:inline">LUMO</span>
            </Link>

            {/* Desktop Navigation - WITH WRAPPER APPROACH */}
            {!isMobile && (
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <HoverEffect scale={1.02}>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-white/90 transition-colors duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                      </button>
                    </HoverEffect>
                    {renderDropdown(item.dropdown, item.id)}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar - Hidden on mobile */}
            {!isMobile && (
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    placeholder="ابحث عن 6000+ دورة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border bg-white/20 backdrop-blur-sm border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder:text-white/70 text-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Language Selector - WITH WRAPPER APPROACH */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('language')}
              onMouseLeave={handleDropdownLeave}
            >
              <HoverEffect scale={1.05}>
                <button className="flex items-center gap-1 p-2 text-sm text-white hover:text-white/90 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">🇺🇸</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </HoverEffect>
              
              {/* Language Dropdown - NO onMouseLeave */}
              {activeDropdown === 'language' && (
                <SlideInAnimation direction="down" duration={0.15}>
                  <div 
                    className="absolute top-full left-0 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50"
                    data-dropdown-container="true"
                    style={{ 
                      pointerEvents: 'auto',
                      zIndex: 100
                      // No marginTop - no gap
                    }}
                  >
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        🇺🇸 English
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        🇸🇦 العربية
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        🇫🇷 Français
                      </button>
                    </div>
                  </div>
                </SlideInAnimation>
              )}
            </div>

            {/* Theme Toggle - WITH WRAPPER APPROACH */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('theme')}
              onMouseLeave={handleDropdownLeave}
            >
              <HoverEffect scale={1.05}>
                <button 
                  onClick={() => {
                    if (theme === 'light') {
                      setTheme('dark');
                    } else if (theme === 'dark') {
                      setTheme('system');
                    } else {
                      setTheme('light');
                    }
                  }}
                  className="flex items-center gap-1 p-2 text-sm text-white hover:text-white/90 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-colors"
                  title="تبديل الوضع"
                >
                  {theme === 'light' && <Sun className="w-4 h-4" />}
                  {theme === 'dark' && <Moon className="w-4 h-4" />}
                  {theme === 'system' && <Monitor className="w-4 h-4" />}
                </button>
              </HoverEffect>
              
              {/* Theme Dropdown - NO onMouseLeave */}
              {activeDropdown === 'theme' && (
                <SlideInAnimation direction="down" duration={0.15}>
                  <div 
                    className="absolute top-full left-0 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50"
                    data-dropdown-container="true"
                    style={{ 
                      pointerEvents: 'auto',
                      zIndex: 100
                      // No marginTop - no gap
                    }}
                  >
                    <div className="py-2">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${theme === 'light' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>وضع النهار</span>
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>وضع الليل</span>
                      </button>
                      <button 
                        onClick={() => setTheme('system')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${theme === 'system' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span>النظام</span>
                      </button>
                    </div>
                  </div>
                </SlideInAnimation>
              )}
            </div>

            {/* Auth Buttons - Desktop */}
            {!isMobile && (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<LogIn className="w-4 h-4" />}
                  className="text-white hover:text-white/90 hover:bg-white/10 backdrop-blur-sm font-semibold"
                >
                  تسجيل الدخول
                </Button>
                <Button
                  size="sm"
                  leftIcon={<UserPlus className="w-4 h-4" />}
                  className="bg-white text-blue-600 hover:bg-white/90 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  إنشاء حساب
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-white/90 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <SlideInAnimation direction="down">
            <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              {/* Mobile Search */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن دورات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 text-sm rounded-lg border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                      className={`w-full flex items-center justify-between gap-3 p-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === item.id && (
                      <div className="mr-8 mt-2 space-y-1">
                        {item.dropdown.map((subItem: any, subIndex: number) => (
                          <Link
                            key={`${subItem.href}-${subIndex}`} // Use composite key to ensure uniqueness
                            href={subItem.href}
                            className="flex items-center gap-3 p-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                            {subItem.badge && (
                              <Badge variant="secondary" size="sm" className="text-xs">
                                {subItem.badge}
                              </Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogIn className="w-4 h-4" />}
                  className="w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Button>
                <Button
                  size="sm"
                  leftIcon={<UserPlus className="w-4 h-4" />}
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  إنشاء حساب
                </Button>
              </div>
            </div>
          </SlideInAnimation>
        )}
      </div>
    </header>
  );
};

export default Header;
