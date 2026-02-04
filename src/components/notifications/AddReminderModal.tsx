'use client';

import React, { useState } from 'react';
import { X, Clock, Calendar, BookOpen, Coffee, FileText, AlertTriangle } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  enabled: boolean;
  type: 'study' | 'break' | 'review' | 'deadline';
  courseId?: string;
  courseName?: string;
}

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
}

const reminderTypes = [
  { value: 'study', label: 'جلسة دراسة', icon: BookOpen, color: 'blue' },
  { value: 'break', label: 'استراحة', icon: Coffee, color: 'green' },
  { value: 'review', label: 'مراجعة', icon: FileText, color: 'purple' },
  { value: 'deadline', label: 'موعد نهائي', icon: AlertTriangle, color: 'red' }
];

const weekDays = [
  'السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'
];

export default function AddReminderModal({ isOpen, onClose, onAdd }: AddReminderModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '09:00',
    type: 'study' as Reminder['type'],
    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    courseId: '',
    courseName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    onAdd({
      title: formData.title,
      description: formData.description,
      time: formData.time,
      type: formData.type,
      days: formData.days,
      enabled: true,
      courseId: formData.courseId || undefined,
      courseName: formData.courseName || undefined
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      time: '09:00',
      type: 'study',
      days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
      courseId: '',
      courseName: ''
    });
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">إضافة تذكير جديد</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان التذكير *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: جلسة دراسة React.js"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="صف التذكير بالتفصيل..."
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع التذكير
            </label>
            <div className="grid grid-cols-2 gap-2">
              {reminderTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value as Reminder['type'] }))}
                    className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                      formData.type === type.value
                        ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوقت
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أيام التكرار
            </label>
            <div className="grid grid-cols-4 gap-2">
              {weekDays.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`p-2 text-sm border rounded-lg transition-colors ${
                    formData.days.includes(day)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Course Info (for study reminders) */}
          {formData.type === 'study' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الدورة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: React.js الشامل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  معرف الدورة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.courseId}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: react-course"
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة التذكير
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
