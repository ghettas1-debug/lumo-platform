'use client';

// SEO Utilities for Lumo Platform
import { Metadata } from 'next';

// SEO Configuration Interface
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'course';
  locale?: string;
  siteName?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

// Structured Data Types
export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntity?: {
    '@type': 'Course' | 'Article' | 'Product';
    [key: string]: any;
  };
  breadcrumb?: {
    '@type': 'BreadcrumbList';
    itemListElement: {
      '@type': 'ListItem';
      position: number;
      name: string;
      item?: string;
    }[];
  };
}

export interface CourseSchema {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  image?: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  educationalLevel: string;
  inLanguage: string;
  about?: string[];
  teaches?: string[];
  learningResourceType?: string;
  audience?: {
    '@type': 'EducationalAudience';
    educationalRole: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  review?: {
    '@type': 'Review';
    author: {
      '@type': 'Person';
      name: string;
    };
    reviewRating: {
      '@type': 'Rating';
      ratingValue: number;
      bestRating: number;
      worstRating: number;
    };
    datePublished: string;
    reviewBody: string;
  }[];
  hasCourseInstance?: {
    '@type': 'CourseInstance';
    courseMode: 'online' | 'offline' | 'blended';
    instructor?: {
      '@type': 'Person';
      name: string;
      url?: string;
    };
    duration?: string;
    startDate?: string;
    endDate?: string;
  }[];
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: {
    '@type': 'ImageObject';
    url: string;
    width?: number;
    height?: number;
  };
  description: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    email?: string;
    contactType: string;
    availableLanguage?: string[];
  };
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  foundingDate?: string;
  numberOfEmployees?: string;
  areaServed?: string;
  knowsAbout?: string[];
  makesOffer?: {
    '@type': 'Offer';
    itemOffered: {
      '@type': 'Course';
      name: string;
    };
  }[];
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }[];
}

// SEO Manager Class
export class SEOManager {
  private static instance: SEOManager;
  private defaultConfig: Partial<SEOConfig>;

  private constructor() {
    this.defaultConfig = {
      siteName: 'Lumo Platform',
      author: 'Lumo Platform Team',
      type: 'website',
      locale: 'en_US',
      image: '/images/og-default.jpg',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo-platform.com',
    };
  }

  public static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  // Generate metadata for Next.js
  public generateMetadata(config: SEOConfig): Metadata {
    const fullConfig = { ...this.defaultConfig, ...config };
    const {
      title,
      description,
      keywords,
      author,
      image,
      url,
      type,
      locale,
      siteName,
      canonical,
      noindex,
      nofollow,
      publishedTime,
      modifiedTime,
      section,
      tags,
    } = fullConfig;

    const metadata: Metadata = {
      title,
      description,
      keywords: keywords?.join(', '),
      authors: author ? [{ name: author }] : undefined,
      creator: author,
      publisher: siteName,
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(url || ''),
      alternates: {
        canonical: canonical,
      },
      robots: {
        index: !noindex,
        follow: !nofollow,
        googleBot: {
          index: !noindex,
          follow: !nofollow,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type,
        siteName,
        title,
        description,
        url,
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ] : undefined,
        locale,
        publishedTime,
        modifiedTime,
        section,
        tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
        creator: author ? `@${author}` : undefined,
        site: siteName ? `@${siteName}` : undefined,
      },
      app: {
        name: siteName,
        url: url,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
        yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
        bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
      },
    };

    // Add article specific metadata
    if (type === 'article') {
      metadata.openGraph = {
        ...metadata.openGraph,
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      };
    }

    return metadata;
  }

  // Generate structured data (JSON-LD)
  public generateStructuredData<T extends Record<string, any>>(data: T): string {
    return JSON.stringify(data, null, 2);
  }

  // Generate WebPage schema
  public generateWebPageSchema(config: Partial<WebPageSchema>): WebPageSchema {
    const defaultSchema: WebPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '',
      description: '',
      url: '',
    };

