'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen,
  GraduationCap,
  Award,
  Code,
  Users,
  Building,
  Briefcase,
  DollarSign,
  TrendingUp,
  FileText,
  HelpCircle,
  User,
  LogIn,
  UserPlus,
  Search,
  ShoppingCart,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section className={`relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-right">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ابدأ رحلتك في
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}التعلم
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              انضم إلى أكثر من 50 مليون طالب حول العالم وتعلم من أفضل المدربين في مختلف المجالات التقنية والإدارية
            </p>
            
            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                leftIcon={<UserPlus className="w-5 h-5" />}
              >
                ابدأ التعلم مجاناً
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                leftIcon={<BookOpen className="w-5 h-5" />}
              >
                استكشف الدورات
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">6000+</div>
                <div className="text-sm text-gray-600">دورة تدريبية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50M+</div>
                <div className="text-sm text-gray-600">طالب حول العالم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.8</div>
                <div className="text-sm text-gray-600">تقييم متوسط</div>
              </div>
            </div>
          </div>

          {/* Right Content - Course Categories */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/courses/web-development" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">تطوير الويب</h3>
                <p className="text-sm text-gray-600">HTML, CSS, JavaScript, React</p>
              </div>
            </Link>

            <Link href="/courses/business" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">إدارة الأعمال</h3>
                <p className="text-sm text-gray-600">قيادة، إدارة، استراتيجية</p>
              </div>
            </Link>

            <Link href="/courses/ai" className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">الذكاء الاصطناعي</h3>
                <p className="text-sm text-gray-600">Machine Learning, Deep Learning</p>
              </div>
            </Link>

            <Link href="/courses" className="group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">جميع الدورات</h3>
                <p className="text-sm opacity-90">استكشف 6000+ دورة</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
