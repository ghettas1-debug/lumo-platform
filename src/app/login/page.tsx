'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const handleLogin = () => {
    alert('Ø³ÙŠØªÙ… Ø¥Ø¶Ø§ÙØ© Ù…Ù†Ø·Ù‚ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù‡Ù†Ø§ Ù„Ø§Ø­Ù‚Ø§Ù‹');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Ø£Ø¯Ø®Ù„ Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù„Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø­Ø³Ø§Ø¨Ùƒ
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ
            </label>
            <Input
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
          </div>

          <Button 
            variant="primary" 
            size="lg"
            onClick={handleLogin}
            className="w-full"
          >
            ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ø­Ø³Ø§Ø¨ØŸ{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Ø³Ø¬Ù„ Ø§Ù„Ø¢Ù†
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
