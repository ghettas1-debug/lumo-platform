'use client';

import React from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'طالب نشط',
    description: 'من جميع أنحاء العالم'
  },
  {
    icon: BookOpen,
    value: '100+',
    label: 'دورة تدريبية',
    description: 'في مختلف المجالات'
  },
  {
    icon: Award,
    value: '10,000+',
    label: 'شهادة معتمدة',
    description: 'ممنوحة هذا العام'
  },
  {
    icon: Globe,
    value: '30+',
    label: 'دولة',
    description: 'نتواجد فيها'
  }
];

export default function Stats() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-bold mb-1">
                  {stat.label}
                </div>
                <div className="text-blue-100 text-sm">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
