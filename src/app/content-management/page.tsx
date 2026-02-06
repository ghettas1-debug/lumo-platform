'use client';

import { FileText, Video, UploadCloud, Settings } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@\/components\/ui\/Button';

export default function ContentManagementPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">إدارة المحتوى</h1>
            <p className="text-gray-600">لوحة تنظيم الدروس، الوحدات، والموارد.</p>
          </div>
          <Button variant="default" size="md" className="gap-2">
            <UploadCloud size={16} /> إضافة محتوى
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <Video className="text-blue-600 mb-4" />
            <h3 className="font-bold">إدارة الدروس</h3>
            <p className="text-sm text-gray-600">رفع فيديوهات وتنظيمها.</p>
          </Card>
          <Card className="p-6">
            <FileText className="text-green-600 mb-4" />
            <h3 className="font-bold">الملفات والموارد</h3>
            <p className="text-sm text-gray-600">مرفقات PDF وأكواد.</p>
          </Card>
          <Card className="p-6">
            <Settings className="text-purple-600 mb-4" />
            <h3 className="font-bold">إعدادات الدورة</h3>
            <p className="text-sm text-gray-600">أسعار، شهادات، ونشر.</p>
          </Card>
          <Card className="p-6">
            <UploadCloud className="text-orange-600 mb-4" />
            <h3 className="font-bold">جدولة النشر</h3>
            <p className="text-sm text-gray-600">خطة نشر منظمة.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}

