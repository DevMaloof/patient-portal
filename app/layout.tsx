// /app/layout.tsx - HEALTHCARE TRANSFORMED VERSION
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"
import { Toaster } from "react-hot-toast";
import { SessionWrapper } from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Healthcare-focused SEO configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://maloofhealth.com"), // Update with your healthcare domain
  title: {
    default: "Maloof Health Systems",
    template: "%s | Maloof Health Systems",
  },
  description:
    "Schedule appointments with Maloof Health Systems. Experience compassionate healthcare with modern medical excellence and patient-centered care.",
  keywords: [
    "Healthcare",
    "Medical Appointments",
    "Doctor Booking",
    "Maloof Health",
    "Patient Portal",
    "Telemedicine",
    "Primary Care",
    "Specialists",
    "Medical Services"
  ],
  authors: [{ name: "Maloof Health Systems" }],
  creator: "Maloof Health Systems",
  publisher: "Maloof Health Systems",

  openGraph: {
    type: "website",
    url: "https://maloofhealth.com", // Update with your actual domain
    title: "Maloof Health Systems - Your Partner in Health",
    description:
      "Schedule appointments, access medical records, and connect with top healthcare providers at Maloof Health Systems. Compassionate care, advanced medicine.",
    siteName: "Maloof Health Systems",
    images: [
      {
        url: "/healthcare-logo.png", // Update with healthcare logo
        width: 1200,
        height: 630,
        alt: "Maloof Health Systems - Modern Healthcare",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Maloof Health Systems - Your Partner in Health",
    description:
      "Schedule appointments, access medical records, and connect with top healthcare providers at Maloof Health Systems.",
    images: ["/healthcare-logo.png"],
    creator: "@MaloofHealth", // Update with your healthcare Twitter handle
  },

  icons: {
    icon: "/healthcare-favicon.ico", // Update with healthcare favicon
    shortcut: "/healthcare-favicon.ico",
    apple: "/apple-touch-healthcare.png", // Update with healthcare apple touch icon
  },

  // Additional healthcare-specific metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    yandex: "your-yandex-verification",
  },

  // Healthcare-specific category
  category: "healthcare",

  // Manifest for PWA capabilities (good for healthcare apps)
  manifest: "/manifest.json",

  // Theme color for browser
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0284c7" },
  ],

  // Apple web app capabilities
  appleWebApp: {
    capable: true,
    title: "Maloof Health",
    statusBarStyle: "black-translucent",
  },

  // Viewport settings for better mobile experience
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Healthcare-specific meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Healthcare organization schema will be added via component */}

        {/* Favicon variants for different platforms */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />

        {/* Theme color for different browsers */}
        <meta name="theme-color" content="#0ea5e9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0284c7" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50`}
      >
        {/* Healthcare Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Maloof Health Systems",
              "description": "Modern healthcare with compassionate, patient-centered medical services.",
              "url": "https://maloofhealth.com",
              "logo": "https://maloofhealth.com/healthcare-logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "700 West Elm Street",
                "addressLocality": "Dallas",
                "addressRegion": "TX",
                "postalCode": "75201",
                "addressCountry": "US"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-214-555-0423",
                  "contactType": "appointments",
                  "availableLanguage": ["English", "Spanish"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-214-555-0911",
                  "contactType": "emergency",
                  "availableLanguage": ["English", "Spanish"]
                }
              ],
              "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-17:00",
              "medicalSpecialty": ["Cardiology", "Neurology", "Pediatrics", "PrimaryCare"],
              "sameAs": [
                "https://facebook.com/maloofhealth",
                "https://twitter.com/maloofhealth",
                "https://linkedin.com/company/maloof-health"
              ]
            })
          }}
        />

        <SessionWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "white",
                color: "#1e293b",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)",
              },
              success: {
                icon: "🏥",
                style: {
                  borderLeft: "4px solid #10b981",
                },
              },
              error: {
                icon: "⚠️",
                style: {
                  borderLeft: "4px solid #ef4444",
                },
              },
            }}
          />
        </SessionWrapper>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}