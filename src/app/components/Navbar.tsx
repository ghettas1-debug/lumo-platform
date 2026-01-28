"use client"; // ضروري لاستخدام التفاعلات والروابط

import Link from 'next/link';
import { Search, User, LayoutDashboard, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* القسم الأيمن: الشعار وشريط البحث */}
        <div className="flex items-center gap-10 flex-1">
          {/* شعار LUMO */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-3xl font-black text-blue-600 tracking-tighter italic transition-transform group-hover:scale-105">
              LUMO
            </span>
          </Link>

          {/* شريط البحث (يظهر في الشاشات الكبيرة) */}
          <div className="hidden md:flex relative w-full max-w-sm">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="ابحث عن مهارة جديدة..."
              className="w-full bg-gray-100 border-none rounded-2xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* القسم الأيسر: روابط التنقل وأزرار الحساب */}
        <div className="flex items-center gap-8 font-bold text-gray-600">
          
          {/* رابط لوحة التحكم */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors text-sm"
          >
            <LayoutDashboard size={18} className="text-blue-600" />
            <span>لوحة التحكم</span>
          </Link>

          {/* رابط تسجيل الدخول */}
          <button className="hidden sm:flex items-center gap-2 hover:text-blue-600 transition-colors text-sm cursor-pointer">
            <LogIn size={18} />
            <span>دخول</span>
          </button>

          {/* زر الانضمام الرئيسي */}
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-7 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 hover:shadow-blue-200 active:scale-95"
          >
            انضم مجاناً
          </Link>

        </div>
      </div>
    </nav>
  );
}
