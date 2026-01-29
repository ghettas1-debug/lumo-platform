"use client";

import Link from 'next/link';
import { Search, LayoutDashboard, Menu, X, ShoppingCart, User, BookOpen, GraduationCap, Award, HelpCircle, DollarSign, Play, Bell, MessageSquare, TrendingUp, BarChart3, Brain, Settings, Users, Target, Smartphone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle';
import LanguageSelector from '../../components/LanguageSelector';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 border-b border-gray-200 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* القسم الأيمن: الشعار والبحث */}
        <div className="flex items-center gap-6 lg:gap-12 flex-1">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter italic transition-transform group-hover:scale-105">
              LUMO
            </span>
          </Link>

          {/* شريط البحث - يختفي في الجوال */}
          <div className="hidden lg:flex relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <Link href="/search">
              <input
                type="text"
                placeholder="ماذا تريد أن تتعلم اليوم؟"
                className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                readOnly
              />
            </Link>
          </div>
        </div>

        {/* القسم الأيسر: الروابط - للشاشات الكبيرة */}
        <div className="hidden lg:flex items-center gap-3">
          {/* الروابط الأساسية فقط */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            title="لوحة التحكم"
          >
            <LayoutDashboard size={18} />
            <span className="hidden xl:inline">لوحة التحكم</span>
          </Link>

          <Link 
            href="/courses" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            title="الدورات"
          >
            <BookOpen size={18} />
            <span className="hidden xl:inline">الدورات</span>
          </Link>

          <Link 
            href="/platform-guide" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            title="دليل المنصة"
          >
            <Sparkles size={18} />
            <span className="hidden xl:inline">دليل المنصة</span>
          </Link>

          {/* قائمة الميزات المنسدلة */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm" title="الميزات">
              <Settings size={18} />
              <span className="hidden xl:inline">الميزات</span>
            </button>
            
            {/* القائمة المنسدلة */}
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4">
                {/* الميزات التعليمية */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الميزات التعليمية</h4>
                  <div className="space-y-1">
                    <Link 
                      href="/playlist" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Play size={16} />
                      <span>قائمة التشغيل</span>
                    </Link>
                    <Link 
                      href="/adaptive-learning" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Brain size={16} />
                      <span>التعلم التكيفي</span>
                    </Link>
                    <Link 
                      href="/reviews" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Award size={16} />
                      <span>التقييمات</span>
                    </Link>
                    <Link 
                      href="/learning-path" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Target size={16} />
                      <span>مسار التعلم</span>
                    </Link>
                  </div>
                </div>

                {/* الميزات التفاعلية */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الميزات التفاعلية</h4>
                  <div className="space-y-1">
                    <Link 
                      href="/notifications" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Bell size={16} />
                      <span>الإشعارات</span>
                    </Link>
                    <Link 
                      href="/forums" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <MessageSquare size={16} />
                      <span>المنتديات</span>
                    </Link>
                    <Link 
                      href="/course-community" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Users size={16} />
                      <span>مجتمع الدورة</span>
                    </Link>
                  </div>
                </div>

                {/* الميزات التحليلية */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الميزات التحليلية</h4>
                  <div className="space-y-1">
                    <Link 
                      href="/progress" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <TrendingUp size={16} />
                      <span>التقدم</span>
                    </Link>
                    <Link 
                      href="/leaderboard" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <BarChart3 size={16} />
                      <span>المتصدرين</span>
                    </Link>
                  </div>
                </div>

                {/* ميزات المنصة العالمية */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">ميزات المنصة العالمية</h4>
                  <div className="space-y-1">
                    <Link 
                      href="/trust" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Award size={16} />
                      <span>عناصر الثقة</span>
                    </Link>
                    <Link 
                      href="/content-management" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Settings size={16} />
                      <span>إدارة المحتوى</span>
                    </Link>
                    <Link 
                      href="/design-system" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <LayoutDashboard size={16} />
                      <span>نظام التصميم</span>
                    </Link>
                    <Link 
                      href="/mobile-experience" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Smartphone size={16} />
                      <span>تجربة الجوال</span>
                    </Link>
                    <Link 
                      href="/polish" 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm py-2 px-3 rounded hover:bg-blue-50"
                    >
                      <Sparkles size={16} />
                      <span>تفاصيل دقيقة</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الروابط المهمة */}
          <Link 
            href="/search" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            title="بحث"
          >
            <Search size={18} />
            <span className="hidden xl:inline">بحث</span>
          </Link>

          {/* قائمة الحساب */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm" title="الحساب">
              <User size={18} />
              <span className="hidden xl:inline">الحساب</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-blue-50">
                  <User size={16} /> الحساب
                </Link>
                <Link href="/student" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-blue-50">
                  <Users size={16} /> لوحة الطالب
                </Link>
                <Link href="/instructor-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-blue-50">
                  <GraduationCap size={16} /> لوحة المدرس
                </Link>
                <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-blue-50">
                  <ShoppingCart size={16} /> السلة
                </Link>
                <Link href="/help" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-blue-50">
                  <HelpCircle size={16} /> المساعدة
                </Link>
              </div>
            </div>
          </div>

          {/* الأدوات */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          <Link 
            href="/signup"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95"
          >
            انضم مجاناً
          </Link>
        </div>

        {/* زر الجوال */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-6 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Link href="/search">
              <input
                type="text"
                placeholder="بحث..."
                className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none cursor-pointer"
                readOnly
              />
            </Link>
          </div>
          
          {/* الروابط الأساسية */}
          <Link href="/dashboard" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <LayoutDashboard size={18} />
            لوحة التحكم
          </Link>
          
          <Link href="/courses" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <BookOpen size={18} />
            الدورات
          </Link>
          
          {/* قائمة الميزات المنسدلة للجوال */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">الميزات التعليمية</h3>
            <Link href="/playlist" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Play size={18} />
              قائمة التشغيل
            </Link>
            
            <Link href="/adaptive-learning" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Brain size={18} />
              التعلم التكيفي
            </Link>
            
            <Link href="/reviews" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Award size={18} />
              التقييمات
            </Link>
            <Link href="/learning-path" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Target size={18} />
              مسار التعلم
            </Link>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">الميزات التفاعلية</h3>
            <Link href="/notifications" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Bell size={18} />
              الإشعارات
            </Link>
            
            <Link href="/forums" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <MessageSquare size={18} />
              المنتديات
            </Link>
            <Link href="/course-community" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Users size={18} />
              مجتمع الدورة
            </Link>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">الميزات التحليلية</h3>
            <Link href="/progress" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <TrendingUp size={18} />
              التقدم
            </Link>
            
            <Link href="/leaderboard" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <BarChart3 size={18} />
              المتصدرين
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ميزات المنصة العالمية</h3>
            <Link href="/trust" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Award size={18} />
              عناصر الثقة
            </Link>
            <Link href="/content-management" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Settings size={18} />
              إدارة المحتوى
            </Link>
            <Link href="/design-system" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <LayoutDashboard size={18} />
              نظام التصميم
            </Link>
            <Link href="/mobile-experience" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Smartphone size={18} />
              تجربة الجوال
            </Link>
            <Link href="/polish" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Sparkles size={18} />
              تفاصيل دقيقة
            </Link>
          </div>
          
          <hr />
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">الحساب</h3>
            <Link href="/student" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <Users size={18} />
              لوحة الطالب
            </Link>
            <Link href="/instructor-dashboard" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <GraduationCap size={18} />
              لوحة المدرس
            </Link>
            <Link href="/profile" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <User size={18} />
              الحساب
            </Link>
            <Link href="/cart" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <ShoppingCart size={18} />
              السلة
            </Link>
            <Link href="/help" className="text-gray-600 font-medium py-2 flex items-center gap-2">
              <HelpCircle size={18} />
              المساعدة
            </Link>
          </div>
          
          <hr />
          
          <div className="flex items-center justify-between py-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          
          <Link href="/login" className="w-full text-center py-2 text-gray-600 font-medium inline-block">دخول</Link>
          <Link href="/signup" className="w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold inline-block">انضم مجاناً</Link>
        </div>
      )}
    </nav>
  );
}
