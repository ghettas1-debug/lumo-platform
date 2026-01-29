'use client';

import { Smartphone, LayoutGrid, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function MobileExperiencePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">تجربة الجوال</h1>
          <p className="text-gray-600">واجهة محسّنة للجوال وسرعة أفضل.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Smartphone className="text-blue-600 mb-4" />
            <h3 className="font-bold">تنقل سريع</h3>
            <p className="text-sm text-gray-600">شريط سفلي مبسط.</p>
          </Card>
          <Card className="p-6">
            <LayoutGrid className="text-green-600 mb-4" />
            <h3 className="font-bold">أزرار واضحة</h3>
            <p className="text-sm text-gray-600">CTA مرئية وسهلة.</p>
          </Card>
          <Card className="p-6">
            <Zap className="text-purple-600 mb-4" />
            <h3 className="font-bold">أداء أعلى</h3>
            <p className="text-sm text-gray-600">تحميل سريع على الجوال.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
