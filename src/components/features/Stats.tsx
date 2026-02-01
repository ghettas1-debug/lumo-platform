'use client';

import React from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50M+',
    label: 'متعلم',
    description: 'من جميع أنحاء العالم'
  },
  {
    icon: BookOpen,
    value: '6000+',
    label: 'دورة مجانية',
    description: 'في مختلف المجالات'
  },
  {
    icon: Award,
    value: '15M+',
    label: 'خريج',
    description: 'حاصلون على شهادات'
  },
  {
    icon: Globe,
    value: '193',
    label: 'دولة',
    description: 'نتواجد فيها'
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            تعلم من خبراء عالميين
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            انضم إلى ملايين المتعلمين وتمكين لمستقبلك المهني
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-bold mb-1">
                  {stat.label}
                </div>
                <div className="text-blue-100">
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
