'use client';

import React from 'react';
import Hero from '@/components/features/Hero';
import Stats from '@/components/features/Stats';
import Categories from '@/components/features/Categories';
import LearningPaths from '@/components/features/LearningPaths';
import Courses from '@/components/features/Courses';
import Testimonials from '@/components/features/Testimonials';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { logger } from '@/lib/logger';

export default function Home() {
  React.useEffect(() => {
    logger.track('page_view', { page: 'home' });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header isMenuOpen={false} setIsMenuOpen={() => {}} />
      <Hero />
      <Stats />
      <Categories />
      <LearningPaths />
      <Courses />
      <Testimonials />
      <Footer />
    </main>
  );
}
