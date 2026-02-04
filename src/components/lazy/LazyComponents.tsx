'use client';

import React, { Suspense, lazy } from 'react';
import { FallbackComponents } from '@/components/ui/fallback/FallbackComponents';

// Lazy load heavy components with proper fallbacks
export const LazyAdvancedVideoPlayer = lazy(() => 
  import('@/components/video/AdvancedVideoPlayer').then(module => ({
    default: module.AdvancedVideoPlayer
  }))
);

export const LazyVideoAnalytics = lazy(() => 
  import('@/components/video/AdvancedVideoPlayer').then(module => ({
    default: module.VideoAnalytics
  }))
);

export const LazyCourseComparison = lazy(() => 
  import('@/components/ui/CourseComparison')
);

export const LazyGamification = lazy(() => 
  import('@/components/ui/Gamification')
);

export const LazyImageOptimizer = lazy(() => 
  import('@/components/ui/ImageOptimizer')
);

export const LazyChartComponents = lazy(() => 
  import('@/components/ui/ChartComponents').then(module => ({
    default: module.AnalyticsChart
  }))
);

export const LazyCodePlayground = lazy(() => 
  import('@/components/playground/CodePlayground').then(module => ({
    default: module.CodePlayground || module.default
  }))
);

export const LazyAdvancedAnalytics = lazy(() => 
  import('@/components/analytics/AdvancedAnalytics').then(module => ({
    default: module.useAnalytics || module.default
  }))
);

export const LazyAIChatbot = lazy(() => 
  import('@/components/ai/AIChatbot').then(module => ({
    default: module.AIChatbot || module.default
  }))
);

export const LazyPWAManager = lazy(() => 
  import('@/components/pwa/PWAManager').then(module => ({
    default: module.PWAManager || module.default
  }))
);

export const LazyNotificationSystem = lazy(() => 
  import('@/components/notifications/EnhancedNotificationSystem')
);

// Lazy load page components
export const LazySearchPage = lazy(() => 
  import('@/app/search/page').then(module => ({
    default: module.default
  }))
);

export const LazyCoursesPage = lazy(() => 
  import('@/app/courses/page').then(module => ({
    default: module.default
  }))
);

export const LazyNotificationsPage = lazy(() => 
  import('@/app/notifications/page').then(module => ({
    default: module.default
  }))
);

export const LazyProfilePage = lazy(() => 
  import('@/app/profile/page').then(module => ({
    default: module.default
  }))
);

export const LazyPlaylistPage = lazy(() => 
  import('@/app/playlist/page').then(module => ({
    default: module.default
  }))
);

// Lazy load admin components
export const LazyAdminDashboard = lazy(() => 
  import('@/app/admin/dashboard/page').then(module => ({
    default: module.default
  }))
);

export const LazyInstructorDashboard = lazy(() => 
  import('@/app/instructor-dashboard/page').then(module => ({
    default: module.default
  }))
);

// Lazy load complex UI components
export const LazyCourseFilters = lazy(() => 
  import('@/components/ui/CourseFilters')
);

export const LazyInteractiveFeatures = lazy(() => 
  import('@/components/ui/molecules/InteractiveFeatures')
);

export const LazyVoiceSearch = lazy(() => 
  import('@/components/ui/VoiceSearch')
);

// Wrapper components with proper fallbacks
export const LazyVideoPlayerWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Video Player" />}>
    <LazyAdvancedVideoPlayer {...props} />
  </Suspense>
);

export const LazyVideoAnalyticsWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={4} />}>
    <LazyVideoAnalytics {...props} />
  </Suspense>
);

export const LazyCourseComparisonWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.CardSkeletonFallback />}>
    <LazyCourseComparison {...props} />
  </Suspense>
);

export const LazyGamificationWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={3} />}>
    <LazyGamification {...props} />
  </Suspense>
);

export const LazyImageOptimizerWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.PlaceholderFallback title="Image Optimizer" />}>
    <LazyImageOptimizer {...props} />
  </Suspense>
);

export const LazyChartComponentsWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={5} />}>
    <LazyChartComponents {...props} />
  </Suspense>
);

export const LazyCodePlaygroundWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.PlaceholderFallback title="Code Playground" description="Loading code editor..." />}>
    <LazyCodePlayground {...props} />
  </Suspense>
);

export const LazyAdvancedAnalyticsWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={6} />}>
    <LazyAdvancedAnalytics {...props} />
  </Suspense>
);

export const LazyAIChatbotWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.PlaceholderFallback title="AI Assistant" description="Loading AI assistant..." />}>
    <LazyAIChatbot {...props} />
  </Suspense>
);

export const LazyPWAManagerWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={4} />}>
    <LazyPWAManager {...props} />
  </Suspense>
);

export const LazyNotificationSystemWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.PlaceholderFallback title="Notifications" />}>
    <LazyNotificationSystem {...props} />
  </Suspense>
);

// Page wrappers with loading states
export const LazySearchPageWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Search Page" />}>
    <LazySearchPage {...props} />
  </Suspense>
);

