import React from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ContactPage } from './pages/ContactPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { StoryPage } from './pages/StoryPage';

const PageViewport: React.FC = () => {
  const { currentRoute } = useRouter();

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/story':
        return <StoryPage />;
      case '/menu':
        return <MenuPage />;
      case '/experience':
        return <ExperiencePage />;
      case '/gallery':
        return <GalleryPage />;
      case '/reservations':
        return <ReservationsPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#231712]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <CartProvider>
          <PageViewport />
        </CartProvider>
      </RouterProvider>
    </MotionConfig>
  );
}
