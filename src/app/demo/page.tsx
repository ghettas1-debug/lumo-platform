"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('ui');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">مكونات جديدة متقدمة</h1>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab('ui')}
              variant={activeTab === 'ui' ? 'default' : 'outline'}
            >
              مكونات UI
            </Button>
            <Button
              onClick={() => setActiveTab('animation')}
              variant={activeTab === 'animation' ? 'default' : 'outline'}
            >
              رسوم متحركة
            </Button>
            <Button
              onClick={() => setActiveTab('charts')}
              variant={activeTab === 'charts' ? 'default' : 'outline'}
            >
              رسوم بيانية
            </Button>
            <Button
              onClick={() => setActiveTab('search')}
              variant={activeTab === 'search' ? 'default' : 'outline'}
            >
              بحث وتصفية
            </Button>
            <Button
              onClick={() => setActiveTab('markdown')}
              variant={activeTab === 'markdown' ? 'default' : 'outline'}
            >
              Markdown
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'ui' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">مكونات UI متقدمة</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">نافذة حوارية</h4>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      فتح نافذة
                    </button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">قائمة منسدلة</h4>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      القائمة
                    </button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-2">تبويب</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-purple-600 text-white rounded">تبويب 1</button>
                      <button className="px-3 py-1 bg-purple-200 text-purple-800 rounded">تبويب 2</button>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">مكونات Radix UI</h3>
                <p className="text-gray-600 mb-4">
                  مكونات يمكن تخصيصها بالكامل مع دعم الوصولية.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    نماذج حوارية (Dialog)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    قوائم منسدلة (Dropdown)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    تبويب (Tabs)
                  </li>
                </ul>
              </Card>
            </div>
          )}

          {activeTab === 'animation' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Framer Motion</h3>
                <p className="text-gray-600 mb-4">
                  رسوم متحركة سلسة وتفاعلية.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="w-16 h-16 bg-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2">دوران مستمر</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="w-16 h-16 bg-green-500 rounded-lg animate-pulse"></div>
                    <p className="mt-2">نبض سلس</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">React Spring</h3>
                <p className="text-gray-600 mb-4">
                  رسوم متحركة طبيعية بالفيزياء.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="w-16 h-16 bg-purple-500 rounded-lg transform hover:scale-110 transition-transform"></div>
                    <p className="mt-2">تحجيم عند التمرير</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="w-16 h-16 bg-orange-500 rounded-lg animate-bounce"></div>
                    <p className="mt-2">ارتداد سلس</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'charts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">إحصائيات الطلاب</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>يناير</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span>400</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>فبراير</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span>300</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>مارس</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span>200</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">تقدم الدورات</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Python</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>React</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>TypeScript</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">بحث متقدم</h3>
                <input
                  type="text"
                  placeholder="ابحث عن دورة..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="rtl"
                />
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Python 2026</h4>
                    <p className="text-sm text-gray-600">أحمد محمود</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">React المتقدم</h4>
                    <p className="text-sm text-gray-600">سارة علي</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">تصفية الدورات</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة:</label>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">البرمجة</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">التصميم</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">البيانات</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المستوى:</label>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">مبتدئ</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">متوسط</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">متقدم</button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'markdown' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">المحرر</h3>
                <textarea
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="اكتب محتوى Markdown هنا..."
                  dir="rtl"
                  defaultValue={`# مرحباً بالعالم

## هذا عنوان

- قائمة 1
- قائمة 2
- قائمة 3

**نص عريض** و *نص مائل*`}
                />
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">المعاينة</h3>
                <div className="h-96 p-4 border border-gray-300 rounded-lg overflow-y-auto">
                  <div className="prose prose-lg max-w-none" dir="rtl">
                    <h1>مرحباً بالعالم</h1>
                    <h2>هذا عنوان</h2>
                    <ul>
                      <li>قائمة 1</li>
                      <li>قائمة 2</li>
                      <li>قائمة 3</li>
                    </ul>
                    <p><strong>نص عريض</strong> و <em>نص مائل</em></p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
