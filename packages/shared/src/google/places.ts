/**
 * Google rating helper.
 *
 * The static sample doesn't call the Places API — it returns Divine Shine's
 * published Google rating + review count from constants. Swap in a real
 * Places API fetch (gated by GOOGLE_PLACES_API_KEY) when the live site needs
 * the numbers to self-update.
 */

import { GOOGLE_REVIEW_COUNT, GOOGLE_RATING } from "../constants";

export type GoogleRating = {
  /** Average star rating, e.g. 5.0. */
  rating: number;
  /** Total review count, e.g. 232. */
  count: number;
  /** "live" when fetched from an API, "fallback" when sourced from constants. */
  source: "live" | "fallback";
};

export async function getGoogleRating(): Promise<GoogleRating> {
  return {
    rating: GOOGLE_RATING,
    count: GOOGLE_REVIEW_COUNT,
    source: "fallback",
  };
}
