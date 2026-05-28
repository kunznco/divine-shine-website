import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Poppins — the site's primary typeface. One friendly geometric sans used
 * across headings, body, nav, and buttons.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Balney Rounded Script — available as a decorative wordmark font via
 * `font-[family-name:var(--font-balney)]` if needed. The brand logo itself
 * is an image, so this is optional.
 */
const balney = localFont({
  src: "../../public/fonts/balney/Balney.ttf",
  variable: "--font-balney",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Window Cleaning & Pressure Washing in Redding | Divine Shine",
    template: "%s | Divine Shine",
  },
  description:
    "Divine Shine provides professional window cleaning, pressure washing, and solar panel cleaning for homes and businesses across Redding and Shasta County. 5.0 stars on Google.",
  metadataBase: new URL("https://www.divine-shine.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.divine-shine.com",
    siteName: "Divine Shine",
    title: "Window Cleaning & Pressure Washing in Redding | Divine Shine",
    description:
      "Commercial & residential window cleaning and pressure washing across Redding and Shasta County.",
    images: [
      {
        url: "/images/divine-shine/og-share.webp",
        width: 1200,
        height: 630,
        alt: "Divine Shine — window cleaning and pressure washing in Redding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Cleaning & Pressure Washing in Redding | Divine Shine",
    description:
      "Commercial & residential window cleaning and pressure washing across Redding and Shasta County.",
    images: ["/images/divine-shine/og-share.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.divine-shine.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${balney.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
