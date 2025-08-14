import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title:
    "Peng Flooring - Family-Owned Flooring Company in Orange County & LA County | Free Estimates",
  description:
    "Family-owned flooring company serving Orange County and LA County since 2009. Professional hardwood installation, refinishing, vinyl & laminate flooring. Free estimates, honest pricing, 4.9/5 stars from 500+ reviews.",
  keywords: [
    "flooring installation Orange County",
    "hardwood refinishing near me",
    "family-owned flooring company Orange County",
    "flooring installation LA County",
    "hardwood installation Anaheim",
    "flooring refinishing Fullerton",
    "vinyl flooring installation Orange County",
    "laminate flooring LA County",
    "flooring contractor Orange County",
    "hardwood floor refinishing near me",
    "flooring installation Costa Mesa",
    "flooring company Huntington Beach",
    "flooring services Irvine",
    "hardwood installation Newport Beach",
    "flooring contractor LA County",
  ],
  authors: [{ name: "Peng Flooring" }],
  creator: "Peng Flooring",
  publisher: "Peng Flooring",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pengflooring.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Peng Flooring - Family-Owned Flooring Company in Orange County & LA County",
    description:
      "Professional flooring services with free estimates. Hardwood installation, refinishing, vinyl & laminate flooring. Serving Orange County and LA County since 2009.",
    url: "https://pengflooring.com",
    siteName: "Peng Flooring",
    images: [
      {
        url: "/wood-flooring.png",
        width: 1200,
        height: 630,
        alt: "Beautiful hardwood flooring installation by Peng Flooring",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Peng Flooring - Family-Owned Flooring Company in Orange County & LA County",
    description:
      "Professional flooring services with free estimates. Hardwood installation, refinishing, vinyl & laminate flooring.",
    images: ["/wood-flooring.png"],
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
                "Family-owned flooring company serving Orange County and LA County since 2009. Professional hardwood installation, refinishing, vinyl & laminate flooring.",
              url: "https://pengflooring.com",
              telephone: "+1-XXX-XXX-XXXX",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Orange County, CA",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "33.7175",
                longitude: "-117.8311",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Anaheim",
                },
                {
                  "@type": "City",
                  name: "Fullerton",
                },
                {
                  "@type": "City",
                  name: "Costa Mesa",
                },
                {
                  "@type": "City",
                  name: "Huntington Beach",
                },
                {
                  "@type": "City",
                  name: "Irvine",
                },
                {
                  "@type": "City",
                  name: "Newport Beach",
                },
                {
                  "@type": "City",
                  name: "Orange County",
                },
                {
                  "@type": "City",
                  name: "LA County",
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
                      name: "Hardwood Floor Installation",
                      description:
                        "Professional hardwood floor installation in Orange County and LA County",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hardwood Floor Refinishing",
                      description:
                        "Hardwood floor refinishing and restoration services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vinyl & Laminate Flooring",
                      description:
                        "Vinyl and laminate flooring installation services",
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
              paymentAccepted: ["Cash", "Check", "Credit Card"],
              currenciesAccepted: "USD",
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
