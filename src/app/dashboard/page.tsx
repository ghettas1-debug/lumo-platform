"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Award, PlayCircle, LayoutDashboard, 
  Calendar, TrendingUp, Star, Flame, Target, 
  BookMarked, Users, MessageSquare, DollarSign, Zap, Sun, Moon, Globe, GraduationCap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Types ---
interface Course { id: number; title: string; instructor: string; progress: number; totalLessons: number; completedLessons: number; image: string; category: string; }
interface Recommendation { id: number; title: string; rating: number; students: string; price: string; }
interface Grade { name: string; grade: number; }

// --- Data ---
const ENROLLED_COURSES: Course[] = [
  { id: 1, title: "تطوير تطبيقات الويب باستخدام Next.js 15", instructor: "د. أسامة مبرمج", progress: 85, totalLessons: 24, completedLessons: 20, image: "https://images.unsplash.com", category: "برمجة" },
  { id: 2, title: "تصميم تجربة المستخدم UX المتقدمة", instructor: "أ. ليلى مصمم", progress: 45, totalLessons: 12, completedLessons: 5, image: "https://images.unsplash.com", category: "تصميم" }
];

const RECOMMENDATIONS: Recommendation[] = [
  { id: 1, title: "أساسيات الذكاء الاصطناعي", rating: 4.9, students: "15k", price: "مجاني" },
  { id: 2, title: "إدارة المشاريع الرشيقة Agile", rating: 4.7, students: "8k", price: "مدفوع" }
];

