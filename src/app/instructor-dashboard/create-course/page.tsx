'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Save,
  Upload,
  X,
  Plus,
  ChevronDown,
  ChevronLeft,
  BookOpen,
  Users,
  DollarSign,
  Clock,
  Award,
  Target,
  Video,
  FileText,
  Image,
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/atoms/Badge';

interface CourseFormData {
  // Basic Information
  title: string;
  description: string;
  category: string;
  level: string;
  language: string;
  
  // Pricing
  priceType: 'free' | 'paid';
  price: string;
  
  // Course Details
  duration: string;
  requirements: string[];
  objectives: string[];
  
  // Media
  thumbnail: File | null;
  previewVideo: File | null;
  
  // Settings
  status: 'draft' | 'published';
  certificate: boolean;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}

const categories = [
  'تطوير الويب',
  'تطبيقات الموبايل',
  'الذكاء الاصطناعي',
  'إدارة الأعمال',
  'التسويق الرقمي',
  'التصميم الجرافيكي',
  'البيانات والتحليل',
  'الأمن السيبراني',
  'الشبكات',
  'قواعد البيانات'
];

const levels = [
  { value: 'beginner', label: 'مبتدئ', color: 'green' },
  { value: 'intermediate', label: 'متوسط', color: 'blue' },
  { value: 'advanced', label: 'متقدم', color: 'purple' },
  { value: 'expert', label: 'خبير', color: 'red' }
];

const languages = [
  'العربية',
  'English',
  'Français',
  'Español',
  'Deutsch',
  '中文',
  '日本語'
];

