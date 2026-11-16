import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PageRoute } from '../types';

interface NavigationOptions {
  prefillGuests?: number;
  prefillSeating?: 'Main Dining Room' | 'Chef’s Hearth Counter' | 'Wine Cellar Table' | 'Garden Conservatory';
  prefillEnquirySubject?: string;
}

interface RouterContextValue {
  currentRoute: PageRoute;
  navState: NavigationOptions;
  navigate: (route: PageRoute, options?: NavigationOptions) => void;
}

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/story',
  '/menu',
  '/experience',
  '/gallery',
  '/reservations',
  '/contact',
];

const ROUTE_SEO: Record<PageRoute, { title: string; description: string }> = {
  '/': {
    title: 'SAVORA — Fine Dining & Seasonal Tasting Room',
    description:
      'Where Every Bite Becomes a Memory. Experience wood-hearth culinary artistry, curated cellar pairings, and intimate hospitality at SAVORA.',
  },
  '/story': {
    title: 'Our Story & Culinary Philosophy — SAVORA',
    description:
      'Discover the heritage of SAVORA, Chef Julian Vance’s wood-hearth philosophy, and the culinary directors behind our San Francisco dining room.',
  },
  '/menu': {
    title: 'Seasonal Menu & Tasting Courses — SAVORA',
    description:
      'Explore SAVORA’s seasonal tasting menus, wood-hearth mains, coastal starters, artisanal desserts, and sommelier wine pairings.',
  },
  '/experience': {
    title: 'Our Experience & Private Dining Salons — SAVORA',
    description:
      'From the candlelit Main Dining Room to the glass-walled Burgundy Salon and subterranean Wine Vault, discover private dining at SAVORA.',
  },
  '/gallery': {
    title: 'Culinary & Interior Gallery — SAVORA',
    description:
      'Browse editorial photography of SAVORA’s signature plated dishes, open-hearth kitchen, private dining salons, and 4,200-bottle cellar.',
  },
  '/reservations': {
    title: 'Reservations & Table Booking — SAVORA',
    description:
      'Reserve your table at SAVORA for lunch, evening tasting menus, Chef’s Hearth Counter seating, or cellar wine experiences.',
  },
  '/contact': {
    title: 'Contact, Hours & Location — SAVORA',
    description:
      'Visit SAVORA at 418 Mercer Courtyard, San Francisco. View opening hours, valet details, neighborhood map, and private event enquiries.',
  },
};

function parseInitialRoute(): PageRoute {
  const pathname = window.location.pathname as PageRoute;
  if (VALID_ROUTES.includes(pathname)) {
    return pathname;
  }
  return '/';
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseInitialRoute);
  const [navState, setNavState] = useState<NavigationOptions>({});

  const updateHeadMetadata = useCallback((route: PageRoute) => {
    const seo = ROUTE_SEO[route] || ROUTE_SEO['/'];
    document.title = seo.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.description);
  }, []);

  useEffect(() => {
    updateHeadMetadata(currentRoute);
  }, [currentRoute, updateHeadMetadata]);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = parseInitialRoute();
      setCurrentRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((route: PageRoute, options?: NavigationOptions) => {
    setNavState(options || {});
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ currentRoute, navState, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
