'use client';

import React from 'react';
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  CheckCircle,
  Star,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const trustBadges = [
  {
    icon: Users,
    number: '2M+',
    label: 'طالب نشط',
    description: 'من جميع أنحاء العالم'
  },
  {
    icon: BookOpen,
    number: '10K+',
    label: 'دورة تدريبية',
    description: 'في مختلف المجالات'
  },
  {
    icon: Award,
    number: '500K+',
    label: 'شهادة معتمدة',
    description: 'معترف بها عالمياً'
  },
  {
    icon: Globe,
    number: '180+',
    label: 'دولة',
    description: 'تغطية عالمية'
  },
  {
    icon: Shield,
    number: '100%',
    label: 'آمن',
    description: 'حماية البيانات'
  },
  {
    icon: Star,
    number: '4.8/5',
    label: 'تقييم',
    description: 'رضا الطلاب'
  }
];

const partners = [
  { name: 'Google', logo: '/images/partners/google.png' },
  { name: 'Microsoft', logo: '/images/partners/microsoft.png' },
  { name: 'IBM', logo: '/images/partners/ibm.png' },
  { name: 'Amazon', logo: '/images/partners/amazon.png' },
  { name: 'Meta', logo: '/images/partners/meta.png' },
  { name: 'Apple', logo: '/images/partners/apple.png' }
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50 border-y border-gray-200">
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <badge.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{badge.number}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{badge.label}</div>
              <div className="text-xs text-gray-500">{badge.description}</div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            شركاؤنا الموثوقون عالمياً
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              منصة معتمدة من قبل المؤسسات التعليمية الرائدة عالمياً
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
