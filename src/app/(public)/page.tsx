import { ALL_SERVICES } from "@/data/services";
import { getFeaturedAreas } from "@/data/service-areas";
import { getCarouselReviews, getFeaturedReviews } from "@techforthetrades/db";
import { REGIONAL_MAP } from "@techforthetrades/shared/maps";
import { getGoogleRating } from "@techforthetrades/shared/google/places";
import { GOOGLE_REVIEWS_URL } from "@techforthetrades/shared/constants";
import {
  CcHomeHero,
  CcAreaServicesGrid,
  CcSingleTestimonial,
  CcMapSection,
  CcCtaSection,
} from "@/components/public/cc/Sections";
import { CcHowItWorks } from "@/components/public/cc/HowItWorks";
import { CcGoogleReviewsSlider } from "@/components/public/cc/GoogleReviewsSlider";
import { ClientLogos } from "@/components/ClientLogos";

/**
 * Homepage — production-faithful Cc* section flow:
 *   1. Hero → 2. Services grid → 3. How it works → 4. Google reviews slider
 *   → 5. Service-area map → 6. Featured testimonial → 7. Closing CTA
 */
export default async function HomePage() {
  const reviews = (await getCarouselReviews(30)).map((r) => ({
    name: r.name,
    rating: r.rating,
    text: r.text,
  }));

  const featured = (await getFeaturedReviews())
    .slice()
    .sort((a, b) => b.text.length - a.text.length)[0];

  const serviceCards = ALL_SERVICES.map((s) => ({
    name: s.name,
    description: s.tagline,
    href: s.href,
    image: s.image,
  }));

  const areaItems = getFeaturedAreas().map((a) => ({
    name: a.displayName,
    href: `/service-areas/${a.slug}`,
  }));

  const google = await getGoogleRating();
  const reviewsLabel = `${google.rating.toFixed(1)} stars · ${google.count} Google reviews`;

  return (
    <div className="grab-home">
      <CcHomeHero
        heading="We don't just clean, we shine"
        subheading="Commercial and residential window cleaning and pressure washing across Redding and Shasta County. We show up on time and leave every surface spotless."
        image="/images/divine-shine/hero.webp"
        reviewsLabel={reviewsLabel}
        reviewsHref={GOOGLE_REVIEWS_URL}
      />

      <ClientLogos />

      <CcAreaServicesGrid
        cityName="Redding"
        services={serviceCards}
        label="Services"
      />

      <CcHowItWorks />

      <CcGoogleReviewsSlider
        reviews={reviews}
        googleRating={google.rating}
        googleCount={google.count}
        reviewsUrl={GOOGLE_REVIEWS_URL}
      />

      <CcMapSection areas={areaItems} mapEmbedSrc={REGIONAL_MAP} />

      {featured && (
        <CcSingleTestimonial
          text={featured.text}
          author={featured.name}
          rating={featured.rating}
        />
      )}

      <CcCtaSection
        heading="Book Your Free Estimate Today"
        subheading="Ready for spotless windows and surfaces? Send us a quick note or call (530) 900-3156 and we'll get you a fast, no-pressure estimate."
      />
    </div>
  );
}
