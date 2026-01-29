"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen, Users, CreditCard, Award, Clock, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('general');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const categories = [
    { id: 'general', name: 'عام', icon: HelpCircle, color: 'blue' },
    { id: 'courses', name: 'الدورات', icon: BookOpen, color: 'green' },
    { id: 'account', name: 'الحساب', icon: Users, color: 'purple' },
    { id: 'payment', name: 'الدفع', icon: CreditCard, color: 'yellow' },
    { id: 'certificates', name: 'الشهادات', icon: Award, color: 'red' },
    { id: 'technical', name: 'فني', icon: Shield, color: 'indigo' }
  ];

  const faqData = {
    general: [
      {
        question: 'ما هي منصة LUMO؟',
        answer: 'LUMO هي منصة تعليمية عربية رائدة تقدم دورات تدريبية احترافية في مختلف المجالات التقنية والإدارية. نساعد المتعلمين على تطوير مهاراتهم وتحقيق أهدافهم المهنية من خلال محتوى عالي الجودة مقدمة من خبراء في مجالاتهم.'
      },
      {
        question: 'كيف أبدأ التعلم في LUMO؟',
        answer: 'يمكنك البدء بإنشاء حساب مجاني، ثم استكشاف الدورات المتاحة والتسجيل في ما يناسب اهتماماتك. نقدم خطة مجانية للبدء مع إمكانية الترقية للخطط المدفوعة للوصول إلى محتوى أوسع.'
      },
      {
        question: 'هل المحتوى متاح باللغة العربية؟',
        answer: 'نعم، جميع دوراتنا الأساسية متاحة باللغة العربية مع دعم للغات أخرى في بعض الدورات المتقدمة. نسعى لتقديم محتوى عالي الجودة باللغة العربية لخدمة المجتمع العربي.'
      },
      {
        question: 'ما هي متطلبات البدء؟',
        answer: 'كل ما تحتاجه هو اتصال بالإنترنت وجهاز كمبيوتر أو هاتف ذكي. لا توجد متطلبات سابقة لمعظم الدورات الأساسية، بينما الدورات المتقدمة قد تتطلب معرفة مسبقة بالمجال.'
      }
    ],
    courses: [
      {
        question: 'كيف أختار الدورة المناسبة لي؟',
        answer: 'يمكنك تصفح الدورات حسب الفئة، مستوى الصعوبة، أو استخدام خاصية البحث للعثور على دورات في مجال معين. كل دورة تحتوي على وصف تفصيلي ومتطلبات ومستوى الصعوبة لمساعدتك في اتخاذ القرار.'
      },
      {
        question: 'هل يمكنني الوصول إلى الدورات بعد انتهاء الاشتراك؟',
        answer: 'الدورات التي سجلت فيها وبدأت في تعلمها تبقى متاحة لك حتى بعد انتهاء الاشتراك. لكن لن تتمكن من التسجيل في دورات جديدة أو الوصول إلى الميزات المميزة بدون اشتراك نشط.'
      },
      {
        question: 'هل يمكنني تحميل الدورات للمشاهدة بدون إنترنت؟',
        answer: 'نعم، المشتركون في الخطط المدفوعة يمكنهم تحميل الدروس للمشاهدة بدون اتصال بالإنترنت. هذه الميزة غير متاحة في الخطة المجانية.'
      },
      {
        question: 'هل يتم تحديث الدورات بانتظام؟',
        answer: 'نعم، نقوم بتحديث جميع الدورات بانتظام لضمان أن المحتوى محدث مع أحدث التقنيات والأفضل الممارسات. ستحصل على إشعارات عند تحديث الدورات المسجلة فيها.'
      }
    ],
    account: [
      {
        question: 'كيف يمكنني تغيير كلمة المرور؟',
        answer: 'يمكنك تغيير كلمة المرور من صفحة الإعدادات في حسابك. اضغط على "تغيير كلمة المرور" واتبع التعليمات. ستحتاج إلى إدخال كلمة المرور الحالية والجديدة.'
      },
      {
        question: 'هل يمكنني تغيير بريدي الإلكتروني؟',
        answer: 'نعم، يمكنك تغيير بريدك الإلكتروني من صفحة الملف الشخصي. ستحتاج إلى تأكيد التغيير عبر البريد الإلكتروني الجديد لأمان حسابك.'
      },
      {
        question: 'كيف يمكنني حذف حسابي؟',
        answer: 'يمكنك طلب حذف حسابك من صفحة الإعدادات. لاحظ أن حذف الحساب سيؤدي إلى فقدان الوصول إلى جميع بياناتك وتقدمك في الدورات. يمكنك تنزيل بياناتك قبل حذف الحساب.'
      },
      {
        question: 'هل يمكنني تغيير اسمي وصورتي الشخصية؟',
        answer: 'نعم، يمكنك تعديل معلومات ملفك الشخصي بما في ذلك الاسم والصورة الشخصية والسيرة الذاتية من صفحة الملف الشخصي في أي وقت.'
      }
    ],
    payment: [
      {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستر كارد، أمريكان إكسبريس)، PayPal، والتحويل البنكي للشركات. نعمل أيضاً على إضافة المزيد من طرق الدفع الإقليمية.'
      },
      {
        question: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
        answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت. سيستمر الوصول إلى الميزات المدفوعة حتى نهاية فترة الفوترة الحالية. لا توجد رسوم إلغاء.'
      },
      {
        question: 'هل هناك ضمان استرداد المال؟',
        answer: 'نعم، نقدم ضمان استرداد المال لمدة 30 يوماً. إذا لم تكن راضياً عن خدمتنا، يمكنك طلب استرداد كامل خلال 30 يوماً من تاريخ الشراء.'
      },
      {
        question: 'هل يتم تجديد الاشتراك تلقائياً؟',
        answer: 'نعم، يتم تجديد الاشتراكات تلقائياً في نهاية كل فترة فوترة. يمكنك إلغاء التجديد التلقائي من إعدادات حسابك في أي وقت.'
      }
    ],
    certificates: [
      {
        question: 'كيف أحصل على شهادة إتمام الدورة؟',
        answer: 'تحصل على شهادة إتمام عند إكمال جميع متطلبات الدورة بنجاح. يشمل ذلك مشاهدة جميع الدروس وإكمال جميع الاختبارات والمشاريع بنجاح.'
      },
      {
        question: 'هل الشهادات معتمدة؟',
        answer: 'نعم، شهاداتنا معتمدة ومعترف بها من قبل الشركات الكبرى في المنطقة. تحتوي الشهادة على رمز فريد للتحقق من صحتها.'
      },
      {
        question: 'كيف يمكنني مشاركة شهادتي؟',
        answer: 'يمكنك مشاركة شهادتك مباشرة على LinkedIn، أو تحميلها كملف PDF، أو إضافة رابط مباشر إلى سيرتك الذاتية. كل شهادة لها رابط فريد للتحقق.'
      },
      {
        question: 'هل يمكنني الحصول على نسخة ورقية من الشهادة؟',
        answer: 'نعم، يمكن طلب نسخة ورقية من الشهادة مع ختم رسمي مقابل رسوم إضافية. تتوفر هذه الخدمة للمشتركين في الخطط المميزة.'
      }
    ],
    technical: [
      {
        question: 'ما هي متطلبات النظام لتشغيل الدورات؟',
        answer: 'ننصح باستخدام أحدث إصدارات المتصفحات (Chrome, Firefox, Safari, Edge) واتصال إنترنت بسرعة 5 ميجابت على الأقل. الدورات تعمل على أجهزة الكمبيوتر والهواتف الذكية والأجهزة اللوحية.'
      },
      {
        question: 'واجهت مشكلة تشغيل الفيديو، ماذا أفعل؟',
        answer: 'جرب تحديث المتصفح، التحقق من سرعة الإنترنت، ومحاولة تشغيل الفيديو في نافذة تصفح جديدة. إذا استمرت المشكلة، تواصل مع فريق الدعم الفني.'
      },
      {
        question: 'هل يمكنني استخدام المنصة على أجهزة متعددة؟',
        answer: 'نعم، يمكنك استخدام حسابك على أجهزة متعددة في نفس الوقت. يتم حفظ تقدمك تلقائياً ومزامنته بين جميع الأجهزة.'
      },
      {
        question: 'هل التطبيق متاح للهواتف؟',
        answer: 'نعم، يتوفر تطبيق LUMO لأجهزة iOS و Android. يمكنك تحميله من App Store أو Google Play للوصول إلى الدورات من أي مكان.'
      }
    ]
  };

  // Filter questions based on search
  const filteredQuestions = searchQuery 
    ? Object.entries(faqData).flatMap(([category, questions]) =>
        questions.map(q => ({ ...q, category }))
      ).filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">مركز المساعدة</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            إجابات لجميع أسئلتك. ابحث عن ما تحتاجه أو تصفح حسب الفئة
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن سؤال..."
                className="flex-1 p-4 text-gray-900 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {searchQuery ? (
          // Search Results
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              نتائج البحث ({filteredQuestions.length})
            </h2>
            <div className="space-y-4">
              {filteredQuestions.map((item, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                  <div className="mt-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                  </div>
                </Card>
              ))}
              {filteredQuestions.length === 0 && (
                <Card className="text-center py-16">
                  <div className="text-gray-400 mb-4 text-6xl">🔍</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">لم نعثر على نتائج</h3>
                  <p className="text-gray-500">جرب استخدام كلمات مختلفة أو تصفح الأسئلة حسب الفئة</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setSearchQuery('')}
                  >
                    مسح البحث
                  </Button>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Categories and Questions
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">الفئات</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setOpenCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-all ${
                          openCategory === category.id
                            ? 'bg-blue-50 text-blue-600 font-bold border-2 border-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <IconComponent size={20} />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Questions */}
            <div className="lg:w-3/4">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  {categories.find(c => c.id === openCategory)?.name}
                </h2>
                <p className="text-gray-500">
                  {faqData[openCategory as keyof typeof faqData]?.length || 0} سؤال
                </p>
              </div>

              <div className="space-y-4">
                {faqData[openCategory as keyof typeof faqData]?.map((faq, index) => (
                  <Card key={index} className="overflow-hidden">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      className="w-full p-6 text-right hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                        {openQuestion === index ? (
                          <ChevronUp className="text-blue-600" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400" size={20} />
                        )}
                      </div>
                    </button>
                    
                    {openQuestion === index && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">هل تحتاج مساعدة إضافية؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              فريق الدعم متاح لمساعدتك في أي وقت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">الدعم الفني</h3>
              <p className="text-gray-600 mb-6">
                فريق متخصص لمساعدتك في حل المشاكل التقنية
              </p>
              <Button variant="outline">تواصل مع الدعم</Button>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">مجتمع LUMO</h3>
              <p className="text-gray-600 mb-6">
                انضم إلى مجتمع المتعلمين وشارك الخبرات
              </p>
              <Button variant="outline">انضم للمجتمع</Button>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">جلسة استشارية</h3>
              <p className="text-gray-600 mb-6">
                احجز جلسة مع خبير لتخطيط مسارك التعليمي
              </p>
              <Button variant="outline">احجز جلسة</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
