import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LuxuryImage } from '../components/LuxuryImage';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { useRouter } from '../context/RouterContext';
import {
  PHILOSOPHY_PILLARS,
  SAVORA_IMAGES,
  STORY_MILESTONES,
  TEAM_MEMBERS,
} from '../data/savoraData';

export const StoryPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-[72px]">
      {/* Editorial Page Header */}
      <PageHeroBanner
        image={SAVORA_IMAGES.heroDining}
        imageAlt="Warm candlelit tables inside SAVORA's 1924 Mercer Courtyard carriage house"
        eyebrow="Our Story · Est. 2018"
        title="Crafted Over Live Fire, Rooted in Coastal Terroir"
        description="SAVORA began with a simple conviction: that fine dining belongs to warmth, memory, and genuine human connection—never stiffness or spectacle."
      />

      {/* Origin & Architecture */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden lg:h-full lg:aspect-auto lg:min-h-[540px]">
                <LuxuryImage
                  src={SAVORA_IMAGES.heroDining}
                  alt="Restored 1924 brick carriage house interior at SAVORA"
                  className="h-full w-full"
                />
              </div>
            </Reveal>

            <Reveal className="flex flex-col justify-center lg:col-span-6 lg:py-4" delay={0.1}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                Heritage &amp; Journey
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                From a Thirty-Six-Seat Carriage House to a Culinary Sanctuary
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#5C473D] lg:text-lg">
                When Chef Julian Vance and Maître d’ Clara Chen first stepped inside the shuttered 1924 Mercer Courtyard carriage house, its hand-laid masonry and timber trusses spoke immediately of permanence. Over eight years, SAVORA has grown thoughtfully—never expanding its main room beyond thirty-six seats, while deepening our cellar, pastry atelier, and farm collective.
              </p>
              <div className="mt-8 space-y-6 border-t border-[#E8DFD1] pt-7">
                {STORY_MILESTONES.map((item) => (
                  <div
                    key={item.year}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <div className="shrink-0 sm:w-24">
                      <span className="font-serif text-base font-medium text-[#4A101D] tabular-nums whitespace-nowrap">
                        {item.index} {item.year}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#231712] lg:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#5C473D] lg:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Culinary Philosophy */}
      <section className="border-t border-b border-[#E8DFD1] bg-[#F4EFE6] py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                Culinary Philosophy
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                Three Disciplines Guiding Every Service
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.index} delay={idx * 0.08}>
                <div className="flex h-full flex-col border border-[#E8DFD1] bg-[#FAF7F2] p-6 lg:p-10">
                  <span className="font-serif text-2xl font-medium text-[#856629] tabular-nums lg:text-3xl">
                    {pillar.index}
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-medium text-[#231712] lg:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C473D] lg:text-base">
                    {pillar.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Culinary Team */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8DFD1] pb-8 md:flex-row md:items-end lg:pb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                  The Brigade &amp; Hosts
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                  The Artisans Behind the Evening
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/reservations')}
                className="inline-flex items-center gap-2 self-start bg-[#4A101D] px-6 py-3.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer whitespace-nowrap shrink-0 md:self-auto"
              >
                Dine With Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <Reveal key={member.id} delay={idx * 0.06} className="flex">
                <article className="group flex w-full flex-col border border-[#E8DFD1] bg-[#F4EFE6]">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <LuxuryImage
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      imgClassName="object-top"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="font-serif text-xl font-medium text-[#231712] lg:text-2xl">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium tracking-[0.08em] uppercase text-[#856629]">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
