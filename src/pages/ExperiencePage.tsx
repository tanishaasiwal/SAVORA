import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { LuxuryImage } from '../components/LuxuryImage';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { useRouter } from '../context/RouterContext';
import { EXPERIENCE_SPACES, SAVORA_IMAGES } from '../data/savoraData';

const OCCASION_TIERS = [
  {
    index: '01.',
    title: 'Anniversaries & Proposals',
    description:
      'Candlelit corner alcoves or private cellar access, custom calligraphed keepsake menus, and chilled grower Champagne waiting upon arrival.',
  },
  {
    index: '02.',
    title: 'Executive & Diplomatic Hosting',
    description:
      'Sound-insulated walnut doors in The Burgundy Salon, paced multi-course service aligned to your agenda, and curated non-alcoholic pairings.',
  },
  {
    index: '03.',
    title: 'Sommelier Collector Tastings',
    description:
      'Bespoke vertical flights drawn from our 4,200-bottle subterranean vault, decanted tableside and paired with off-menu game and truffle plates.',
  },
];

const FAQ_ITEMS = [
  {
    id: 'dress-code',
    category: 'Attire',
    question: 'What is the dress code at SAVORA?',
    answer:
      'We kindly ask guests to observe smart evening attire in keeping with our candlelit dining room. Tailored jackets, dresses, and dress trousers are warmly welcomed; jackets and ties are optional. We ask that guests refrain from athletic wear, distressed denim, or beach footwear.',
  },
  {
    id: 'dietary',
    category: 'Culinary & Allergies',
    question: 'Can you accommodate vegan, gluten-free, or allergy-specific diets?',
    answer:
      'Yes. Alongside our signature Autumnal Grand Tasting, we offer a dedicated seven-course Botanical Terroir tasting that is naturally plant-forward and dairy-free. Gluten-free, shellfish-free, and nut-free adaptations are seamlessly prepared when noted in your reservation or 24 hours prior to arrival.',
  },
  {
    id: 'parking',
    category: 'Arrival & Valet',
    question: 'Where should we park, and is valet service available?',
    answer:
      'Complimentary evening valet service operates nightly from 5:00 PM along Townsend Alley beside our private courtyard gate. Self-parking and Level-2 EV charging are also available two minutes away at the Mercer Covered Garage (380 Second Street) with four-hour validation from our host stand.',
  },
  {
    id: 'tasting-duration',
    category: 'Service Cadence',
    question: 'How long should we allow for a tasting menu dinner?',
    answer:
      'Please allow 2.5 to 3 hours for our Nine-Course Grand Tasting or Hearth Counter experience. Guests seeking a shorter evening are welcome to order à la carte in the Main Dining Room or enjoy small plates and Champagne in The Mercer Bar & Lounge.',
  },
  {
    id: 'corkage',
    category: 'Wine & Cellar',
    question: 'Do you allow guests to bring wine from their own cellar?',
    answer:
      'Yes. Guests may bring up to two 750ml bottles per table of vintages not currently represented on SAVORA’s 4,200-bottle cellar list. Corkage is $65 per bottle, and our sommelier team is delighted to decant and serve your selections at temperature.',
  },
  {
    id: 'private-events',
    category: 'Private Dining',
    question: 'How far in advance should we book The Burgundy Salon?',
    answer:
      'For intimate celebrations or executive dinners of 8 to 16 guests in The Burgundy Salon, we recommend reaching out two to six weeks ahead. Our concierge curates custom calligraphed menus, floral arrangements, and dedicated sommelier pairings tailored to your gathering.',
  },
];

