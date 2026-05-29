"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SERVICES, LIGHTING_SERVICES, NAV_LINKS, PHONE_HREF } from "@techforthetrades/shared/constants";
import { PhoneIcon } from "@techforthetrades/ui/Icons";

export function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [lightingOpen, setLightingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Scroll-reactive style. Recalibrated 2026-05-11 after Chris reported
  // that the first mint-pixel-match (rgba(0,0,0,0.10) + 20px blur on
  // scroll) was unreadable as soon as the nav scrolled over white/light
  // content — white text on a 10% black tint vanishes once the dark
  // hero is no longer behind it.
  //
  // The real fix lives in globals.css: `.glass` keeps the soft 20%
  // black tint over the hero, `.glass-scrolled` ramps to 45% black +
  // 28px blur + saturate(140%) so the surface itself is genuinely
  // dark enough that white text clears AA contrast against ANY
  // underlying content (white card, photo, navy section).
  //
  // Note (2026-05-12): we previously also tagged every nav link, the
  // wordmark, and the mobile-menu icon with `.nav-link-shadow` as a
  // belt-and-suspenders halo, but Chris flagged that the resulting
  // text felt awkwardly heavy compared to dirtymint's clean medium-
  // weight nav. The glass surface alone clears AA contrast, so the
  // halo was removed. `.nav-link-shadow` is still defined in
  // globals.css in case other surfaces need it.
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const servicesTimeout = useRef<NodeJS.Timeout>(undefined);
  const lightingTimeout = useRef<NodeJS.Timeout>(undefined);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (lightingRef.current && !lightingRef.current.contains(e.target as Node)) {
        setLightingOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Scroll listener — passive for perf, fires only when crossing the
  // 80px threshold (not on every pixel of scroll) by reading current
  // state inside the handler.
  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 80;
      setScrolled((prev) => (prev === next ? prev : next));
    }
    onScroll(); // initialize on mount in case the page is already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openServices() {
    clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
    setLightingOpen(false);
  }
  function closeServicesDelayed() {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  }
  function openLighting() {
    clearTimeout(lightingTimeout.current);
    setLightingOpen(true);
    setServicesOpen(false);
  }
  function closeLightingDelayed() {
    lightingTimeout.current = setTimeout(() => setLightingOpen(false), 150);
  }

  // Nav-link className. Recalibrated 2026-05-12 to match dirtymint
  // exactly per Chris's screenshot: medium weight (500, close to
  // Mint's 400 while still readable over the dark glass surface) and
  // no text-shadow halo. The `.glass` / `.glass-scrolled` backdrop in
  // globals.css is dark enough on its own to clear AA contrast for
  // white text against any underlying content, so the halo isn't
  // needed and was making the type feel awkwardly heavy.
  //
  // Geometry matches dirtymint's chip exactly: each link is
  // `px-3 py-2` (8px 12px), font-size 16px, line-height 24px,
  // border-radius 9999px, giving a 40px tall pill-style hit target.
  const navLinkClass =
    "flex items-center gap-1 px-3 py-2 text-[1rem] leading-6 font-medium tracking-tight rounded-full transition-colors text-white hover:bg-white/15";

  return (
    <>
      {/* Outer header lays out the chip horizontally. The chip itself
          is `max-w-[1400px]` so at 1512px viewport it lands at ~1397px
          wide (matches dirtymint's measured chip width 2026-05-12, see
          docs/dirtymint-audit/01-navbar.md). The outer padding gives
          the chip its floating margin: 16px on mobile, ramping up so
          the chip never butts the viewport edges on larger screens.

          The INNER flex container is then capped to `max-w-7xl` (1280px)
          with `px-6 py-4` (24px / 16px), matching Mint's inner exactly.
          This puts the logo's left edge at the same X as Mint's logo
          (~24px inside the 1280px content rail) so nav contents frame
          the page content below in the same way Mint's nav frames its
          page content. */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pt-4 font-nav">
        <nav
          className={`mx-auto max-w-[1400px] rounded-3xl glass transition-shadow duration-300 ${
            scrolled
              ? "glass-scrolled shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              : ""
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Left group: wordmark alone (dirtymint mirror, recalibrated
                2026-05-12). Earlier iteration glued the Call us pill to
                the logo on the left; Mint's actual layout puts the Call
                pill at the LEFT edge of the RIGHT cluster, immediately
                before the nav links. The Call us pill now lives inside
                the desktop nav cluster below.

                Wordmark is the brand's official "shirt pocket" script
                SVG. Source asset is navy (#223461); the navbar surface
                is translucent-dark, so we invert it to white at render
                time with `brightness-0 invert` (the same trick the prior
                primary logo used). Footer continues to use the full
                primary logo. Sized via h-12 sm:h-14 w-auto so the
                visual presence matches the previous text wordmark
                (~36–44px tall) and stays in lockstep with the 40px-tall
                nav-link pills. */}
            <Link
              href="/"
              className="flex-shrink-0"
              aria-label="Divine Shine — home"
            >
              {/* Full-color brand logo on a white chip. The navbar is a
                  near-transparent frosted-glass capsule over a bright hero
                  photo, and the logo's wordmark + tagline are multi-color on
                  transparent — so it needs an opaque white surface to read
                  consistently as the page scrolls. Logo intrinsic 450×197. */}
              <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
                <Image
                  src="/images/divine-shine-logo.png"
                  alt="Divine Shine"
                  width={450}
                  height={197}
                  priority
                  className="h-8 sm:h-10 w-auto"
                />
              </span>
            </Link>

            {/* Desktop Navigation — right-aligned (dirtymint mirror).
                gap-8 (32px) between items matches Mint's spec exactly
                now that the pills are font-medium (was font-bold +
                gap-2; recalibrated 2026-05-12).

                Order matches Mint exactly:
                  [Call us pill] → About Us → Services▾ → Lighting▾ →
                  Projects → Reviews → Contact
                Call us is the leftmost item in the cluster; About Us
                comes before the Services dropdown so the brand story
                lands ahead of the service menus. */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Call us pill — leftmost item in the right cluster.
                  Styled as a sky-blue pill with navy text and a phone
                  icon (same as before, just relocated from the left
                  group). */}
              <Link
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-sky text-navy font-bold text-sm tracking-tight px-5 py-2.5 rounded-full hover:bg-white transition-colors shadow-sm whitespace-nowrap"
              >
                <PhoneIcon className="w-4 h-4" />
                Call us
              </Link>

              {/* About Us — pulled out of NAV_LINKS so it can render
                  before the Services dropdown (Mint order). Same
                  hover-pill treatment as the rest of the cluster. */}
              <Link
                href="/about-us"
                className={navLinkClass}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
              >
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  className={navLinkClass}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 pt-1 w-56 z-50"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesDelayed}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          className="block px-4 py-2.5 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 transition-colors"
                          onClick={() => setServicesOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Lighting Dropdown — only rendered if Divine Shine ever adds
                  a lighting line (LIGHTING_SERVICES is empty today). */}
              {LIGHTING_SERVICES.length > 0 && (
              <div
                ref={lightingRef}
                className="relative"
                onMouseEnter={openLighting}
                onMouseLeave={closeLightingDelayed}
              >
                <button
                  onClick={() => setLightingOpen(!lightingOpen)}
                  aria-expanded={lightingOpen}
                  aria-haspopup="menu"
                  className={navLinkClass}
                >
                  Lighting
                  <ChevronDown className={`w-4 h-4 transition-transform ${lightingOpen ? "rotate-180" : ""}`} />
                </button>
                {lightingOpen && (
                  <div
                    className="absolute top-full left-0 pt-1 w-56 z-50"
                    onMouseEnter={openLighting}
                    onMouseLeave={closeLightingDelayed}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                      {LIGHTING_SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          className="block px-4 py-2.5 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 transition-colors"
                          onClick={() => setLightingOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              )}

              {/* Regular Nav Links — same hover-pill treatment as the
                  dropdown triggers so the whole bar behaves consistently. */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClass}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button — stays white in both states; the
                `.glass` / `.glass-scrolled` backdrop provides enough
                contrast on its own for the hamburger icon. p-3 instead
                of p-2 so the total tap target reaches 44×44 (Apple HIG
                minimum, audit 2026-05-12). */}
            <button
              className="lg:hidden p-3 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu — same pill treatment as desktop so the hover/
              tap state is consistent across breakpoints. */}
          {mobileOpen && (
            <div
              id="mobile-nav"
              className="lg:hidden border-t border-white/20 px-4 py-4 space-y-1 bg-white/95 backdrop-blur-lg rounded-b-3xl"
            >
              <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider px-3 pt-2 pb-1">Services</p>
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={service.href}
                  className="block px-3 py-2 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 active:bg-navy/15 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
              {LIGHTING_SERVICES.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider px-3 pt-3 pb-1">Lighting</p>
                  {LIGHTING_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.href}
                      className="block px-3 py-2 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 active:bg-navy/15 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </>
              )}
              <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
                {/* About Us is hardcoded first so the mobile drawer
                    matches the desktop right-cluster ordering (About
                    Us → Projects → Reviews → Contact). It was pulled
                    out of NAV_LINKS so the desktop nav could render it
                    before the Services dropdown. */}
                <Link
                  href="/about-us"
                  className="block px-3 py-2 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 active:bg-navy/15 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  About Us
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-[0.9rem] tracking-tight text-navy rounded-xl hover:bg-navy/15 active:bg-navy/15 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="pt-3">
                <Link
                  href={PHONE_HREF}
                  className="flex w-full items-center justify-center gap-2 bg-sky text-navy font-bold text-sm py-3 rounded-full shadow-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <PhoneIcon className="w-4 h-4" />
                  Call us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
