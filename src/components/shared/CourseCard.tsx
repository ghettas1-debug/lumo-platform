import React from 'react';
import { PlayCircle, Star } from 'lucide-react';
import Link from 'next/link';

interface CourseProps {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  price: string;
}

export default function CourseCard({ id, title, instructor, rating, students, image, price }: CourseProps) {
  return (
    <Link href={`/courses/${id}`} className="group">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Course Thumbnail */}
        <div className={`${image} h-40 relative overflow-hidden flex items-center justify-center`}>
          <PlayCircle className="text-white/50 group-hover:text-white transition-all" size={60} />
        </div>

        {/* Course Details */}
        <div className="p-6 flex flex-col grow">
          <h3 className="font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-all line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 font-bold">{instructor}</p>
          
          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="font-black text-gray-900">{rating}</span>
              </div>
              {/* حل مشكلة الـ Hydration مدمج هنا */}
              <span suppressHydrationWarning className="text-gray-500 font-bold">
                {students.toLocaleString()} طالب
              </span>
            </div>
            
            <button className="w-full bg-blue-600 text-white font-black py-3 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer">
              {price}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
