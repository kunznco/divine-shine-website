"use client";

import { useEffect, useRef } from "react";

/** Divine Shine's Jobber work-request form identifiers. */
const CLIENTHUB_ID = "c0284d7c-e456-404b-84fd-7956ca714adc-425654";
// `utm_source=Website` makes Jobber record "Website" as the lead source for
// every submission from this embed (Jobber maps utm_source -> lead source).
// The embed snippet seeds its params from this URL, then appends any UTM tags
// present on the visitor's landing URL — so a real campaign link (e.g.
// ?utm_source=facebook) still overrides this default.
const FORM_URL =
  "https://clienthub.getjobber.com/client_hubs/c0284d7c-e456-404b-84fd-7956ca714adc/public/work_request/embedded_work_request_form?form_id=425654&utm_source=Website";
const CSS_URL =
  "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
const SNIPPET_URL =
  "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";

/**
 * Jobber embedded work-request (lead) form.
 *
 * On mount we load Jobber's stylesheet and snippet. The snippet reads
 * `clienthub_id` / `form_url` off its own attributes and injects the form
 * into the matching `<div id={CLIENTHUB_ID}>`. Client-only, and guarded so
 * the script is injected once per mount.
 */
export function JobberEmbed() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    if (!document.querySelector("link[data-jobber-css]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_URL;
      link.media = "screen";
      link.setAttribute("data-jobber-css", "");
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = SNIPPET_URL;
    script.setAttribute("clienthub_id", CLIENTHUB_ID);
    script.setAttribute("form_url", FORM_URL);
    document.body.appendChild(script);
  }, []);

  return <div id={CLIENTHUB_ID} className="grab-jobber-embed" />;
}
