"use client";

interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ 
  type = 'text', 
  placeholder = '',
  className = '',
  value = '',
  onChange
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}
