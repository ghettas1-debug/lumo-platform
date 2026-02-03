'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Quote, 
  Star, 
  TrendingUp, 
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase
} from 'lucide-react';
import { Badge } from '@/components/ui/atoms/Badge';
import { Button } from '@/components/ui/Button';

const successStories = [
  {
    id: 1,
    name: 'محمد أحمد',
    beforeTitle: 'طالب جامعي',
    afterTitle: 'مطور Full Stack في شركة كبرى',
    beforeSalary: '0$',
    afterSalary: '85,000$',
    location: 'الرياض، السعودية',
    image: '/images/stories/mohammed.jpg',
    video: '/videos/stories/mohammed.mp4',
    story: 'بدأت رحلتي مع Lumo Platform وأنا طالب جامعي لا أعرف شيئاً عن البرمجة. بعد 6 أشهر من التعلم المكثف، حصلت على أول وظيفة كمطور.',
    courses: ['React المتقدم', 'Node.js من الصفر', 'قواعد البيانات'],
    duration: '6 أشهر',
    achievement: 'توظيف مباشر',
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'سارة محمد',
    beforeTitle: 'ربة منزل',
    afterTitle: 'مصممة UI/UX مستقلة',
    beforeSalary: '0$',
    afterSalary: '45,000$',
    location: 'دبي، الإمارات',
    image: '/images/stories/sara.jpg',
    video: '/videos/stories/sara.mp4',
    story: 'كنت أبحث عن طريقة لاستغلال وقتي بشكل مفيد. اكتشفت شغفي بالتصميم من خلال دورات Lumo والآن أعمل كمستقلة.',
    courses: ['أساسيات التصميم', 'Figma احترافي', 'تصميم التطبيقات'],
    duration: '4 أشهر',
    achievement: 'مشروع خاص ناجح',
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: 'أحمد علي',
    beforeTitle: 'موظف خدمة عملاء',
    afterTitle: 'خبير تسويق رقمي',
    beforeSalary: '18,000$',
    afterSalary: '65,000$',
    location: 'القاهرة، مصر',
    image: '/images/stories/ahmed.jpg',
    video: '/videos/stories/ahmed.mp4',
    story: 'كنت أبحث عن تغيير مساري المهني. دورات التسويق الرقمي في Lumo غيرت حياتي تماماً وانتقلت لمجال أحبه.',
    courses: ['التسويق الرقمي', 'SEO احترافي', 'إعلانات جوجل'],
    duration: '3 أشهر',
    achievement: 'ترقية وظيفية',
    rating: 5,
    featured: false
  },
  {
    id: 4,
    name: 'فاطمة خالد',
    beforeTitle: 'خريجة جديدة',
    afterTitle: 'محللة بيانات',
    beforeSalary: '0$',
    afterSalary: '55,000$',
    location: 'عمان، الأردن',
    image: '/images/stories/fatima.jpg',
    video: '/videos/stories/fatima.mp4',
    story: 'بعد التخرج مباشرة، بدأت بتعلم تحليل البيانات من خلال Lumo. بعد 5 أشهر حصلت على وظيفة أحلامي.',
    courses: ['Python للتحليل', 'SQL متقدم', 'Power BI'],
    duration: '5 أشهر',
    achievement: 'أول وظيفة',
    rating: 5,
    featured: false
  }
];

export default function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            قصص نجاح حقيقية
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
          نجاحات طلابنا الملهمة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تعرف على كيف غيرت منصة Lumo حياة الآلاف من الطلاب حول العالم
          </p>
        </div>

        {/* Main Story Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Video/Image Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-lg">
              {playingVideo === story.id ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p>فيديو قصة النجاح</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-lg">
                      <span className="text-3xl font-bold text-white">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{story.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Play Button */}
            <button
              onClick={() => setPlayingVideo(playingVideo === story.id ? null : story.id)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-gradient-to-br from-white to-blue-50 text-blue-600 p-4 rounded-full shadow-xl hover:scale-110 transition-transform border-2 border-blue-300 hover:border-blue-400">
                <Play className="w-8 h-8" fill="currentColor" />
              </div>
            </button>

            {/* Navigation */}
            <button
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-white to-blue-50 backdrop-blur p-2 rounded-full shadow-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border-2 border-blue-300 hover:border-blue-400"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-white to-blue-50 backdrop-blur p-2 rounded-full shadow-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border-2 border-blue-300 hover:border-blue-400"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          {/* Story Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{story.location}</span>
                <span className="text-gray-400">•</span>
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{story.duration}</span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-2">{story.name}</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">قبل</p>
                  <p className="font-bold text-lg text-gray-700">{story.beforeTitle}</p>
                  <p className="text-sm font-medium text-gray-600">{story.beforeSalary}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">بعد</p>
                  <p className="font-bold text-lg text-green-600">{story.afterTitle}</p>
                  <p className="text-sm font-medium text-green-600">{story.afterSalary}</p>
                </div>
              </div>
            </div>

            <Quote className="w-8 h-8 text-blue-400 mb-4 drop-shadow-lg" />
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {story.story}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-gray-700">{story.achievement}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {story.courses.map((course, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {course}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <span className="text-sm text-gray-600 mr-2">({story.rating}/5)</span>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStories.map((successStory, index) => (
            <div
              key={successStory.id}
              onClick={() => setCurrentStory(index)}
              className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 border-blue-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 ${
                currentStory === index 
                  ? 'ring-4 ring-blue-600 shadow-2xl' 
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {successStory.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{successStory.name}</h4>
                  <p className="text-sm text-gray-600">{successStory.afterTitle}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الراتب:</span>
                  <span className="font-medium text-green-600">{successStory.afterSalary}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المدة:</span>
                  <span className="font-medium">{successStory.duration}</span>
                </div>
              </div>

              {successStory.featured && (
                <Badge variant="success" className="mt-3 text-xs">
                  مميز
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              كن القصة التالية للنجاح
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              انضم إلى آلاف الطلاب الذين حققوا نجاحاً باهراً من خلال منصتنا التعليمية
            </p>
            <Button variant="secondary" size="md" className="bg-white text-blue-600 hover:bg-gray-50">
              ابدأ رحلتك الآن
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
