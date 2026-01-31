'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter italic transition-transform group-hover:scale-105">
            LUMO
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Link href="/search">
              <input
                type="text"
                placeholder="ابحث عن دورات، مدربين، أو مواضيع..."
                className="w-full bg-gray-100 border border-transparent rounded-full py-3 pr-12 pl-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                readOnly
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href="/courses" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            الدورات
          </Link>
          <Link 
            href="/features" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            الميزات
          </Link>
          <Link 
            href="/pricing" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            الأسعار
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
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
