"use client";

import { useState } from 'react';
import { Award, Download, Share2, ExternalLink, Search, Filter, Calendar, Clock, CheckCircle, Star, User, Mail, Phone, Globe, Shield, Eye, Copy, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CertificateGenerator from '@/components/certificates/CertificateGenerator';

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const certificates = [
    {
      id: 'LUMO-2024-PYT-001',
      courseTitle: 'احتراف Python 2026 من الصفر إلى الاحتراف',
      instructor: 'أحمد محمود',
      instructorTitle: 'خبير تطوير الويب والذكاء الاصطناعي',
      issueDate: '15 مارس 2024',
      completionDate: '10 مارس 2024',
      grade: 'A+',
      score: 95,
      totalScore: 100,
      duration: '6 أسابيع',
      category: 'برمجة',
      status: 'issued',
      verificationUrl: 'https://lumo.com/verify/LUMO-2024-PYT-001',
      certificateId: 'LUMO-2024-PYT-001',
      studentName: 'محمد أحمد عبدالله',
      skills: ['Python', 'Django', 'REST API', 'Machine Learning', 'Data Analysis', 'SQL'],
      description: 'دورة متقدمة في برمجة Python تغطي المفاهيم الأساسية والمتقدمة مع التركيز على التطبيقات العملية'
    },
    {
      id: 'LUMO-2024-REACT-002',
      courseTitle: 'تطوير تطبيقات الويب الحديثة مع React.js',
      instructor: 'سارة خالد',
      instructorTitle: 'مطورة واجهات المستخدم ومطورة تطبيقات الويب',
      issueDate: '20 أبريل 2024',
      completionDate: '5 أبريل 2024',
      grade: 'A',
      score: 92,
      totalScore: 100,
      duration: '8 أسابيع',
      category: 'برمجة',
      status: 'issued',
      verificationUrl: 'https://lumo.com/verify/LUMO-2024-REACT-002',
      certificateId: 'LUMO-2024-REACT-002',
      studentName: 'فاطمة سالمحمد',
      skills: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'Node.js'],
      description: 'دورة شاملة في تطوير تطبيقات الويب الحديثة باستخدام React.js وأحدث التقنيات'
    },
    {
      id: 'LUMO-2024-UX-003',
      courseTitle: 'تصميم تجربة المستخدم (UX) الاحترافي',
      instructor: 'ليلى حسن',
      instructorTitle: 'مصممة تجربة المستخدم وخبيرة التصميم',
      issueDate: '10 مايو 2024',
      completionDate: '25 مايو 2024',
      grade: 'B+',
      score: 88,
      totalScore: 100,
      duration: '4 أسابيع',
      category: 'تصميم',
      status: 'issued',
      verificationUrl: 'https://lumo.com/verify/LUMO-2024-UX-003',
      certificateId: 'LUMO-2024-UX-003',
      studentName: 'نور الدين محمد',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
      description: 'دورة متخصصة في تصميم تجربة المستخدم مع التركيز على الأدوات الحديثة وأفضل الممارسات'
    },
    {
      'id': 'LUMO-2024-DATA-004',
      courseTitle: 'تحليل البيانات مع Python وPandas',
      instructor: 'خالد إبراهيم',
      instructorTitle: 'محلل بيانات وخبير علم البيانات',
      issueDate: '5 يونيو 2024',
      completionDate: '15 يونيو 2024',
      grade: 'A-',
      score: 85,
      totalScore: 100,
      duration: '10 أسابيع',
      category: 'تحليل',
      status: 'issued',
      verificationUrl: 'https://lumo.com/verify/LUMO-2024-DATA-004',
      certificateId: 'LUMO-2024-DATA-004',
      studentName: 'عبدالله السعيد',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'SQL'],
      description: 'دورة متقدمة في تحليل البيانات باستخدام Python ومكتباتها الشهيرة'
    },
    {
      id: 'LUMO-2024-SEC-005',
      courseTitle: 'الأمن السيبراني للمبتدئين',
      instructor: 'علياء الأمن',
      instructorTitle: 'خبير أمن سيبراني ومستشار تقني',
      issueDate: '1 يوليو 2024',
      completionDate: '20 يوليو 2024',
      grade: 'B',
      score: 78,
      totalScore: 100,
      duration: '6 أسابيع',
      category: 'أمن',
      status: 'issued',
      verificationUrl: 'https://lumo.com/verify/LUMO-2024-SEC-005',
      certificateId: 'LUMO-2024-SEC-005',
      studentName: 'راشد العنزي',
      skills: ['Network Security', 'Web Security', 'Cryptography', 'Penetration Testing', 'Firewall', 'SIEM'],
      description: 'دورة أساسية في الأمن السيبراني مع التركيز على المفاهيم الأساسية والتطبيق العملي'
    }
  ];

  const categories = [
    { id: 'all', name: 'الكل', count: certificates.length },
    { id: 'programming', name: 'برمجة', count: 2 },
    { id: 'design', name: 'تصميم', count: 1 },
    { id: 'data', name: 'تحليل', count: 1 },
    { id: 'security', name: 'أمن', count: 1 }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate.id);
  };

  const handleDownloadCertificate = (certificate: any, format: 'pdf' | 'png' | 'jpg') => {
    // In a real app, this would generate and download the certificate
    console.log(`Downloading certificate ${certificate.id} as ${format}`);
  };

  const handleShareCertificate = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: `شهادة إتمام دورة ${certificate.courseTitle}`,
        text: `لقد حصلت على شهادة بتقدير ${certificate.grade} في دورة "${certificate.courseTitle}"`,
        url: certificate.verificationUrl
      });
    } else {
      navigator.clipboard.writeText(certificate.verificationUrl);
      alert('تم نسخ رابط التحقق إلى الحافظة!');
    }
  };

  const handleVerifyCertificate = (url: string) => {
    window.open(url, '_blank');
  };

  const copyToClipboard = (text: string, event?: React.MouseEvent) => {
    navigator.clipboard.writeText(text);
    // Show success message (in real app, you'd use a toast notification)
    if (event) {
      const button = event.target as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = 'تم النسخ!';
      button.classList.add('bg-green-600', 'text-white');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600', 'text-white');
      }, 2000);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-blue-100 text-blue-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'data': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (selectedCertificate) {
    const certificate = certificates.find(c => c.id === selectedCertificate);
    if (!certificate) return null;

    const certificateData = {
      id: certificate.id,
      studentName: certificate.studentName,
      courseName: certificate.courseTitle,
      instructorName: certificate.instructor,
      completionDate: certificate.completionDate,
      duration: certificate.duration,
      grade: certificate.grade,
      score: certificate.score,
      totalScore: certificate.totalScore,
      certificateId: certificate.certificateId,
      verificationUrl: certificate.verificationUrl,
      courseDescription: certificate.description,
      skills: certificate.skills
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button
            onClick={() => setSelectedCertificate(null)}
            variant="outline"
            className="mb-8"
          >
            <ArrowRight size={20} className="ml-2" />
            العودة إلى القائمة
          </Button>

          <CertificateGenerator
            certificateData={certificateData}
            template="modern"
            onDownload={(format) => handleDownloadCertificate(certificate, format)}
            onShare={() => handleShareCertificate(certificate)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">شهاداتي</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استعرض وشارك شهاداتك الرقمية القابلة للتحقق
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{certificates.length}</div>
            <div className="text-sm text-gray-600">شهادة صادرة</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {certificates.reduce((sum, cert) => sum + (cert.score >= 80 ? 1 : 0), 0)}
            </div>
            <div className="text-sm text-gray-600">شهادة ممتازة</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length)}%
            </div>
            <div className="text-sm text-gray-600">متوسط النقاط</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {certificates.reduce((sum, cert) => sum + 1, 0)}
            </div>
            <div className="text-sm text-gray-600">شهادة هذا الشهر</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="البحث عن الشهادات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute right-3 top-3 text-gray-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <div className="absolute right-3 top-3 text-gray-400">
                  {viewMode === 'grid' ? <Globe size={20} /> : <User size={20} />}
                </div>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
                  className="appearance-none pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="grid">عرض شبكي</option>
                  <option value="list">عرض قائمة</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Certificates Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="group hover:shadow-lg transition-all duration-300">
              {viewMode === 'grid' ? (
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {certificate.courseTitle}
                      </h3>
                      <p className="text-sm text-gray-600">{certificate.instructor}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                      {certificate.status === 'issued' ? 'صادرة' : certificate.status === 'pending' ? 'قيد الإصدار' : 'منتهية الصلاحية'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الطالب:</span>
                      <span className="font-medium text-gray-900">{certificate.studentName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">التقييم:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(certificate.grade)}`}>
                        {certificate.grade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">النقاط:</span>
                      <span className="font-medium text-gray-900">{certificate.score}/{certificate.totalScore}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">المدة:</span>
                      <span className="font-medium text-gray-900">{certificate.duration}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">المهارات المكتسبة:</p>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{certificate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewCertificate(certificate)}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye size={16} className="ml-2" />
                      عرض
                    </Button>
                    <Button
                      onClick={() => handleDownloadCertificate(certificate, 'pdf')}
                      variant="outline"
                      size="sm"
                    >
                      <Download size={16} className="ml-2" />
                      تحميل
                    </Button>
                    <Button
                      onClick={() => handleShareCertificate(certificate)}
                      variant="outline"
                      size="sm"
                    >
                      <Share2 size={16} className="ml-2" />
                      مشاركة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{certificate.courseTitle}</h3>
                      <p className="text-sm text-gray-600">{certificate.instructor}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                      {certificate.status === 'issued' ? 'صادرة' : certificate.status === 'pending' ? 'قيد الإصدار' : 'منتهية الصلاحية'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">الطالب:</span>
                      <span className="font-medium text-gray-900">{certificate.studentName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(certificate.grade)}`}>
                        {certificate.grade}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {certificate.completionDate}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewCertificate(certificate)}
                      variant="primary"
                      size="sm"
                    >
                      <Eye size={16} className="ml-2" />
                      عرض
                    </Button>
                    <Button
                      onClick={() => handleDownloadCertificate(certificate, 'pdf')}
                      variant="outline"
                      size="sm"
                    >
                      <Download size={16} className="ml-2" />
                      تحميل
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد شهادات بعد</h3>
            <p className="text-gray-600">
              أكمل دوراتك واحصل على شهادات معتمة قابلة للتحقق
            </p>
          </Card>
        )}

        {/* Verification Info */}
        <Card className="p-6 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">التحقق من صحة الشهادة</h3>
          </div>
          <p className="text-gray-600 mb-4">
            كل شهادة صادرة من منصة LUMO تحتوي رقم تعريف فريد ورابط تحقق فريد. يمكن لأي شخص التحقق من صحة الشهادة عبر الرابط الموجود أو عن طريق مسح الرمز التعريفي الفريد.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-700">
                <p className="font-medium">كيفية التحقق:</p>
                <ol className="list-decimal list-inside list-decimal space-y-1">
                  <li>ادخل الرقم التعريفي للشهادة في صفحة التحقق</li>
                  <li>أو امسح الرمز التعريفي QR Code على الشهادة</li>
                  <li>سيتم عرض تفاصيل الشهادة وبيانات الإصدار</li>
                </ol>
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium">مميزات التحقق:</p>
                <ul className="list-disc list-inside list-disc space-y-1">
                  <li>الشهادة مشفرة بتقنية البلوك تشفير</li>
                  <li>البيانات محفوظة على سلسلة بلوك تشفير</li>
                  <li>لا يمكن تعديل أو تزوير الشهادة بعد الإصدار</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
