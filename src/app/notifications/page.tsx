'use client';

import EnhancedNotificationSystem from '@/components/notifications/EnhancedNotificationSystem';
import { PageErrorBoundary } from '@/components/error/PageErrorBoundary';

export default function NotificationsPage() {
  return (
    <PageErrorBoundary pageName="صفحة الإشعارات" pagePath="/notifications">
      <EnhancedNotificationSystem />
    </PageErrorBoundary>
  );
}
