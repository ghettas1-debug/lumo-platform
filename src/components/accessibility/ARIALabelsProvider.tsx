'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ARIA Labels Context
interface ARIALabelsContextType {
  announceToScreenReader: (message: string) => void;
  setLiveRegion: (region: 'polite' | 'assertive' | 'off') => void;
  getAriaLabel: (key: string, fallback?: string) => string;
  getAriaDescribedBy: (key: string) => string;
  getAriaLabelledBy: (key: string) => string;
}

const ARIALabelsContext = createContext<ARIALabelsContextType | undefined>(undefined);

// ARIA Labels Provider Component
export const ARIALabelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liveRegion, setLiveRegion] = useState<'polite' | 'assertive' | 'off'>('polite');

  // ARIA Labels mapping
  const ariaLabels = {
    // Navigation
    'nav.home': 'الصفحة الرئيسية',
    'nav.courses': 'الدورات',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.menu': 'قائمة التنقل',
    'nav.search': 'البحث في الموقع',
    'nav.notifications': 'الإشعارات',
    
    // Common Actions
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'action.edit': 'تعديل',
    'action.delete': 'حذف',
    'action.add': 'إضافة',
    'action.remove': 'إزالة',
    'action.submit': 'إرسال',
    'action.reset': 'إعادة تعيين',
    'action.clear': 'مسح',
    'action.copy': 'نسخ',
    'action.share': 'مشاركة',
    'action.download': 'تحميل',
    'action.upload': 'رفع',
    'action.close': 'إغلاق',
    'action.open': 'فتح',
    'action.expand': 'توسيع',
    'action.collapse': 'طي',
    'action.next': 'التالي',
    'action.previous': 'السابق',
    'action.first': 'الأول',
    'action.last': 'الأخير',
    'action.play': 'تشغيل',
    'action.pause': 'إيقاف مؤقت',
    'action.stop': 'إيقاف',
    'action.mute': 'كتم الصوت',
    'action.unmute': 'إلغاء كتم الصوت',
    'action.fullscreen': 'ملء الشاشة',
    'action.exit-fullscreen': 'خروج من ملء الشاشة',
    
    // Form Elements
    'form.required': 'حقل إلزامي',
    'form.optional': 'حقل اختياري',
    'form.invalid': 'بيانات غير صالحة',
    'form.valid': 'بيانات صالحة',
    'form.loading': 'جاري التحميل',
    'form.success': 'تم الإرسال بنجاح',
    'form.error': 'حدث خطأ',
    'form.email': 'البريد الإلكتروني',
    'form.password': 'كلمة المرور',
    'form.username': 'اسم المستخدم',
    'form.firstname': 'الاسم الأول',
    'form.lastname': 'الاسم الأخير',
    'form.phone': 'رقم الهاتف',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.country': 'الدولة',
    'form.zipcode': 'الرمز البريدي',
    'form.message': 'الرسالة',
    'form.subject': 'الموضوع',
    'form.search': 'البحث',
    
    // Course Related
    'course.title': 'عنوان الدورة',
    'course.description': 'وصف الدورة',
    'course.instructor': 'المدرب',
    'course.duration': 'المدة',
    'course.level': 'المستوى',
    'course.price': 'السعر',
    'course.rating': 'التقييم',
    'course.students': 'عدد الطلاب',
    'course.category': 'الفئة',
    'course.language': 'اللغة',
    'course.progress': 'التقدم',
    'course.enroll': 'التسجيل في الدورة',
    'course.enrolled': 'مسجل في الدورة',
    'course.start': 'بدء الدورة',
    'course.completed': 'مكتملة',
    'course.bookmark': 'إضافة إلى المفضلة',
    'course.share': 'مشاركة الدورة',
    'course.certificate': 'الشهادة',
    
    // Video Player
    'video.play': 'تشغيل الفيديو',
    'video.pause': 'إيقاف الفيديو',
    'video.replay': 'إعادة تشغيل',
    'video.mute': 'كتم صوت الفيديو',
    'video.unmute': 'تشغيل صوت الفيديو',
    'video.fullscreen': 'ملء الشاشة',
    'video.exit-fullscreen': 'خروج من ملء الشاشة',
    'video.seek-back': 'ترجيع 10 ثواني',
    'video.seek-forward': 'تقديم 10 ثواني',
    'video.quality': 'جودة الفيديو',
    'video.speed': 'سرعة التشغيل',
    'video.subtitles': 'الترجمة',
    'video.volume': 'مستوى الصوت',
    'video.progress': 'تقدم الفيديو',
    'video.duration': 'مدة الفيديو',
    'video.current-time': 'الوقت الحالي',
    
    // Dashboard
    'dashboard.overview': 'نظرة عامة',
    'dashboard.analytics': 'التحليلات',
    'dashboard.reports': 'التقارير',
    'dashboard.settings': 'الإعدادات',
    'dashboard.help': 'المساعدة',
    'dashboard.welcome': 'مرحباً بك في لوحة التحكم',
    'dashboard.recent-activity': 'النشاط الأخير',
    'dashboard.quick-actions': 'إجراءات سريعة',
    'dashboard.notifications': 'الإشعارات',
    'dashboard.messages': 'الرسائل',
    'dashboard.tasks': 'المهام',
    'dashboard.calendar': 'التقويم',
    
    // Notifications
    'notification.info': 'معلومات',
    'notification.success': 'نجاح',
    'notification.warning': 'تحذير',
    'notification.error': 'خطأ',
    'notification.new': 'إشعار جديد',
    'notification.mark-read': 'تعيين كمقروء',
    'notification.mark-unread': 'تعيين كغير مقروء',
    'notification.delete': 'حذف الإشعار',
    'notification.clear-all': 'مسح الكل',
    
    // Modal/Dialog
    'modal.title': 'عنوان النافذة',
    'modal.content': 'محتوى النافذة',
    'modal.close': 'إغلاق النافذة',
    'modal.confirm': 'تأكيد',
    'modal.cancel': 'إلغاء',
    'modal.save': 'حفظ',
    'modal.delete': 'حذف',
    'modal.warning': 'تحذير',
    'modal.error': 'خطأ',
    'modal.success': 'نجاح',
    'modal.info': 'معلومات',
    
    // Loading States
    'loading.general': 'جاري التحميل',
    'loading.saving': 'جاري الحفظ',
    'loading.deleting': 'جاري الحذف',
    'loading.uploading': 'جاري الرفع',
    'loading.downloading': 'جاري التحميل',
    'loading.processing': 'جاري المعالجة',
    'loading.searching': 'جاري البحث',
    'loading.connecting': 'جاري الاتصال',
    
    // Error Messages
    'error.general': 'حدث خطأ غير متوقع',
    'error.network': 'خطأ في الاتصال بالشبكة',
    'error.server': 'خطأ في الخادم',
    'error.validation': 'خطأ في التحقق من البيانات',
    'error.permission': 'ليس لديك صلاحية للقيام بهذا الإجراء',
    'error.not-found': 'الصفحة غير موجودة',
    'error.timeout': 'انتهت مدة الانتظار',
    'error.file-size': 'حجم الملف كبير جداً',
    'error.file-type': 'نوع الملف غير مدعوم',
    
    // Success Messages
    'success.saved': 'تم الحفظ بنجاح',
    'success.deleted': 'تم الحذف بنجاح',
    'success.updated': 'تم التحديث بنجاح',
    'success.created': 'تم الإنشاء بنجاح',
    'success.uploaded': 'تم الرفع بنجاح',
    'success.downloaded': 'تم التحميل بنجاح',
    'success.copied': 'تم النسخ بنجاح',
    'success.moved': 'تم النقل بنجاح',
    
    // Status Indicators
    'status.online': 'متصل',
    'status.offline': 'غير متصل',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    'status.pending': 'في الانتظار',
    'status.completed': 'مكتمل',
    'status.failed': 'فشل',
    'status.cancelled': 'ملغي',
    'status.archived': 'مؤرشف',
    
    // Accessibility
    'accessibility.skip-to-content': 'تخطي إلى المحتوى الرئيسي',
    'accessibility.skip-navigation': 'تخطي التنقل',
    'accessibility.main-content': 'المحتوى الرئيسي',
    'accessibility.navigation': 'التنقل',
    'accessibility.header': 'الترويسة',
    'accessibility.footer': 'التذييل',
    'accessibility.sidebar': 'الشريط الجانبي',
    'accessibility.search': 'البحث',
    'accessibility.menu': 'القائمة',
    'accessibility.button': 'زر',
    'accessibility.link': 'رابط',
    'accessibility.form': 'نموذج',
    'accessibility.input': 'حقل إدخال',
    'accessibility.select': 'قائمة منسدلة',
    'accessibility.checkbox': 'مربع اختيار',
    'accessibility.radio': 'زر اختيار',
    'accessibility.textarea': 'منطقة نص',
    'accessibility.table': 'جدول',
    'accessibility.dialog': 'نافذة حوار',
    'accessibility.alert': 'تنبيه',
    'accessibility.tooltip': 'تلميح',
    'accessibility.carousel': 'عرض شرائح',
    'accessibility.tab': 'تبويب',
    'accessibility.accordion': 'قائمة قابلة للطي',
    'accessibility.progressbar': 'شريط تقدم',
    'accessibility.spinner': 'مؤشر تحميل',
    'accessibility.modal': 'نافذة منبثقة',
    'accessibility.dropdown': 'قائمة منسدلة',
    'accessibility.breadcrumb': 'مسار التنقل',
    'accessibility.pagination': 'ترقيم الصفحات',
    'accessibility.timeline': 'خط زمني',
    'accessibility.card': 'بطاقة',
    'accessibility.badge': 'شارة',
    'accessibility.avatar': 'صورة شخصية',
    'accessibility.icon': 'أيقونة',
    'accessibility.image': 'صورة',
    'accessibility.video': 'فيديو',
    'accessibility.audio': 'صوت',
    'accessibility.chart': 'مخطط',
    'accessibility.map': 'خريطة',
  };

  // ARIA Descriptions mapping
  const ariaDescriptions = {
    'nav.home-desc': 'الانتقال إلى الصفحة الرئيسية',
    'nav.courses-desc': 'عرض جميع الدورات المتاحة',
    'nav.dashboard-desc': 'فتح لوحة التحكم الشخصية',
    'form.required-desc': 'هذا الحقل مطلوب ويجب ملؤه',
    'form.email-desc': 'أدخل بريدك الإلكتروني الصحيح',
    'form.password-desc': 'أدخل كلمة مرور قوية',
    'course.enroll-desc': 'التسجيل في هذه الدورة والبدء في التعلم',
    'video.play-desc': 'تشغيل الفيديو أو إيقافه',
    'modal.close-desc': 'إغلاق هذه النافذة والعودة إلى الصفحة',
    'notification.mark-read-desc': 'تعيين هذا الإشعار كمقروء',
    'loading.general-desc': 'النظام يقوم بتحميل البيانات، يرجى الانتظار',
    'error.network-desc': 'فشل الاتصال بالشبكة، تحقق من اتصالك بالإنترنت',
    'success.saved-desc': 'تم حفظ التغييرات بنجاح في النظام',
  };

  // ARIA LabelledBy mapping
  const ariaLabelledBy = {
    'form-field': 'form-field-label form-field-description',
    'modal-content': 'modal-title modal-description',
    'card-content': 'card-title card-description',
    'course-info': 'course-title course-instructor course-duration',
    'video-controls': 'video-title video-progress',
    'notification-item': 'notification-title notification-message notification-time',
  };

  // Function to get ARIA label
  const getAriaLabel = (key: string, fallback?: string): string => {
    return ariaLabels[key as keyof typeof ariaLabels] || fallback || key;
  };

  // Function to get ARIA described by
  const getAriaDescribedBy = (key: string): string => {
    return ariaDescriptions[key as keyof typeof ariaDescriptions] || '';
  };

  // Function to get ARIA labelled by
  const getAriaLabelledBy = (key: string): string => {
    return ariaLabelledBy[key as keyof typeof ariaLabelledBy] || '';
  };

  // Function to announce to screen reader
  const announceToScreenReader = (message: string) => {
    // Create live region if it doesn't exist
    let liveRegionElement = document.getElementById('screen-reader-announcements');
    
    if (!liveRegionElement) {
      liveRegionElement = document.createElement('div');
      liveRegionElement.setAttribute('id', 'screen-reader-announcements');
      liveRegionElement.setAttribute('aria-live', liveRegion);
      liveRegionElement.setAttribute('aria-atomic', 'true');
      liveRegionElement.setAttribute('class', 'sr-only');
      document.body.appendChild(liveRegionElement);
    }

    // Update live region politeness
    liveRegionElement.setAttribute('aria-live', liveRegion);

    // Announce the message
    liveRegionElement.textContent = message;

    // Clear the message after a delay
    setTimeout(() => {
      liveRegionElement.textContent = '';
    }, 1000);
  };

  // Initialize live regions
  useEffect(() => {
    // Create live regions for screen readers
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('id', 'live-region-polite');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.setAttribute('class', 'sr-only');
    document.body.appendChild(politeRegion);

    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('id', 'live-region-assertive');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.setAttribute('class', 'sr-only');
    document.body.appendChild(assertiveRegion);

    return () => {
      // Cleanup live regions
      politeRegion.remove();
      assertiveRegion.remove();
    };
  }, []);

  const value: ARIALabelsContextType = {
    announceToScreenReader,
    setLiveRegion,
    getAriaLabel,
    getAriaDescribedBy,
    getAriaLabelledBy,
  };

  return (
    <ARIALabelsContext.Provider value={value}>
      {children}
    </ARIALabelsContext.Provider>
  );
};

