/**
 * Tracking identifiers for the public site.
 *
 * Google Tag Manager is the only tag loaded from code. The Meta Pixel and
 * GA4 tags live inside the GTM container (see tracking/gtm-container.json)
 * so marketing can add or change tags without a deploy.
 *
 * The container ID is public (it ships in every page's HTML), so it lives
 * here alongside the other public IDs (Jobber form, etc.) rather than in a
 * secret store. An empty string disables GTM entirely.
 */
export const GTM_CONTAINER_ID = "";
