"use client";

import Link from 'next/link';
import { Search, LayoutDashboard, Menu, X, ShoppingCart, User, BookOpen, GraduationCap, Award, HelpCircle, DollarSign } from 'lucide-react';
import { useState } from 'react';

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
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/courses" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <BookOpen size={18} />
            <span>الدورات</span>
          </Link>

          <Link 
            href="/instructors" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <GraduationCap size={18} />
            <span>المدربون</span>
          </Link>

          <Link 
            href="/pricing" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <DollarSign size={18} />
            <span>الأسعار</span>
          </Link>

          <Link 
            href="/cart" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm relative"
          >
            <ShoppingCart size={18} />
            <span>السلة</span>
          </Link>

          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/profile" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            >
              <User size={18} />
              <span>حسابي</span>
            </Link>

            <Link 
              href="/login" 
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              دخول
            </Link>
          </div>

          <Link 
            href="/pricing" 
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
          
          <Link href="/courses" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <BookOpen size={18} />
            الدورات
          </Link>
          
          <Link href="/instructors" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <GraduationCap size={18} />
            المدربون
          </Link>
          
          <Link href="/pricing" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <DollarSign size={18} />
            الأسعار
          </Link>
          
          <Link href="/cart" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <ShoppingCart size={18} />
            السلة
          </Link>
          
          <Link href="/dashboard" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <LayoutDashboard size={18} />
            لوحة التحكم
          </Link>
          
          <Link href="/profile" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <User size={18} />
            حسابي
          </Link>
          
          <Link href="/certificates" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <Award size={18} />
            شهاداتي
          </Link>
          
          <Link href="/faq" className="text-gray-600 font-medium py-2 flex items-center gap-2">
            <HelpCircle size={18} />
            المساعدة
          </Link>
          
          <hr />
          
          <Link href="/login" className="w-full text-center py-2 text-gray-600 font-medium inline-block">دخول</Link>
          <Link href="/pricing" className="w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold inline-block">انضم مجاناً</Link>
        </div>
      )}
    </nav>
  );
}