export default function CreateCoursePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    language: 'العربية',
    priceType: 'free',
    price: '',
    duration: '',
    requirements: [''],
    objectives: [''],
    thumbnail: null,
    previewVideo: null,
    status: 'draft',
    certificate: true,
    metaTitle: '',
    metaDescription: '',
    tags: []
  });

  const steps = [
    { id: 1, title: 'المعلومات الأساسية', icon: <BookOpen className="w-4 h-4" /> },
    { id: 2, title: 'تفاصيل الدورة', icon: <Target className="w-4 h-4" /> },
    { id: 3, title: 'المحتوى والوسائط', icon: <Video className="w-4 h-4" /> },
    { id: 4, title: 'التسعير والإعدادات', icon: <DollarSign className="w-4 h-4" /> },
    { id: 5, title: 'المراجعة والنشر', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'عنوان الدورة مطلوب';
        if (!formData.description.trim()) newErrors.description = 'وصف الدورة مطلوب';
        if (!formData.category) newErrors.category = 'الفئة مطلوبة';
        break;
      
      case 2:
        if (!formData.duration.trim()) newErrors.duration = 'مدة الدورة مطلوبة';
        if (formData.requirements.filter(req => req.trim()).length === 0) {
          newErrors.requirements = 'يجب إضافة متطلب واحد على الأقل';
        }
        if (formData.objectives.filter(obj => obj.trim()).length === 0) {
          newErrors.objectives = 'يجب إضافة هدف واحد على الأقل';
        }
        break;
      
      case 3:
        if (!formData.thumbnail) newErrors.thumbnail = 'صورة المصغرة مطلوبة';
        break;
      
      case 4:
        if (formData.priceType === 'paid' && !formData.price) {
          newErrors.price = 'السعر مطلوب للدورات المدفوعة';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally save to your backend
      console.log('Course data:', { ...formData, status });
      
      // Redirect to instructor dashboard
      router.push('/instructor-dashboard?success=course-created');
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({ submit: 'حدث خطأ أثناء إنشاء الدورة' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الدورة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل عنوان الدورة"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف الدورة <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="اكتب وصفاً مفصلاً للدورة"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المستوى
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لغة الدورة
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مدة الدورة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="مثال: 8 ساعات، 3 أسابيع"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.duration}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  المتطلبات <span className="text-red-500">*</span>
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  إضافة متطلب
                </Button>
              </div>
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل متطلب الدورة"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeRequirement(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.requirements}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  أهداف الدورة <span className="text-red-500">*</span>
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addObjective}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  إضافة هدف
                </Button>
              </div>
              <div className="space-y-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل هدف الدورة"
                    />
                    {formData.objectives.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeObjective(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.objectives && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.objectives}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة المصغرة <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {formData.thumbnail ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(formData.thumbnail)}
                        alt="Thumbnail preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, thumbnail: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{formData.thumbnail.name}</p>
                  </div>
                ) : (
                  <div>
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">اسحب وأفلت الصورة هنا أو</p>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700">اختر ملف</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.files?.[0] || null }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.thumbnail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فيديو تعريفي (اختياري)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {formData.previewVideo ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Video className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{formData.previewVideo.name}</p>
                        <p className="text-sm text-gray-500">
                          {(formData.previewVideo.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, previewVideo: null }))}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">اسحب وأفلت الفيديو هنا أو</p>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700">اختر ملف</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFormData(prev => ({ ...prev, previewVideo: e.target.files?.[0] || null }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع التسعير
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priceType: 'free' }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.priceType === 'free'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-lg font-bold text-green-600">مجاني</div>
                  <div className="text-sm text-gray-600">متاح للجميع</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priceType: 'paid' }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.priceType === 'paid'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-lg font-bold text-blue-600">مدفوع</div>
                  <div className="text-sm text-gray-600">سعر محدد</div>
                </button>
              </div>
            </div>

            {formData.priceType === 'paid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السعر <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full pr-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.price}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.certificate}
                  onChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  توفير شهادة إتمام الدورة
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                سيحصل الطلاب على شهادة عند إكمال الدورة بنجاح
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الكلمات المفتاحية (Tags)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="أضف كلمة مفتاحية"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    addTag(input.value);
                    input.value = '';
                  }}
                >
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                مراجعة الدورة
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">العنوان</p>
                    <p className="font-medium">{formData.title || 'غير محدد'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الفئة</p>
                    <p className="font-medium">{formData.category || 'غير محدد'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المستوى</p>
                    <Badge variant={levels.find(l => l.value === formData.level)?.color as any}>
                      {levels.find(l => l.value === formData.level)?.label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">اللغة</p>
                    <p className="font-medium">{formData.language}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المدة</p>
                    <p className="font-medium">{formData.duration || 'غير محدد'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">السعر</p>
                    <p className="font-medium">
                      {formData.priceType === 'free' ? 'مجاني' : `$${formData.price}`}
                    </p>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">الوصف</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {formData.description}
                    </p>
                  </div>
                )}

                {formData.requirements.filter(req => req.trim()).length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">المتطلبات</p>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.requirements.filter(req => req.trim()).map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.objectives.filter(obj => obj.trim()).length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">الأهداف</p>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.objectives.filter(obj => obj.trim()).map((obj, index) => (
                        <li key={index} className="text-gray-700">{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">الكلمات المفتاحية</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">ملاحظات هامة</h4>
                  <ul className="mt-2 text-sm text-blue-800 space-y-1">
                    <li>• سيتم مراجعة الدورة قبل نشرها</li>
                    <li>• يمكنك تعديل الدورة في أي وقت من لوحة التحكم</li>
                    <li>• الدورات المسودة لن تكون مرئية للطلاب</li>
                    <li>• تأكد من أن جميع المعلومات دقيقة ومكتملة</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/instructor-dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">إنشاء دورة جديدة</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit('draft')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ كمسودة'}
              </Button>
              {currentStep === steps.length && (
                <Button
                  onClick={() => handleSubmit('published')}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? 'جاري النشر...' : (
                    <>
                      نشر الدورة
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="mr-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                السابق
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="gap-2">
                  التالي
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit('draft')}
                    disabled={isSubmitting}
                  >
                    حفظ كمسودة
                  </Button>
                  <Button
                    onClick={() => handleSubmit('published')}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? 'جاري النشر...' : (
                      <>
                        نشر الدورة
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
