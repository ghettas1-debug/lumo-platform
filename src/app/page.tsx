'use client';

import React, { useState } from 'react';
import Hero from '@/components/features/Hero';
import Features from '@/components/features/Features';
import Courses from '@/components/features/Courses';
import Stats from '@/components/features/Stats';
import CTA from '@/components/features/CTA';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <CTA />
      <Footer />
    </main>
  );
}