export const ExperiencePage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedSpaceId, setSelectedSpaceId] = useState(EXPERIENCE_SPACES[0].id);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const activeSpace =
    EXPERIENCE_SPACES.find((s) => s.id === selectedSpaceId) || EXPERIENCE_SPACES[0];

  return (
    <div className="pt-[72px]">
      {/* Page Header */}
      <PageHeroBanner
        image={SAVORA_IMAGES.privateDining}
        imageAlt="The Burgundy Salon glass-enclosed private dining room at SAVORA"
        eyebrow="Atmosphere & Private Salons"
        title="An Evening Paced Around Every Sense"
        description="Whether seated by the glow of the wood hearth, gathered around our glass-walled wine vault, or celebrating privately in The Burgundy Salon, SAVORA adapts to the occasion."
      />

      {/* Interactive Space Explorer */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="flex flex-wrap gap-2.5 border-b border-[#E8DFD1] pb-6">
            {EXPERIENCE_SPACES.map((space) => {
              const active = space.id === activeSpace.id;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setSelectedSpaceId(space.id)}
                  className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#4A101D] text-[#FAF7F2]'
                      : 'bg-[#F4EFE6] text-[#5C473D] border border-[#E8DFD1] hover:text-[#231712]'
                  }`}
                >
                  {space.name}
                </button>
              );
            })}
          </div>

          <Reveal className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden lg:h-full lg:aspect-auto lg:min-h-[500px]">
                <LuxuryImage
                  src={activeSpace.image}
                  alt={activeSpace.name}
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center border border-[#E8DFD1] bg-[#F4EFE6] p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#856629]">
                {activeSpace.capacity}
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#231712] lg:text-4xl">
                {activeSpace.name}
              </h2>
              <p className="mt-1 text-xs text-[#5C473D]">{activeSpace.setting}</p>
              <p className="mt-5 text-sm leading-relaxed text-[#5C473D] md:text-base">
                {activeSpace.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-[#E8DFD1] pt-5">
                {activeSpace.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-[#231712]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#856629]"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                {activeSpace.id === 'burgundy-salon' ? (
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/contact', {
                        prefillEnquirySubject: 'Private Dining — The Burgundy Salon',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#4A101D] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
                  >
                    Inquire About The Salon
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/reservations', {
                        prefillSeating:
                          activeSpace.id === 'cellar-vault'
                            ? 'Wine Cellar Table'
                            : 'Main Dining Room',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#4A101D] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
                  >
                    Reserve This Setting
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Special Occasions */}
      <section className="border-t border-b border-[#E8DFD1] bg-[#F4EFE6] py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                Bespoke Celebrations
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                Private Dining &amp; Special Occasions
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {OCCASION_TIERS.map((tier, idx) => (
              <Reveal key={tier.index} delay={idx * 0.08}>
                <div className="flex h-full flex-col border border-[#E8DFD1] bg-[#FAF7F2] p-6 lg:p-10">
                  <span className="font-serif text-2xl font-medium text-[#856629] tabular-nums lg:text-3xl">
                    {tier.index}
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-medium text-[#231712] lg:text-2xl">
                    {tier.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C473D] lg:text-base">
                    {tier.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                Guest Information
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5C473D] lg:text-base">
                Everything to help you prepare for a seamless evening—from evening attire and dietary adaptations to valet arrival.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#4A101D] transition-colors hover:text-[#856629] cursor-pointer"
                >
                  Ask Our Concierge
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="divide-y divide-[#D7C9B4] border-t border-b border-[#D7C9B4]">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  const panelId = `faq-panel-${faq.id}`;
                  const triggerId = `faq-trigger-${faq.id}`;
                  return (
                    <div key={faq.id}>
                      <h3>
                        <button
                          id={triggerId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[#4A101D] cursor-pointer"
                        >
                          <div>
                            <span className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#856629]">
                              {faq.category}
                            </span>
                            <span className="mt-1 block font-serif text-lg font-medium text-[#231712] md:text-xl">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#4A101D] transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </h3>
                      {isOpen && (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          className="pb-6 pr-8 text-sm leading-relaxed text-[#5C473D] md:text-base"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visual Triptych & Gallery Bridge */}
      <section className="bg-[#231712] py-20 text-[#FAF7F2] md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E4C98D]">
                  Inside Mercer Courtyard
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#FAF7F2] md:text-4xl lg:text-5xl">
                  Moments Around the Table
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/gallery')}
                className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#E4C98D] transition-colors hover:text-[#FAF7F2] cursor-pointer md:self-auto"
              >
                Open Full Gallery
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12 lg:gap-8">
            <Reveal delay={0} className="aspect-[4/3]">
              <LuxuryImage
                src={SAVORA_IMAGES.terraceBar}
                alt="The Mercer Marble Bar & Spirits Library"
                className="h-full w-full"
              />
            </Reveal>
            <Reveal delay={0.08} className="aspect-[4/3]">
              <LuxuryImage
                src={SAVORA_IMAGES.privateDining}
                alt="The Burgundy Salon private table"
                className="h-full w-full"
              />
            </Reveal>
            <Reveal delay={0.16} className="aspect-[4/3]">
              <LuxuryImage
                src={SAVORA_IMAGES.wineCellar}
                alt="Subterranean wine cellar decanting station"
                className="h-full w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
