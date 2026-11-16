import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LuxuryImage } from '../components/LuxuryImage';
import { MountReveal, Reveal } from '../components/Reveal';
import { useRouter } from '../context/RouterContext';
import {
  HERO_DISH_SLIDES,
  SAVORA_IMAGES,
  SIGNATURE_DISHES,
  TEAM_MEMBERS,
  TESTIMONIALS,
} from '../data/savoraData';

const HERO_SLIDE_INTERVAL_MS = 4500;

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const chefJulian = TEAM_MEMBERS[0];
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVoice, setActiveVoice] = useState(0);

  const slideCount = HERO_DISH_SLIDES.length;
  const currentDish = HERO_DISH_SLIDES[activeSlide];
  const currentVoice = TESTIMONIALS[activeVoice] ?? TESTIMONIALS[0];

  const handlePrevVoice = () =>
    setActiveVoice((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const handleNextVoice = () =>
    setActiveVoice((prev) => (prev + 1) % TESTIMONIALS.length);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    HERO_DISH_SLIDES.forEach((slide) => {
      const preload = new Image();
      preload.referrerPolicy = 'no-referrer';
      preload.src = isDesktop ? slide.image : slide.mobileImage;
    });
  }, []);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  return (
    <div>
      {/* 1. Cinematic Hero Dish Carousel */}
      <section className="relative flex min-h-[82vh] items-end bg-[#160E0B] pt-28 pb-14 md:min-h-[78vh] lg:min-h-screen lg:items-center lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={currentDish.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.04 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.35 : 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 will-change-transform"
            >
              <picture className="block h-full w-full">
                <source media="(min-width: 1024px)" srcSet={currentDish.image} />
                <img
                  src={currentDish.mobileImage}
                  alt={currentDish.alt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_35%] lg:object-center"
                />
              </picture>
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-r from-[#160E0B]/90 via-[#160E0B]/50 to-[#160E0B]/18"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160E0B]/95 via-[#160E0B]/55 to-[#160E0B]/25 lg:from-[#160E0B]/80 lg:via-transparent lg:to-[#160E0B]/35"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <MountReveal className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E4C98D]">
              Mercer Courtyard · San Francisco
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.08] font-medium text-[#FAF7F2]">
              Where Every Bite Becomes a Memory.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E8DFD1] md:text-lg">
              Seasonal tasting menus forged over aged white-oak embers, paired with 4,200 cellar selections in an intimate thirty-six-seat dining room.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => navigate('/reservations')}
                className="inline-flex items-center gap-2.5 bg-[#C5A059] px-7 py-3.5 text-sm font-medium text-[#160E0B] transition-colors duration-200 hover:bg-[#E4C98D] cursor-pointer whitespace-nowrap shrink-0"
              >
                Reserve a Table
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-2 border-b border-[#E4C98D]/60 py-1.5 text-sm font-medium text-[#FAF7F2] transition-colors duration-200 hover:border-[#E4C98D] hover:text-[#E4C98D] cursor-pointer whitespace-nowrap shrink-0"
              >
                Explore Seasonal Menu
              </button>
            </div>
          </MountReveal>
        </div>
      </section>

      {/* 2. Signature Dishes — Expansive Full-Bleed Gallery */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8DFD1] pb-8 md:flex-row md:items-end lg:pb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                  Autumn Tasting Repertoire
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                  Signature Plates of the Season
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#4A101D] transition-colors hover:text-[#856629] cursor-pointer whitespace-nowrap shrink-0 md:self-auto"
              >
                View Full Menu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12 lg:gap-8">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <Reveal key={dish.id} delay={idx * 0.08}>
                <article className="group relative aspect-[4/3] w-full overflow-hidden border border-[#E8DFD1] bg-[#160E0B] md:aspect-[4/5]">
                  <LuxuryImage
                    src={dish.image}
                    alt={dish.title}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160E0B]/92 via-[#160E0B]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    {dish.dietary.length > 0 && (
                      <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#E4C98D]">
                        {dish.dietary.join(' · ')}
                      </p>
                    )}
                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-xl font-medium leading-snug text-[#FAF7F2] lg:text-2xl">
                        {dish.title}
                      </h3>
                      <span className="font-serif text-lg font-medium text-[#E4C98D] tabular-nums shrink-0 lg:text-xl">
                        ${dish.price}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Restaurant Introduction — The House of SAVORA */}
      <section className="bg-[#231712] text-[#FAF7F2] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden lg:h-full lg:aspect-auto lg:min-h-[540px]">
                <LuxuryImage
                  src={SAVORA_IMAGES.privateDining}
                  alt="SAVORA Burgundy Salon with floor-to-ceiling wine vault"
                  className="h-full w-full"
                />
              </div>
            </Reveal>

            <Reveal className="flex flex-col justify-center lg:col-span-5 lg:py-4" delay={0.1}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E4C98D]">
                The House of SAVORA
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#FAF7F2] md:text-4xl lg:text-5xl">
                Quiet Architecture, Live Fire &amp; Unhurried Time
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#E8DFD1] lg:text-lg">
                Housed within a restored 1924 brick carriage house in Mercer Courtyard, SAVORA was conceived as an antidote to hurried dining. Every detail—from hand-thrown Sonoma stoneware to our subterranean cellar—invites you to linger.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 lg:gap-8">
                <div>
                  <p className="font-serif text-3xl font-medium text-[#E4C98D] tabular-nums lg:text-4xl">
                    36
                  </p>
                  <p className="mt-1.5 text-xs tracking-wide text-[#D7C9B4] lg:text-sm">
                    Main Room Seats
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-medium text-[#E4C98D] tabular-nums lg:text-4xl">
                    4,200
                  </p>
                  <p className="mt-1.5 text-xs tracking-wide text-[#D7C9B4] lg:text-sm">
                    Cellar Bottles
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-medium text-[#E4C98D] tabular-nums lg:text-4xl">
                    17
                  </p>
                  <p className="mt-1.5 text-xs tracking-wide text-[#D7C9B4] lg:text-sm">
                    Partner Farms
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => navigate('/story')}
                  className="inline-flex items-center gap-2.5 border-b border-[#E4C98D]/50 pb-1.5 text-sm font-medium text-[#E4C98D] transition-colors hover:border-[#FAF7F2] hover:text-[#FAF7F2] cursor-pointer"
                >
                  Read Our Story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Culinary Leadership */}
      <section className="bg-[#FAF7F2] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <Reveal className="flex flex-col justify-center lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                Culinary Leadership
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                {chefJulian.name}
              </h2>
              <p className="mt-2.5 text-sm font-medium tracking-wide text-[#4A101D] lg:text-base">
                {chefJulian.role} · {chefJulian.tenure}
              </p>
              <p className="mt-6 text-base leading-relaxed text-[#5C473D] lg:text-lg">
                {chefJulian.bio}
              </p>
              <blockquote className="mt-8 border-t border-b border-[#E8DFD1] py-6 font-serif text-lg italic leading-relaxed text-[#231712] lg:text-xl">
                {chefJulian.philosophy}
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center gap-6 lg:gap-8">
                <button
                  type="button"
                  onClick={() => navigate('/story')}
                  className="inline-flex items-center gap-2 bg-[#4A101D] px-6 py-3.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Meet the Full Culinary Team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate('/reservations', { prefillSeating: 'Chef’s Hearth Counter' })
                  }
                  className="inline-flex items-center gap-2 border-b border-[#4A101D]/40 pb-1 text-sm font-medium text-[#4A101D] transition-colors hover:border-[#856629] hover:text-[#856629] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Book the Hearth Counter
                </button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                <div className="aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[500px]">
                  <LuxuryImage
                    src={chefJulian.image}
                    alt={`${chefJulian.name} — ${chefJulian.role}`}
                    imgClassName="object-top"
                    className="h-full w-full"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[500px]">
                  <LuxuryImage
                    src={SAVORA_IMAGES.wineCellar}
                    alt="SAVORA subterranean wine cellar and crystal decanter"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Voices from the Dining Room */}
      <section className="border-t border-[#E8DFD1] bg-[#F4EFE6] py-20 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#D7C9B4] pb-8 md:flex-row md:items-end lg:pb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
                  Voices from the Dining Room
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
                  Shared Evenings &amp; Critical Acclaim
                </h2>
              </div>

              <div className="flex items-center gap-4 self-start md:self-auto">
                <span className="font-serif text-sm tracking-wider text-[#5C473D] tabular-nums">
                  {String(activeVoice + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
                </span>
                <div className="flex items-center border border-[#D7C9B4] bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={handlePrevVoice}
                    aria-label="Previous guest review"
                    className="flex h-10 w-10 items-center justify-center text-[#231712] transition-colors hover:bg-[#4A101D] hover:text-[#FAF7F2] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextVoice}
                    aria-label="Next guest review"
                    className="flex h-10 w-10 items-center justify-center border-l border-[#D7C9B4] text-[#231712] transition-colors hover:bg-[#4A101D] hover:text-[#FAF7F2] cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            {/* Editorial Spotlight Quote Canvas */}
            <Reveal className="h-full lg:col-span-7">
              <div className="relative flex h-full min-h-[340px] flex-col justify-between border border-[#3D2A22] bg-[#231712] p-7 text-[#FAF7F2] sm:p-10 lg:min-h-[440px] lg:p-14">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#E4C98D]">
                    {currentVoice.occasion}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-4xl leading-none text-[#C5A059]/70"
                  >
                    “
                  </span>
                </div>

                <div className="my-auto py-8 lg:py-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentVoice.id}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <blockquote className="font-serif text-xl leading-[1.45] font-normal text-[#FAF7F2] sm:text-2xl lg:text-[1.85rem] lg:leading-[1.38] xl:text-[2.05rem]">
                        “{currentVoice.quote}”
                      </blockquote>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-6">
                  <div>
                    <p className="font-serif text-lg font-medium text-[#FAF7F2] lg:text-xl">
                      {currentVoice.author}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-[#D7C9B4] sm:text-sm">
                      {currentVoice.role}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#E4C98D]/85">
                    SAVORA Guestbook · Mercer Courtyard
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Interactive Guest & Critic Ledger */}
            <Reveal className="h-full lg:col-span-5" delay={0.08}>
              <div className="grid h-full grid-cols-1 border border-[#D7C9B4] bg-[#FAF7F2] sm:grid-cols-2 lg:grid-cols-1">
                {TESTIMONIALS.map((item, idx) => {
                  const isActive = idx === activeVoice;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveVoice(idx)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full flex-col justify-between border-b border-[#E8DFD1] p-6 text-left transition-colors duration-200 last:border-b-0 sm:border-r sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 lg:border-r-0 lg:p-7 lg:[&:nth-child(n+3)]:border-b lg:last:border-b-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#4A101D] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#231712] hover:bg-[#F4EFE6]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-serif text-sm font-medium tabular-nums ${
                              isActive ? 'text-[#E4C98D]' : 'text-[#856629]'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <div>
                            <p className="font-serif text-lg font-medium leading-snug">
                              {item.author}
                            </p>
                            <p
                              className={`mt-0.5 text-xs ${
                                isActive ? 'text-[#E8DFD1]' : 'text-[#5C473D]'
                              }`}
                            >
                              {item.role}
                            </p>
                          </div>
                        </div>

                        <ArrowRight
                          className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isActive
                              ? 'translate-x-0 text-[#E4C98D]'
                              : '-translate-x-1 text-[#856629] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      <p
                        className={`mt-3 pl-7 text-[11px] font-medium tracking-[0.12em] uppercase ${
                          isActive ? 'text-[#E4C98D]' : 'text-[#856629]'
                        }`}
                      >
                        {item.occasion}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Final Reservation CTA */}
      <section className="bg-[#4A101D] py-20 text-[#FAF7F2] md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 text-center lg:px-10 xl:px-12">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E4C98D]">
              Evening &amp; Weekend Matinee Service
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight font-medium text-[#FAF7F2] md:text-5xl lg:text-6xl">
              An Intimate Table Awaits You This Evening
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#E8DFD1] lg:text-lg">
              Reservations open thirty days in advance for our Main Dining Room, Chef’s Hearth Counter, and private wine cellar tastings.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              <button
                type="button"
                onClick={() => navigate('/reservations')}
                className="inline-flex items-center gap-2 bg-[#C5A059] px-8 py-4 text-sm font-medium text-[#160E0B] transition-colors hover:bg-[#E4C98D] cursor-pointer"
              >
                Reserve Your Table
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/experience')}
                className="inline-flex items-center gap-2 border border-[#E4C98D]/40 px-8 py-4 text-sm font-medium text-[#FAF7F2] transition-colors hover:border-[#E4C98D] hover:text-[#E4C98D] cursor-pointer"
              >
                Explore Private Salons
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
