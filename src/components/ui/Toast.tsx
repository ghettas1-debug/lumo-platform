'use client';

import { ReactNode } from 'react';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: ReactNode;
}

export default function Toast({ type = 'info', title, message }: ToastProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`border rounded-xl px-4 py-3 ${styles[type]}`}>
      <div className="font-bold text-sm">{title}</div>
      {message && <div className="text-xs mt-1">{message}</div>}
    </div>
  );
}
