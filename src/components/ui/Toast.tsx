"use client";

import { forwardRef } from 'react';

interface ToastProps {
  variant?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  message?: string;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { variant, title, description, message } = props;
  const displayMessage = description || message;
  
  return (
    <div ref={ref} className={`toast ${variant || 'info'}`}>
      <h3>{title}</h3>
      {displayMessage && <p>{displayMessage}</p>}
    </div>
  );
});

export default Toast;
