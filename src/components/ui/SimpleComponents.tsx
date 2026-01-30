"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const markdownContent = `# مرحباً بك في منصة Lumo التعليمية

## الميزات الرئيسية

### 1. التعلم التفاعلي
- دروس فيديو عالية الجودة
- تمارين تفاعلية
- مشاريع عملية

### 2. تتبع التقدم
- إحصائيات مفصلة
- شهادات إنجاز
- لوحة متصدرين

## أمثلة الأكواد

### Python Example:
\`\`\`python
def hello_world():
    print("مرحباً بالعالم!")
    return "Lumo Platform"

# استدعاء الدالة
result = hello_world()
print(result)
\`\`\`

### JavaScript Example:
\`\`\`javascript
const welcomeMessage = () => {
  console.log("مرحباً في منصة Lumo");
  return "Welcome to Lumo Platform";
};

const message = welcomeMessage();
console.log(message);
\`\`\`

## لماذا تختار Lumo؟

- محتوى عالي الجودة
- مدربون محترفون
- دعم فني 24/7
- شهادات معتمدة

## ابدأ رحلتك اليوم!

انضم إلى آلاف الطلاب الذين يتعلمون معنا.
`;

export function SimpleMarkdown() {
  const [content, setContent] = useState(markdownContent);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">عارض Markdown</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* المحرر */}
        <div>
          <h4 className="font-semibold mb-2">المحرر:</h4>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="اكتب محتوى Markdown هنا..."
            dir="rtl"
          />
        </div>
        
        {/* المعاينة */}
        <div>
          <h4 className="font-semibold mb-2">المعاينة:</h4>
          <div className="h-96 p-4 border border-gray-300 rounded-lg overflow-y-auto">
            <div className="prose prose-lg max-w-none" dir="rtl">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SimpleCodeExamples() {
  const pythonCode = `def calculate_average(numbers):
    """حساب المتوسط لمجموعة أرقام"""
    if not numbers:
        return 0
    
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    
    return average

# مثال الاستخدام
grades = [85, 90, 78, 92, 88]
avg_grade = calculate_average(grades)
print(f"المتوسط: {avg_grade:.2f}")`;

  const javascriptCode = `// دالة لحساب المتوسط
function calculateAverage(numbers) {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  
  const total = numbers.reduce((sum, num) => sum + num, 0);
  const average = total / numbers.length;
  
  return average;
}

// مثال الاستخدام
const grades = [85, 90, 78, 92, 88];
const avgGrade = calculateAverage(grades);
console.log("المتوسط: " + avgGrade.toFixed(2));`;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">أمثلة الأكواد</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Python:</h4>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code>{pythonCode}</code>
          </pre>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">JavaScript:</h4>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code>{javascriptCode}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
}
