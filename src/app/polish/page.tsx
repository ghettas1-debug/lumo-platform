'use client';

import { Sparkles, Loader, Layers } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function PolishPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">تفاصيل دقيقة (Polish)</h1>
          <p className="text-gray-600">Skeleton Loading، Animations، وتحسين التباين والطباعة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Loader className="text-blue-600 mb-4" />
            <h3 className="font-bold">Skeleton Loading</h3>
            <p className="text-sm text-gray-600">تحميل جذاب.</p>
          </Card>
          <Card className="p-6">
            <Sparkles className="text-purple-600 mb-4" />
            <h3 className="font-bold">Animations مدروسة</h3>
            <p className="text-sm text-gray-600">حركات بسيطة وفعالة.</p>
          </Card>
          <Card className="p-6">
            <Layers className="text-green-600 mb-4" />
            <h3 className="font-bold">تحسين التباين</h3>
            <p className="text-sm text-gray-600">قراءة أسهل وتجربة أفضل.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
