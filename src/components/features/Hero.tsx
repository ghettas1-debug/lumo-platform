'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  TrendingUp,
  CheckCircle,
  Zap,
  Target,
  Clock,
  BarChart3,
  Sparkles,
  Rocket,
  Shield,
  Heart,
  Trophy,
  Lightbulb,
  Brain,
  Code,
  Palette,
  Music,
  Camera,
  Mic,
  Video,
  FileText,
  Briefcase,
  GraduationCap,
  Award as AwardIcon,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';

export default function Hero() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const stats = [
    { number: '50M+', label: 'طالب حول العالم', icon: Users, color: 'blue' },
    { number: '6000+', label: 'دورة تدريبية', icon: BookOpen, color: 'green' },
    { number: '500K+', label: 'شهادة معتمدة', icon: Award, color: 'purple' },
    { number: '180+', label: 'دولة', icon: Globe, color: 'orange' }
  ];

  const categories = [
    { id: 1, name: 'تطوير الويب', description: 'React, Node.js, Python', courses: '1250 دورة', students: '450K+ طالب', icon: Code, color: 'blue' },
    { id: 2, name: 'التصميم', description: 'UI/UX, Graphic Design', courses: '890 دورة', students: '320K+ طالب', icon: Palette, color: 'purple' },
    { id: 3, name: 'التسويق', description: 'Digital Marketing, SEO', courses: '670 دورة', students: '280K+ طالب', icon: Target, color: 'green' },
    { id: 4, name: 'الأعمال', description: 'Management, Finance', courses: '1100 دورة', students: '390K+ طالب', icon: Briefcase, color: 'orange' },
    { id: 5, name: 'الإبداع', description: 'Music, Video, Photography', courses: '450 دورة', students: '180K+ طالب', icon: Camera, color: 'pink' },
    { id: 6, name: 'التكنولوجيا', description: 'AI, Data Science, Cloud', courses: '980 دورة', students: '410K+ طالب', icon: Brain, color: 'indigo' }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مطور واجهات أمامية',
      content: 'لumo غيرت حياتي المهنية تماماً. الدورات احترافية والمدربون ممتازون.',
      rating: 5
    },
    {
      name: 'فاطمة علي',
      role: 'مصممة UI/UX',
      content: 'أفضل منصة تعليمية استخدمتها. المحتوى منظم والشهادات معترف بها.',
      rating: 5
    },
    {
      name: 'محمد سعيد',
      role: 'مطور Full Stack',
      content: 'تعلمت مهارات جديدة ساعدتني في الحصول على وظيفة أحلامي.',
      rating: 5
    }
  ];

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
      purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
      green: 'bg-gradient-to-br from-green-400 to-green-600',
      orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
      pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
      indigo: 'bg-gradient-to-br from-indigo-400 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getCategoryBgColor = (color: string) => {
    const colors = {
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-200 border-2 border-purple-400',
      green: 'bg-gradient-to-br from-green-50 to-green-200 border-2 border-green-400',
      orange: 'bg-gradient-to-br from-orange-50 to-orange-200 border-2 border-orange-400',
      pink: 'bg-gradient-to-br from-pink-50 to-pink-200 border-2 border-pink-400',
      indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-200 border-2 border-indigo-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl animate-pulse delay-4000"></div>
        
        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-indigo-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-blue-500/30 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-indigo-500/30 rounded-full animate-bounce delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Announcement */}
        <div className={`text-center mb-8 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            منصة التعلم الرائدة في العالم
            <Trophy className="w-4 h-4 ml-2" />
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              تعلم مهارات
              <span className="text-blue-600"> المستقبل</span>
              <br />
              مع خبراء عالميين
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              انضم إلى 50 مليون طالب حول العالم
              واحصل على شهادات معتمدة من أفضل الجامعات
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">شهادات معتمدة عالمياً</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700">تعلم بالسرعة التي تناسبك</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-700">مسارات تعليمية مخصصة</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-700">وصول مدى الحياة</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300">
                ابدأ التعلم مجاناً
                <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300">
                استكشف الدورات
              </Button>
            </div>

            {/* Stats Bar */}
            <div className={`flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600 mr-2`} />
                    <span className="text-3xl font-bold text-gray-900">{stat.number}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            {/* Main Visual Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-8 border-2 border-blue-300">
                {/* Categories Showcase */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    اكتشف فئاتنا المميزة
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            activeCategory === category.id 
                              ? `${getCategoryBgColor(category.color)} border-opacity-100 shadow-lg transform scale-105` 
                              : 'bg-gray-50 border-gray-200 hover:shadow-md'
                          }`}
                          onMouseEnter={() => setActiveCategory(category.id)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(category.color)} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-sm">{category.name}</div>
                              <div className="text-xs text-gray-500">{category.description}</div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{category.courses} دورة</span>
                            <span>{category.students} طالب</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Demo */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-blue-300 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ابدأ رحلتك اليوم
                    </h3>
                    <p className="text-gray-600 mb-4">
                      تعلم من أفضل الخبراء في مجالك
                    </p>
                    <div className="flex justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      شاهد التجربة
                    </Button>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-3 animate-float border-2 border-blue-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">98%</div>
                      <div className="text-xs text-gray-500">رضا الطلاب</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-3 animate-float delay-1000 border-2 border-blue-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <AwardIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">500K+</div>
                      <div className="text-xs text-gray-500">شهادة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mt-16 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ماذا يقول طلابنا
            </h3>
            <p className="text-gray-600">
              انضم إلى آلاف الطلاب الذين حققوا نجاحاً مع Lumo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg border-2 border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave with Animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-gray-50 animate-pulse" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <path fill="currentColor" d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-white/80"></div>
      </div>
    </section>
  );
}
