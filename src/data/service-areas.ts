export type ServiceArea = {
  slug: string;
  city: string;
  displayName: string;
  /** Short paragraph about the area, shown in "The Beauty of [city]" block. */
  beautyDescription: string;
  /** Neighborhoods / local callouts used in the "Local Partners" block. */
  neighborhoods: string;
  /** Hero background image. */
  heroImage: string;
};

const IMG = {
  hero: "/images/divine-shine/hero.webp",
  window: "/images/divine-shine/window-cleaning.webp",
  highRise: "/images/divine-shine/roof-washing.webp",
  work: "/images/divine-shine/solar-panel-cleaning.webp",
  results: "/images/divine-shine/house-washing.webp",
  estimate: "/images/divine-shine/window-cleaning.webp",
} as const;

/**
 * Top 10 service areas in and around Shasta County. Ordered roughly by
 * relevance to a Redding-based exterior cleaning company (population +
 * proximity). Descriptions use real local geography so each page reads as
 * genuinely local rather than generic.
 */
export const SERVICE_AREA_DATA: ServiceArea[] = [
  {
    slug: "redding-ca",
    city: "Redding",
    displayName: "Redding, CA",
    beautyDescription:
      "Redding is the county seat and the largest city in the North State, sitting where the Sacramento River meets the foothills below Mount Shasta. Landmarks like the Sundial Bridge and Turtle Bay draw visitors, but the long, hot, dry summers and mineral-heavy water are tough on windows and exterior surfaces year-round.",
    neighborhoods:
      "From downtown storefronts and the Hilltop business corridor to homes in Enterprise, Quartz Hill, and Country Heights, Divine Shine keeps Redding properties bright and well cared for. We're proud to be the local team Redding homeowners and businesses call first.",
    heroImage: IMG.hero,
  },
  {
    slug: "anderson-ca",
    city: "Anderson",
    displayName: "Anderson, CA",
    beautyDescription:
      "Just south of Redding along Interstate 5, Anderson blends small-town character with quick freeway access and the green riverfront of Anderson River Park. Valley dust, pollen, and hard water keep exterior cleaning in steady demand for homes and businesses alike.",
    neighborhoods:
      "We serve neighborhoods throughout Anderson and the Cottonwood corridor, from the shops along North Street to homes near the Sacramento River. Whether it's a storefront or a family home, we deliver the same spotless, on-time service.",
    heroImage: IMG.window,
  },
  {
    slug: "shasta-lake-ca",
    city: "Shasta Lake",
    displayName: "Shasta Lake, CA",
    beautyDescription:
      "The city of Shasta Lake sits north of Redding, the gateway to Shasta Dam and the houseboats and recreation of Lake Shasta. Lakeside dust, intense summer sun, and dock-and-deck living make regular window and surface cleaning well worth it.",
    neighborhoods:
      "From Project City and Central Valley to homes overlooking the lake, Divine Shine helps Shasta Lake residents keep their views clear and their exteriors clean all season long.",
    heroImage: IMG.highRise,
  },
  {
    slug: "cottonwood-ca",
    city: "Cottonwood",
    displayName: "Cottonwood, CA",
    beautyDescription:
      "Cottonwood straddles the Shasta–Tehama county line along I-5, a historic ranch and rodeo town with wide-open properties and plenty of agricultural dust. Those big skies come with big maintenance — windows, siding, and hardscaping all take a beating from the elements.",
    neighborhoods:
      "We serve Cottonwood's ranch homes, newer subdivisions, and Main Street businesses with window cleaning, house and roof washing, and surface cleaning that stands up to the country dust.",
    heroImage: IMG.work,
  },
  {
    slug: "palo-cedro-ca",
    city: "Palo Cedro",
    displayName: "Palo Cedro, CA",
    beautyDescription:
      "Just east of Redding on Highway 44, Palo Cedro is a sought-after rural community known for larger lots, custom homes, and oak-studded countryside. Open land means more pollen and dust on the glass and panels — exactly what professional cleaning is built for.",
    neighborhoods:
      "We keep Palo Cedro's custom homes and acreage properties shining, from streak-free windows to clean, high-producing solar arrays. Discretion, punctuality, and meticulous work are our standard out here.",
    heroImage: IMG.results,
  },
  {
    slug: "happy-valley-ca",
    city: "Happy Valley",
    displayName: "Happy Valley, CA",
    beautyDescription:
      "Happy Valley spreads across the rolling foothills southwest of Anderson and Redding, a rural community of large parcels, wells, and wide views. Dust, well water, and long sunny summers make exterior cleaning a smart, recurring investment for homeowners here.",
    neighborhoods:
      "From hillside homes to working properties, Divine Shine brings the right equipment and water-fed systems to Happy Valley so your windows, solar, and exteriors stay spotless.",
    heroImage: IMG.estimate,
  },
  {
    slug: "bella-vista-ca",
    city: "Bella Vista",
    displayName: "Bella Vista, CA",
    beautyDescription:
      "East of Redding among oak woodlands and foothills, Bella Vista is a quiet rural community of spacious homes and country properties. The same beauty that draws people here — open land, big trees, and sunshine — also means dust, pollen, and hard-water buildup on glass and surfaces.",
    neighborhoods:
      "We serve Bella Vista's rural homes and acreage with window cleaning, house and roof washing, and solar panel care, treating every property like it's our own.",
    heroImage: IMG.window,
  },
  {
    slug: "red-bluff-ca",
    city: "Red Bluff",
    displayName: "Red Bluff, CA",
    beautyDescription:
      "South of the county along the Sacramento River, Red Bluff is the Tehama County seat, known for its historic downtown, Victorian homes, and the famous Round-Up rodeo. Some of the hottest summers in the North State make regular exterior cleaning especially worthwhile here.",
    neighborhoods:
      "Divine Shine travels south to Red Bluff for window cleaning, house washing, and pressure washing on historic homes, newer neighborhoods, and downtown businesses alike.",
    heroImage: IMG.highRise,
  },
  {
    slug: "shingletown-ca",
    city: "Shingletown",
    displayName: "Shingletown, CA",
    beautyDescription:
      "Perched in the pine-covered foothills along Highway 44 on the way to Lassen Volcanic National Park, Shingletown sits at around 4,000 feet of elevation. Mountain homes here collect pine pollen, tree sap, and seasonal grime that professional cleaning handles with ease.",
    neighborhoods:
      "We make the drive up the hill to keep Shingletown's mountain and forest homes looking their best, from streak-free windows to clean roofs and exteriors.",
    heroImage: IMG.hero,
  },
  {
    slug: "burney-ca",
    city: "Burney",
    displayName: "Burney, CA",
    beautyDescription:
      "In eastern Shasta County along Highway 299, Burney is a mountain community near the spectacular McArthur–Burney Falls and the gateway to forest and lake recreation. Pine debris, dust, and harsh seasonal swings make exterior upkeep important for homes and businesses out here.",
    neighborhoods:
      "Divine Shine serves Burney and the surrounding Intermountain communities with window cleaning, house and roof washing, and surface cleaning built for mountain conditions.",
    heroImage: IMG.work,
  },
];

/** Featured areas surfaced in the marketing chrome (footer + homepage map). */
export function getFeaturedAreas(): ServiceArea[] {
  return SERVICE_AREA_DATA;
}
