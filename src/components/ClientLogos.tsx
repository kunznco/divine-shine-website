import Image from "next/image";

/**
 * "Trusted by" client-logos strip.
 *
 * Real businesses Divine Shine has served (per their brand kit). Renders as
 * a desaturated row of logos that pop to full color on hover via the
 * `.client-logo` CSS in globals.css. Wraps responsively on narrow screens.
 */

type Client = { name: string; src: string };

const CLIENTS: Client[] = [
  { name: "Trader Joe's", src: "/images/clients/trader-joes.webp" },
  { name: "Chick-fil-A", src: "/images/clients/chick-fil-a.webp" },
  { name: "Orangetheory Fitness", src: "/images/clients/orangetheory.webp" },
  { name: "Redding Civic Auditorium", src: "/images/clients/redding-civic-auditorium.webp" },
  { name: "T-Bar", src: "/images/clients/t-bar.webp" },
  { name: "Theory Coffee Roasters", src: "/images/clients/theory-coffee-roasters.webp" },
  { name: "Redding Chamber Member", src: "/images/clients/redding-chamber-member.webp" },
];

export function ClientLogos() {
  return (
    <section className="bg-white py-14 sm:py-16 px-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-text mb-8">
          Trusted by Redding's best
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {CLIENTS.map((c) => (
            <li key={c.name} className="flex items-center justify-center">
              <Image
                src={c.src}
                alt={c.name}
                width={140}
                height={53}
                className="client-logo h-8 sm:h-10 w-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
