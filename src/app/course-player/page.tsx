"use client";

import React, { useState } from 'react';
import { 
  PlayCircle, CheckCircle2, Circle, ChevronRight, 
  ChevronLeft, FileText, MessageSquare, Settings, 
  Share2, Download, ThumbsUp, MoreVertical, Search
} from 'lucide-react';

// --- بيانات الوحدات والدروس (مثل هيكلة كورسيرا) ---
const COURSE_CONTENT = [
  {
    title: "الوحدة الأولى: أساسيات المنصة",
    lessons: [
      { id: 1, title: "مرحباً بك في LUMO", duration: "05:20", completed: true },
      { id: 2, title: "كيف تستفيد من هذا الكورس؟", duration: "10:15", completed: true },
    ]
  },
  {
    title: "الوحدة الثانية: بيئة التطوير",
    lessons: [
      { id: 3, title: "تثبيت VS Code والإضافات", duration: "15:45", completed: false },
      { id: 4, title: "مقدمة في Next.js 15", duration: "22:10", completed: false },
      { id: 5, title: "بناء أول صفحة لك", duration: "18:30", completed: false },
    ]
  }
];

export default function CoursePlayer() {
  const [activeLesson, setActiveLesson] = useState(3); // الدرس الحالي
  const [activeTab, setActiveTab] = useState('overview'); // التبويبات أسفل الفيديو

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row rtl text-right">
      
      {/* 1. منطقة الفيديو والمحتوى (اليسار/الوسط) */}
      <main className="flex-1 lg:h-[calc(100vh-80px)] overflow-y-auto">
        {/* مشغل الفيديو */}
        <div className="aspect-video bg-black w-full relative shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
             <PlayCircle className="text-white/50 group-hover:text-white transition-all" size={80} />
          </div>
          {/* شريط تحكم وهمي سفلي */}
          <div className="absolute bottom-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent flex justify-between items-center text-white">
            <div className="flex gap-4 items-center">
              <PlayCircle size={20} />
              <div className="h-1 w-48 bg-gray-600 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-1/3"></div>
              </div>
              <span className="text-xs">05:10 / 15:45</span>
            </div>
            <Settings size={18} className="cursor-pointer" />
          </div>
        </div>

        {/* معلومات الدرس والتفاعل */}
        <div className="p-6 md:p-8 bg-white border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">تثبيت VS Code والإضافات الأساسية</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 font-bold"><PlayCircle size={14}/> الفيديو 3 من 5</span>
                <span className="flex items-center gap-1 font-bold"><Clock size={14} className="text-blue-500"/> 15 دقيقة</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all cursor-pointer">
                <Share2 size={16} /> مشاركة
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 cursor-pointer">
                الدرس التالي <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* تبويبات المحتوى (Overview, Notes, Resources) */}
        <div className="p-6 md:p-8">
          <div className="flex border-b border-gray-100 mb-6 gap-8">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="نظرة عامة" />
            <TabButton active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} label="ملاحظاتي" />
            <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} label="المصادر" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 min-h-[200px]">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed font-bold">في هذا الدرس، سنتعلم كيفية تحويل VS Code إلى بيئة تطوير احترافية تدعم Next.js 15 و Tailwind CSS v4 بشكل كامل.</p>
                <ul className="list-disc pr-5 space-y-2 text-gray-500 text-sm font-bold">
                  <li>تحميل Git لتعامل مع المستودعات.</li>
                  <li>إضافة ESLint و Prettier لتنسيق الكود.</li>
                  <li>ضبط اختصارات الكيبورد لتسريع العمل.</li>
                </ul>
              </div>
            )}
            {activeTab === 'notes' && <textarea placeholder="اكتب ملاحظاتك هنا..." className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-bold" />}
          </div>
        </div>
      </main>

      {/* 2. قائمة الدروس الجانبية (اليمين) */}
      <aside className="w-full lg:w-96 bg-white border-r border-gray-200 h-screen sticky top-20 overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-4">محتوى الكورس</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input type="text" placeholder="بحث عن درس..." className="w-full bg-gray-50 py-2.5 pl-10 pr-4 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {COURSE_CONTENT.map((unit, uIdx) => (
            <div key={uIdx} className="p-4">
              <h3 className="font-black text-sm text-gray-400 mb-4 px-2 uppercase tracking-wider">{unit.title}</h3>
              <div className="space-y-2">
                {unit.lessons.map((lesson) => (
                  <button 
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${activeLesson === lesson.id ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? <CheckCircle2 className="text-green-500" size={18} /> : <Circle className="text-gray-300" size={18} />}
                      <span className={`text-sm font-black ${activeLesson === lesson.id ? 'text-blue-600' : 'text-gray-700'}`}>{lesson.title}</span>
                    </div>
                    <span className="text-[10px] font-bold opacity-60">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

// مكون فرعي للتبويبات
function TabButton({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-4 px-2 text-sm font-black transition-all cursor-pointer ${active ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {label}
    </button>
  );
}

// استيراد الأيقونات المفقودة
import { Clock } from 'lucide-react';
