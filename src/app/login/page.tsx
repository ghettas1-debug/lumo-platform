'use client';

import { Button } from '@\/components\/ui\/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function LoginPage() {
  const handleLogin = () => {
    alert('???? ????? ???? ????? ?????? ??? ??????');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          ????? ??????
        </h1>
        <p className="text-gray-500 text-center mb-8">
          ???? ??????? ?????? ??? ?????
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ?????? ??????????
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ???? ??????
            </label>
            <Input
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="ml-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">??????</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              ???? ???? ???????
            </Link>
          </div>

          <Button 
            variant="primary" 
            size="lg"
            onClick={handleLogin}
            className="w-full"
          >
            ????? ??????
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            ??? ???? ?????{' '}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              ??? ????
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
