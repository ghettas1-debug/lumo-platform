"use client";

import { useState } from 'react';
import { Star, Users, BookOpen, Award, PlayCircle, Filter, Search } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function InstructorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'التسويق', 'الأعمال'];

  // بيانات وهمية للمدربين مع إضافة دوراتهم
  const instructors = [
    {
      id: 1,
      name: 'أحمد محمود',
      title: 'خبير تطوير الويب والذكاء الاصطناعي',
      bio: 'مطور برمجيات بخبرة 10 سنوات في تطوير تطبيقات الويب والذكاء الاصطناعي. عملت مع شركات عالمية مثل Google و Microsoft.',
      specialties: ['Python', 'JavaScript', 'React', 'Machine Learning'],
      rating: 4.9,
      students: 25000,
      courses: 8,
      category: 'البرمجة',
      avatar: null,
      achievements: ['أفضل مدرب 2023', '100+ تقييم 5 نجوم'],
      languages: ['العربية', 'الإنجليزية'],
      experience: '10 سنوات',
      courseIds: [1, 4, 6] // روابط الدورات
    },
    {
      id: 2,
      name: 'سارة علي',
      title: 'خبيرة تطوير الواجهات الأمامية',
      bio: 'مطورة واجهات أمامية متخصصة في React و Next.js. شغوفة بتعليم أحدث تقنيات الويب.',
      specialties: ['React', 'Next.js', 'TypeScript', 'CSS'],
      rating: 4.8,
      students: 18000,
      courses: 6,
      category: 'البرمجة',
      avatar: null,
      achievements: ['خبيرة Next.js', '50+ دورة ناجحة'],
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
      experience: '7 سنوات',
      courseIds: [2] // روابط الدورات
    },
    {
      id: 3,
      name: 'محمد سالم',
      title: 'مصمم UX/UI احترافي',
      bio: 'مصمم تجربة مستخدم وواجهات بخبرة 8 سنوات. عملت مع شركات ناشئة وعالمية في تصميم منتجات رقمية مبتكرة.',
      specialties: ['UI Design', 'UX Research', 'Figma', 'Adobe XD'],
      rating: 4.7,
      students: 12000,
      courses: 5,
      category: 'التصميم',
      avatar: null,
      achievements: ['أفضل مصمم 2022', 'تصميم 100+ تطبيق'],
      languages: ['العربية', 'الإنجليزية'],
      experience: '8 سنوات',
      courseIds: [3] // روابط الدورات
    },
    {
      id: 4,
      name: 'ليلى أحمد',
      title: 'خبيرة تحليل البيانات',
      bio: 'محللة بيانات متخصصة في Python و R. خبرة واسعة في تحليل البيانات الضخمة وبناء نماذج التعلم الآلي.',
      specialties: ['Python', 'R', 'SQL', 'Machine Learning'],
      rating: 4.9,
      students: 15000,
      courses: 7,
      category: 'البيانات',
      avatar: null,
      achievements: ['خبيرة Python', '100+ مشروع'],
      languages: ['العربية', 'الإنجليزية'],
      experience: '9 سنوات',
      courseIds: [5] // روابط الدورات
    },
    {
      id: 5,
      name: 'خالد حسين',
      title: 'خبير التسويق الرقمي',
      bio: 'مسوق رقمي متخصص في التسويق عبر محركات البحث ووسائل التواصل الاجتماعي. خبرة في بناء استراتيجيات تسويق ناجحة.',
      specialties: ['SEO', 'SEM', 'Social Media', 'Content Marketing'],
      rating: 4.6,
      students: 20000,
      courses: 4,
      category: 'التسويق',
      avatar: null,
      achievements: ['خبير SEO', '1000+ حملة ناجحة'],
      languages: ['العربية', 'الإنجليزية'],
      experience: '6 سنوات',
      courseIds: [7] // روابط الدورات
    },
    {
      id: 6,
      name: 'ريم الخالد',
      title: 'خبيرة إدارة المشاريع',
      bio: 'مديرة مشاريع معتمدة (PMP) بخبرة 12 سنة في إدارة المشاريع التقنية والتحول الرقمي.',
      specialties: ['PMP', 'Agile', 'Scrum', 'Project Management'],
      rating: 4.8,
      students: 8000,
      courses: 3,
      category: 'الأعمال',
      avatar: null,
      achievements: ['PMP معتمدة', '50+ مشروع ناجح'],
      languages: ['العربية', 'الإنجليزية'],
      experience: '12 سنوات',
      courseIds: [8] // روابط الدورات
    }
  ];

  // فلترة المدربين
  const filteredInstructors = instructors.filter(instructor => {
    const matchesCategory = selectedCategory === 'الكل' || instructor.category === selectedCategory;
    const matchesSearch = instructor.name.includes(searchQuery) || 
                         instructor.title.includes(searchQuery) ||
                         instructor.specialties.some(spec => spec.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">مدربونا الخبراء</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            تعلم من أفضل المدربين في العالم العربي. مدربون محترفون بخبرة عملية في مجالاتهم
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن مدرب، تخصص، أو مهارة..."
                className="flex-1 p-4 text-gray-900 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" size="lg" className="rounded-xl">
                بحث
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Filter size={24} />
                <h2 className="text-2xl font-bold">تصفية النتائج</h2>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-4">التخصصات</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-right p-3 rounded-lg transition-all ${
                        selectedCategory === cat 
                          ? 'bg-blue-50 text-blue-600 font-bold border-2 border-blue-200' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredInstructors.length}
                </div>
                <div className="text-gray-500">مدرب متاح</div>
              </div>
            </Card>
          </aside>

          {/* Instructors Grid */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                جميع المدربين
              </h2>
              <p className="text-gray-500">
                عرض {filteredInstructors.length} مدرب من أصل {instructors.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInstructors.map((instructor) => (
                <Card key={instructor.id} className="hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Instructor Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-linear-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {instructor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{instructor.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500" size={14} fill="currentColor" />
                            <span className="font-bold">{instructor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{instructor.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{instructor.courses} دورة</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{instructor.bio}</p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2">التخصصات</h4>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((spec, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2">الإنجازات</h4>
                      <div className="space-y-1">
                        {instructor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="text-green-500" size={12} />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages & Experience */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div>
                        <span className="font-medium">اللغات:</span> {instructor.languages.join(', ')}
                      </div>
                      <div>
                        <span className="font-medium">الخبرة:</span> {instructor.experience}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link href={`/courses?instructor=${instructor.id}`} className="flex-1">
                        <Button variant="primary" className="w-full">
                          عرض الدورات
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        <PlayCircle size={16} className="ml-2" />
                        معاينة
                      </Button>
                    </div>

                    {/* Courses List */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-gray-700 mb-3">دورات هذا المدرب</h4>
                      <div className="space-y-2">
                        {instructor.courseIds.map((courseId) => (
                          <Link 
                            key={courseId}
                            href={`/courses/${courseId}`}
                            className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                دورة رقم {courseId}
                              </span>
                              <span className="text-xs text-blue-600 font-medium">
                                عرض التفاصيل
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredInstructors.length === 0 && (
              <Card className="text-center py-16">
                <div className="text-gray-400 mb-4 text-6xl">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">لم نعثر على مدربين</h3>
                <p className="text-gray-500 mb-6">جرب تغيير كلمات البحث أو التخصصات المحددة</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('الكل');
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

