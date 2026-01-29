"use client";

import { useState, useRef } from 'react';
import { User, Mail, Phone, Calendar, Award, BookOpen, Clock, Star, Edit, Camera, Settings, LogOut, ChevronRight, ChevronLeft, MapPin, Briefcase, Globe, Shield, Bell, CreditCard, Download, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // بيانات وهمية للمستخدم
  const [userData, setUserData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed.mohammed@example.com',
    phone: '+966 50 123 4567',
    joinDate: 'يناير 2024',
    bio: 'مطور برمجيات شغوف بالتعلم والتطوير المستمر. أدرس البرمجة وتحليل البيانات.',
    avatar: null as string | null,
    location: 'الرياض، المملكة العربية السعودية',
    jobTitle: 'مطور Full Stack',
    website: 'https://ahmed.dev',
    languages: ['العربية', 'English'],
    stats: {
      coursesEnrolled: 12,
      coursesCompleted: 8,
      certificates: 6,
      studyHours: 156,
      streak: 15
    },
    subscription: {
      plan: 'pro',
      status: 'active',
      renewDate: '2024-03-15',
      features: ['دورات غير محدودة', 'شهادات معتمدة', 'دعم فني 24/7']
    }
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({ ...prev, avatar: e.target?.result as string | null }));
        setFormData(prev => ({ ...prev, avatar: e.target?.result as string | null }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserData({ ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: User },
    { id: 'courses', name: 'دوراتي', icon: BookOpen },
    { id: 'achievements', name: 'الإنجازات', icon: Award },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
    { id: 'subscription', name: 'الاشتراك', icon: CreditCard }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'احتراف React.js',
      progress: 75,
      lastAccessed: 'منذ يومين',
      thumbnail: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'تحليل البيانات مع Python',
      progress: 45,
      lastAccessed: 'منذ 5 أيام',
      thumbnail: 'bg-green-500'
    },
    {
      id: 3,
      title: 'تصميم واجهات المستخدم',
      progress: 90,
      lastAccessed: 'منذ أسبوع',
      thumbnail: 'bg-purple-500'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'بداية المشوار',
      description: 'أكملت أول دورة',
      icon: '🎯',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'المتعلم النشط',
      description: 'درست لمدة 100 ساعة',
      icon: '⏰',
      earned: true,
      date: '2024-02-20'
    },
    {
      id: 3,
      title: 'خبير البرمجة',
      description: 'أكملت 10 دورات برمجة',
      icon: '💻',
      earned: false,
      date: null
    },
    {
      id: 4,
      title: 'المتواصل دائماً',
      description: 'سلسلة دراسة لمدة 30 يوم',
      icon: '🔥',
      earned: true,
      date: '2024-03-01'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 bg-linear-to-r from-blue-500 to-purple-600 rounded-t-xl"></div>
            
            {/* Avatar Section */}
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                    {userData.avatar ? (
                      <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                    disabled={uploadingAvatar}
                  >
                    {uploadingAvatar ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Camera size={18} />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-right">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">{userData.jobTitle}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {userData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      انضم {userData.joinDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={16} />
                      {userData.languages.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit size={18} className="ml-2" />
                    {isEditing ? 'إلغاء' : 'تعديل الملف'}
                  </Button>
                  <Button variant="outline">
                    <Share2 size={18} className="ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center p-4">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userData.stats.coursesEnrolled}</div>
            <div className="text-sm text-gray-600">دورة مسجلة</div>
          </Card>
          
          <Card className="text-center p-4">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userData.stats.coursesCompleted}</div>
            <div className="text-sm text-gray-600">دورة مكتملة</div>
          </Card>
          
          <Card className="text-center p-4">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userData.stats.certificates}</div>
            <div className="text-sm text-gray-600">شهادة</div>
          </Card>
          
          <Card className="text-center p-4">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userData.stats.studyHours}</div>
            <div className="text-sm text-gray-600">ساعة دراسة</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
              🔥
            </div>
            <div className="text-2xl font-bold text-gray-900">{userData.stats.streak}</div>
            <div className="text-sm text-gray-600">يوم متتالي</div>
          </Card>
          
          <Card className="text-center p-4">
            <CreditCard className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900 capitalize">{userData.subscription.plan}</div>
            <div className="text-sm text-gray-600">خطة الاشتراك</div>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="lg:col-span-2 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">المعلومات الشخصية</h2>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المسمى الوظيفي</label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نبذة شخصية</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile}>
                        حفظ التغييرات
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="text-gray-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-500">الاسم الكامل</div>
                          <div className="font-medium">{userData.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="text-gray-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                          <div className="font-medium">{userData.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-gray-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-500">رقم الهاتف</div>
                          <div className="font-medium">{userData.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="text-gray-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-500">المسمى الوظيفي</div>
                          <div className="font-medium">{userData.jobTitle}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-500 mb-2">نبذة شخصية</div>
                      <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">النشاط الأخير</h2>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${course.thumbnail} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {course.title.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <div className="text-sm text-gray-500">{course.lastAccessed}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <ChevronLeft className="text-gray-400" size={20} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'courses' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">دوراتي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...recentCourses, ...recentCourses].map((course, index) => (
                  <div key={`${course.id}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-32 ${course.thumbnail} flex items-center justify-center text-white text-2xl font-bold`}>
                      {course.title.charAt(0)}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                      <div className="text-sm text-gray-500 mb-3">{course.lastAccessed}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        متابعة التعلم
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'achievements' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">الإنجازات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`border rounded-lg p-6 text-center transition-all ${
                      achievement.earned 
                        ? 'border-yellow-300 bg-yellow-50 hover:shadow-md' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <div className="text-xs text-yellow-600 font-medium">
                        تم الحصول عليها في {achievement.date}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">
                        لم يتم الحصول عليها بعد
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">الإعدادات</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-gray-400" />
                      <span>الإشعارات</span>
                    </div>
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-gray-400" />
                      <span>الخصوصية والأمان</span>
                    </div>
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Globe size={20} className="text-gray-400" />
                      <span>اللغة والمنطقة</span>
                    </div>
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-gray-400" />
                      <span>تصدير البيانات</span>
                    </div>
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <LogOut size={20} />
                      <span>تسجيل الخروج</span>
                    </div>
                  </button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'subscription' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">الاشتراك</h2>
              <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold capitalize">{userData.subscription.plan}</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {userData.subscription.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
                <p className="mb-4">تجديد في {userData.subscription.renewDate}</p>
                <div className="space-y-2">
                  {userData.subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline">
                  تعديل الاشتراك
                </Button>
                <Button variant="outline">
                  إلغاء الاشتراك
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
