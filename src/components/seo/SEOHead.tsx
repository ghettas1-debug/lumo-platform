'use client';

import Head from 'next/head';
import { Metadata } from 'next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

export default function SEOHead({
  title = 'لumo - منصة التعلم المجانية الرائدة في العالم',
  description = 'تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني مع شهادات معتمدة.',
  keywords = 'دورات مجانية, تعلم أونلاين, شهادات معتمدة, تطوير الويب, الذكاء الاصطناعي, إدارة الأعمال, اللغات, التطوير الشخصي',
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'فريق لumo',
  publishedTime,
  modifiedTime,
  articleSection,
  tags = [],
  noindex = false,
  structuredData
}: SEOHeadProps) {
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "لumo",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "description": description,
    "sameAs": [
      "https://www.facebook.com/lumo",
      "https://www.twitter.com/lumo",
      "https://www.linkedin.com/company/lumo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966-50-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="لumo" />
      <meta property="og:locale" content="ar_AR" />
      
      {/* Article specific tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {ogType === 'article' && tags.length > 0 && (
        tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@lumo" />
      <meta name="twitter:creator" content="@lumo" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="application-name" content="لumo" />
      <meta name="apple-mobile-web-app-title" content="لumo" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
      
      {/* Alternate language links */}
      <link rel="alternate" hrefLang="ar" href={fullCanonical} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${canonical || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
    </Head>
  );
}

// Helper function for course structured data
export function generateCourseStructuredData(course: {
  name: string;
  description: string;
  provider: string;
  image: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  hasCertificate: boolean;
  isFree: boolean;
  price?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": course.provider
    },
    "image": course.image,
    "timeRequired": course.duration,
    "educationalLevel": course.level,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": course.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": course.isFree ? {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    } : {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": course.provider
      }
    },
    "coursePrerequisites": course.level === 'مبتدئ' ? undefined : "المعرفة الأساسية بالمجال",
    "educationalCredentialAwarded": course.hasCertificate ? "شهادة إتمام" : undefined,
    "url": course.url
  };
}

// Helper function for article structured data
export function generateArticleStructuredData(article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifyDate?: string;
  image: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "لumo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lumo.com/images/logo.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifyDate || article.publishDate,
    "image": article.image,
    "url": article.url,
    "articleSection": article.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}
