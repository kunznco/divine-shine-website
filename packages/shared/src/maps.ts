/**
 * Google Maps helpers — build iframe-friendly URLs from a place query.
 *
 * Keyless `https://www.google.com/maps?q=...&output=embed` form renders the
 * map UI inside an <iframe> without an API key or billing account.
 */

export function googleMapsEmbed(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** Center on lat/lng with no marker (frames an area rather than pinning a point). */
export function googleMapsEmbedAt(lat: number, lng: number, zoom = 14): string {
  return `https://www.google.com/maps?ll=${lat},${lng}&z=${zoom}&output=embed`;
}

/**
 * Default map shown on regional surfaces (homepage + contact): a wide view
 * framing Redding and the surrounding Shasta County / North State communities.
 */
export const REGIONAL_MAP = googleMapsEmbedAt(40.5865, -122.3917, 10);
