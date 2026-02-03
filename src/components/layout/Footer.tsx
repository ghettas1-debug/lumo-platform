'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Users, 
  Award, 
  HelpCircle, 
  ChevronRight, 
  Smartphone, 
  Download,
  Globe,
  Shield,
  Star,
  TrendingUp,
  Building,
  Settings
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Top Border */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
      
      {/* Main Footer - Single Row */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - 1 column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-xl font-black text-white tracking-tighter">
                  LUMO
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">LUMO</h2>
                <p className="text-blue-400 text-xs font-medium">منصة التعلم العالمية</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed text-xs">
              منصة تعليمية رائدة تقدم دورات تدريبية احترافية في مختلف المجالات التقنية والإدارية. 
              انضم إلى ملايين الطلاب حول العالم وتمكين لمستقبلك المهني.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded border border-gray-700">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium text-gray-300">4.8 تقييم</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded border border-gray-700">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-gray-300">50M+ طالب</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded border border-gray-700">
                <Globe className="w-3 h-3 text-green-400" />
                <span className="text-xs font-medium text-gray-300">180+ دولة</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-2 mb-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 group">
                <Facebook size={14} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-400 transition-all duration-300 hover:scale-110 group">
                <Twitter size={14} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 group">
                <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 group">
                <Instagram size={14} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110 group">
                <Youtube size={14} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <Mail size={12} className="text-blue-400" />
                <span className="font-medium">support@lumo.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <Phone size={12} className="text-green-400" />
                <span className="font-medium">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <MapPin size={12} className="text-red-400" />
                <span className="font-medium">الرياض، السعودية</span>
              </div>
            </div>
          </div>

          {/* All Links in 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: استكشف + الشركة */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-blue-400">
                  <BookOpen className="w-4 h-4" />
                  استكشف
                </h3>
                <ul className="space-y-1 mb-4">
                  <li>
                    <Link href="/courses" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      جميع الدورات
                    </Link>
                  </li>
                  <li>
                    <Link href="/learning-paths" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      المسارات التعليمية
                    </Link>
                  </li>
                  <li>
                    <Link href="/diplomas" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      الدبلومات
                    </Link>
                  </li>
                  <li>
                    <Link href="/certificates" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      الشهادات
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                      المميزات
                    </Link>
                  </li>
                </ul>

                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-orange-400">
                  <TrendingUp className="w-4 h-4" />
                  الشركة
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                      من نحن
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                      الوظائف
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                      المدونة
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                      الصحافة
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: الحلول + المجتمع */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-green-400">
                  <Building className="w-4 h-4" />
                  الحلول
                </h3>
                <ul className="space-y-1 mb-4">
                  <li>
                    <Link href="/solutions" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      جميع الحلول
                    </Link>
                  </li>
                  <li>
                    <Link href="/enterprise" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      للشركات
                    </Link>
                  </li>
                  <li>
                    <Link href="/universities" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      للجامعات
                    </Link>
                  </li>
                  <li>
                    <Link href="/corporate-training" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      تدريب الشركات
                    </Link>
                  </li>
                  <li>
                    <Link href="/developers" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      للمطورين
                    </Link>
                  </li>
                </ul>

                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-purple-400">
                  <Users className="w-4 h-4" />
                  المجتمع
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/community" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                      جميع الخدمات
                    </Link>
                  </li>
                  <li>
                    <Link href="/forums" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                      المنتديات
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                      مركز المساعدة
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                      الأسئلة الشائعة
                    </Link>
                  </li>
                  <li>
                    <Link href="/status" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                      حالة الخدمة
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: الأدوات + تطبيق */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-yellow-400">
                  <Settings className="w-4 h-4" />
                  الأدوات
                </h3>
                <ul className="space-y-1 mb-4">
                  <li>
                    <Link href="/tools" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      جميع الأدوات
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      سلة التسوق
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      قائمة الرغبات
                    </Link>
                  </li>
                  <li>
                    <Link href="/notifications" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      الإشعارات
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="flex items-center gap-1 text-gray-300 hover:text-white transition-all duration-300 group text-xs">
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      الإعدادات
                    </Link>
                  </li>
                </ul>

                {/* Mobile App */}
                <div>
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-purple-400">
                    <Smartphone className="w-4 h-4" />
                    تطبيق LUMO
                  </h3>
                  <p className="text-gray-300 mb-3 text-xs leading-relaxed">
                    تعلم بدون إنترنت - قم بتنزيل تطبيق LUMO الآن
                  </p>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 p-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-105 group border border-gray-700 hover:border-gray-600">
                      <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Google Play</div>
                        <div className="text-xs text-gray-400">احصل على التطبيق</div>
                      </div>
                      <Download className="w-3 h-3 text-gray-400 mr-auto group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-105 group border border-gray-700 hover:border-gray-600">
                      <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">App Store</div>
                        <div className="text-xs text-gray-400">متوفر الآن</div>
                      </div>
                      <Download className="w-3 h-3 text-gray-400 mr-auto group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="text-gray-400 text-xs font-medium">
                © 2024 LUMO. جميع الحقوق محفوظة.
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded-full border border-gray-700">
                <Shield className="w-3 h-3 text-green-400" />
                <span>آمن وموثوق</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 px-2 py-1 rounded hover:bg-gray-800">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 px-2 py-1 rounded hover:bg-gray-800">
                الشروط والأحكام
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 px-2 py-1 rounded hover:bg-gray-800">
                سياسة الكوكيز
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
