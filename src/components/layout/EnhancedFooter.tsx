'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  Shield,
  Heart,
  Star,
  Award,
  Globe,
  Smartphone,
  CreditCard,
  HelpCircle,
  FileText,
  Building,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const footerSections = [
  {
    title: 'التعلم',
    icon: <BookOpen className="w-5 h-5" />,
    links: [
      { label: 'جميع الدورات', href: '/courses' },
      { label: 'مسارات التعلم', href: '/learning-path' },
      { label: 'الدبلومات', href: '/diplomas' },
      { label: 'الشهادات', href: '/certificates' },
      { label: 'المختبرات الافتراضية', href: '/labs' },
      { label: 'تقييم المهارات', href: '/skill-assessment' }
    ]
  },
  {
    title: 'المستخدمون',
    icon: <Users className="w-5 h-5" />,
    links: [
      { label: 'للطلاب', href: '/student/dashboard' },
      { label: 'للمدربين', href: '/instructor-dashboard' },
      { label: 'للمؤسسات', href: '/enterprise' },
      { label: 'للشركات', href: '/corporate-training' },
      { label: 'للجامعات', href: '/universities' },
      { label: 'للمطورين', href: '/developers' }
    ]
  },
  {
    title: 'المميزات',
    icon: <Star className="w-5 h-5" />,
    links: [
      { label: 'الذكاء الاصطناعي', href: '/ai' },
      { label: 'التعلم التكيفي', href: '/adaptive-learning' },
      { label: 'التطبيقات المحمولة', href: '/mobile-experience' },
      { label: 'التنقل الصوتي', href: '/voice-navigation' },
      { label: 'إمكانية الوصول', href: '/accessibility' },
      { label: 'التعاون', href: '/collaboration' }
    ]
  },
  {
    title: 'الشركة',
    icon: <Building className="w-5 h-5" />,
    links: [
      { label: 'من نحن', href: '/about' },
      { label: 'الوظائف', href: '/careers' },
      { label: 'الشركاء', href: '/partners' },
      { label: 'الصحافة', href: '/press' },
      { label: 'المستثمرون', href: '/investors' },
      { label: 'الثقة والأمان', href: '/trust' }
    ]
  },
  {
    title: 'الدعم',
    icon: <HelpCircle className="w-5 h-5" />,
    links: [
      { label: 'مركز المساعدة', href: '/help' },
      { label: 'الأسئلة الشائعة', href: '/faq' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'المنتديات', href: '/forums' },
      { label: 'حالة الخدمة', href: '/status' },
      { label: 'وثائق API', href: '/api-docs' }
    ]
  },
  {
    title: 'قانوني',
    icon: <FileText className="w-5 h-5" />,
    links: [
      { label: 'الشروط والأحكام', href: '/terms' },
      { label: 'سياسة الخصوصية', href: '/privacy-policy' },
      { label: 'سياسة الكوكيز', href: '/cookie-policy' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'حماية البيانات', href: '/data-protection' },
      { label: 'سياسة الاسترداد', href: '/refunds' }
    ]
  }
];

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' }
];

const appLinks = [
  { icon: <Smartphone className="w-5 h-5" />, href: '/download-app', label: 'تطبيق iOS' },
  { icon: <Smartphone className="w-5 h-5" />, href: '/download-app', label: 'تطبيق Android' },
  { icon: <Globe className="w-5 h-5" />, href: '/desktop', label: 'تطبيق سطح المكتب' }
];

const paymentMethods = [
  { icon: <CreditCard className="w-6 h-6" />, label: 'Visa' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'Mastercard' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'PayPal' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'Apple Pay' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'Google Pay' }
];

export default function EnhancedFooter() {
  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  {section.icon}
                </div>
                <h3 className="font-semibold text-lg">{section.title}</h3>
              </div>
              
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Mail className="w-5 h-5" />
              النشرة البريدية
            </h3>
            <p className="text-gray-300">
              اشترك للحصول على أحدث الدورات والعروض الحصرية
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                اشترك
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Phone className="w-5 h-5" />
              تواصل معنا
            </h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@lumoplatform.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Apps & Payment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              التطبيقات والدفع
            </h3>
            
            {/* App Links */}
            <div className="space-y-2">
              <p className="text-sm text-gray-300">حمل التطبيق</p>
              <div className="flex gap-2">
                {appLinks.map((app, index) => (
                  <Link
                    key={index}
                    href={app.href}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {app.icon}
                    <span className="text-sm">{app.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <p className="text-sm text-gray-300">طرق الدفع</p>
              <div className="flex gap-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-800 rounded-lg"
                    title={method.label}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <span className="text-gray-300">تابعنا على:</span>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 focus:outline-none focus:border-blue-500">
                <option>العربية</option>
                <option>English</option>
                <option>Français</option>
                <option>Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-lg">Lumo Platform</span>
            </div>
            
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>© 2024 Lumo Platform. جميع الحقوق محفوظة.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>مؤمن SSL</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Award className="w-4 h-4" />
                <span>معتمد عالمياً</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="العودة للأعلى"
      >
        <ChevronRight className="w-6 h-6 rotate-270" />
      </button>
    </footer>
  );
}
