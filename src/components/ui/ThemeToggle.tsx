'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'الوضع النهاري' },
    { value: 'dark', icon: Moon, label: 'الوضع الليلي' },
    { value: 'system', icon: Monitor, label: 'النظام' },
  ] as const;

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl">
      {themes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={theme === value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTheme(value)}
          className="h-8 w-8 p-0 rounded-xl"
          title={label}
        >
          <Icon size={16} />
        </Button>
      ))}
    </div>
  );
}

export function ThemeToggleSimple() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-full"
      title={resolvedTheme === 'light' ? 'التبديل للوضع الليلي' : 'التبديل للوضع النهاري'}
    >
      {resolvedTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
}

export function ThemeToggleDropdown() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    { value: 'light', icon: Sun, label: 'الوضع النهاري' },
    { value: 'dark', icon: Moon, label: 'الوضع الليلي' },
    { value: 'system', icon: Monitor, label: 'النظام' },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <currentTheme.icon size={16} />
        <span>{currentTheme.label}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-37.5 z-50">
          {themes.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                theme === value
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
              {theme === value && (
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
