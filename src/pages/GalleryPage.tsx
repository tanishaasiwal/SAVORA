import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { LuxuryImage } from '../components/LuxuryImage';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { GALLERY_ITEMS, SAVORA_IMAGES } from '../data/savoraData';
import { GalleryCategory } from '../types';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Culinary Art',
  'Interiors',
  'Private Dining',
  'Wine Cellar',
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem = activeIndex !== null ? visibleItems[activeIndex] : null;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || visibleItems.length === 0) return null;
      return (prev + 1) % visibleItems.length;
    });
  }, [visibleItems.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || visibleItems.length === 0) return null;
      return (prev - 1 + visibleItems.length) % visibleItems.length;
    });
  }, [visibleItems.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  return (
    <div className="pt-[72px]">
      {/* Page Header */}
      <PageHeroBanner
        image={SAVORA_IMAGES.wineCellar}
        mobileImage={SAVORA_IMAGES.galleryHeroMobile}
        imgClassName="object-[center_36%] md:object-center"
        imageAlt="SAVORA subterranean wine cellar vault lit by warm candlelight"
        eyebrow="Visual Archive"
        title={
          <>
            Culinary Art &amp; Dining Spaces
          </>
        }
        description="Explore plated seasonal courses, candlelight across the Main Dining Room, and our 4,200-bottle cellar vault. Select any photograph to inspect in full detail."
      />

      {/* Filter Tabs */}
      <section className="border-b border-[#E8DFD1] bg-[#F4EFE6] py-6 lg:py-7">
        <div className="mx-auto flex w-full max-w-[1680px] flex-wrap items-center justify-between gap-4 px-6 lg:px-10 xl:px-12">
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="flex flex-wrap items-center gap-2"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveIndex(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#4A101D] text-[#FAF7F2]'
                      : 'bg-[#FAF7F2] text-[#5C473D] border border-[#E8DFD1] hover:text-[#231712]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#5C473D] tabular-nums lg:text-sm">
            {visibleItems.length} {visibleItems.length === 1 ? 'photograph' : 'photographs'}
          </p>
        </div>
      </section>

      {/* Editorial Gallery Grid */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleItems.map((item, idx) => (
              <Reveal key={`${selectedCategory}-${item.id}`} delay={(idx % 3) * 0.06} className="flex">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group flex w-full flex-col border border-[#E8DFD1] bg-[#F4EFE6] text-left transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <LuxuryImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center bg-[#160E0B]/80 text-[#FAF7F2] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#856629]">
                      {item.category}
                    </p>
                    <h2 className="mt-1.5 font-serif text-lg font-medium text-[#231712] lg:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-[#5C473D] lg:text-sm">{item.detail}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#160E0B]/95 p-4 md:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-y-auto bg-[#231712] text-[#FAF7F2] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Controls */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3 text-xs text-[#E4C98D]">
                <span className="tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(visibleItems.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="uppercase tracking-[0.14em]">{activeItem.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close lightbox"
                className="flex h-10 w-10 items-center justify-center text-[#FAF7F2] transition-colors hover:bg-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative aspect-[16/10] w-full bg-[#160E0B]">
              <LuxuryImage
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full"
              />
              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photograph"
                    className="absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#160E0B]/80 text-[#FAF7F2] transition-colors hover:bg-[#4A101D] cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photograph"
                    className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#160E0B]/80 text-[#FAF7F2] transition-colors hover:bg-[#4A101D] cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-5">
              <h3 className="font-serif text-xl font-medium text-[#FAF7F2]">
                {activeItem.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#E8DFD1]">
                {activeItem.caption}
              </p>
              <p className="mt-2 text-xs text-[#C5A059]">{activeItem.detail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
