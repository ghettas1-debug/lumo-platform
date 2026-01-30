'use client';

import { LayoutGrid, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import Tooltip from '@/components/ui/Tooltip';
import Table from '@/components/ui/Table';
import Stepper from '@/components/ui/Stepper';
import { useState } from 'react';

export default function DesignSystemPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('components');

  const tabs = [
    {
      id: 'components',
      label: 'المكونات',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <LayoutGrid className="text-blue-600 mb-3" />
            <h3 className="font-bold">مكونات UI موحدة</h3>
            <p className="text-sm text-gray-600">Tabs, Modal, Table, Stepper…</p>
          </Card>
          <Card className="p-6">
            <Sparkles className="text-purple-600 mb-3" />
            <h3 className="font-bold">نظام تصميم متماسك</h3>
            <p className="text-sm text-gray-600">ألوان، مسافات، خطوط موحدة.</p>
          </Card>
        </div>
      )
    },
    {
      id: 'preview',
      label: 'معاينة',
      content: (
        <div className="space-y-6">
          <Toast type="success" title="تم التحديث" message="نظام التصميم يعمل بنجاح" />
          <Tooltip content="مثال Tooltip">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">مرر هنا</button>
          </Tooltip>
          <Table headers={['العنصر', 'الحالة']} rows={[['Button', 'متوفر'], ['Tabs', 'متوفر']]} />
          <Stepper steps={[{ label: 'الأساسيات' }, { label: 'التطبيق' }, { label: 'الاحتراف' }]} currentStep={1} />
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">عرض Modal</button>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Design System</h1>
          <p className="text-gray-600">توثيق المكونات ومعاينتها.</p>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="مثال Modal">
        <div className="space-y-3">
          <p className="text-sm text-gray-600">هذا مثال لعرض المودال.</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" /> تم التحقق
          </div>
        </div>
      </Modal>
    </main>
  );
}

