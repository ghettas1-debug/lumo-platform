'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  Bell,
  ShoppingCart,
  LogIn,
  UserPlus,
  Search,
  Settings,
  User,
  Heart,
  MessageSquare
} from 'lucide-react';

interface RightActionsProps {
  className?: string;
  isAuthenticated?: boolean;
}

const RightActions: React.FC<RightActionsProps> = ({ 
  className, 
  isAuthenticated = false 
}) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${className}`}>
      {isAuthenticated ? (
        <>
          {/* Authenticated User Actions */}
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Bell className="w-4 h-4" />}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            الإشعارات
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ShoppingCart className="w-4 h-4" />}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            السلة
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<User className="w-4 h-4" />}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            الملف الشخصي
          </Button>
        </>
      ) : (
        <>
          {/* Non-authenticated User Actions */}
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<LogIn className="w-4 h-4" />}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-semibold"
          >
            تسجيل الدخول
          </Button>
          
          <Button
            size="sm"
            leftIcon={<UserPlus className="w-4 h-4" />}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ابدأ مجاناً
          </Button>
        </>
      )}
    </div>
  );
};

export default RightActions;
