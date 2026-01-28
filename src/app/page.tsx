"use client"; // ضروري لتفعيل التفاعل والذكاء الاصطناعي في الواجهة

import React, { useState } from 'react';
import { 
  Sparkles, BrainCircuit, Trophy, Users, 
  PlayCircle, Star, ChevronRight, Zap, 
  Award, Target, BookOpen 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('الكل');

  const stats = [
    { label: 'ساعة تعليمية', value: '150K+', icon: <PlayCircle className="text-blue-400" /> },
    { label: 'متعلم نشط', value: '2M+', icon: <Users className="text-green-400" /> },
    { label: 'شهادة معتمدة', value: '500K+', icon: <Award className="text-purple-400" /> },
    { label: 'خبير وموجه', value: '1.2K+', icon: <Star className="text-yellow-400" /> },
  ];

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground) selection:bg-blue-100">
      
      {/* 1. قسم الترحيب الذكي - Hero AI Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-blue-50)_0%,transparent_70%)] opacity-50 -z-10" />
        
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 animate-bounce">
            <Sparkles size={16} />
            <span>جديد: مساعد لومو الذكي متاح الآن لجميع الطلاب</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            مستقبل <span className="text-blue-600">التعلم</span> <br />
            بين يديك مع LUMO
          </h1>
          
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            نستخدم الذكاء الاصطناعي لتصميم مسار تعليمي خاص بك وحدك. تعلم، تدرب، واحصل على وظيفة أحلامك في منصة واحدة متكاملة.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl shadow-blue-200 cursor-pointer">
              ابدأ مسارك الذكي
              <ChevronRight size={24} />
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-gray-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all cursor-pointer">
              <Zap size={20} className="text-yellow-500" />
              جرب العرض المباشر
            </button>
          </div>
        </div>
      </section>

      {/* 2. قسم المميزات الذكية - AI Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">لماذا تختار LUMO؟</h2>
            <p className="text-gray-500 font-bold">تقنيات 2026 في خدمتك اليوم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-10 rounded-3xl bg-blue-50/50 border border-blue-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">توجيه بالذكاء الاصطناعي</h3>
              <p className="text-gray-600 leading-relaxed font-medium">نحلل نقاط قوتك وضعفك لنقترح عليك الدروس التي تحتاجها فعلياً لتوفير وقتك.</p>
            </div>

            <div className="p-10 rounded-3xl bg-purple-50/50 border border-purple-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">نظام التلعيب (Gamification)</h3>
              <p className="text-gray-600 leading-relaxed font-medium">اجمع النقاط (XP)، نافس زملائك، واحصل على أوسمة رقمية حقيقية مع كل إنجاز.</p>
            </div>

            <div className="p-10 rounded-3xl bg-green-50/50 border border-green-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">ربط مباشر بالتوظيف</h3>
              <p className="text-gray-600 leading-relaxed font-medium">شهاداتنا مرتبطة بآلاف الوظائف العالمية. أكمل المسار واحصل على مقابلة عمل فوراً.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. قسم الإحصائيات الحية - Live Stats */}
      <section className="py-20 border-y border-gray-100 bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. قسم مسارات التعلم - Learning Paths */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black mb-4">ابدأ مسارك المهني</h2>
            <p className="text-gray-500 font-medium">مجموعات من الكورسات المترابطة لتصبح خبيراً في مجالك</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-2xl">
            {['الكل', 'برمجة', 'بزنس', 'تصميم'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeTab === tab ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-[40px] bg-gray-900 text-white p-12 flex flex-col justify-end min-h-100 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com')] bg-cover opacity-30 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="bg-blue-600 w-fit px-4 py-1 rounded-full text-xs font-black mb-4 uppercase">المسار الأكثر طلباً</div>
              <h3 className="text-4xl font-black mb-4">خبير تطوير الويب المتكامل (Full-Stack)</h3>
              <p className="text-gray-300 mb-8 max-w-md">12 كورس | 6 أشهر | ضمان وظيفة</p>
              <button className="flex items-center gap-2 font-black text-blue-400 group-hover:text-blue-300 transition-colors">
                استكشف المسار <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white border border-gray-100 rounded-[40px] p-8 hover:shadow-xl transition-all flex items-center gap-6 cursor-pointer group">
              <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-all">
                <BookOpen size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1">أساسيات الإدارة الرقمية</h4>
                <p className="text-gray-500 font-medium">8 كورسات | شهادة من جوجل</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-[40px] p-8 hover:shadow-xl transition-all flex items-center gap-6 cursor-pointer group">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <BrainCircuit size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1">علم البيانات والذكاء الاصطناعي</h4>
                <p className="text-gray-500 font-medium">15 كورس | شهادة من IBM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. تذييل الصفحة المطور - Smart Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[60px]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20 text-right">
          <div className="col-span-1 lg:col-span-1">
            <div className="text-4xl font-black italic text-blue-500 mb-8">LUMO</div>
            <p className="text-gray-400 font-medium leading-relaxed">
              ننير طريقك بالمعرفة منذ عام 2026. انضم إلى ثورة التعلم الرقمي اليوم.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-black mb-8">استكشف</h5>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-blue-500 transition">كل الكورسات</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">المسارات المهنية</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">عروض الشركات</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-black mb-8">المجتمع</h5>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><a href="#" className="hover:text-blue-500 transition">منتدى الطلاب</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">المدونة التعليمية</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">قصص النجاح</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-black mb-8">النشرة البريدية</h5>
            <div className="flex gap-2">
              <input type="email" placeholder="بريدك الإلكتروني" className="bg-gray-800 border-none px-4 py-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 border-t border-gray-800 pt-8 font-bold text-sm">
          © 2026 LUMO. تم التصميم بحب لطلاب العلم في كل مكان.
        </div>
      </footer>
    </main>
  );
}
