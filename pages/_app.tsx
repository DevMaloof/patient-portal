// /pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* ✅ Global SEO / META config for Pages Router - Healthcare Version */}
            <Head>
                <title>Maloof Health Systems</title>
                <meta
                    name="description"
                    content="Schedule appointments with Maloof Health Systems. Experience compassionate healthcare with modern medical excellence and patient-centered care."
                />
                <meta
                    name="keywords"
                    content="Healthcare, Medical Appointments, Doctor Booking, Maloof Health, Patient Portal, Telemedicine, Primary Care, Specialists, Medical Services"
                />
                <meta name="author" content="Maloof Health Systems" />
                <meta name="creator" content="Maloof Health Systems" />
                <meta name="publisher" content="Maloof Health Systems" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://maloofhealth.com" />
                <meta property="og:title" content="Maloof Health Systems - Your Partner in Health" />
                <meta
                    property="og:description"
                    content="Schedule appointments, access medical records, and connect with top healthcare providers at Maloof Health Systems. Compassionate care, advanced medicine."
                />
                <meta property="og:site_name" content="Maloof Health Systems" />
                <meta property="og:image" content="/healthcare-logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Maloof Health Systems - Your Partner in Health" />
                <meta
                    name="twitter:description"
                    content="Schedule appointments, access medical records, and connect with top healthcare providers at Maloof Health Systems."
                />
                <meta name="twitter:image" content="/healthcare-logo.png" />
                <meta name="twitter:creator" content="@MaloofHealth" />

                {/* Icons */}
                <link rel="icon" href="/healthcare-favicon.ico" />
                <link rel="shortcut icon" href="/healthcare-favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-healthcare.png" />

                {/* Additional Healthcare Meta Tags */}
                <meta name="format-detection" content="telephone=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="theme-color" content="#0ea5e9" />

                {/* Schema.org markup for healthcare organization */}
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
            </Head>

            {/* ✅ Session + Toaster support for Pages */}
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 5000,
                        style: {
                            background: "#1e293b",
                            color: "#ffffff",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                            backdropFilter: "blur(8px)",
                        },
                        success: {
                            icon: "🏥",
                            style: {
                                borderLeft: "4px solid #10b981",
                                background: "rgba(16, 185, 129, 0.1)",
                            },
                        },
                        error: {
                            icon: "⚠️",
                            style: {
                                borderLeft: "4px solid #ef4444",
                                background: "rgba(239, 68, 68, 0.1)",
                            },
                        },
                    }}
                />
            </SessionProvider>
        </>
    );
}