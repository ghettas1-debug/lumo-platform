"use client";

import { Shield, Users, Award, Clock, CheckCircle, AlertCircle, BookOpen, CreditCard, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Shield size={40} />
            <h1 className="text-4xl font-black">الشروط والأحكام</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
           欢迎使用 LUMO 平台。请仔细阅读以下条款和条件，这些条款规定了您对我们平台的使用。
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 text-blue-800">
              <Clock size={20} />
              <span className="font-medium">آخر تحديث: 15 يناير 2024</span>
            </div>
          </div>

          {/* Agreement */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الاتفاقية الشروط والأحكام</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
             欢迎使用 LUMO 教育平台（以下简称"本平台"）。通过访问或使用我们的服务，您同意受这些条款和条件的约束。如果您不同意这些条款，请不要使用我们的服务。
            </p>
            <p className="text-gray-600 leading-relaxed">
              这些条款和条件（"条款"） govern 您对 LUMO 平台和我们的服务（"服务"）的使用。通过创建账户或使用我们的服务，您确认您已阅读、理解并同意遵守这些条款。
            </p>
          </Card>

          {/* Services Description */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen size={28} />
              وصف الخدمات
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                LUMO 是一个在线教育平台，提供各种课程和教育内容。我们的服务包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>在线视频课程和教程</li>
                <li>互动学习材料和资源</li>
                <li>进度跟踪和评估工具</li>
                <li>证书和成就系统</li>
                <li>社区论坛和讨论区</li>
                <li>个性化学习推荐</li>
              </ul>
              <p>
                我们保留随时修改、暂停或终止任何服务的权利，恕不另行通知。
              </p>
            </div>
          </Card>

          {/* User Account */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users size={28} />
              حساب المستخدم
            </h2>
            <div className="space-y-4 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">إنشاء الحساب</h3>
              <p>
                要使用我们的某些服务，您必须创建账户。创建账户时，您同意：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>提供准确、完整和最新的信息</li>
                <li>维护账户信息的机密性</li>
                <li>对您账户下的所有活动负责</li>
                <li>立即通知我们任何未经授权的使用</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">账户安全</h3>
              <p>
                您负责维护账户的机密性。我们对因您未能保护账户而造成的任何损失或损害不承担责任。
              </p>
            </div>
          </Card>

          {/* Payment Terms */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CreditCard size={28} />
              شروط الدفع
            </h2>
            <div className="space-y-4 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">الأسعار والدفع</h3>
              <p>
                某些课程和服务可能需要付费。价格可能会不时更改，恕不另行通知。所有价格均以显示的货币显示。
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">سياسة الاسترداد</h3>
              <p>
                我们提供 30 天退款保证。如果您对购买的课程不满意，您可以在购买后 30 天内申请全额退款。
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>退款将在 7-14 个工作日内处理</li>
                <li>已完成的课程可能不符合退款条件</li>
                <li>某些促销项目可能有不同的退款政策</li>
              </ul>
            </div>
          </Card>

          {/* Intellectual Property */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award size={28} />
              الملكية الفكرية
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                平台上的所有内容，包括但不限于课程材料、视频、文本、图形、徽标和软件，均为 LUMO 或其内容提供者的财产，受版权和其他知识产权法保护。
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900">使用限制</h3>
              <p>
                您不得：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>复制、分发或展示任何内容</li>
                <li>为商业目的使用内容</li>
                <li>修改或创建衍生作品</li>
                <li>反向工程或尝试提取源代码</li>
              </ul>
            </div>
          </Card>

          {/* User Conduct */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">سلوك المستخدم</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                您同意不会：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>违反任何适用的法律或法规</li>
                <li>侵犯他人的知识产权</li>
                <li>发布有害、非法或不当内容</li>
                <li>干扰或破坏服务的运行</li>
                <li>尝试未经授权访问我们的系统</li>
                <li>骚扰或威胁其他用户</li>
              </ul>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield size={28} />
              الخصوصية
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                您的隐私对我们很重要。我们的隐私政策解释了我们如何收集、使用和保护您的信息。使用我们的服务即表示您同意我们的隐私政策中描述的做法。
              </p>
              <p>
                我们可能会收集以下类型的信息：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>个人信息（姓名、电子邮件地址等）</li>
                <li>学习进度和成绩</li>
                <li>使用数据和分析</li>
                <li>通信和反馈</li>
              </ul>
            </div>
          </Card>

          {/* Limitation of Liability */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">تحديد المسؤولية</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                在法律允许的最大范围内，LUMO 不对任何间接、偶然、特殊或后果性损害承担责任，包括但不限于利润损失、数据丢失或其他无形损失，源于：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>使用或无法使用服务</li>
                <li>通过服务获得的任何商品、数据、信息或服务的购买</li>
                <li>未经授权访问或更改您的传输或数据</li>
                <li>第三方在服务上的任何其他行为</li>
              </ul>
            </div>
          </Card>

          {/* Termination */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الإنهاء</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                我们可能随时终止或暂停您对服务的访问，无论是否通知，出于任何原因，包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>违反这些条款</li>
                <li>从事欺诈或非法活动</li>
                <li>对其他用户或平台造成风险</li>
                <li>不再提供我们的服务</li>
              </ul>
            </div>
          </Card>

          {/* Changes to Terms */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">تغييرات الشروط</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                我们保留随时修改这些条款的权利。如果我们进行重大更改，我们将通过电子邮件或在我们的平台上发布通知来通知您。继续使用服务即表示您接受修改后的条款。
              </p>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الاتصال</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={20} />
                <span>البريد الإلكتروني: support@lumo.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={20} />
                <span>الهاتف: +966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <AlertCircle size={20} />
                <span>العنوان: الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-4">قبول الشروط</h3>
              <p className="text-gray-600">
                通过使用 LUMO 平台，您确认您已阅读、理解并同意遵守这些条款和条件。如果您不同意这些条款，请停止使用我们的服务。
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

