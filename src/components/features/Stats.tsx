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
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-white/15 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-4000"></div>
        
        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-white/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-white/50 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-white/40 rounded-full animate-bounce delay-2000"></div>
      </div>
      
      {/* Grid Pattern */}
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
                <div className="w-20 h-20 bg-gradient-to-br from-white/50 to-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border-2 border-white/60 shadow-xl group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 text-white drop-shadow-lg" />
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
      
      {/* Bottom Wave with Animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white/20 animate-pulse" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <path fill="currentColor" d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-white/10"></div>
      </div>
    </section>
  );
}