export const LazyCoursesPageWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Courses Page" />}>
    <LazyCoursesPage {...props} />
  </Suspense>
);

export const LazyNotificationsPageWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Notifications Page" />}>
    <LazyNotificationsPage {...props} />
  </Suspense>
);

export const LazyProfilePageWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Profile Page" />}>
    <LazyProfilePage {...props} />
  </Suspense>
);

export const LazyPlaylistPageWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Playlist Page" />}>
    <LazyPlaylistPage {...props} />
  </Suspense>
);

// Admin wrappers
export const LazyAdminDashboardWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Admin Dashboard" />}>
    <LazyAdminDashboard {...props} />
  </Suspense>
);

export const LazyInstructorDashboardWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.LoadingErrorFallback component="Instructor Dashboard" />}>
    <LazyInstructorDashboard {...props} />
  </Suspense>
);

// UI component wrappers
export const LazyCourseFiltersWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={3} />}>
    <LazyCourseFilters {...props} />
  </Suspense>
);

export const LazyInteractiveFeaturesWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.SkeletonFallback lines={4} />}>
    <LazyInteractiveFeatures {...props} />
  </Suspense>
);

export const LazyVoiceSearchWrapper = (props: any) => (
  <Suspense fallback={<FallbackComponents.PlaceholderFallback title="Voice Search" />}>
    <LazyVoiceSearch {...props} />
  </Suspense>
);

// Utility function for creating lazy wrapper
export const createLazyWrapper = <T extends React.ComponentType<any>>(
  lazyComponent: React.LazyExoticComponent<T>,
  fallbackType: 'skeleton' | 'placeholder' | 'loading' | 'custom' = 'skeleton',
  customFallback?: React.ReactNode,
  fallbackProps?: any
) => {
  const Wrapper = (props: any) => {
    let fallback: React.ReactNode;

    switch (fallbackType) {
      case 'skeleton':
        fallback = <FallbackComponents.SkeletonFallback {...fallbackProps} />;
        break;
      case 'placeholder':
        fallback = <FallbackComponents.PlaceholderFallback {...fallbackProps} />;
        break;
      case 'loading':
        fallback = <FallbackComponents.LoadingErrorFallback {...fallbackProps} />;
        break;
      case 'custom':
        fallback = customFallback || <div>Loading...</div>;
        break;
      default:
        fallback = <FallbackComponents.SkeletonFallback />;
    }

    return (
      <Suspense fallback={fallback}>
        <lazyComponent {...props} />
      </Suspense>
    );
  };

  Wrapper.displayName = `LazyWrapper(${lazyComponent.displayName || 'Component'})`;
  return Wrapper;
};

// Preload function for critical components
export const preloadComponent = (componentPath: string) => {
  switch (componentPath) {
    case 'video-player':
      import('@/components/video/AdvancedVideoPlayer');
      break;
    case 'course-comparison':
      import('@/components/ui/CourseComparison');
      break;
    case 'analytics':
      import('@/components/analytics/AdvancedAnalytics');
      break;
    case 'notifications':
      import('@/components/notifications/EnhancedNotificationSystem');
      break;
    default:
      console.warn(`Unknown component path: ${componentPath}`);
  }
};

// Export all lazy components and wrappers
export const LazyComponents = {
  // Raw lazy components
  LazyAdvancedVideoPlayer,
  LazyVideoAnalytics,
  LazyCourseComparison,
  LazyGamification,
  LazyImageOptimizer,
  LazyChartComponents,
  LazyCodePlayground,
  LazyAdvancedAnalytics,
  LazyAIChatbot,
  LazyPWAManager,
  LazyNotificationSystem,
  LazySearchPage,
  LazyCoursesPage,
  LazyNotificationsPage,
  LazyProfilePage,
  LazyPlaylistPage,
  LazyAdminDashboard,
  LazyInstructorDashboard,
  LazyCourseFilters,
  LazyInteractiveFeatures,
  LazyVoiceSearch,

  // Wrapper components
  LazyVideoPlayerWrapper,
  LazyVideoAnalyticsWrapper,
  LazyCourseComparisonWrapper,
  LazyGamificationWrapper,
  LazyImageOptimizerWrapper,
  LazyChartComponentsWrapper,
  LazyCodePlaygroundWrapper,
  LazyAdvancedAnalyticsWrapper,
  LazyAIChatbotWrapper,
  LazyPWAManagerWrapper,
  LazyNotificationSystemWrapper,
  LazySearchPageWrapper,
  LazyCoursesPageWrapper,
  LazyNotificationsPageWrapper,
  LazyProfilePageWrapper,
  LazyPlaylistPageWrapper,
  LazyAdminDashboardWrapper,
  LazyInstructorDashboardWrapper,
  LazyCourseFiltersWrapper,
  LazyInteractiveFeaturesWrapper,
  LazyVoiceSearchWrapper,

  // Utilities
  createLazyWrapper,
  preloadComponent,
};

export default LazyComponents;