const GRADE_DATA: Grade[] = [
  { name: 'الأسبوع 1', grade: 75 },
  { name: 'الأسبوع 2', grade: 80 },
  { name: 'الأسبوع 3', grade: 92 },
  { name: 'الأسبوع 4', grade: 88 },
];

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [isInstructor, setIsInstructor] = useState(false); // ميزة التبديل للمدرس

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f8f9fa] text-gray-900'} flex flex-col lg:flex-row rtl text-right font-sans`}>
      
      {/* 1. Sidebar */}
      <aside className={`hidden lg:flex w-72 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l flex-col sticky top-20 h-[calc(100vh-80px)] p-6`}>
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 px-4 tracking-widest">القائمة الرئيسية</h3>
            <nav className="space-y-2">
              <SidebarItem icon={<LayoutDashboard size={20}/>} label="لوحة التحكم" active isDarkMode={isDarkMode} />
              <SidebarItem icon={<BookOpen size={20}/>} label="مساراتي" isDarkMode={isDarkMode} />
              <SidebarItem icon={<Calendar size={20}/>} label="الجدول الدراسي" isDarkMode={isDarkMode} />
              <SidebarItem icon={<Users size={20}/>} label="لوحة المتصدرين" isDarkMode={isDarkMode} />
            </nav>
          </section>

          <section className={`pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 px-4 tracking-widest">شخصي</h3>
            <nav className="space-y-2">
              <SidebarItem icon={<Award size={20}/>} label="الشهادات" isDarkMode={isDarkMode} />
              <SidebarItem icon={<DollarSign size={20}/>} label="الفواتير والمدفوعات" isDarkMode={isDarkMode} />
            </nav>
          </section>
        </div>
        
        {/* ميزة التبديل لمقدمي الكورسات */}
        <div className={`mt-auto p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} flex items-center justify-between`}>
           <div className='flex items-center gap-3'>
             <GraduationCap className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}/>
             <span className='text-sm font-bold'>{isInstructor ? 'وضع الطالب' : 'وضع المدرس'}</span>
           </div>
           <button onClick={() => setIsInstructor(!isInstructor)} className='text-xs text-blue-500 hover:underline'>
             تبديل
           </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header & Settings Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h1 className="text-3xl font-black italic">أهلاً بك يا بطل! 👋</h1>
          
          <div className="flex gap-4 items-center">
            {/* Dark Mode Switch */}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
              {isDarkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-gray-600"/>}
            </button>
            
            {/* Language Switch */}
             <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-md flex items-center gap-2`}>
              <Globe size={16} />
              <span className='text-xs font-bold'>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
            
             <StatCard icon={<Flame className="text-orange-500"/>} value="5" label="أيام متتالية" isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Courses & Recommendations */}
          <div className="xl:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black mb-6">كورساتك الحالية</h2>
              <div className="grid grid-cols-1 gap-6">
                {ENROLLED_COURSES.map(course => (
                  <CourseCardWide key={course.id} course={course} isDarkMode={isDarkMode} />
                ))}
              </div>
            </section>

            {/* الإقتراحات (AI Powered) */}
            <section>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Zap className='text-blue-500'/> مقترح لك (بواسطة LUMO AI)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECOMMENDATIONS.map(rec => (
                  <div key={rec.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-5 rounded-2xl border flex justify-between items-center hover:shadow-lg transition-all group cursor-pointer`}>
                    <div>
                      <h4 className="font-bold mb-1 group-hover:text-blue-500 transition-colors">{rec.title}</h4>
                      <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor"/> {rec.rating}</span>
                        <span>{rec.students} طالب</span>
                      </div>
                    </div>
                    <button className="text-blue-500 font-black text-sm">{rec.price}</button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Activity Section */}
          <div className="space-y-10">
             {/* المواعيد النهائية القادمة */}
             <section className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-3xl border shadow-sm`}>
              <h3 className="font-black mb-4 flex items-center gap-2">
                <Calendar className="text-blue-500" /> المواعيد النهائية القادمة
              </h3>
              <ul className='space-y-3'>
                <li className='flex justify-between items-center text-sm'>
                  <span>تسليم مشروع البرمجة</span>
                  <span className='text-red-500 font-bold'>غداً، 5 مساءً</span>
                </li>
                 <li className='flex justify-between items-center text-sm'>
                  <span>اختبار منتصف الكورس UI/UX</span>
                  <span className='text-orange-500 font-bold'>بعد يومين</span>
                </li>
              </ul>
             </section>

             {/* سجل الدرجات (Grades Overview) */}
             <section className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-3xl border shadow-sm`}>
              <h3 className="font-black mb-4 flex items-center gap-2">
                <TrendingUp className="text-blue-500" /> سجل الدرجات الأخير
              </h3>
               <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={GRADE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4b5563' : '#f1f5f9'} />
                    <XAxis dataKey="name" stroke={isDarkMode ? '#9ca3af' : '#64748b'} />
                    <YAxis stroke={isDarkMode ? '#9ca3af' : '#64748b'} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="grade" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
             </section>

          </div>

        </div>
        
        {/* مساعد LUMO الذكي (Chatbot Placeholder) */}
        <div className="fixed bottom-6 left-6 bg-blue-600 p-4 rounded-full shadow-2xl cursor-pointer hover:bg-blue-700 transition-all">
          <MessageSquare className="text-white w-8 h-8" />
        </div>
      </main>
    </div>
  );
}

// --- Components with strict types ---

function SidebarItem({ icon, label, active = false, isDarkMode }: { icon: React.ReactNode; label: string; active?: boolean; isDarkMode: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all cursor-pointer ${active ? 'bg-blue-600 text-white shadow-lg' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function StatCard({ icon, value, label, isDarkMode }: { icon: React.ReactNode; value: string; label: string; isDarkMode: boolean }) {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} px-6 py-4 rounded-2xl border flex items-center gap-4 shadow-sm min-w-35`}>
      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>{icon}</div>
      <div>
        <div className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{value}</div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function CourseCardWide({ course, isDarkMode }: { course: Course; isDarkMode: boolean }) {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-r-blue-500' : 'bg-white border-gray-100 hover:border-r-blue-600'} p-5 rounded-3xl border flex flex-col md:flex-row gap-6 hover:shadow-2xl transition-all group border-r-4 border-r-transparent`}>
      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden relative shrink-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="text-white w-10 h-10" />
        </div>
      </div>
      
      <div className="flex-1 space-y-4 text-right">
        <div>
          <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase mb-2 inline-block ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
            {course.category}
          </span>
          <h3 className={`text-lg font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{course.title}</h3>
          <p className="text-xs text-gray-500 font-bold mt-1">بواسطة {course.instructor}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-black">
            <span className="text-blue-500 font-black">{course.progress}%</span>
            <span className="text-gray-500">إنجاز {course.completedLessons}/{course.totalLessons} درس</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-blue-600 transition-all whitespace-nowrap cursor-pointer shadow-md active:scale-95">
          مواصلة التعلم
        </button>
      </div>
    </div>
  );
}
