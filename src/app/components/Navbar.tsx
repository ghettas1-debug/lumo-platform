"use client";

import Link from 'next/link';
import { Search, LayoutDashboard, Menu, X, ShoppingCart, User, BookOpen, GraduationCap, Award, HelpCircle, DollarSign, Play, Bell, MessageSquare, TrendingUp, BarChart3, Brain, Settings } from 'lucide-react';
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
          <div className="hidden lg:flex relative w-full max-w-md">
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
        <div className="hidden lg:flex items-center gap-4">
          {/* الميزات التعليمية */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
            <Link 
              href="/playlist" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="قائمة التشغيل"
            >
              <Play size={18} />
              <span>قائمة التشغيل</span>
            </Link>

            <Link 
              href="/adaptive-learning" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="التعلم التكيفي"
            >
              <Brain size={18} />
              <span>التعلم التكيفي</span>
            </Link>

            <Link 
              href="/reviews" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="المراجعات والتقييمات"
            >
              <Award size={18} />
              <span>التقييمات</span>
            </Link>
          </div>

          {/* الميزات التفاعلية */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
            <Link 
              href="/notifications" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="الإشعارات والتذكيرات"
            >
              <Bell size={18} />
              <span>الإشعارات</span>
            </Link>

            <Link 
              href="/forums" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="منتديات النقاش"
            >
              <MessageSquare size={18} />
              <span>المنتديات</span>
            </Link>
          </div>

          {/* الميزات التحليلية */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
            <Link 
              href="/progress" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="مشاركة التقدم"
            >
              <TrendingUp size={18} />
              <span>التقدم</span>
            </Link>

            <Link 
              href="/leaderboard" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="لوحة المتصدرين"
            >
              <BarChart3 size={18} />
              <span>المتصدرين</span>
            </Link>
          </div>

          {/* الإعدادات والأدوات */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
            <ThemeToggle />
            <LanguageSelector />

            <Link 
              href="/search" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              title="البحث المتقدم"
            >
              <Search size={18} />
              <span>بحث</span>
            </Link>
          </div>

          {/* الروابط الأصلية */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </Link>

          <Link 
            href="/cart" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm relative"
          >
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span>السلة</span>
          </Link>

          <Link 
            href="/profile" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <User size={18} />
            <span>الحساب</span>
          </Link>

          <Link 
            href="/help" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <HelpCircle size={18} />
            <span>المساعدة</span>
          </Link>

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
          
          {/* الميزات التعليمية */}
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
          </div>
          
          {/* الميزات التفاعلية */}
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
          </div>
          
          {/* الميزات التحليلية */}
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
          
          <hr />
          
          <Link href="/dashboard" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <LayoutDashboard size={18} />
            لوحة التحكم
          </Link>
          
          <Link href="/cart" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <ShoppingCart size={18} />
            السلة
          </Link>
          
          <Link href="/profile" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <User size={18} />
            حسابي
          </Link>
          
          <Link href="/help" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <HelpCircle size={18} />
            المساعدة
          </Link>
          
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