// Hook to use ARIA labels
export const useARIALabels = () => {
  const context = useContext(ARIALabelsContext);
  if (!context) {
    throw new Error('useARIALabels must be used within ARIALabelsProvider');
  }
  return context;
};

// HOC to add ARIA labels to components
export const withARIALabels = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaLabelledBy?: string;
    role?: string;
    tabIndex?: number;
  } = {}
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { getAriaLabel, getAriaDescribedBy, getAriaLabelledBy } = useARIALabels();
    
    const ariaProps = {
      'aria-label': options.ariaLabel ? getAriaLabel(options.ariaLabel) : undefined,
      'aria-describedby': options.ariaDescribedBy ? getAriaDescribedBy(options.ariaDescribedBy) : undefined,
      'aria-labelledby': options.ariaLabelledBy ? getAriaLabelledBy(options.ariaLabelledBy) : undefined,
      role: options.role,
      tabIndex: options.tabIndex,
    };

    return <Component {...props} {...ariaProps} ref={ref} />;
  });
};

// Utility functions for common ARIA patterns
export const ariaUtils = {
  // Create accessible button
  createAccessibleButton: (label: string, description?: string) => ({
    'aria-label': label,
    'aria-describedby': description,
    role: 'button',
    tabIndex: 0,
  }),

  // Create accessible link
  createAccessibleLink: (label: string, description?: string) => ({
    'aria-label': label,
    'aria-describedby': description,
    role: 'link',
  }),

  // Create accessible form field
  createAccessibleFormField: (label: string, description?: string, required?: boolean) => ({
    'aria-label': label,
    'aria-describedby': description,
    'aria-required': required,
    'aria-invalid': false,
  }),

  // Create accessible modal
  createAccessibleModal: (title: string, description?: string) => ({
    'aria-label': title,
    'aria-describedby': description,
    'aria-modal': true,
    role: 'dialog',
  }),

  // Create accessible navigation
  createAccessibleNavigation: (label: string) => ({
    'aria-label': label,
    role: 'navigation',
  }),

  // Create accessible landmark
  createAccessibleLandmark: (role: string, label?: string) => ({
    role,
    'aria-label': label,
  }),

  // Create accessible table
  createAccessibleTable: (caption: string) => ({
    'aria-label': caption,
    role: 'table',
  }),

  // Create accessible list
  createAccessibleList: (label: string) => ({
    'aria-label': label,
    role: 'list',
  }),

  // Create accessible progress indicator
  createAccessibleProgress: (label: string, value?: number) => ({
    'aria-label': label,
    'aria-valuenow': value,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    role: 'progressbar',
  }),

  // Create accessible slider
  createAccessibleSlider: (label: string, value?: number, min?: number, max?: number) => ({
    'aria-label': label,
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
    role: 'slider',
  }),

  // Create accessible switch
  createAccessibleSwitch: (label: string, checked?: boolean) => ({
    'aria-label': label,
    'aria-checked': checked,
    role: 'switch',
  }),

  // Create accessible checkbox
  createAccessibleCheckbox: (label: string, checked?: boolean) => ({
    'aria-label': label,
    'aria-checked': checked,
    role: 'checkbox',
  }),

  // Create accessible radio
  createAccessibleRadio: (label: string, checked?: boolean) => ({
    'aria-label': label,
    'aria-checked': checked,
    role: 'radio',
  }),

  // Create accessible tab
  createAccessibleTab: (label: string, selected?: boolean) => ({
    'aria-label': label,
    'aria-selected': selected,
    role: 'tab',
  }),

  // Create accessible tooltip
  createAccessibleTooltip: (content: string) => ({
    'aria-label': content,
    role: 'tooltip',
  }),
};

export default ARIALabelsProvider;
