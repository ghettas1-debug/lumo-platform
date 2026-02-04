'use client';

import React from 'react';
import ErrorBoundary from '../design-system/ErrorBoundary';
import { KeyboardNavigationProvider } from '../design-system/Accessibility';
import { AccessibilityProvider, SkipLink } from '../accessibility/AccessibilityProvider';
import EnhancedThemeProvider from '../design-system/EnhancedThemeProvider';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <SkipLink href="#main-content">
        تخطي إلى المحتوى الرئيسي
      </SkipLink>
      <SkipLink href="#navigation">
        تخطي إلى التنقل
      </SkipLink>
      <SkipLink href="#search">
        تخطي إلى البحث
      </SkipLink>
      
      <ErrorBoundary>
        <AccessibilityProvider>
          <KeyboardNavigationProvider>
            <EnhancedThemeProvider>
              {children}
            </EnhancedThemeProvider>
          </KeyboardNavigationProvider>
        </AccessibilityProvider>
      </ErrorBoundary>
    </>
  );
}
