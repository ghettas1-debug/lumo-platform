"use client";

import { useState } from 'react';
import { User, Bell, Lock, Globe, CreditCard, Shield } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'حمد محمود',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    bio: 'مطور ويب مهتم بتقنيات Next.js وReact',
    language: 'ar',
    notifications: {
      email: true,
      push: true,
      weeklyDigest: false,
      courseUpdates: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: <User size={20} /> },
    { id: 'security', label: 'المان', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'الشعارات', icon: <Bell size={20} /> },
    { id: 'language', label: 'اللغة', icon: <Globe size={20} /> },
    { id: 'billing', label: 'الدفع والاشتراكات', icon: <CreditCard size={20} /> },
    { id: 'privacy', label: 'الخصوصية', icon: <Shield size={20} /> },
  ];

  const handleSave = () => {
    alert('تم حفظ العدادات بنجاح!');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">العدادات</h1>
          <p className="text-gray-500">دارة حسابك وتفضيلاتك على منصة LUMO</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg text-right transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-500'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="flex-1">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          <div className="lg:w-3/4">
            {activeTab === 'profile' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <User size={24} /> الملف الشخصي
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-linear-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {userData.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">صورة الملف الشخصي</h3>
                      <p className="text-gray-500 mb-3">JPEG, PNG بحد قصى 5 ميجابايت</p>
                      <Button variant="outline">تغيير الصورة</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
                      <Input
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        placeholder="دخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">البريد اللكتروني</label>
                      <Input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                      <Input
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">اللغة المفضلة</label>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={userData.language}
                        onChange={(e) => setUserData({...userData, language: e.target.value})}
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">نبذة عنك</label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-30"
                      value={userData.bio}
                      onChange={(e) => setUserData({...userData, bio: e.target.value})}
                      placeholder="خبرنا المزيد عن نفسك..."
                    />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Lock size={24} /> المان
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">تغيير كلمة المرور</h3>
                    <div className="space-y-4">
                      <Input type="password" placeholder="كلمة المرور الحالية" />
                      <Input type="password" placeholder="كلمة المرور الجديدة" />
                      <Input type="password" placeholder="تكيد كلمة المرور الجديدة" />
                      <Button variant="primary">تحديث كلمة المرور</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">جلسات النشطة</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Windows - Chrome</p>
                          <p className="text-sm text-gray-500">الرياض السعودية • نشطة الآن</p>
                        </div>
                        <Button variant="outline" size="sm">تسجيل الخروج</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">iPhone 14 Pro</p>
                          <p className="text-sm text-gray-500">جدة السعودية • آخر نشاط: منذ 2 يوم</p>
                        </div>
                        <Button variant="outline" size="sm">تسجيل الخروج</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Bell size={24} /> الشعارات
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">الشعارات عبر البريد اللكتروني</p>
                      <p className="text-sm text-gray-500">تلقي تحديثات حول دوراتك وحسابك</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={userData.notifications.email}
                        onChange={(e) => setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, email: e.target.checked}
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">الشعارات الفورية (Push)</p>
                      <p className="text-sm text-gray-500">شعارات مباشرة على متصفحك</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={userData.notifications.push}
                        onChange={(e) => setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, push: e.target.checked}
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">النشرة السبوعية</p>
                      <p className="text-sm text-gray-500">ملخص سبوعي عن نشاطات المنصة</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={userData.notifications.weeklyDigest}
                        onChange={(e) => setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, weeklyDigest: e.target.checked}
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تحديثات المساقات</p>
                      <p className="text-sm text-gray-500">شعارات عن محتوى جديد في مساقاتك</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={userData.notifications.courseUpdates}
                        onChange={(e) => setUserData({
                          ...userData, 
                          notifications: {...userData.notifications, courseUpdates: e.target.checked}
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'language' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Globe size={24} /> اللغة والقليم
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">لغة الواجهة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                        { code: 'en', name: 'English', flag: '🇺🇸' },
                        { code: 'fr', name: 'Français', flag: '🇫🇷' },
                        { code: 'es', name: 'Español', flag: '🇪🇸' },
                        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setUserData({...userData, language: lang.code})}
                          className={`p-4 border-2 rounded-xl text-center transition-all ${
                            userData.language === lang.code
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">{lang.flag}</div>
                          <p className="font-medium">{lang.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">التوقيت الزمني</h3>
                    <select className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                      <option>توقيت الرياض (UTC+3)</option>
                      <option>توقيت دبي (UTC+4)</option>
                      <option>توقيت القاهرة (UTC+2)</option>
                      <option>توقيت غرينتش (UTC+0)</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CreditCard size={24} /> الدفع والاشتراكات
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">الخطة الحالية</h3>
                    <div className="bg-linear-to-r from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xl font-black text-gray-900">الخطة المجانية</h4>
                          <p className="text-gray-600">5 مساقات مجانية شهريا • دعم ساسي</p>
                        </div>
                        <span className="text-3xl font-black text-green-600">مجاني</span>
                      </div>
                      <Button variant="primary" className="mt-4">ترقية لى الخطة المميزة</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">طرق الدفع</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-blue-500 rounded"></div>
                          <div>
                            <p className="font-medium">بطاقة Visa تنتهي ب 4242</p>
                            <p className="text-sm text-gray-500">تنتهي في 12/2026</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">حذف</Button>
                      </div>
                      <Button variant="outline">+ ضافة طريقة دفع جديدة</Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'privacy' && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield size={24} /> الخصوصية
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">الملف الشخصي العام</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>جعل الملف الشخصي عاما</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>ظهار نشاط التعلم</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>السماح بالرسائل المباشرة</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">حذف الحساب</h3>
                    <p className="text-gray-600 mb-4">حذف حسابك بشكل دائم وجميع بياناتك المرتبطة به. هذا الجراء لا يمكن التراجع عنه.</p>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      حذف حسابي
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline">لغاء</Button>
              <Button variant="primary" onClick={handleSave}>حفظ التغييرات</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
