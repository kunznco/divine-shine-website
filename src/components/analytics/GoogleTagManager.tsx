import Script from "next/script";
import { GTM_CONTAINER_ID } from "@/data/tracking";

/**
 * Google Tag Manager loader.
 *
 * Renders nothing while `GTM_CONTAINER_ID` is empty, so local dev and any
 * build without a container configured skip GTM without code changes.
 *
 * Two exports for the two pieces GTM requires:
 *  - `<GoogleTagManager />`: goes in `<head>`. Initializes `window.dataLayer`
 *    before hydration so nothing pushed early is lost, then loads gtm.js
 *    after the page is interactive so it never blocks paint.
 *  - `<GoogleTagManagerNoscript />`: the `<noscript>` iframe fallback for
 *    visitors with JS disabled. Google asks for it as the first child of
 *    `<body>`.
 */
export function GoogleTagManager(): React.ReactElement | null {
  if (!GTM_CONTAINER_ID) return null;
  return (
    <>
      {/* This component renders in the App Router root layout, the one place
          beforeInteractive is valid, so the Pages-Router-era lint rule below
          is a false positive here. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="gtm-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`,
        }}
      />
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`}
      />
    </>
  );
}

export function GoogleTagManagerNoscript(): React.ReactElement | null {
  if (!GTM_CONTAINER_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
