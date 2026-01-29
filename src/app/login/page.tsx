'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const handleLogin = () => {
    alert('سيتم إضافة منطق تسجيل الدخول هنا لاحقاً');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          تسجيل الدخول
        </h1>
        <p className="text-gray-500 text-center mb-8">
          أدخل بياناتك للوصول إلى حسابك
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              كلمة المرور
            </label>
            <Input
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button 
            variant="primary" 
            size="lg"
            onClick={handleLogin}
            className="w-full"
          >
            تسجيل الدخول
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            ليس لديك حساب؟{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              سجل الآن
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
