"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Code, 
  Globe, 
  Shield, 
  Zap, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  Github, 
  Terminal, 
  Database, 
  Key, 
  Clock, 
  Users, 
  FileText, 
  Mail, 
  Phone,
  BookOpen,
  Rocket,
  Settings,
  ChevronRight,
  Lock,
  Unlock,
  Server,
  Cloud
} from 'lucide-react';

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'documentation' | 'sdk' | 'support'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/courses',
      description: 'الحصول على جميع الدورات',
      example: 'curl -X GET https://api.lumo.com/v1/courses',
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'رقم الصفحة' },
        { name: 'limit', type: 'number', required: false, description: 'عدد النتائج' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/users',
      description: 'إنشاء مستخدم جديد',
      example: 'curl -X POST https://api.lumo.com/v1/users -d "name=John&email=john@example.com"',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'اسم المستخدم' },
        { name: 'email', type: 'string', required: true, description: 'البريد الإلكتروني' }
      ]
    },
    {
      method: 'GET',
      path: '/api/v1/enrollments',
      description: 'الحصول على تسجيلات المستخدم',
      example: 'curl -X GET https://api.lumo.com/v1/enrollments',
      parameters: [
        { name: 'user_id', type: 'string', required: true, description: 'معرف المستخدم' }
      ]
    }
  ];

  const sdks = [
    {
      name: 'JavaScript SDK',
      description: 'مكتبة JavaScript لتطبيقات الويب',
      language: 'javascript',
      install: 'npm install @lumo/sdk-js',
      example: `import { LumoSDK } from '@lumo/sdk-js';

const sdk = new LumoSDK({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.lumo.com'
});

// الحصول على الدورات
const courses = await sdk.courses.list();`,
      features: ['TypeScript', 'Promise-based', 'Error handling', 'Rate limiting']
    },
    {
      name: 'Python SDK',
      description: 'مكتبة Python للتطبيقات الخلفية',
      language: 'python',
      install: 'pip install lumo-sdk',
      example: `from lumo_sdk import LumoSDK

sdk = LumoSDK(
    api_key='your-api-key',
    base_url='https://api.lumo.com'
)

# الحصول على الدورات
courses = sdk.courses.list()`,
      features: ['Async/await', 'Type hints', 'Error handling', 'Rate limiting']
    },
    {
      name: 'React SDK',
      description: 'مكونات React لتطبيقات الويب',
      language: 'javascript',
      install: 'npm install @lumo/react-sdk',
      example: `import { LumoProvider, CourseList } from '@lumo/react-sdk';

function App() {
  return (
    <LumoProvider apiKey="your-api-key">
      <CourseList />
    </LumoProvider>
  );
}`,
      features: ['React Hooks', 'Components', 'TypeScript', 'Server-side rendering']
    }
  ];

  const webhooks = [
    {
      event: 'user.created',
      description: 'يتم إطلاقه عند إنشاء مستخدم جديد',
      payload: `{
  "event": "user.created",
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2026-01-30T12:00:00Z"
  }
}`
    },
    {
      event: 'course.completed',
      description: 'يتم إطلاقه عند إكمال دورة',
      payload: `{
  "event": "course.completed",
  "data": {
    "user_id": "user_123",
    "course_id": "course_456",
    "completed_at": "2026-01-30T12:00:00Z",
    "score": 95
  }
}`
    },
    {
      event: 'enrollment.created',
      description: 'يتم إطلاقه عند تسجيل مستخدم في دورة',
      payload: `{
  "event": "enrollment.created",
  "data": {
    "user_id": "user_123",
    "course_id": "course_456",
    "enrolled_at": "2026-01-30T12:00:00Z"
  }
}`
    }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">مطورو Lumo</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              وثائق API و SDKs وأدوات التطوير لدمج Lumo في تطبيقاتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Github className="w-4 h-4 ml-2" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <BookOpen className="w-4 h-4 ml-2" />
                الوثائق الكاملة
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              API
            </button>
            <button
              onClick={() => setActiveTab('documentation')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documentation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الوثائق
            </button>
            <button
              onClick={() => setActiveTab('sdk')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sdk'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              SDKs
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'support'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الدعم
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">نقاطف API</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="p-3 bg-green-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Database className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-gray-600">SDKs</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="p-3 bg-purple-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">مطورون</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="p-3 bg-orange-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-gray-600">وقت تشغيل</div>
              </Card>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">RESTful API</h3>
                </div>
                <p className="text-gray-600">API RESTful متكامل مع جميع الميزات</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Key className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">مصادقة API</h3>
                </div>
                <p className="text-gray-600">مفتاح API آمن مع إدارة سهلة</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">محدودات الأسعار</h3>
                </div>
                <p className="text-gray-600">محدودات الأسعار المرنة للتحكم في التكاليف</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Cloud className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
                </div>
                <p className="text-gray-600">استقبال أحداث في الوقت الفعلي</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">HTTPS</h3>
                </div>
                <p className="text-gray-600">اتصالات آمنة بالكامل</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Server className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">البيئة السحابية</h3>
                </div>
                <p className="text-gray-600">بنية تحتية سحابية قابلة للتوسع</p>
              </Card>
            </div>

            {/* Quick Start */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">البدء السريع</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1. احصل على مفتاح API</div>
                    <div className="text-sm text-gray-600">سجل في لوحة المطورين واحصل على مفتاح API</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2. اختر SDK</div>
                    <div className="text-sm text-gray-600">اختر SDK المناسب لتطبيقك</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Rocket className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">3. ابدأ التطوير</div>
                    <div className="text-sm text-gray-600">استخدم API و SDK لبناء تطبيقك</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">نقاطف API</h2>
            
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-900 font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">المعلمات:</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, index) => (
                        <div key={index} className="flex items-center gap-4 text-sm">
                          <code className="bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                          <span className="text-gray-600">{param.type}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {param.required ? 'مطلوب' : 'اختياري'}
                          </span>
                          <span className="text-gray-600">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">مثال:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{endpoint.example}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(endpoint.example)}
                        className="absolute top-2 left-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-300" />
                      </button>
                      {copiedCode === endpoint.example && (
                        <div className="absolute top-2 left-12 p-2 bg-green-600 rounded">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الوثائق</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">دليل API</h3>
                </div>
                <p className="text-gray-600 mb-4">دليل شامل لجميع نقاطف API</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  عرض الدليل
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">أمثلة الكود</h3>
                </div>
                <p className="text-gray-600 mb-4">أمثلة عملية لاستخدام API</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  عرض الأمثلة
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Terminal className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">أدوات سطر الأوامر</h3>
                </div>
                <p className="text-gray-600 mb-4">أدوات CLI لتطوير سريع</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  عرض الأدوات
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Cloud className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">البيئة السحابية</h3>
                </div>
                <p className="text-gray-600 mb-4">إعدادات البيئة السحابية</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  عرض الإعدادات
                </Button>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'sdk' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs</h2>
            
            <div className="space-y-6">
              {sdks.map((sdk, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{sdk.name}</h3>
                      <p className="text-gray-600">{sdk.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">التثبيت:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{sdk.install}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(sdk.install)}
                        className="absolute top-2 left-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">مثال:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{sdk.example}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(sdk.example)}
                        className="absolute top-2 left-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">الميزات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {sdk.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الدعم للمطورين</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">البريد الإلكتروني</h3>
                </div>
                <p className="text-gray-600 mb-4">دعم فني للمطورين</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">developers@lumo.com</span>
                  </div>
                  <div className="text-sm text-gray-500">استجابة خلال 24 ساعة</div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Github className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">GitHub</h3>
                </div>
                <p className="text-gray-600 mb-4">القضايا والمساهمات</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">github.com/lumo/api</span>
                  </div>
                  <div className="text-sm text-gray-500">مفتوح المصدر</div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">مجتمع المطورين</h3>
                </div>
                <p className="text-gray-600 mb-4">منتدى المطورين</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">community.lumo.com</span>
                  </div>
                  <div className="text-sm text-gray-500">10K+ عضو</div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">حالة الخدمة</h3>
                </div>
                <p className="text-gray-600 mb-4">حالة API والخدمات</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">status.lumo.com</span>
                  </div>
                  <div className="text-sm text-gray-500">تحديث في الوقت الفعلي</div>
                </div>
              </Card>
            </div>
            
            {/* Webhooks */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Webhooks</h3>
              <div className="space-y-4">
                {webhooks.map((webhook, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {webhook.event}
                      </span>
                      <span className="text-gray-600">{webhook.description}</span>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{webhook.payload}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <Card className="p-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
            <p className="text-xl mb-6">
              انضم إلى آلاف المطورين الذين يستخدمون Lumo API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Key className="w-4 h-4 ml-2" />
                احصل على مفتاح API
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <BookOpen className="w-4 h-4 ml-2" />
                اقرأ الوثائق
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
