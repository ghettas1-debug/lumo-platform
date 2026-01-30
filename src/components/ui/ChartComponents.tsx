"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/Card';

export function AnalyticsChart() {
  const data = [
    { name: 'يناير', students: 400, courses: 240 },
    { name: 'فبراير', students: 300, courses: 180 },
    { name: 'مارس', students: 200, courses: 120 },
    { name: 'أبريل', students: 278, courses: 189 },
    { name: 'مايو', students: 189, courses: 140 },
    { name: 'يونيو', students: 239, courses: 98 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">إحصائيات الطلاب</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ProgressChart() {
  const data = [
    { name: 'Python', progress: 85 },
    { name: 'React', progress: 92 },
    { progress: 78 },
    { name: 'JavaScript', progress: 88 },
    { name: 'TypeScript', progress: 75 },
    { name: 'CSS', progress: 90 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">تقدم الدورات</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
