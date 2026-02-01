'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, BookOpen, Users, Award, HelpCircle, ChevronRight, Smartphone, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-black text-blue-400 tracking-tighter italic">
                LUMO
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة تعليمية رائدة تقدم دورات تدريبية احترافية في مختلف المجالات التقنية والإدارية.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={16} />
                <span>support@lumo.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={16} />
                <span>الرياض، السعودية</span>
              </div>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-lg font-bold mb-6">استكشف</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <BookOpen size={16} />
                  <span>جميع الدورات</span>
                </Link>
              </li>
              <li>
                <Link href="/diplomas" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Award size={16} />
                  <span>الدبلومات</span>
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Award size={16} />
                  <span>الشهادات</span>
                </Link>
              </li>
              <li>
                <Link href="/career-paths" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>المسارات المهنية</span>
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Users size={16} />
                  <span>الوظائف</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">الدعم</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <HelpCircle size={16} />
                  <span>الأسئلة الشائعة</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Mail size={16} />
                  <span>اتصل بنا</span>
                </Link>
              </li>
              <li>
                <Link href="/help" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <HelpCircle size={16} />
                  <span>مركز المساعدة</span>
                </Link>
              </li>
              <li>
                <Link href="/status" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>حالة الخدمة</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6">تطبيق لumo</h3>
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                تعلم بدون إنترنت - قم بتنزيل تطبيق لumo
              </p>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-sm font-semibold">Google Play</div>
                    <div className="text-xs text-gray-400">احصل على التطبيق</div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 mr-auto" />
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-sm font-semibold">App Store</div>
                    <div className="text-xs text-gray-400">متوفر الآن</div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 mr-auto" />
                </a>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-4">الشركة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>الوظائف</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>المدونة</span>
                </Link>
              </li>
              <li>
                <Link href="/press" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>الصحافة</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 LUMO. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الكوكيز
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
