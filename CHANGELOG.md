# Changelog

All notable changes to this project are documented here. Format follows Keep a Changelog.

## [Unreleased]

### Added
- Google Tag Manager loader in the root layout, gated on the container ID in `src/data/tracking.ts`. GTM is the only tag loaded from code; the Meta Pixel and Google Analytics 4 tags live inside the GTM container so marketing can change them without a deploy.
- `tracking/gtm-container.json`: an importable GTM container with the Meta Pixel base tag (ID prefilled), the GA4 Google tag, and call, text, and email click conversions for both platforms. Fill in the GA4 measurement ID after import. Every trigger is limited to the divine-shine.com hostname, so previews and local dev never send data.
