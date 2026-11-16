import React, { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { PageRoute } from '../types';

const PRIMARY_NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Our Story', route: '/story' },
  { label: 'Menu', route: '/menu' },
  { label: 'Experience', route: '/experience' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Contact', route: '/contact' },
];

const ALL_MOBILE_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'Our Story', route: '/story' },
  { label: 'Menu', route: '/menu' },
  { label: 'Our Experience', route: '/experience' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Contact', route: '/contact' },
];

export const Navbar: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const { totalItems, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHeroOverlay = currentRoute === '/' && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate(route);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
          isHeroOverlay
            ? 'border-b border-white/10 bg-[#160E0B]/45 text-[#FAF7F2] backdrop-blur-md'
            : 'border-b border-[#E8DFD1] bg-[#FAF7F2]/95 text-[#231712] backdrop-blur-md'
        }`}
      >
        <div className="flex h-[72px] w-full items-center justify-between gap-6 px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-10 xl:px-12">
          {/* Zone 1: Single-element brand wordmark */}
          <div className="flex items-center justify-start">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="font-serif text-2xl font-semibold tracking-[0.14em] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
            >
              SAVORA
            </a>
          </div>

          {/* Zone 2: 5 concise single-line navigation links (true-centered on desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center justify-center gap-7 xl:gap-10"
          >
            {PRIMARY_NAV_LINKS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isHeroOverlay
                      ? isActive
                        ? 'text-[#E4C98D]'
                        : 'text-[#FAF7F2]/90 hover:text-[#E4C98D]'
                      : isActive
                        ? 'text-[#4A101D]'
                        : 'text-[#5C473D] hover:text-[#231712]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={`absolute right-0 -bottom-0.5 left-0 h-[1.5px] ${
                        isHeroOverlay ? 'bg-[#E4C98D]' : 'bg-[#C5A059]'
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Cart button + Primary action + Mobile trigger */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openDrawer();
              }}
              aria-label={`Open order cart (${totalItems} items)`}
              className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                isHeroOverlay
                  ? 'border border-white/25 text-[#FAF7F2] hover:border-[#E4C98D] hover:text-[#E4C98D]'
                  : 'border border-[#D7C9B4] text-[#231712] hover:border-[#4A101D] hover:text-[#4A101D]'
              }`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span className="tabular-nums">Cart ({totalItems})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                navigate('/reservations');
              }}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                isHeroOverlay
                  ? 'bg-[#C5A059] text-[#160E0B] hover:bg-[#E4C98D]'
                  : 'bg-[#4A101D] text-[#FAF7F2] hover:bg-[#3D0C17]'
              }`}
            >
              Reserve a Table
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className={`inline-flex h-11 w-11 items-center justify-center lg:hidden cursor-pointer transition-colors ${
                isHeroOverlay
                  ? 'text-[#FAF7F2] hover:bg-white/10'
                  : 'text-[#231712] hover:bg-[#F4EFE6]'
              }`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[#160E0B]/60 backdrop-blur-[2px]"
          />

          <div className="relative mt-[72px] border-b border-white/15 bg-[#160E0B] px-6 py-5 text-[#FAF7F2] shadow-2xl">
            <nav className="flex flex-col divide-y divide-white/10">
              {ALL_MOBILE_LINKS.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={(e) => handleLinkClick(e, item.route)}
                    className={`py-2.5 text-base font-medium tracking-wide transition-colors ${
                      isActive ? 'text-[#E4C98D]' : 'text-[#FAF7F2]/90 hover:text-[#E4C98D]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/15 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/reservations');
                }}
                className="w-full bg-[#C5A059] py-2.5 text-center text-sm font-medium text-[#160E0B] transition-colors hover:bg-[#E4C98D] cursor-pointer"
              >
                Reserve a Table
              </button>
              <p className="text-center text-[11px] tracking-wide text-[#D7C9B4]">
                418 Mercer Courtyard · San Francisco
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
