"use client";

import { useState } from 'react';
import InteractiveQuiz from '@/components/quiz/InteractiveQuiz';

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const quizzes = [
    {
      id: 'react-basics',
      title: 'اختبار أساسيات React.js',
      description: 'اختبر معرفتك بمفاهيم React.js الأساسية مثل المكونات، الحالة، والخصائص',
      passingScore: 70,
      timeLimit: 1800, // 30 minutes
      questions: [
        {
          id: 1,
          type: 'multiple-choice' as const,
          question: 'ما هو الـ Hook في React.js المستخدم لإدارة الحالة في المكونات الوظيفية؟',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correctAnswer: 'useState',
          explanation: 'useState هو الـ Hook الأساسي لإدارة الحالة في المكونات الوظيفية في React.js',
          points: 10,
          difficulty: 'easy' as const,
          timeLimit: 30,
          hint: 'فكر في الـ Hook الذي يسمح لك بإضافة حالة إلى المكونات الوظيفية'
        },
        {
          id: 2,
          type: 'true-false' as const,
          question: 'المكونات الوظيفية في React يمكن أن تحتوي على حالة وخصائص',
          correctAnswer: 'true',
          explanation: 'نعم، المكونات الوظيفية يمكن استخدام الـ Hooks مثل useState و useEffect لإدارة الحالة والخصائص',
          points: 5,
          difficulty: 'easy' as const,
          timeLimit: 15
        },
        {
          id: 3,
          type: 'multiple-choice' as const,
          question: 'ما هو الغرض الرئيسي من الـ useEffect Hook؟',
          options: [
            'إدارة الحالة',
            'التعامل مع الآثار الجانبية',
            'إنشاء المكونات',
            'تحسين الأداء'
          ],
          correctAnswer: 'التعامل مع الآثار الجانبية',
          explanation: 'useEffect يستخدم للتعامل مع الآثار الجانبية مثل طلبات API، الاشتراكات، وتحديث DOM',
          points: 15,
          difficulty: 'medium' as const,
          timeLimit: 45,
          hint: 'فكر في العمليات التي تحدث خارج دورة حياة المكون'
        },
        {
          id: 4,
          type: 'fill-blank' as const,
          question: 'لتمرير قيمة في حالة useState، يجب استخدام دالة _______ التي يتم توفيرها كعنصر ثانٍ في المصفوفة.',
          correctAnswer: 'setter',
          explanation: 'دالة setter هي الدالة الثانية التي يتم توفيرها في مصفوفة useState وتستخدم لتحديث الحالة',
          points: 10,
          difficulty: 'medium' as const,
          timeLimit: 30
        },
        {
          id: 5,
          type: 'multiple-choice' as const,
          question: 'أي من التالي ليس من قواعد Hooks في React؟',
          options: [
            'لا تستخدم الـ Hooks في الحلقات',
            'لا تستخدم الـ Hooks داخل الشروط',
            'يمكن استخدام الـ Hooks في المكونات العادية',
            'لا تستخدم الـ Hooks في معالجات الأحداث'
          ],
          correctAnswer: 'يمكن استخدام الـ Hooks في المكونات العادية',
          explanation: 'الـ Hooks يجب استخدامها فقط في المكونات الوظيفية أو الـ Hooks المخصصة الأخرى',
          points: 20,
          difficulty: 'hard' as const,
          timeLimit: 60,
          hint: 'فكر في نوع المكونات التي يمكن استخدام الـ Hooks فيها'
        }
      ]
    },
    {
      id: 'javascript-fundamentals',
      title: 'اختبار أساسيات JavaScript',
      description: 'اختبر معرفتك بأساسيات لغة JavaScript والمفاهيم البرمجية الأساسية',
      passingScore: 75,
      timeLimit: 2400, // 40 minutes
      questions: [
        {
          id: 1,
          type: 'multiple-choice' as const,
          question: 'ما هي نتيجة: typeof null',
          options: ['null', 'undefined', 'object', 'string'],
          correctAnswer: 'object',
          explanation: 'typeof null يعود "object" في JavaScript، وهذا يعتبر خطأ تاريخيا في اللغة',
          points: 10,
          difficulty: 'medium' as const,
          timeLimit: 30
        },
        {
          id: 2,
          type: 'true-false' as const,
          question: 'في JavaScript، == و === لهما نفس الوظيفة تماماً',
          correctAnswer: 'false',
          explanation: '== يقارن القيم مع تحويل النوع (type coercion)، بينما === يقارن القيم والنوع بدون تحويل',
          points: 10,
          difficulty: 'easy' as const,
          timeLimit: 20
        },
        {
          id: 3,
          type: 'multiple-choice' as const,
          question: 'ما هي نتيجة: [1, 2, 3] + [4, 5]',
          options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', 'Error', 'undefined'],
          correctAnswer: '[1, 2, 3, 4, 5]',
          explanation: 'عند جمع مصفوفتين في JavaScript، يتم دمجهما في مصفوفة واحدة',
          points: 15,
          difficulty: 'medium' as const,
          timeLimit: 25
        }
      ]
    },
    {
      id: 'css-layout',
      title: 'اختبار تخطيط CSS',
      description: 'اختبر معرفتك بتقنيات التخطيط المختلفة في CSS',
      passingScore: 70,
      timeLimit: 1500, // 25 minutes
      questions: [
        {
          id: 1,
          type: 'multiple-choice' as const,
          question: 'ما هو الفرق الرئيسي بين Flexbox و Grid؟',
          options: [
            'Flexbox للأبعاد الواحدة، Grid للبعدين',
            'Grid للأبعاد الواحدة، Flexbox للبعدين',
            'لا يوجد فرق',
            'Flexbox للصور فقط، Grid للنصوص فقط'
          ],
          correctAnswer: 'Flexbox للأبعاد الواحدة، Grid للبعدين',
          explanation: 'Flexbox مصمم للتخطيط أحادي البعد، بينما Grid مصمم للتخطيط ثنائي البعد',
          points: 15,
          difficulty: 'medium' as const,
          timeLimit: 30
        },
        {
          id: 2,
          type: 'true-false' as const,
          question: 'display: inline-block يجعل العنصر يأخذ عرض السطر بالكامل',
          correctAnswer: 'false',
          explanation: 'inline-block يجعل العنصر يأخذ عرض المحتوى فقط، وليس عرض السطر بالكامل',
          points: 10,
          difficulty: 'easy' as const,
          timeLimit: 15
        }
      ]
    }
  ];

  if (selectedQuiz) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <InteractiveQuiz
          quizId={quiz.id}
          title={quiz.title}
          description={quiz.description}
          questions={quiz.questions}
          passingScore={quiz.passingScore}
          timeLimit={quiz.timeLimit}
          allowReview={true}
          showHints={true}
          onComplete={(result) => {
            console.log('Quiz completed:', result);
            // Handle quiz completion (save to database, etc.)
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الاختبارات التفاعلية</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختبر معرفتك من خلال اختبارات تفاعلية متنوعة في مختلف مجالات البرمجة
          </p>
        </div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedQuiz(quiz.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="text-xl font-bold">Q</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">درجة النجاح</div>
                    <div className="text-lg font-bold text-gray-900">{quiz.passingScore}%</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {quiz.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{quiz.questions.length} سؤال</span>
                    <span>•</span>
                    <span>{Math.floor((quiz.timeLimit || 0) / 60)} دقيقة</span>
                  </div>
                  <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    ابدأ الاختبار →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مميزات الاختبارات التفاعلية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">✓</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تقييم فوري</h3>
              <p className="text-sm text-gray-600">احصل على نتائج فورية مع شرح مفصل لكل إجابة</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⏱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">إدارة الوقت</h3>
              <p className="text-sm text-gray-600">حدود زمنية للاختبار والأسئلة الفردية</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تلميحات مفيدة</h3>
              <p className="text-sm text-gray-600">احصل على تلميحات عند مواجهة صعوبة</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تحليل الأداء</h3>
              <p className="text-sm text-gray-600">تتبع تقدمك وعرض إحصائيات مفصلة</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">إحصائيات الاختبارات</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">1,234</div>
                <div className="text-blue-100">اختبار مكتمل</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">89%</div>
                <div className="text-blue-100">متوسط النتائج</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">456</div>
                <div className="text-blue-100">طالب نشط</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-blue-100">اختبار متاحر</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
