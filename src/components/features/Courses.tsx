'use client';

import React from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { Course } from '@/types';

// Sample courses data - should come from API
const courses: Course[] = [
  {
    id: '1',
    title: 'تطوير الويب المتقدم',
    slug: 'advanced-web-development',
    description: 'تعلم أحدث تقنيات تطوير الويب بما في ذلك React و Next.js',
    shortDescription: 'دورة شاملة في تطوير الويب الحديث',
    provider: 'معهد التكنولوجيا المتقدمة',
    instructor: 'أحمد محمد',
    instructorId: 'inst-1',
    thumbnail: '/images/courses/web-dev.jpg',
    previewVideo: '/videos/web-dev-preview.mp4',
    level: 'متوسط',
    duration: '8 أسابيع',
    durationMinutes: 1920,
    language: 'العربية',
    price: 0,
    isFree: true,
    hasCertificate: true,
    rating: 4.9,
    reviewCount: 342,
    studentCount: 12500,
    category: {} as any,
    categoryId: 'it',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
    learningObjectives: ['بناء تطبيقات ويب حديثة', 'فهم معمارية React', 'تطبيق أفضل الممارسات'],
    requirements: ['معرفة أساسية بـ HTML/CSS', 'أساسيات JavaScript'],
    whatYouLearn: ['React Hooks', 'Next.js', 'TypeScript', 'SEO'],
    targetAudience: ['مطورو الويب', 'طلاب علوم الحاسوب'],
    status: 'published',
    featured: true,
    badge: 'الأكثر شهرة',
    lastUpdated: '2024-01-15',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'الذكاء الاصطناعي وتعلم الآلة',
    slug: 'ai-machine-learning',
    description: 'مقدمة شاملة في الذكاء الاصطناعي وتعلم الآلة باستخدام Python',
    shortDescription: 'دورة تمهيدية في AI و ML',
    provider: 'مركز الذكاء الاصطناعي',
    instructor: 'د. سارة أحمد',
    instructorId: 'inst-2',
    thumbnail: '/images/courses/ai-ml.jpg',
    level: 'مبتدئ',
    duration: '12 أسبوع',
    durationMinutes: 2880,
    language: 'العربية',
    price: 299,
    originalPrice: 599,
    isFree: false,
    hasCertificate: true,
    rating: 4.8,
    reviewCount: 256,
    studentCount: 8900,
    category: {} as any,
    categoryId: 'it',
    tags: ['Python', 'Machine Learning', 'Deep Learning', 'AI'],
    learningObjectives: ['فهم أساسيات ML', 'بناء نماذج بسيطة', 'استخدام Python للـ AI'],
    requirements: ['أساسيات البرمجة', 'رياضيات أساسية'],
    whatYouLearn: ['Python', 'Scikit-learn', 'TensorFlow', 'Neural Networks'],
    targetAudience: ['المبرمجون', 'طلاب الهندسة', 'محللو البيانات'],
    status: 'published',
    featured: false,
    lastUpdated: '2024-01-10',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'التسويق الرقمي الشامل',
    slug: 'digital-marketing-mastery',
    description: 'تعلم جميع جوانب التسويق الرقمي من SEO إلى وسائل التواصل الاجتماعي',
    shortDescription: 'دورة متكاملة في التسويق الرقمي',
    provider: 'الأكاديمية الرقمية',
    instructor: 'خالد العتيبي',
    instructorId: 'inst-3',
    thumbnail: '/images/courses/digital-marketing.jpg',
    level: 'مبتدئ',
    duration: '6 أسابيع',
    durationMinutes: 1440,
    language: 'العربية',
    price: 0,
    isFree: true,
    hasCertificate: true,
    rating: 4.7,
    reviewCount: 189,
    studentCount: 6700,
    category: {} as any,
    categoryId: 'business',
    tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    learningObjectives: ['فهم التسويق الرقمي', 'تنفيذ حملات تسويقية', 'تحليل الأداء'],
    requirements: ['مهارات استخدام الكمبيوتر', 'مهارات تواصل جيدة'],
    whatYouLearn: ['Google Analytics', 'Facebook Ads', 'SEO', 'Content Strategy'],
    targetAudience: ['المسوقون', 'أصحاب الأعمال', 'خريجو الجامعات'],
    status: 'published',
    featured: false,
    lastUpdated: '2024-01-12',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12'
  }
];

export default function Courses() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            دورات <span className="text-blue-600">مميزة</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف دوراتنا المختارة بعناية من خبراء الصناعة
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={course.id}
              className="animate-fade-in animate-stagger-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard course={{
                ...course,
                reviews: course.reviewCount,
                students: course.studentCount,
                certificate: course.hasCertificate,
                free: course.isFree,
                category: course.categoryId
              }} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/courses"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            عرض جميع الدورات
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
