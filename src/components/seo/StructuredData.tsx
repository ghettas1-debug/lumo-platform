'use client';

import React from 'react';
import { SEOData } from '@/types';

interface StructuredDataProps {
  data: SEOData;
  type?: 'organization' | 'website' | 'course' | 'article' | 'breadcrumb' | 'faq';
}

export default function StructuredData({ data, type = 'website' }: StructuredDataProps) {
  const generateStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "لumo",
          "url": "https://lumo.com",
          "logo": "https://lumo.com/images/logo.png",
          "description": data.description,
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
          },
          "foundingDate": "2024-01-01",
          "founder": {
            "@type": "Person",
            "name": "فريق لumo"
          }
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": data.title,
          "url": "https://lumo.com",
          "description": data.description,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://lumo.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "لumo",
            "url": "https://lumo.com"
          }
        };

      case 'course':
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": data.title,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "لumo"
          },
          "image": data.ogImage,
          "datePublished": data.publishedTime,
          "dateModified": data.modifiedTime,
          "inLanguage": "ar",
          "isAccessibleForFree": true,
          "educationalLevel": "مبتدئ",
          "about": data.tags?.join(", "),
          "teaches": data.tags || [],
          "learningResourceType": "دورة تعليمية",
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "SAR",
            "availability": "https://schema.org/InStock"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Person",
            "name": data.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "لumo",
            "logo": {
              "@type": "ImageObject",
              "url": "https://lumo.com/images/logo.png"
            }
          },
          "datePublished": data.publishedTime,
          "dateModified": data.modifiedTime,
          "image": data.ogImage,
          "url": data.canonical,
          "articleSection": data.articleSection,
          "keywords": data.tags?.join(", "),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.canonical
          }
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://lumo.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "الدورات",
              "item": "https://lumo.com/courses"
            }
          ]
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "هل الدورات في لumo مجانية؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، معظم الدورات في لumo مجانية تماماً. يمكنك الوصول إلى آلاف الدورات عالية الجودة بدون أي تكلفة."
              }
            },
            {
              "@type": "Question",
              "name": "هل أحصل على شهادة بعد إكمال الدورة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، بعد إكمال الدورة بنجاح، ستحصل على شهادة معتمدة من لumo يمكنك إضافتها إلى سيرتك الذاتية."
              }
            },
            {
              "@type": "Question",
              "name": "كم من الوقت أحتاج لإكمال دورة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "يعتمد على الدورة ومستواها. معظم الدورات تستغرق من 2 إلى 8 أسابيع إذا درست لمدة 2-3 ساعات يومياً."
              }
            }
          ]
        };

      default:
        return {};
    }
  };

  const structuredData = data.structuredData || generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

// Breadcrumb List Component
export function BreadcrumbList({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData)
      }}
    />
  );
}

// Product/Rating Schema for Courses
export function CourseRatingSchema({ 
  courseName, 
  rating, 
  reviewCount, 
  price = "مجاني" 
}: {
  courseName: string;
  rating: number;
  reviewCount: number;
  price?: string;
}) {
  const ratingData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": courseName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": price === "مجاني" ? "0" : price,
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ratingData)
      }}
    />
  );
}

// Local Business Schema
export function LocalBusinessSchema() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "لumo",
    "description": "منصة التعلم المجانية الرائدة في العالم",
    "url": "https://lumo.com",
    "logo": "https://lumo.com/images/logo.png",
    "image": "https://lumo.com/images/og-default.jpg",
    "telephone": "+966-50-123-4567",
    "email": "support@lumo.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressLocality": "الرياض",
      "addressRegion": "الرياض",
      "postalCode": "12345",
      "streetAddress": "شارع الملك فهد، الرياض"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": [
      "https://www.facebook.com/lumo",
      "https://www.twitter.com/lumo",
      "https://www.linkedin.com/company/lumo",
      "https://www.instagram.com/lumo"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData)
      }}
    />
  );
}
