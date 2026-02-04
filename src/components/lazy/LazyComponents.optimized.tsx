'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Lazy loading components with proper TypeScript types
const LazyInteractiveCourseCards = lazy(() => 
  import('../features/InteractiveCourseCards.optimized').then(module => ({
    default: module.default
  }))
);

const LazyAdvancedVideoPlayer = lazy(() => 
  import('../video/AdvancedVideoPlayer.optimized').then(module => ({
    default: module.AdvancedVideoPlayer
  }))
);

const LazyPersonalizedDashboard = lazy(() => 
  import('../dashboard/PersonalizedDashboard.optimized').then(module => ({
    default: module.default
  }))
);

const LazyAdvancedAnalytics = lazy(() => 
  import('../analytics/AdvancedAnalytics').then(module => ({
    default: module.default
  }))
);

const LazyAIChatbot = lazy(() => 
  import('../ai/AIChatbot').then(module => ({
    default: module.default
  }))
);

const LazyAIRecommendations = lazy(() => 
  import('../ai/AIRecommendations').then(module => ({
    default: module.default
  }))
);

const LazyRealTimeCollaboration = lazy(() => 
  import('../collaboration/RealTimeCollaboration').then(module => ({
    default: module.default
  }))
);

const LazyCertificateGenerator = lazy(() => 
  import('../certificates/CertificateGenerator').then(module => ({
    default: module.default
  }))
);

const LazyEnhancedHero = lazy(() => 
  import('../features/EnhancedHero').then(module => ({
    default: module.default
  }))
);

const LazyProfessionalCareerPaths = lazy(() => 
  import('../features/ProfessionalCareerPaths').then(module => ({
    default: module.default
  }))
);

const LazyProfessionalSuccessStories = lazy(() => 
  import('../features/ProfessionalSuccessStories').then(module => ({
    default: module.default
  }))
);

const LazyProfessionalNewsletter = lazy(() => 
  import('../features/ProfessionalNewsletter').then(module => ({
    default: module.default
  }))
);

const LazyProfessionalCoursesSection = lazy(() => 
  import('../features/ProfessionalCoursesSection').then(module => ({
    default: module.default
  }))
);

// Loading component with different variants
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'skeleton';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default',
  message = 'جاري التحميل...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center ${containerClasses[size]}`}
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500 mb-4`} />
      <p className="text-gray-600 text-sm">{message}</p>
    </motion.div>
  );
};

// Error boundary for lazy loaded components
interface LazyErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

class LazyErrorBoundary extends React.Component<LazyErrorBoundaryProps, { hasError: boolean; error?: Error }> {
  constructor(props: LazyErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ في التحميل</h3>
          <p className="text-gray-600 mb-4">لم نتمكن من تحميل هذا المكون. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy wrapper component with error boundary and loading state
interface LazyWrapperProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  fallbackMessage?: string;
  loadingSize?: 'sm' | 'md' | 'lg';
  loadingVariant?: 'default' | 'minimal' | 'skeleton';
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  loadingComponent,
  errorComponent,
  fallbackMessage = 'جاري التحميل...',
  loadingSize = 'md',
  loadingVariant = 'default'
}) => {
  const defaultLoading = (
    <LoadingSpinner 
      size={loadingSize} 
      variant={loadingVariant} 
      message={fallbackMessage} 
    />
  );

  const defaultError = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 mb-4">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ في التحميل</h3>
      <p className="text-gray-600">لم نتمكن من تحميل هذا المكون.</p>
    </div>
  );

  return (
    <LazyErrorBoundary fallback={errorComponent || defaultError}>
      <Suspense fallback={loadingComponent || defaultLoading}>
        {children}
      </Suspense>
    </LazyErrorBoundary>
  );
};

// Export lazy components with wrappers
export const LazyInteractiveCourseCardsWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل الدورات...">
    <LazyInteractiveCourseCards {...props} />
  </LazyWrapper>
);

export const LazyAdvancedVideoPlayerWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل مشغل الفيديو...">
    <LazyAdvancedVideoPlayer {...props} />
  </LazyWrapper>
);

export const LazyPersonalizedDashboardWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل لوحة التحكم...">
    <LazyPersonalizedDashboard {...props} />
  </LazyWrapper>
);

export const LazyAdvancedAnalyticsWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل التحليلات...">
    <LazyAdvancedAnalytics {...props} />
  </LazyWrapper>
);

export const LazyAIChatbotWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل المساعد الذكي...">
    <LazyAIChatbot {...props} />
  </LazyWrapper>
);

export const LazyAIRecommendationsWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل التوصيات...">
    <LazyAIRecommendations {...props} />
  </LazyWrapper>
);

export const LazyRealTimeCollaborationWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل التعاون...">
    <LazyRealTimeCollaboration {...props} />
  </LazyWrapper>
);

export const LazyCertificateGeneratorWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل منشئ الشهادات...">
    <LazyCertificateGenerator {...props} />
  </LazyWrapper>
);

export const LazyEnhancedHeroWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل الصفحة الرئيسية...">
    <LazyEnhancedHero {...props} />
  </LazyWrapper>
);

export const LazyProfessionalCareerPathsWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل المسارات المهنية...">
    <LazyProfessionalCareerPaths {...props} />
  </LazyWrapper>
);

export const LazyProfessionalSuccessStoriesWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل قصص النجاح...">
    <LazyProfessionalSuccessStories {...props} />
  </LazyWrapper>
);

export const LazyProfessionalNewsletterWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل النشرة البريدية...">
    <LazyProfessionalNewsletter {...props} />
  </LazyWrapper>
);

export const LazyProfessionalCoursesSectionWrapper: React.FC<any> = (props) => (
  <LazyWrapper fallbackMessage="جاري تحميل قسم الدورات...">
    <LazyProfessionalCoursesSection {...props} />
  </LazyWrapper>
);

// Preload function for critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be needed soon
  import('../features/InteractiveCourseCards.optimized');
  import('../video/AdvancedVideoPlayer.optimized');
  import('../dashboard/PersonalizedDashboard.optimized');
};

// Intersection Observer based lazy loading for better performance
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Higher-order component for intersection-based lazy loading
export const withIntersectionLazy = <P extends object>(
  Component: React.ComponentType<P>,
  loadingComponent?: React.ReactNode
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null);
    const isIntersecting = useIntersectionObserver(elementRef, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    if (!isIntersecting) {
      return (
        <div ref={elementRef}>
          {loadingComponent || <LoadingSpinner variant="skeleton" />}
        </div>
      );
    }

    return (
      <div ref={elementRef}>
        <Component {...props} ref={ref} />
      </div>
    );
  });
};

// Export individual lazy components for direct use
export {
  LazyInteractiveCourseCards,
  LazyAdvancedVideoPlayer,
  LazyPersonalizedDashboard,
  LazyAdvancedAnalytics,
  LazyAIChatbot,
  LazyAIRecommendations,
  LazyRealTimeCollaboration,
  LazyCertificateGenerator,
  LazyEnhancedHero,
  LazyProfessionalCareerPaths,
  LazyProfessionalSuccessStories,
  LazyProfessionalNewsletter,
  LazyProfessionalCoursesSection
};

// Export utility components
export { LoadingSpinner, LazyWrapper, LazyErrorBoundary };
