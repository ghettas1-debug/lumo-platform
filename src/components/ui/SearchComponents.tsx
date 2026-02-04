"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Fuse from 'fuse.js';

// بيانات وهمية للبحث
const coursesData = [
  { id: 1, title: 'احتراف Python 2026', instructor: 'أحمد محمود', category: 'البرمجة', level: 'متوسط', duration: '40 ساعة', rating: 4.9, students: 12500 },
  { id: 2, title: 'Next.js المتقدم', instructor: 'سارة علي', category: 'البرمجة', level: 'متقدم', duration: '35 ساعة', rating: 4.8, students: 8900 },
  { id: 3, title: 'تصميم UI/UX احترافي', instructor: 'محمد سالم', category: 'التصميم', level: 'متوسط', duration: '30 ساعة', rating: 4.7, students: 7600 },
  { id: 4, title: 'React من الصفر', instructor: 'ليلى أحمد', category: 'البرمجة', level: 'مبتدئ', duration: '45 ساعة', rating: 4.9, students: 14200 },
  { id: 5, title: 'تحليل البيانات', instructor: 'خالد عبدالله', category: 'البيانات', level: 'متوسط', duration: '50 ساعة', rating: 4.6, students: 5400 },
  { id: 6, title: 'التسويق الرقمي', instructor: 'نورا سعيد', category: 'التسويق', level: 'مبتدئ', duration: '25 ساعة', rating: 4.5, students: 9800 },
];

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<typeof coursesData>(coursesData);

  // إعداد Fuse للبحث الغامض
  const fuse = new Fuse(coursesData, {
    keys: ['title', 'instructor', 'category', 'level'],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults(coursesData);
    }
  }, [searchTerm]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">بحث متقدم</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ابحث عن دورة، مدرب، أو فئة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />
      </div>
      
      <div className="space-y-4">
        {results.map((course) => (
          <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg">{course.title}</h4>
            <p className="text-gray-600">{course.instructor}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {course.category}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {course.level}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{course.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">{course.students.toLocaleString()} طالب</span>
            </div>
          </div>
        ))}
      </div>
      
      {results.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          لا توجد نتائج بحث لـ "{searchTerm}"
        </div>
      )}
    </Card>
  );
}

export function FilterComponent() {
  const [category, setCategory] = useState<string>('الكل');
  const [level, setLevel] = useState<string>('الكل');

  const categories = ['الكل', 'البرمجة', 'التصميم', 'البيانات', 'التسويق'];
  const levels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

  const filteredCourses = coursesData.filter(course => {
    const categoryMatch = category === 'الكل' || course.category === category;
    const levelMatch = level === 'الكل' || course.level === level;
    return categoryMatch && levelMatch;
  });

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">تصفية الدورات</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الفئة:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">المستوى:</label>
          <div className="flex flex-wrap gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  level === lvl
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-600">
          تم العثور على <span className="font-bold text-blue-600"> {filteredCourses.length} </span> دورة
        </p>
      </div>
    </Card>
  );
}
