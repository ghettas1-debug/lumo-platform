'use client';

import React from 'react';
import { AccessibilityProvider } from '../accessibility/AccessibilityProvider';
import EnhancedThemeProvider from '../design-system/EnhancedThemeProvider';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AccessibilityProvider>
      <EnhancedThemeProvider>
        {children}
      </EnhancedThemeProvider>
    </AccessibilityProvider>
  );
}
