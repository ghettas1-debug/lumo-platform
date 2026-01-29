"use client";

import { useState, useRef } from 'react';
import { 
  Download, Share2, Award, Calendar, User, 
  CheckCircle, Mail, Printer, QrCode, Star,
  Shield, Clock, BookOpen, Target
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface CertificateData {
  id: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  duration: string;
  grade: string;
  score: number;
  totalScore: number;
  certificateId: string;
  verificationUrl: string;
  courseDescription?: string;
  skills?: string[];
  logo?: string;
  signature?: string;
}

interface CertificateGeneratorProps {
  certificateData: CertificateData;
  template?: 'modern' | 'classic' | 'minimal' | 'professional';
  onDownload?: (format: 'pdf' | 'png' | 'jpg') => void;
  onShare?: () => void;
}

export default function CertificateGenerator({
  certificateData,
  template = 'modern',
  onDownload,
  onShare
}: CertificateGeneratorProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'png' | 'jpg'>('pdf');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimal' | 'professional'>('modern');

  const handleDownload = async (format: 'pdf' | 'png' | 'jpg') => {
    setIsGenerating(true);
    
    try {
      if (format === 'pdf') {
        await generatePDF();
      } else {
        await generateImage(format);
      }
      onDownload?.(format);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDF = async () => {
    // In a real app, you would use a library like jsPDF or html2pdf
    // For demo purposes, we'll simulate the PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,certificate-data'; // Mock PDF data
    link.download = `certificate-${certificateData.id}.pdf`;
    link.click();
  };

  const generateImage = async (format: 'png' | 'jpg') => {
    if (!certificateRef.current) return;
    
    // Use html2canvas or similar library to convert the certificate to image
    // For demo purposes, we'll simulate the image generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = 'data:image/png;base64,certificate-data'; // Mock image data
    link.download = `certificate-${certificateData.id}.${format}`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'شهادة إتمام الدورة',
        text: `لقد حصلت على شهادة إتمام دورة "${certificateData.courseName}"`,
        url: certificateData.verificationUrl
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(certificateData.verificationUrl);
      alert('تم نسخ رابط التحقق إلى الحافظة!');
    }
    onShare?.();
  };

  const renderModernTemplate = () => (
    <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden" style={{ width: '800px', height: '600px' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200 rounded-full -ml-24 -mb-24 opacity-20"></div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10 p-12 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center">
              <Award size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">شهادة إتمام</h1>
              <p className="text-sm text-gray-600">منصة LUMO التعليمية</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 text-center">
          <p className="text-xl text-gray-700 mb-4">
            تُشهد هذه الشهادة بأن
          </p>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            {certificateData.studentName}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            قد أكمل بنجاح دراسة
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            "{certificateData.courseName}"
          </h3>
          {certificateData.courseDescription && (
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {certificateData.courseDescription}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-8 text-sm text-gray-600 mb-6">
          <div className="text-right">
            <p><span className="font-medium">المدرجة:</span> {certificateData.grade}</p>
            <p><span className="font-medium">النقاط:</span> {certificateData.score}/{certificateData.totalScore}</p>
            <p><span className="font-medium">المدة:</span> {certificateData.duration}</p>
          </div>
          <div className="text-right">
            <p><span className="font-medium">المدرّب:</span> {certificateData.instructorName}</p>
            <p><span className="font-medium">تاريخ الإتمام:</span> {certificateData.completionDate}</p>
            <p><span className="font-medium">رقم الشهادة:</span> {certificateData.certificateId}</p>
          </div>
        </div>

        {/* Skills */}
        {certificateData.skills && certificateData.skills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">المهارات المكتسبة:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {certificateData.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verification */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <QrCode size={40} />
            <div className="text-right">
              <p>تحقق من صحة الشهادة</p>
              <p className="font-mono">{certificateData.verificationUrl}</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-8">
          <div className="text-center">
            <div className="border-t border-gray-300 pt-2">
              <p className="text-xs text-gray-600">توقيع المدير</p>
              <p className="text-sm font-medium text-gray-800">أحمد محمد</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-300 pt-2">
              <p className="text-xs text-gray-600">توقيع المدرّب</p>
              <p className="text-sm font-medium text-gray-800">{certificateData.instructorName}</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Shield size={16} className="text-yellow-900" />
          </div>
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <CheckCircle size={16} className="text-green-900" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl border-4 border-amber-200" style={{ width: '800px', height: '600px' }}>
      {/* Decorative Border */}
      <div className="absolute inset-4 border-2 border-amber-300 rounded-lg"></div>
      
      {/* Certificate Content */}
      <div className="relative z-10 p-12 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center">
              <Star size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">شهادة تقدير</h1>
              <p className="text-sm text-amber-700">لإتمام الدورة بنجاح</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 text-center">
          <p className="text-lg text-amber-800 mb-4 font-serif">
            تُشهد هذه الشهادة بأن الطالب/الطالبة
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-2 font-serif">
            {certificateData.studentName}
          </h2>
          <p className="text-xl text-amber-800 mb-6 font-serif">
            قد أكمل بنجاح دراسة وتقييم
          </p>
          <h3 className="text-2xl font-bold text-amber-900 mb-2 font-serif">
            "{certificateData.courseName}"
          </h3>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-8 text-sm text-amber-700 mb-6">
          <div className="text-right">
            <p><span className="font-medium">التقييم:</span> {certificateData.grade}</p>
            <p><span className="font-medium">المدة:</span> {certificateData.duration}</p>
          </div>
          <div className="text-right">
            <p><span className="font-medium">المدرّب:</span> {certificateData.instructorName}</p>
            <p><span className="font-medium">التاريخ:</span> {certificateData.completionDate}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t-2 border-amber-300">
          <div className="flex justify-between items-center text-xs text-amber-600">
            <p>رقم الشهادة: {certificateData.certificateId}</p>
            <p>الصالحة: {certificateData.verificationUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="bg-white rounded-lg shadow-2xl" style={{ width: '800px', height: '600px' }}>
      <div className="p-16 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2">Certificate</h1>
          <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-light text-gray-700 mb-2">
            {certificateData.studentName}
          </h2>
          <h3 className="text-xl font-light text-gray-600 mb-1">
            has successfully completed
          </h3>
          <h4 className="text-2xl font-medium text-gray-900 mb-6">
            {certificateData.courseName}
          </h4>
          <p className="text-gray-600 mb-8">
            Grade: {certificateData.grade} • Score: {certificateData.score}/{certificateData.totalScore}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <p>{certificateData.completionDate}</p>
            <p>ID: {certificateData.certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl" style={{ width: '800px', height: '600px' }}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm p-8 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                <Target size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Professional Certificate</h1>
                <p className="text-sm text-gray-300">LUMO Learning Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 text-white">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 mb-4">
              This is to certify that
            </p>
            <h2 className="text-3xl font-bold text-white mb-6">
              {certificateData.studentName}
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              has successfully completed the professional course
            </p>
            <h3 className="text-2xl font-bold text-blue-400 mb-6">
              {certificateData.courseName}
            </h3>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-400">Grade</p>
                <p className="text-xl font-bold text-white">{certificateData.grade}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-xl font-bold text-white">{certificateData.score}/{certificateData.totalScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-xl font-bold text-white">{certificateData.duration}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          {certificateData.skills && certificateData.skills.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">Skills Acquired</p>
              <div className="flex flex-wrap justify-center gap-2">
                {certificateData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/20">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              <p>Instructor: {certificateData.instructorName}</p>
              <p>Completed: {certificateData.completionDate}</p>
            </div>
            <div className="text-right">
              <p>Verification: {certificateData.verificationUrl}</p>
              <p>ID: {certificateData.certificateId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'professional':
        return renderProfessionalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مولد الشهادات</h1>
          <p className="text-gray-600">إنشاء شهادات احترافية قابلة للتحقق</p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">القالب:</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="modern">حديث</option>
                <option value="classic">كلاسيكي</option>
                <option value="minimal">بسيط</option>
                <option value="professional">احترافي</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                size="sm"
              >
                {showPreview ? 'إخفاء' : 'عرض'} المعاينة
              </Button>
              
              <Button
                onClick={() => handleShare()}
                variant="outline"
                size="sm"
              >
                <Share2 size={16} className="ml-2" />
                مشاركة
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="pdf">PDF</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
              
              <Button
                onClick={() => handleDownload(selectedFormat)}
                variant="primary"
                size="sm"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإنشاء...
                  </div>
                ) : (
                  <>
                    <Download size={16} className="ml-2" />
                    تحميل
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Certificate Preview */}
        {showPreview && (
          <Card className="p-8 overflow-auto">
            <div className="flex justify-center">
              <div ref={certificateRef}>
                {renderTemplate()}
              </div>
            </div>
          </Card>
        )}

        {/* Certificate Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات الشهادة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">بيانات الطالب</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">الاسم:</span> {certificateData.studentName}</p>
                <p><span className="font-medium">الدورة:</span> {certificateData.courseName}</p>
                <p><span className="font-medium">المدرّب:</span> {certificateData.instructorName}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">بيانات الإنجاز</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">التقييم:</span> {certificateData.grade}</p>
                <p><span className="font-medium">النقاط:</span> {certificateData.score}/{certificateData.totalScore}</p>
                <p><span className="font-medium">المدة:</span> {certificateData.duration}</p>
                <p><span className="font-medium">تاريخ الإتمام:</span> {certificateData.completionDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">التحقق من الصحة</h4>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <QrCode size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">التحقق عبر QR Code</p>
                  <p className="text-blue-700 text-xs">{certificateData.verificationUrl}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
