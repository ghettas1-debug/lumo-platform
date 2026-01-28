"use client";

import Link from 'next/link';
import { Search, User, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
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
            <input
              type="text"
              placeholder="ماذا تريد أن تتعلم اليوم؟"
              className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* القسم الأيسر: الروابط - للشاشات الكبيرة */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <LayoutDashboard size={18} />
            <span>لوحة التحكم</span>
          </Link>

          <button className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
            دخول
          </button>

          <Link 
            href="/" 
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
            <input
              type="text"
              placeholder="بحث..."
              className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none"
            />
          </div>
          <Link href="/dashboard" className="block text-gray-600 font-medium py-2">لوحة التحكم</Link>
          <hr />
          <button className="w-full text-center py-2 text-gray-600 font-medium">دخول</button>
          <Link href="/" className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold">انضم مجاناً</Link>
        </div>
      )}
    </nav>
  );
}
