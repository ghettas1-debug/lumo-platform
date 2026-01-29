"use client";

interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
}

export default function Input({ 
  type = 'text', 
  placeholder = '',
  className = '',
  value = '',
  onChange,
  name,
  required = false,
  maxLength,
  error
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        maxLength={maxLength}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
