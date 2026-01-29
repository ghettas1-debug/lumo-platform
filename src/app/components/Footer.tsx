"use client";

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, BookOpen, Users, Award, HelpCircle, Shield, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-black text-blue-400 tracking-tighter italic">
                LUMO
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة تعليمية رائدة تقدم دورات تدريبية احترافية في مختلف المجالات التقنية والإدارية. نساعد المتعلمين على تطوير مهاراتهم وتحقيق أهدافهم المهنية.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={18} />
                <span>support@lumo.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={18} />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-lg font-bold mb-6">التعلم</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <BookOpen size={16} />
                  <span>جميع الدورات</span>
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Users size={16} />
                  <span>المدربون</span>
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Award size={16} />
                  <span>الشهادات</span>
                </Link>
              </li>
              <li>
                <Link href="/search" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>البحث المتقدم</span>
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
                  <Shield size={16} />
                  <span>مركز المساعدة</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>الشروط والأحكام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6">الشركة</h3>
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
                <Link href="/partners" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>الشركاء</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <ChevronRight size={16} />
                  <span>المدونة</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 LUMO. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                سياسة الكوكيز
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
