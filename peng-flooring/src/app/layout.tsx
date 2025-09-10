import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
// import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title:
    "Peng Flooring - Professional Flooring Company in the greater 626 area specializing in luxury vinyl flooring installation and stair remodeling",
  description:
    "Professional flooring company serving Orange County, LA County, and 626 area. Professional flooring installation and stair remodeling. Free estimates, honest pricing, 4.9/5 stars from 800+ reviews.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/landing-page/penglogo.png?v=2", type: "image/png" },
    ],
  },
  keywords: [
    "luxury vinyl flooring installation",
    "free flooring estimate",
    "free flooring estimate near me",
    "free flooring estimate Orange County",
    "free flooring estimate LA County",
    "free flooring estimate 626 area",
    "Peng flooring installation",
    "Top flooring installers near me",
    "Peng flooring vinyl flooring installation",
    "flooring installation Orange County",
    "flooring installation LA County",
    "vinyl flooring installation Orange County",
    "vinyl flooring installation Chino Hills",
    "flooring contractor Chino Hills",
    "flooring installation Walnut",
    "flooring company 626 area",
    "flooring services near me",
    "flooring contractor LA County",
    "vinyl flooring installation",
  ],
  authors: [{ name: "Peng Flooring" }],
  creator: "Peng Floor",
  publisher: "Peng Floor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.pengfloor.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Peng Flooring - Professional Flooring Company in the greater 626 area",
    description:
      "Professional flooring services with free estimates. Luxury vinyl flooring installation and stair remodeling. Serving Orange County, LA County, and 626 area since 2009.",
    url: "https://pengflooring.com",
    siteName: "Peng Flooring",
    images: [
      {
        url: "/full-service1.JPG",
        width: 1200,
        height: 630,
        alt: "Beautiful luxury vinyl installation and full stair remodel by Peng Flooring",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peng Flooring - Professional Flooring Company in 626 area",
    description:
      "Professional flooring services with free estimates. Luxury vinyl installation, stair remodeling, floor refinishing, and more.",
    images: ["/full-service2.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Peng Flooring",
              description:
                "Professional flooring services with free estimates. Luxury vinyl installation, stair remodeling, floor refinishing, and more.",
              url: "https://pengfloor.com",
              telephone: "+1-626-540-7720",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Rowland Heights, CA",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "34.0203",
                longitude: "117.8653",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Rowland Heights",
                },
                {
                  "@type": "City",
                  name: "Diamond Bar",
                },
                {
                  "@type": "City",
                  name: "Walnut",
                },
                {
                  "@type": "City",
                  name: "Chino Hills",
                },
                {
                  "@type": "City",
                  name: "Chino",
                },
                {
                  "@type": "City",
                  name: "Irvine",
                },
                {
                  "@type": "City",
                  name: "El Monte",
                },
                {
                  "@type": "City",
                  name: "Alhambra",
                },
                {
                  "@type": "County",
                  name: "Orange County",
                },
                {
                  "@type": "County",
                  name: "LA County",
                },
                {
                  "@type": "City",
                  name: "Arcadia",
                },
                {
                  "@type": "City",
                  name: "Cerritos",
                },
                {
                  "@type": "County",
                  name: "San Gabriel Valley",
                },
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "33.7175",
                  longitude: "-117.8311",
                },
                geoRadius: "50000",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Flooring Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Luxury Vinyl Installation",
                      description:
                        "Professional luxury vinyl installation in LAC, OC, and 626 area with free estimates and honest pricing.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Stair remodeling",
                      description:
                        "Full service stair remodeling in LAC, OC, and 626 area.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Carpet Removal",
                      description:
                        "Full carpet removal and disposal in LAC, OC, and 626 area.",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
              },
              foundingDate: "2009",
              priceRange: "$$",
              paymentAccepted: ["Cash", "Check"],
              currenciesAccepted: "USD",
            }),
          }}
        />
      </head>
      <body>
        {/* <AuthProvider> */}
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
