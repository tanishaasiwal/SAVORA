import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Minus, Plus, Search, X } from 'lucide-react';
import { LuxuryImage } from '../components/LuxuryImage';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { MENU_ITEMS, SAVORA_IMAGES } from '../data/savoraData';
import { DietaryLabel, MenuCategory, MenuItem } from '../types';

const CATEGORIES: MenuCategory[] = [
  'All Courses',
  'Tasting Menu',
  'Amuse & Starters',
  'Mains',
  'Desserts',
  'Wine & Pairings',
];

const DIETARY_OPTIONS: ('All Dietary' | DietaryLabel)[] = [
  'All Dietary',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
];

export const MenuPage: React.FC = () => {
  const { navigate } = useRouter();
  const { items: cartItems, addItem, updateQuantity, openDrawer } =
    useCart();

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All Courses');
  const [selectedDietary, setSelectedDietary] = useState<'All Dietary' | DietaryLabel>('All Dietary');
  const [signatureOnly, setSignatureOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All Courses' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedDietary !== 'All Dietary' && !item.dietary.includes(selectedDietary)) {
        return false;
      }
      if (signatureOnly && !item.signature) {
        return false;
      }
      if (query) {
        const haystack = `${item.name} ${item.dietary.join(' ')}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, signatureOnly, searchQuery]);

  const groupedSections = useMemo(() => {
    const orderedCategories: Exclude<MenuCategory, 'All Courses'>[] = [
      'Tasting Menu',
      'Amuse & Starters',
      'Mains',
      'Desserts',
      'Wine & Pairings',
    ];
    return orderedCategories
      .map((cat) => ({
        category: cat,
        items: filteredItems.filter((item) => item.category === cat),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const resetFilters = () => {
    setSelectedCategory('All Courses');
    setSelectedDietary('All Dietary');
    setSignatureOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All Courses' ||
    selectedDietary !== 'All Dietary' ||
    signatureOnly ||
    searchQuery.trim() !== '';

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  const getCartQuantity = (id: string) =>
    cartItems.find((entry) => entry.item.id === id)?.quantity || 0;

  return (
    <div className="pt-[72px]">
      {/* Header Banner */}
      <PageHeroBanner
        image={SAVORA_IMAGES.heroDish}
        imageAlt="Miyazaki A5 Wagyu and winter truffle tasting course at SAVORA"
        eyebrow="Autumn / Winter Carte"
        title={
          <>
            Seasonal Tasting &amp; À La Carte Menu
          </>
        }
        description="Compositions crafted daily from coastal landings, aged grains, and white-oak embers. Add courses directly to your table pre-order or courtyard pickup bag."
        action={
          <button
            type="button"
            onClick={() => navigate('/reservations')}
            className="inline-flex items-center gap-2 self-start bg-[#C5A059] px-6 py-3.5 text-sm font-medium text-[#160E0B] transition-colors hover:bg-[#E4C98D] cursor-pointer whitespace-nowrap shrink-0 md:self-auto"
          >
            Reserve for Tasting
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        }
      />

      {/* Interactive Filter Controls */}
      <section className="border-b border-[#E8DFD1] bg-[#F4EFE6] py-6 lg:py-7">
        <div className="mx-auto w-full max-w-[1680px] space-y-5 px-6 lg:px-10 xl:px-12">
          {/* Course Category Tabs */}
          <div
            role="tablist"
            aria-label="Menu course categories"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
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

          {/* Dietary Filters & Search Row */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium tracking-[0.12em] uppercase text-[#5C473D]">
                Dietary:
              </span>
              {DIETARY_OPTIONS.map((option) => {
                const active = selectedDietary === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedDietary(option)}
                    className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#231712] text-[#FAF7F2]'
                        : 'bg-transparent text-[#5C473D] border border-[#D7C9B4] hover:border-[#231712] hover:text-[#231712]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSignatureOnly((prev) => !prev)}
                aria-pressed={signatureOnly}
                className={`ml-1 px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  signatureOnly
                    ? 'bg-[#856629] text-[#FAF7F2]'
                    : 'bg-transparent text-[#856629] border border-[#C5A059] hover:bg-[#FAF7F2]'
                }`}
              >
                Chef’s Signature Only
              </button>
            </div>

            <div className="flex w-full items-center gap-3 lg:w-auto">
              <div className="relative flex-1 sm:w-72 lg:w-80 lg:flex-none">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#5C473D]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes..."
                  aria-label="Search dishes"
                  className="w-full border border-[#D7C9B4] bg-[#FAF7F2] py-2 pr-8 pl-9 text-sm text-[#231712] placeholder:text-[#5C473D]/70 focus:border-[#4A101D] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[#5C473D] hover:text-[#231712] cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-[#4A101D] underline underline-offset-4 hover:text-[#856629] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Listings */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C473D]">
            <p className="tabular-nums">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'selection' : 'selections'}
            </p>
            <p>Prices in USD · Exclusive of 20% hospitality service charge</p>
          </div>

          {groupedSections.length === 0 ? (
            <div className="border border-[#E8DFD1] bg-[#F4EFE6] px-6 py-16 text-center">
              <h2 className="font-serif text-2xl font-medium text-[#231712]">
                No courses match your current selection
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#5C473D]">
                Try clearing one of your dietary filters or search terms. Our kitchen also crafts custom tasting menus upon reservation.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 bg-[#4A101D] px-6 py-2.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
              >
                Show All Courses
              </button>
            </div>
          ) : (
            <div className="space-y-16 lg:space-y-20">
              {groupedSections.map((group) => (
                <div key={group.category}>
                  <Reveal>
                    <div className="flex items-baseline justify-between border-b border-[#D7C9B4] pb-3 lg:pb-4">
                      <h2 className="font-serif text-2xl font-medium text-[#231712] md:text-3xl lg:text-4xl">
                        {group.category}
                      </h2>
                      <span className="text-xs text-[#5C473D] tabular-nums lg:text-sm">
                        {group.items.length} {group.items.length === 1 ? 'dish' : 'dishes'}
                      </span>
                    </div>
                  </Reveal>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {group.items.map((item, idx) => {
                      const inCartQty = getCartQuantity(item.id);
                      const justAdded = recentlyAddedId === item.id;

                      return (
                        <Reveal key={`${selectedCategory}-${selectedDietary}-${item.id}`} delay={(idx % 3) * 0.06} className="flex">
                          <article
                            className="group flex w-full flex-col justify-between border border-[#E8DFD1] bg-[#F4EFE6]/70 transition-colors hover:border-[#C5A059]"
                          >
                          <div>
                            <div className="aspect-[4/3] w-full overflow-hidden">
                              <LuxuryImage
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            </div>

                            <div className="p-6 pb-0">
                              <div className="flex items-baseline justify-between gap-3">
                                <h3 className="font-serif text-xl font-medium leading-snug text-[#231712]">
                                  {item.name}
                                </h3>
                                <span className="font-serif text-lg font-medium text-[#4A101D] tabular-nums shrink-0">
                                  ${item.price}
                                </span>
                              </div>

                              {item.dietary.length > 0 && (
                                <p className="mt-2 text-xs font-medium text-[#856629]">
                                  {item.dietary.join(' · ')}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="p-6 pt-5">
                            <div className="flex items-center justify-between gap-3 border-t border-[#E8DFD1] pt-4">
                              {inCartQty > 0 ? (
                                <>
                                  <div className="inline-flex items-center border border-[#4A101D] bg-[#FAF7F2]">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.id, -1)}
                                      aria-label={`Remove one ${item.name}`}
                                      className="flex h-9 w-9 items-center justify-center text-[#4A101D] hover:bg-[#F4EFE6] cursor-pointer"
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="w-8 text-center text-xs font-semibold text-[#231712] tabular-nums">
                                      {inCartQty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.id, 1)}
                                      aria-label={`Add one more ${item.name}`}
                                      className="flex h-9 w-9 items-center justify-center text-[#4A101D] hover:bg-[#F4EFE6] cursor-pointer"
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={openDrawer}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4A101D] underline underline-offset-4 hover:text-[#856629] cursor-pointer"
                                  >
                                    {justAdded ? (
                                      <>
                                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                        Added
                                      </>
                                    ) : (
                                      'View in Cart'
                                    )}
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(item)}
                                  className="flex w-full items-center justify-center gap-2 bg-[#4A101D] px-4 py-2.5 text-sm font-medium text-[#FAF7F2] transition-colors duration-200 hover:bg-[#3D0C17] cursor-pointer"
                                >
                                  <Plus className="h-4 w-4" aria-hidden="true" />
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
