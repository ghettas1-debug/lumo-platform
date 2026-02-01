import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import SEOHead from "../components/seo/SEOHead";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "لumo - منصة التعلم المجانية الرائدة في العالم",
    template: "%s | لumo"
  },
  description: "تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني مع شهادات معتمدة في تكنولوجيا المعلومات، الأعمال، الصحة، واللغات.",
  keywords: [
    "دورات مجانية",
    "تعلم أونلاين",
    "شهادات معتمدة",
    "تطوير الويب",
    "الذكاء الاصطناعي",
    "إدارة الأعمال",
    "اللغات",
    "التطوير الشخصي",
    "منصة تعليمية",
    "تدريب احترافي"
  ],
  authors: [{ name: "فريق لumo" }],
  creator: "فريق لumo",
  publisher: "لumo",
  metadataBase: new URL("https://lumo.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/ar",
      "en": "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://lumo.com",
    title: "لumo - منصة التعلم المجانية الرائدة في العالم",
    description: "تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني.",
    siteName: "لumo",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "لumo - منصة التعلم المجانية"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "لumo - منصة التعلم المجانية الرائدة في العالم",
    description: "تعلم من خبراء عالميين واستكشف أكثر من 6000 دورة مجانية. انضم إلى 50 مليون متعلم وتمكين لمستقبلك المهني.",
    images: ["/images/og-home.jpg"],
    creator: "@lumo",
    site: "@lumo"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
