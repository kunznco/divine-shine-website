import Link from "next/link";
import Image from "next/image";
import {
  SERVICES,
  ADDRESS,
  CITY_STATE_ZIP,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
} from "@techforthetrades/shared/constants";
import { getFeaturedAreas } from "@/data/service-areas";

/**
 * Footer — navy gradient boundary that flows out of the closing CTA section.
 * The full-color Divine Shine logo sits on a white card so it reads on navy.
 */
export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-navy to-navy-dark text-white pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 sm:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand + social icons */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block bg-white rounded-2xl px-4 py-3 shadow-sm"
            >
              <Image
                src="/images/divine-shine-logo.png"
                alt="Divine Shine"
                width={200}
                height={88}
                className="h-16 sm:h-20 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
              Professional window cleaning, pressure washing, and solar panel
              care across Redding and Shasta County.
            </p>

            {/* Social icons row — Facebook, Instagram. */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon
                href="https://facebook.com/divineshineredding/"
                label="Facebook"
              >
                <FacebookSvg />
              </SocialIcon>
              <SocialIcon
                href="https://instagram.com/divineshineredding/"
                label="Instagram"
              >
                <InstagramSvg />
              </SocialIcon>
            </div>

            <div className="mt-6 space-y-2 text-sm text-white/80">
              <Link
                href={PHONE_HREF}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span aria-hidden>📞</span>
                {PHONE_DISPLAY}
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span aria-hidden>✉️</span>
                {EMAIL}
              </a>
              <p className="flex items-start gap-2">
                <span aria-hidden>📍</span>
                <span>
                  {ADDRESS}
                  <br />
                  {CITY_STATE_ZIP}
                </span>
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/contact-us">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <FooterLink key={s.slug} href={s.href}>
                  {s.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Areas Served — links to each service-area page. */}
          <div className="lg:col-span-3">
            <FooterHeading>Areas Served</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {getFeaturedAreas().map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {area.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            &copy; {new Date().getFullYear()} Divine Shine. All rights reserved.
          </p>
          <p>Locally owned · Fully insured · 100% satisfaction guaranteed</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/85 mb-4">
      {children}
    </h2>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/70 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
}
