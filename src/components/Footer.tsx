import React from 'react';
import { Reveal } from './Reveal';
import { useRouter } from '../context/RouterContext';
import { RESTAURANT_INFO } from '../data/savoraData';
import { PageRoute } from '../types';

const FOOTER_PAGES: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'Our Story', route: '/story' },
  { label: 'Menu', route: '/menu' },
  { label: 'Our Experience', route: '/experience' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Reservations', route: '/reservations' },
  { label: 'Contact', route: '/contact' },
];

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleNav = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <footer className="border-t border-[#36251E] bg-[#160E0B] text-[#E8DFD1]">
      <Reveal className="mx-auto w-full max-w-[1680px] px-6 py-16 md:py-20 lg:px-10 xl:px-12" yOffset={14}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="font-serif text-2xl font-semibold tracking-[0.16em] text-[#FAF7F2]"
            >
              SAVORA
            </a>
            <p className="mt-4 max-w-sm font-serif text-lg italic text-[#E4C98D]">
              “{RESTAURANT_INFO.tagline}”
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#D7C9B4]">
              Wood-hearth culinary craft, seasonal coastal sourcing, and an intimate 4,200-bottle cellar in the heart of San Francisco’s Heritage District.
            </p>
          </div>

          {/* Navigation Mirror */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[#C5A059]">
              Explore
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {FOOTER_PAGES.map((item) => (
                <li key={item.route}>
                  <a
                    href={item.route}
                    onClick={(e) => handleNav(e, item.route)}
                    className="text-sm text-[#E8DFD1] transition-colors hover:text-[#E4C98D]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Hours */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[#C5A059]">
              Visit &amp; Concierge
            </h2>
            <div className="mt-5 space-y-3 text-sm text-[#D7C9B4]">
              <p>
                {RESTAURANT_INFO.addressLine1}
                <br />
                {RESTAURANT_INFO.addressLine2}
              </p>
              <p className="tabular-nums">
                {RESTAURANT_INFO.phone}
                <br />
                {RESTAURANT_INFO.conciergeEmail}
              </p>
              <div className="border-t border-white/10 pt-3 text-xs leading-relaxed text-[#D7C9B4]">
                <p>Tue – Sun Dinner · 5:30 PM – 10:30 PM</p>
                <p>Fri – Sat Matinee Lunch · 12:00 PM – 2:30 PM</p>
                <p>Closed Mondays</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#D7C9B4]/80 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SAVORA Hospitality Group. All rights reserved.</p>
          <p>Smart Evening Attire · Valet Service at Mercer Courtyard</p>
        </div>
      </Reveal>
    </footer>
  );
};
