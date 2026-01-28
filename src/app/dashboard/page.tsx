"use client";
import { BookOpen, Trophy, Zap, Clock, Play, ChevronLeft, Target } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const myCourses = [
    { id: 1, title: "احتراف لغة بايثون 2026", progress: 65, lastLesson: "الدوال (Functions)", color: "bg-blue-600" },
    { id: 2, title: "تصميم واجهات UI/UX", progress: 30, lastLesson: "نظام الألوان وتناسقها", color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
            <ChevronLeft size={18} />
            العودة للمنصة الرئيسية
          </Link>
        </div>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">مرحباً بك، يا بطل! 🚀</h1>
            <p className="text-gray-500 font-medium">أنت تبلي بلاءً حسناً، بقي لك 3 دروس لإنهاء هدفك الأسبوعي.</p>
          </div>
          <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600"><Zap size={24} fill="currentColor" /></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">نقاط الخبرة</p>
                <p className="text-xl font-black text-gray-900">2,840 XP</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Trophy size={24} /></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">المستوى</p>
                <p className="text-xl font-black text-gray-900">Lvl 14</p>
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" /> استكمل التعلم
            </h2>
            {myCourses.map((course) => (
              <div key={course.id} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{course.title}</h3>
                    <p className="text-gray-500 font-medium mt-1">الدرس القادم: {course.lastLesson}</p>
                  </div>
                  <button className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-100 cursor-pointer"><Play size={24} fill="currentColor" /></button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-black">
                    <span className="text-blue-600">{course.progress}% اكتمل</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2"><Target size={24} className="text-red-500" /> أداؤك الأسبوعي</h2>
            <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl text-center">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-gray-800 border-t-blue-500 mb-6 font-black text-2xl">14.5h</div>
              <h4 className="text-xl font-bold mb-2">وقت التعلم</h4>
              <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black mt-8">تقرير كامل</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
