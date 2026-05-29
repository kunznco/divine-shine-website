/**
 * Per-service content for Divine Shine.
 *
 * Each service renders a unique page with a long-form body (H2 + paragraphs +
 * bullets), a 4-step process, FAQs, and per-service hero/CTA copy. Content is
 * localized to Redding and Shasta County and written in Divine Shine's voice.
 */
export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  name: string;
  slug: string;
  href: string;
  tagline: string;
  heroDescription: string;
  icon: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  heroSubtitle: string;
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
  processSteps: ProcessStep[];
  processSubtitle: string;
  ctaHeading: string;
  ctaSubheading: string;
  template: "residential" | "seasonal";
  seasonal?: {
    promoHeadline: string;
    description?: string;
    discountLine?: string;
    bookingDeadline?: string;
  };
};

const DIVINE_ADVANTAGE: string[] = [
  "Safe, non-abrasive cleaning methods",
  "Eco-friendly, water-fed purification systems",
  "Fully insured, trained technicians",
  "Transparent, up-front pricing",
  "Reliable scheduling with on-time arrivals",
  "Local knowledge of the North State's heat, dust, and hard water",
];

export const ALL_SERVICES: Service[] = [
  {
    name: "Window Cleaning",
    slug: "window-cleaning",
    href: "/services/window-cleaning",
    tagline: "Spotless, streak-free glass for homes and businesses — inside and out.",
    heroDescription:
      "Complete window cleaning for residential and commercial properties across Redding and Shasta County. Streak-free glass, screens, and tracks, done right the first time.",
    icon: "window",
    image: "/images/divine-shine/window-cleaning.webp",
    seoTitle: "Window Cleaning in Redding & Shasta County | Divine Shine",
    seoDescription:
      "Professional residential and commercial window cleaning in Redding, Anderson, Red Bluff, and Shasta County. Interior + exterior glass, screens, and tracks. Free estimate.",
    heroSubtitle: "Professional Window Cleaning That Leaves Glass Spotless",
    sections: [
      {
        heading: "Why Redding Homes & Businesses Need Regular Window Cleaning",
        paragraphs: [
          "Windows in Redding and Shasta County take a beating from the North State climate. Long, hot summers, valley dust, pollen, and mineral-heavy hard water dull your glass faster than most property owners expect.",
          "Common buildup includes:",
          "Left long enough, that film blocks light, hides your view, and can permanently etch the glass. Routine professional cleaning restores clarity and protects the glass surface year-round.",
        ],
        bullets: [
          "Valley dust and airborne dirt",
          "Pollen during spring and summer",
          "Hard water spots from sprinklers and irrigation",
          "Smoke and ash residue during fire season",
          "Tree sap and insect debris",
        ],
      },
      {
        heading: "Why Choose Divine Shine for Window Cleaning",
        paragraphs: [
          "Divine Shine is a locally trusted window and exterior cleaning company serving Redding and the surrounding North State. With a 5.0-star rating across 232+ Google reviews, we built our name on showing up on time, working carefully, and never cutting corners.",
          "What every customer gets:",
        ],
        bullets: DIVINE_ADVANTAGE,
      },
      {
        heading: "Our Interior & Exterior Window Cleaning Process",
        paragraphs: [
          "Every window cleaning follows the same careful, repeatable process — whether it's a one-time deep clean or recurring service.",
          "What's included:",
          "The result is streak-free glass, clean sills, and tracks you can actually see through.",
        ],
        bullets: [
          "Inspection of every window and screen",
          "Dusting of sills, tracks, and frames",
          "Screen removal and washing",
          "Interior glass cleaned with a pH-neutral solution",
          "Exterior glass finished with purified, water-fed equipment",
          "Hard-water spot treatment where needed",
          "Final walk-through with you",
        ],
      },
      {
        heading: "Residential & Commercial Window Cleaning",
        paragraphs: [
          "We clean glass for both homes and businesses. For residential customers that means crystal-clear windows, screens, and tracks. For commercial clients we handle storefronts, office buildings, and multi-story properties with the right access equipment and scheduling that works around your hours.",
          "Need recurring service? We offer flexible cleaning schedules — monthly, quarterly, or seasonal — so your property always looks its best.",
        ],
      },
      {
        heading: "Window Cleaning Service Areas",
        paragraphs: [
          "Divine Shine serves Redding and the greater North State, including:",
        ],
        bullets: [
          "Redding and Hilltop",
          "Anderson and Cottonwood",
          "Red Bluff",
          "Palo Cedro and Bella Vista",
          "Shasta Lake and Happy Valley",
          "Sacramento and the Bay Area (by arrangement)",
        ],
      },
      {
        heading: "Schedule Window Cleaning in Redding",
        paragraphs: [
          "Whether it's been six months or six years since your last professional clean, we can bring your windows back to like-new clarity.",
          "Contact Divine Shine today for a free window cleaning estimate.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should I have my windows cleaned?",
        answer:
          "Most Redding-area homes do best with professional cleaning every 3 to 6 months. Properties near agriculture, heavy traffic, or sprinklers that hit the glass often benefit from quarterly service to keep hard-water spotting from setting in.",
      },
      {
        question: "Do you clean interior and exterior windows?",
        answer:
          "Yes. Our standard service covers both interior and exterior glass, plus screen washing and sill and track cleaning at no extra charge.",
      },
      {
        question: "Can you clean windows on multi-story buildings?",
        answer:
          "Absolutely. We use water-fed poles and the proper access equipment to safely clean second-story and commercial multi-story glass. For taller buildings, see our High-Rise Window Cleaning service.",
      },
      {
        question: "What methods do you use for glass restoration?",
        answer:
          "For mineral and hard-water staining, we use fine-grade polishes and restoration compounds to remove deposits without replacing the glass. Severely etched windows sometimes need replacement, and we'll tell you up front if restoration won't work.",
      },
      {
        question: "Are your services available in Redding and surrounding areas?",
        answer:
          "Yes — we serve Redding, Anderson, Red Bluff, Cottonwood, Palo Cedro, Shasta Lake, and the wider Shasta County area, with Sacramento and Bay Area service by arrangement.",
      },
      {
        question: "How do I get an estimate?",
        answer:
          "Call or text (530) 900-3156, or use the estimate form on our contact page. Most estimates go out the same day and we can usually schedule service the same week.",
      },
    ],
    processSteps: [
      { title: "Estimate", description: "Send a few photos or schedule a quick walk-through. We give you an up-front price with no pressure." },
      { title: "Schedule", description: "We book a time that works for you and confirm ahead of time so you're never left wondering when we'll arrive." },
      { title: "Clean", description: "Glass hand-detailed and finished with purified water-fed equipment, screens washed, sills wiped, hard-water spots treated where needed." },
      { title: "Walk-through", description: "We review every window with you before we leave. If something isn't right, we make it right on the spot." },
    ],
    processSubtitle: "Streak-free results, every time",
    ctaHeading: "Crystal-clear views, today",
    ctaSubheading: "Book your window cleaning with the Redding team that shows up on time and treats your property like its own.",
    template: "residential",
  },

  {
    name: "High-Rise Window Cleaning",
    slug: "high-rise-window-cleaning",
    href: "/services/high-rise-window-cleaning",
    tagline: "Safe, spotless window cleaning for tall buildings and post-construction projects.",
    heroDescription:
      "Specialized high-rise window cleaning for commercial buildings, multi-story properties, and post-construction cleanups across Redding and the North State.",
    icon: "high-rise",
    image: "/images/divine-shine/services-5.webp",
    seoTitle: "High-Rise Window Cleaning in Redding | Commercial & Post-Construction",
    seoDescription:
      "Safe, professional high-rise and commercial window cleaning in Redding and Shasta County. Trained, insured crews for tall buildings and post-construction glass.",
    heroSubtitle: "Specialized High-Rise Window Cleaning Done Safely",
    sections: [
      {
        heading: "Window Cleaning for Tall Buildings, Done Right",
        paragraphs: [
          "High-rise and multi-story window cleaning is a different job entirely. It demands the right access equipment, trained technicians, and a safety-first plan for every elevation.",
          "Divine Shine cleans commercial buildings, office complexes, and multi-story properties throughout the Redding area — leaving every pane streak-free without putting your building or our crew at risk.",
        ],
      },
      {
        heading: "Why Choose Divine Shine for High-Rise Cleaning",
        paragraphs: [
          "Property managers and business owners trust us because we treat safety and quality as one and the same.",
        ],
        bullets: [
          "Safety first — trained, insured crews and proper access equipment",
          "Streak-free results on every elevation",
          "Versatile service for commercial and residential high-rises",
          "Advanced water-fed and rope-access techniques",
          "Scheduling that works around your business hours",
          "Documentation and insurance certificates on request",
        ],
      },
      {
        heading: "Post-Construction Window Cleaning",
        paragraphs: [
          "New construction and remodels leave behind stubborn residue — stucco splatter, paint overspray, adhesive, and construction dust that standard cleaning can't touch.",
          "Our post-construction service removes that buildup safely and restores the glass to a clear, finished, move-in-ready state.",
        ],
      },
      {
        heading: "Built for Commercial Properties",
        paragraphs: [
          "From storefronts and medical offices to multi-story office buildings, we tailor a cleaning plan and frequency to your property. Recurring maintenance keeps your building looking sharp and protects the glass from long-term mineral buildup.",
        ],
      },
      {
        heading: "Schedule High-Rise Window Cleaning",
        paragraphs: [
          "Get a safe, professional, fully insured crew on your building.",
          "Contact Divine Shine today for a high-rise window cleaning estimate.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "Is high-rise window cleaning safe for my building?",
        answer:
          "Yes. Our crews are trained and insured, and we use access equipment and techniques rated for the height and design of your building. Safety planning is part of every high-rise job.",
      },
      {
        question: "How often should high-rise windows be cleaned?",
        answer:
          "Most commercial buildings benefit from cleaning two to four times a year. Buildings near roadways, agriculture, or heavy foot traffic often schedule quarterly service to stay looking their best.",
      },
      {
        question: "Do you provide services for both commercial and residential high-rises?",
        answer:
          "Yes. We clean commercial office buildings, storefronts, and multi-story residential properties alike, scaling the equipment and crew to the job.",
      },
      {
        question: "Do you handle post-construction window cleaning?",
        answer:
          "We do. We safely remove stucco, paint overspray, adhesive, and construction dust to leave new glass clear and move-in ready.",
      },
      {
        question: "What areas do you service for high-rise window cleaning?",
        answer:
          "Redding and the greater Shasta County area, including Anderson, Red Bluff, and surrounding communities. We also travel to Sacramento and the Bay Area by arrangement.",
      },
      {
        question: "Can you provide proof of insurance?",
        answer:
          "Yes. We're happy to provide a certificate of insurance to property managers and boards before the job begins.",
      },
    ],
    processSteps: [
      { title: "Site assessment", description: "We evaluate building height, access points, and elevations to build a safe, efficient cleaning plan." },
      { title: "Safety setup", description: "Proper access equipment and rigging set up to manufacturer and safety standards before any work begins." },
      { title: "Clean", description: "Every pane cleaned to a streak-free finish using water-fed and rope-access techniques suited to the building." },
      { title: "Final inspection", description: "We review the work with you and confirm every elevation meets our standard before we leave." },
    ],
    processSubtitle: "Safety-first cleaning at any height",
    ctaHeading: "Make your building shine",
    ctaSubheading: "Schedule safe, professional high-rise window cleaning for your commercial or multi-story property.",
    template: "residential",
  },

  {
    name: "Pressure Washing",
    slug: "pressure-washing",
    href: "/services/pressure-washing",
    tagline: "Driveways, patios, walkways, and pool decks — cleaned right, without damage.",
    heroDescription:
      "Powerful pressure washing and soft washing for driveways, patios, walkways, pool decks, and hardscaping across Redding and Shasta County.",
    icon: "pressure",
    image: "/images/divine-shine/pressure-washing.webp",
    seoTitle: "Pressure Washing in Redding & Shasta County | Divine Shine",
    seoDescription:
      "Professional pressure washing and soft washing for concrete, pavers, brick, and pool decks in Redding, Anderson, and Red Bluff. Safe, thorough, insured.",
    heroSubtitle: "Restore Your Hardscaping in Hours, Not Days",
    sections: [
      {
        heading: "Why North State Hardscaping Needs Regular Pressure Washing",
        paragraphs: [
          "Concrete, pavers, and brick soak up everything the Redding climate throws at them — valley dust, tire marks, pollen, sunscreen, and the slow organic film that builds up in shaded, damp areas.",
          "Left alone, that buildup bakes in. Driveways turn gray, patio stones go green along the grout lines, and pool decks pick up slick spots that stay slippery long after they dry.",
          "A professional wash strips the film without damaging the surface, brings the original color back, and resets the clock on the next round of buildup.",
        ],
      },
      {
        heading: "What We Pressure Wash",
        paragraphs: [
          "Divine Shine cleans every hardscape surface common to North State homes and businesses:",
          "Not sure whether a surface should be pressure washed or soft washed? Just ask — we'll recommend the safer method for your specific material.",
        ],
        bullets: [
          "Concrete driveways and walkways",
          "Paver patios and pool decks",
          "Brick walkways and retaining walls",
          "Stamped and stained concrete",
          "Garage floors and entryways",
          "Outdoor stairs and landings",
        ],
      },
      {
        heading: "Soft Washing for Delicate Surfaces",
        paragraphs: [
          "Not everything should be blasted with high pressure. Roofs, stucco, siding, and gutters need a gentler approach.",
          "For those, we use soft washing — low pressure combined with biodegradable cleaning solutions that kill mildew and algae at the root, so the surface stays cleaner, longer, without the risk of damage.",
        ],
      },
      {
        heading: "Why Choose Divine Shine for Pressure Washing",
        paragraphs: [
          "Done wrong, pressure washing etches concrete, gouges pavers, and blasts grout out of brick. Our process controls pressure, water, and detergent contact time so the surface gets clean without getting damaged.",
        ],
        bullets: [
          "Comprehensive surface cleaning for any hardscape",
          "Eco-friendly, plant-safe detergents",
          "Boosts property value and curb appeal",
          "Cutting-edge equipment and techniques",
          "Surface-appropriate pressure on every job",
          "Full post-rinse of adjacent landscaping and walls",
        ],
      },
      {
        heading: "Schedule Pressure Washing in Redding",
        paragraphs: [
          "A fresh wash is the single highest-impact upgrade you can make to your property's exterior for the price.",
          "Contact Divine Shine for a free pressure washing estimate.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "What surfaces can be cleaned with pressure washing?",
        answer:
          "Driveways, walkways, patios, pool decks, brick, stamped and stained concrete, garage floors, and more. For delicate surfaces like roofs, stucco, and siding we switch to gentle soft washing instead.",
      },
      {
        question: "Is pressure washing safe for my landscaping?",
        answer:
          "Yes. We use biodegradable, plant-safe detergents and pre-rinse and post-rinse all adjacent landscaping to prevent any residue or runoff damage.",
      },
      {
        question: "How often should I have my property pressure washed?",
        answer:
          "Most North State homes benefit from a wash once or twice a year. Driveways with heavy traffic and pool decks that see summer use often do best every six months.",
      },
      {
        question: "Can pressure washing remove stains and mold?",
        answer:
          "Most oil stains, mildew, and algae come out with the right pre-treatment and method. Deep, set-in stains sometimes need a second pass with a stronger degreaser — we'll let you know what to expect after the estimate.",
      },
      {
        question: "Do you serve properties in Red Bluff and Hilltop?",
        answer:
          "Yes. We serve Redding (including Hilltop), Anderson, Red Bluff, Cottonwood, Palo Cedro, Shasta Lake, and the surrounding North State communities.",
      },
      {
        question: "Won't pressure washing damage my concrete or pavers?",
        answer:
          "Not when it's done correctly. We match the pressure, nozzle, and water temperature to each surface. Older or colored surfaces get lower pressure and specialized detergents instead of brute force.",
      },
    ],
    processSteps: [
      { title: "Estimate", description: "Tell us what you want cleaned and send a couple of photos. We give you a fixed price up front — no surprises." },
      { title: "Surface prep", description: "We clear loose items, protect plants and fixtures, and pre-rinse so the wash itself goes fast and clean." },
      { title: "Wash", description: "We adjust pressure for each surface — higher for concrete and pavers, soft washing for delicate materials — to lift grime without etching." },
      { title: "Detail & walk-through", description: "Edges, corners, and grout lines hand-finished, then a final walk with you before we pack up." },
    ],
    processSubtitle: "Years of grime, gone in a day",
    ctaHeading: "Bring back your curb appeal",
    ctaSubheading: "Book a pressure wash — driveways, patios, pool decks, and more, cleaned and looking like new.",
    template: "residential",
  },

  {
    name: "Solar Panel Cleaning",
    slug: "solar-panel-cleaning",
    href: "/services/solar-panel-cleaning",
    tagline: "Clean panels make more power. We get them back to spotless — safely.",
    heroDescription:
      "Professional solar panel cleaning that restores energy output and protects your investment. Serving Redding and Shasta County homes and businesses.",
    icon: "solar",
    image: "/images/divine-shine/solar-panel-cleaning.webp",
    seoTitle: "Solar Panel Cleaning in Redding | Boost Solar Output | Divine Shine",
    seoDescription:
      "Restore lost solar output with professional panel cleaning in Redding and Shasta County. Purified-water system, safe for your panels, fully insured.",
    heroSubtitle: "Solar Panel Cleaning for Maximum Energy Output",
    sections: [
      {
        heading: "Why Solar Panel Cleaning Matters in the North State",
        paragraphs: [
          "Redding gets more sun than almost anywhere in California — which is great for solar, and hard on panels. Months of valley dust, pollen, and fire-season ash form a film across the glass that blocks sunlight from reaching the cells.",
          "Even a thin layer of buildup reduces output. Heavily soiled panels can lose 15–25% of their production. Professional cleaning removes that layer safely and restores your panels' ability to absorb sunlight efficiently.",
          "Common performance blockers in our climate:",
        ],
        bullets: [
          "Valley dust and airborne dirt",
          "Pollen during spring and summer",
          "Wildfire smoke and ash residue",
          "Hard water minerals from irrigation",
          "Bird droppings and organic debris",
        ],
      },
      {
        heading: "Why Choose Divine Shine for Solar Cleaning",
        paragraphs: [
          "We clean panels the way manufacturers recommend — never with high pressure or harsh chemicals that can damage the anti-reflective coating.",
        ],
        bullets: [
          "Soft-brush and purified-water cleaning, safe for your panels",
          "No detergents or high pressure on the glass",
          "Technicians trained to work safely on roofs",
          "Transparent pricing and reliable scheduling",
          "We flag any cracked panels or lifted clips we spot",
          "Fully insured for your peace of mind",
        ],
      },
      {
        heading: "Our Solar Panel Cleaning Process",
        paragraphs: [
          "Our process is built specifically for delicate solar surfaces.",
          "Every service includes:",
          "The result is crystal-clear panels that absorb sunlight efficiently and keep producing optimal energy.",
        ],
        bullets: [
          "Inspection of panel condition and roof access",
          "Removal of debris and surface buildup",
          "Soft-brush cleaning with purified, deionized water",
          "Spot-free rinse — no detergent residue",
          "Careful cleaning of accessible edges and frames",
        ],
      },
      {
        heading: "How Often Should Solar Panels Be Cleaned?",
        paragraphs: [
          "Most North State systems benefit from cleaning every 6 to 12 months. You may need service sooner if you're near agriculture or open land, after a smoky fire season, or if you notice your solar output suddenly dropping.",
        ],
      },
      {
        heading: "Schedule Solar Panel Cleaning in Redding",
        paragraphs: [
          "If your panels look dusty, streaked, or covered in debris, it's time for a professional cleaning.",
          "Contact Divine Shine today to restore your solar output.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "Does cleaning solar panels really improve efficiency?",
        answer:
          "Yes. Heavily soiled panels can lose 15–25% of their output. A professional cleaning restores the clear glass surface so more sunlight reaches the cells — which shows up directly in your production and your power bill.",
      },
      {
        question: "Are your cleaning methods safe for my panels?",
        answer:
          "Absolutely. We never pressure-wash panels or use abrasive chemicals. Our purified-water system and soft-bristle tools are the methods recommended by major panel manufacturers.",
      },
      {
        question: "How often should solar panels be cleaned?",
        answer:
          "For most Redding-area systems, every 6 to 12 months is ideal. Homes near agriculture or open land, or after a heavy fire season, often benefit from more frequent cleaning.",
      },
      {
        question: "How long does the cleaning take?",
        answer:
          "Most residential arrays are completed in 1 to 2 hours. Larger commercial systems or panels with heavy buildup take longer — we'll give you an accurate estimate up front.",
      },
      {
        question: "Do you clean commercial solar arrays?",
        answer:
          "Yes. We clean residential rooftop systems and larger commercial arrays alike, with the equipment and crew to match.",
      },
      {
        question: "How do I schedule a cleaning?",
        answer:
          "Call or text (530) 900-3156, or submit the estimate form on our contact page. We usually respond within a few hours.",
      },
    ],
    processSteps: [
      { title: "Site survey", description: "We check roof access, panel layout, and tilt so we can clean safely without walking on the modules." },
      { title: "Soft brush + purified water", description: "Manufacturer-safe cleaning with soft brushes and deionized water — no detergents, no high pressure, nothing that touches the coating." },
      { title: "Inspect", description: "While we're up there we look for cracked panels, lifted clips, and shading issues, and flag anything worth a call to your installer." },
      { title: "Walk-through", description: "Final review with you, plus a recommended cadence so your system keeps producing through dust and fire season." },
    ],
    processSubtitle: "Bring your panels back to peak production",
    ctaHeading: "Get your panels producing again",
    ctaSubheading: "Schedule a solar panel cleaning and bring your power production back up where it belongs.",
    template: "residential",
  },

  {
    name: "House Washing",
    slug: "house-washing",
    href: "/services/house-washing",
    tagline: "Wash away dust, mildew, and grime — and make your home look new again.",
    heroDescription:
      "Complete exterior house washing that removes dirt, mildew, cobwebs, and oxidation from stucco and siding. Serving Redding and Shasta County.",
    icon: "house",
    image: "/images/divine-shine/house-washing.webp",
    seoTitle: "House Washing in Redding & Shasta County | Divine Shine",
    seoDescription:
      "Professional exterior house washing in Redding and the North State. Gentle soft washing for stucco and siding, with eaves, trim, and screens included.",
    heroSubtitle: "Complete Exterior Cleaning That Makes Your Home Look New",
    sections: [
      {
        heading: "What Your Home's Exterior Is Fighting Every Day",
        paragraphs: [
          "The outside of your home deals with everything the North State throws at it — valley dust, pollen, spider webs, sprinkler spots, fire-season ash, and the slow creep of mildew wherever the sun doesn't reach.",
          "Most homeowners don't notice until the gray film is obvious. By then, the buildup has already started working on the paint and siding.",
          "A full exterior house washing resets the clock, kills mildew and algae at the root, and gets your home back to looking the way it did when you moved in.",
        ],
      },
      {
        heading: "What's Included in a Full House Washing",
        paragraphs: [
          "Every house washing covers the complete exterior envelope:",
        ],
        bullets: [
          "Stucco, siding, or exterior paint (soft wash)",
          "Eaves, soffits, and fascia",
          "Window exteriors and screens",
          "Doors, trim, and shutters",
          "Outdoor light fixtures",
          "Spider web and cobweb removal",
          "Exterior vents and fixtures",
        ],
      },
      {
        heading: "Why Soft Washing Is the Safer Choice",
        paragraphs: [
          "Pressure washing siding and stucco is one of the most common causes of DIY water-intrusion damage — it drives water under siding and strips paint.",
          "Every Divine Shine house washing uses the soft-wash method: low pressure, a biodegradable cleaning solution, and a thorough rinse. The solution does the cleaning, not the water pressure.",
        ],
      },
      {
        heading: "How Often Should You Wash Your House?",
        paragraphs: [
          "Most North State homes do well with a full exterior washing once a year. Homes under heavy tree cover or in dusty, rural areas often benefit from a deeper clean every six months to stay ahead of mildew and buildup.",
          "Prepping to sell or host? Book a wash two to three weeks ahead so any tough spots have time for a follow-up.",
        ],
      },
      {
        heading: "Schedule House Washing in Redding",
        paragraphs: [
          "A yearly house wash is one of the highest-ROI exterior services you can book.",
          "Contact Divine Shine for a free house washing estimate.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "What's the difference between house washing and pressure washing?",
        answer:
          "House washing uses gentle soft-wash methods designed for siding, stucco, and painted surfaces — low pressure plus a cleaning solution. Pressure washing uses high-pressure water for concrete and hardscaping. We do both, but we never pressure-wash a home's exterior.",
      },
      {
        question: "Will it damage my plants?",
        answer:
          "No. We pre-rinse all landscaping before the wash and rinse again at the end. The cleaning solution is biodegradable and safe for soil and plants once diluted.",
      },
      {
        question: "Do you also clean the windows?",
        answer:
          "The exteriors get rinsed as part of the wash. A full streak-free window cleaning (inside and out, plus screens) is a popular add-on and is discounted when bundled with house washing.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most single-story homes take 3–4 hours. Two-story homes usually take 4–6 hours. Larger properties may take a full day.",
      },
      {
        question: "How often should I book?",
        answer:
          "Annual service is a good baseline for most North State homes. Homes with heavy tree cover or in dusty areas benefit from every six months.",
      },
      {
        question: "Do I need to be home?",
        answer:
          "No. As long as we have access to an outdoor water spigot and the sides of the house, we can complete the service while you're away.",
      },
    ],
    processSteps: [
      { title: "Walk the home", description: "We look at every elevation, note problem spots like heavy mildew or spider webs in the eaves, and confirm the plan with you." },
      { title: "Wash top down", description: "Soft wash applied from roofline to ground so dirt and growth lift off before they can run back over clean siding." },
      { title: "Detail eaves & siding", description: "Eaves, soffits, fascia, downspouts, fixtures, and window exteriors — all hand-detailed, not just blasted with a wand." },
      { title: "Walk-through", description: "We circle the home with you, hit any missed spots, and make sure you're happy before we go." },
    ],
    processSubtitle: "A full-home wash, top to bottom",
    ctaHeading: "Make your whole home look new again",
    ctaSubheading: "Full-envelope house washing in one visit. Get a fast estimate and book a wash that fits your schedule.",
    template: "residential",
  },

  {
    name: "Roof Washing",
    slug: "roof-washing",
    href: "/services/roof-washing",
    tagline: "Soft washing that removes algae and stains — and protects your roof.",
    heroDescription:
      "Gentle, low-pressure roof washing that removes algae, moss, and stains without damaging shingles or tiles. Serving Redding and Shasta County.",
    icon: "roof",
    image: "/images/divine-shine/roof-washing.webp",
    seoTitle: "Roof Washing in Redding | Safe Soft-Wash Algae Removal | Divine Shine",
    seoDescription:
      "Professional soft-wash roof washing for shingle and tile roofs in Redding and the North State. Remove algae, moss, and stains without damage. Free estimate.",
    heroSubtitle: "Soft-Wash Roof Washing That Protects Your Shingles & Tiles",
    sections: [
      {
        heading: "Why Roofs in the North State Need Professional Washing",
        paragraphs: [
          "Those dark streaks on a roof usually aren't dirt — they're algae and organic growth that feed on the roofing material, hold moisture, and shorten the roof's life.",
          "Tile and shingle roofs in shaded or damp areas also collect moss and a layer of debris that traps water and works its way under the surface over time.",
          "A professional soft-wash roof washing kills the growth at the root, rinses away the residue, and restores the roof's original color — without the damage that comes from pressure washing.",
        ],
      },
      {
        heading: "Why Pressure Washing a Roof Is a Bad Idea",
        paragraphs: [
          "High pressure strips granules off asphalt shingles, forces water under tiles, and voids most roof warranties. The short-term look costs you years of roof life.",
          "Our soft-wash process uses:",
        ],
        bullets: [
          "Low-pressure application (gentler than a garden hose)",
          "Biodegradable algaecides and surfactants",
          "Extended dwell time to kill growth at the root",
          "Careful, even rinsing from the ridge down",
        ],
      },
      {
        heading: "What We Wash",
        paragraphs: [
          "Divine Shine soft washes every common residential roof type in the North State:",
        ],
        bullets: [
          "Asphalt shingle roofs",
          "Concrete and clay tile roofs",
          "Flat and low-slope roofs",
          "Metal roofs",
        ],
      },
      {
        heading: "Our Soft-Wash Roof Washing Process",
        paragraphs: [
          "Every roof washing follows the same careful process so you get a clean roof without the damage risk.",
        ],
        bullets: [
          "Full exterior inspection and landscape protection",
          "Soft-wash application of an eco-friendly biocide",
          "Dwell time for the solution to kill algae and moss",
          "Low-pressure rinse from ridge to gutter",
          "Gutter check and debris removal (available as an add-on)",
          "Final walk-through with before-and-after photos",
        ],
      },
      {
        heading: "Schedule Roof Washing in Redding",
        paragraphs: [
          "A clean roof looks better, lasts longer, and protects one of the most expensive parts of your home.",
          "Contact Divine Shine for a free roof washing estimate.",
          "📞 (530) 900-3156\n📍 Redding, CA",
        ],
      },
    ],
    faqs: [
      {
        question: "Will roof washing damage my shingles or tiles?",
        answer:
          "Not with our soft-wash method. We use low pressure and biodegradable solutions made for roofing. Pressure washing a roof is a different story — it strips granules and voids warranties, which is why we never do it.",
      },
      {
        question: "How long does a roof washing last?",
        answer:
          "Most roofs stay clean for 2–3 years. Roofs with heavy tree cover or in damp, shaded areas sometimes see faster regrowth and benefit from a touch-up sooner.",
      },
      {
        question: "Are the cleaning solutions safe for plants and pets?",
        answer:
          "Yes. We use biodegradable solutions and wet all landscaping before and after to dilute any runoff. Pets should stay inside during the service and for about an hour after.",
      },
      {
        question: "Can you also clean my gutters?",
        answer:
          "Yes. Gutter cleaning is a popular add-on to roof washing, and we offer a bundled price when both are booked together.",
      },
      {
        question: "Do I need to be home?",
        answer:
          "Not necessarily, but we ask that someone is available at the start for a quick walk-through and to confirm access to an outdoor water source.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most single-family roofs take 2–4 hours depending on size, slope, and buildup. We'll give you an accurate estimate when we quote.",
      },
    ],
    processSteps: [
      { title: "Inspect", description: "We walk the roof, identify algae, moss, and any loose flashing, and confirm the soft-wash approach is right for your roof type." },
      { title: "Soft-wash treatment", description: "Low-pressure application of a roof-safe biocide that kills algae and moss at the root — no high-pressure blasting that strips granules." },
      { title: "Rinse", description: "A gentle rinse where appropriate. Some treatments stay on the roof and keep working for weeks after we leave." },
      { title: "Walk-through", description: "We show you the before-and-after and leave you with a maintenance cadence so the roof stays clean longer." },
    ],
    processSubtitle: "Treat the roof, save the roof",
    ctaHeading: "Protect your roof, not just clean it",
    ctaSubheading: "Soft-wash roof washing that kills algae at the root and adds years to your shingles.",
    template: "residential",
  },
];
