'use client';

import { useState } from 'react';
import { MessageSquare, ThumbsUp, Users, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@\/components\/ui\/Button';
import Modal from '@/components/ui/Modal';

const discussions = [
  {
    id: 1,
    title: 'أفضل مصادر إضافية لهذا الكورس؟',
    author: 'سارة',
    replies: 12,
    likes: 35
  },
  {
    id: 2,
    title: 'كيف حللتم التمرين الثالث؟',
    author: 'محمد',
    replies: 8,
    likes: 21
  }
];

export default function CourseCommunityPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">مجتمع الدورة</h1>
            <p className="text-gray-600">ناقش المحتوى وتبادل الخبرات مع زملائك.</p>
          </div>
          <Button variant="default" size="md" className="gap-2" onClick={() => setShowModal(true)}>
            <MessageSquare size={16} /> موضوع جديد
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في المجتمع..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h3>
                <div className="text-sm text-gray-600 flex items-center gap-4">
                  <span className="flex items-center gap-1"><Users size={14} /> {discussion.author}</span>
                  <span>{discussion.replies} ردود</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={14} /> {discussion.likes}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h4 className="font-bold mb-2">إحصائيات المجتمع</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div>128 موضوع</div>
                <div>1,340 مشاركة</div>
                <div>420 عضو نشط</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="موضوع جديد">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="عنوان الموضوع"
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="اكتب تفاصيل الموضوع..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 h-24"
          />
          <Button variant="default" size="md" className="w-full">
            نشر
          </Button>
        </div>
      </Modal>
    </main>
  );
}