    return { ...defaultSchema, ...config };
  }

  // Generate Course schema
  public generateCourseSchema(config: Partial<CourseSchema>): CourseSchema {
    const defaultSchema: CourseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: '',
      description: '',
      provider: {
        '@type': 'Organization',
        name: 'Lumo Platform',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo-platform.com',
      },
      educationalLevel: 'Beginner',
      inLanguage: 'en',
    };

    return { ...defaultSchema, ...config };
  }

  // Generate Organization schema
  public generateOrganizationSchema(config: Partial<OrganizationSchema>): OrganizationSchema {
    const defaultSchema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Lumo Platform',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo-platform.com',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
        width: 200,
        height: 60,
      },
      description: 'Leading online learning platform for professional development',
      sameAs: [
        'https://twitter.com/lumo_platform',
        'https://facebook.com/lumo_platform',
        'https://linkedin.com/company/lumo-platform',
        'https://instagram.com/lumo_platform',
      ],
    };

    return { ...defaultSchema, ...config };
  }

  // Generate Breadcrumb schema
  public generateBreadcrumbSchema(breadcrumbs: { name: string; url?: string }[]): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
  }

  // Generate FAQ schema
  public generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  // Generate HowTo schema
  public generateHowToSchema(config: {
    name: string;
    description: string;
    image?: string;
    steps: {
      name: string;
      text: string;
      image?: string;
    }[];
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: config.name,
      description: config.description,
      image: config.image,
      step: config.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image,
      })),
    };
  }

  // Generate Video schema
  public generateVideoSchema(config: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
    embedUrl?: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: config.name,
      description: config.description,
      thumbnailUrl: config.thumbnailUrl,
      uploadDate: config.uploadDate,
      duration: config.duration,
      contentUrl: config.contentUrl,
      embedUrl: config.embedUrl,
    };
  }

  // Generate Event schema
  public generateEventSchema(config: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location?: {
      name: string;
      address: string;
    };
    image?: string;
    url?: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: config.name,
      description: config.description,
      startDate: config.startDate,
      endDate: config.endDate,
      location: config.location ? {
        '@type': 'Place',
        name: config.location.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: config.location.address,
        },
      } : undefined,
      image: config.image,
      url: config.url,
    };
  }

  // Generate Product schema
  public generateProductSchema(config: {
    name: string;
    description: string;
    image: string;
    brand: string;
    offers: {
      price: string;
      priceCurrency: string;
      availability: string;
    }[];
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: config.name,
      description: config.description,
      image: config.image,
      brand: {
        '@type': 'Brand',
        name: config.brand,
      },
      offers: config.offers.map(offer => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: offer.availability,
      })),
      aggregateRating: config.aggregateRating ? {
        '@type': 'AggregateRating',
        ratingValue: config.aggregateRating.ratingValue,
        reviewCount: config.aggregateRating.reviewCount,
      } : undefined,
    };
  }

  // Generate LocalBusiness schema
  public generateLocalBusinessSchema(config: {
    name: string;
    description: string;
    image: string;
    telephone: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    geo?: {
      latitude: number;
      longitude: number;
    };
    openingHours?: string[];
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.name,
      description: config.description,
      image: config.image,
      telephone: config.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address.streetAddress,
        addressLocality: config.address.addressLocality,
        addressRegion: config.address.addressRegion,
        postalCode: config.address.postalCode,
        addressCountry: config.address.addressCountry,
      },
      geo: config.geo ? {
        '@type': 'GeoCoordinates',
        latitude: config.geo.latitude,
        longitude: config.geo.longitude,
      } : undefined,
      openingHours: config.openingHours,
    };
  }

  // Update default configuration
  public updateDefaultConfig(config: Partial<SEOConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  // Get default configuration
  public getDefaultConfig(): Partial<SEOConfig> {
    return { ...this.defaultConfig };
  }
}

// SEO Utility Functions
export const seoUtils = {
  // Create SEO manager instance
  createManager: () => SEOManager.getInstance(),

  // Generate page title with site name
  generateTitle: (title: string, siteName?: string): string => {
    return siteName ? `${title} | ${siteName}` : title;
  },

  // Generate meta description
  generateDescription: (content: string, maxLength: number = 160): string => {
    // Remove HTML tags and extra whitespace
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleanContent.length > maxLength 
      ? cleanContent.substring(0, maxLength - 3) + '...'
      : cleanContent;
  },

  // Generate keywords from content
  generateKeywords: (content: string, additionalKeywords?: string[]): string[] => {
    // Extract words from content
    const words = content
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter((word, index, arr) => arr.indexOf(word) === index)
      .slice(0, 10); // Limit to 10 keywords

    return [...words, ...(additionalKeywords || [])];
  },

  // Generate canonical URL
  generateCanonicalUrl: (path: string, baseUrl?: string): string => {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo-platform.com';
    return `${base}${path}`;
  },

  // Generate image URL for Open Graph
  generateOGImage: (imagePath: string, baseUrl?: string): string => {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://lumo-platform.com';
    return `${base}${imagePath}`;
  },

  // Generate structured data script
  generateStructuredDataScript: (data: Record<string, any>): string => {
    return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
  },

  // Validate SEO configuration
  validateSEOConfig: (config: SEOConfig): string[] => {
    const errors: string[] = [];

    if (!config.title || config.title.length === 0) {
      errors.push('Title is required');
    }

    if (!config.description || config.description.length === 0) {
      errors.push('Description is required');
    }

    if (config.title && config.title.length > 60) {
      errors.push('Title should be 60 characters or less');
    }

    if (config.description && config.description.length > 160) {
      errors.push('Description should be 160 characters or less');
    }

    if (config.image && !config.image.startsWith('http')) {
      errors.push('Image should be a full URL');
    }

    return errors;
  },

  // Generate social media URLs
  generateSocialUrls: (url: string, title: string, description: string) => ({
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}%20${encodeURIComponent(url)}`,
  }),

  // Generate reading time estimate
  generateReadingTime: (content: string, wordsPerMinute: number = 200): string => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  },

  // Generate excerpt from content
  generateExcerpt: (content: string, maxLength: number = 150): string => {
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleanContent.length > maxLength 
      ? cleanContent.substring(0, maxLength - 3) + '...'
      : cleanContent;
  },

  // Check if URL is valid
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Generate sitemap URL
  generateSitemapUrl: (baseUrl: string): string => {
    return `${baseUrl}/sitemap.xml`;
  },

  // Generate robots.txt content
  generateRobotsTxt: (baseUrl: string, disallowPaths?: string[]): string => {
    const disallow = disallowPaths?.map(path => `Disallow: ${path}`).join('\n') || '';
    
    return `User-agent: *
Allow: /
${disallow}

Sitemap: ${baseUrl}/sitemap.xml`;
  },
};

// Default instance
export const defaultSEOManager = SEOManager.getInstance();

export default {
  SEOManager,
  seoUtils,
  defaultSEOManager,
};
