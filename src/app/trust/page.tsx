'use client';

import { Award, ShieldCheck, Star, Users } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">عناصر الثقة</h1>
          <p className="text-gray-600">شعارات الجهات، قصص النجاح، وأرقام الإنجازات.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <ShieldCheck className="text-blue-600 mb-4" />
            <h3 className="font-bold">جهات معتمدة</h3>
            <p className="text-sm text-gray-600">شراكات مع مؤسسات عالمية.</p>
          </Card>
          <Card className="p-6">
            <Users className="text-green-600 mb-4" />
            <h3 className="font-bold">+1,200,000 طالب</h3>
            <p className="text-sm text-gray-600">مجتمع تعلم عالمي.</p>
          </Card>
          <Card className="p-6">
            <Star className="text-yellow-500 mb-4" />
            <h3 className="font-bold">تقييم 4.9</h3>
            <p className="text-sm text-gray-600">متوسط تقييم الدورات.</p>
          </Card>
          <Card className="p-6">
            <Award className="text-purple-600 mb-4" />
            <h3 className="font-bold">قصص نجاح</h3>
            <p className="text-sm text-gray-600">طلاب حصلوا على وظائف جديدة.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
