import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyBottomBar } from "@/components/layout/StickyBottomBar";
import { LocalBusinessSchema } from "@/components/StructuredData";

/**
 * Public layout — wraps every customer-facing page with the nav, footer,
 * sticky mobile CTA bar, and LocalBusiness JSON-LD. All quote CTAs are plain
 * links to /contact-us (no modal), so no provider is needed.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessSchema />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-navy focus:text-white focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyBottomBar />
    </>
  );
}
