"use client";

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ general: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Back Button */}
        <Link 
          href="/auth" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          العودة لتسجيل الدخول
        </Link>

        <Card className="p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              استعادة كلمة المرور
            </h1>
            <p className="text-gray-600">
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-red-600" size={20} />
              <span className="text-red-800">{errors.general}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإرسال...
                  </span>
                ) : (
                  'إرسال رابط الاستعادة'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="text-green-600 mx-auto mb-3" size={48} />
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  تم الإرسال بنجاح!
                </h3>
                <p className="text-green-700">
                  تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني
                  <br />
                  <span className="font-mono text-sm">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  لم تستلم البريد؟ تحقق من مجلد الرسائل غير المرغوب فيها
                </p>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrors({});
                  }}
                >
                  إعادة الإرسال
                </Button>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                تحتاج مساعدة؟
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/help" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  مركز المساعدة
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

