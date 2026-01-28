'use client';

import { Users, GraduationCap, PlayCircle, Star } from 'lucide-react';

const stats = [
  { id: 1, label: 'طالب نشط', value: '+10,000', icon: Users, color: 'text-blue-600' },
  { id: 2, label: 'دورة تدريبية', value: '+500', icon: PlayCircle, color: 'text-purple-600' },
  { id: 3, label: 'مدرب خبير', value: '+120', icon: GraduationCap, color: 'text-green-600' },
  { id: 4, label: 'تقييم المنصة', value: '4.9/5', icon: Star, color: 'text-yellow-500' },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800" aria-label="إحصائيات المنصة">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="flex flex-col items-center text-center p-4 transition-transform hover:scale-105 focus-within:outline-none"
                role="group"
                aria-label={stat.label}
              >
                <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 mb-4 ${stat.color}`}>
                  <IconComponent size={28} aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
