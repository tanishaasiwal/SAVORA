import React from 'react';
import { MountReveal } from './Reveal';

interface PageHeroBannerProps {
  image: string;
  mobileImage?: string;
  imageAlt: string;
  imgClassName?: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  action?: React.ReactNode;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  image,
  mobileImage,
  imageAlt,
  imgClassName = 'object-center',
  eyebrow,
  title,
  description,
  action,
}) => {
  return (
    <section className="relative flex min-h-[430px] items-end overflow-hidden border-b border-[#E8DFD1] bg-[#160E0B] pt-32 pb-10 text-[#FAF7F2] md:block md:min-h-0 md:py-24 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <picture className="block h-full w-full">
          {mobileImage && <source media="(min-width: 768px)" srcSet={image} />}
          <img
            src={mobileImage ?? image}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-r from-[#160E0B]/92 via-[#160E0B]/74 to-[#160E0B]/38"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160E0B]/95 via-[#160E0B]/58 to-[#160E0B]/15 md:from-[#160E0B]/78 md:via-[#160E0B]/25 md:to-[#160E0B]/50"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
        <MountReveal
          className={
            action
              ? 'flex flex-col justify-between gap-6 md:flex-row md:items-end'
              : 'max-w-3xl'
          }
        >
          <div className="max-w-2xl lg:max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#E4C98D]">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.1] font-medium text-[#FAF7F2]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#E8DFD1] md:text-lg">
              {description}
            </p>
          </div>
          {action}
        </MountReveal>
      </div>
    </section>
  );
};
