import React, { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LuxuryImage } from './LuxuryImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    totalItems,
    subtotal,
    openDrawer,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [fulfillment, setFulfillment] = useState<'Dine-In Table Pre-Order' | 'Mercer Courtyard Pickup'>(
    'Dine-In Table Pre-Order'
  );
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || guestName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (guestPhone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid telephone number.');
      return;
    }
    setError('');
    setSubmitting(true);
    window.setTimeout(() => {
      const ref = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderRef(ref);
      setSubmitting(false);
      setCheckoutMode(false);
      clearCart();
    }, 550);
  };

  const handleClose = () => {
    setOrderRef(null);
    setCheckoutMode(false);
    setError('');
    closeDrawer();
  };

  return (
    <>
      {/* Persistent floating bag button when items are in cart */}
      {totalItems > 0 && !isDrawerOpen && (
        <div className="fixed right-5 bottom-5 z-40">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open order bag with ${totalItems} items`}
            className="flex items-center gap-3 bg-[#4A101D] px-5 py-3 text-sm font-medium text-[#FAF7F2] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#3D0C17] cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-[#E4C98D]" aria-hidden="true" />
            <span className="tabular-nums">
              Order Bag ({totalItems}) · ${subtotal}
            </span>
          </button>
        </div>
      )}

      {/* Slide-over Drawer */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Culinary Order"
          className="fixed inset-0 z-50 flex justify-end bg-[#160E0B]/70 backdrop-blur-xs"
          onClick={handleClose}
        >
          <div
            className="flex h-full w-full max-w-md flex-col bg-[#FAF7F2] text-[#231712] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8DFD1] px-6 py-5">
              <div>
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#856629]">
                  SAVORA Atelier Selection
                </p>
                <h2 className="font-serif text-xl font-medium text-[#231712] tabular-nums">
                  Your Order ({totalItems})
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close order drawer"
                className="flex h-10 w-10 items-center justify-center text-[#5C473D] transition-colors hover:bg-[#F4EFE6] hover:text-[#231712] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {orderRef ? (
                <div className="border border-[#C5A059] bg-[#F4EFE6] p-6 text-center">
                  <CheckCircle2
                    className="mx-auto h-8 w-8 text-[#4A101D]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xs font-medium tracking-[0.14em] uppercase text-[#856629]">
                    Reference {orderRef}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-[#231712]">
                    Order Received by the Kitchen
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C473D]">
                    Thank you, {guestName}. Your {fulfillment.toLowerCase()} selection is confirmed. Our kitchen concierge will coordinate timing with you at {guestPhone}.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 w-full bg-[#4A101D] py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
                  >
                    Return to Menu
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag
                    className="h-10 w-10 text-[#D7C9B4]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-serif text-xl font-medium text-[#231712]">
                    Your selection is empty
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#5C473D]">
                    Select signature courses, tasting menus, or cellar pairings from the menu to compose your table order or courtyard pickup.
                  </p>
                </div>
              ) : checkoutMode ? (
                <form id="cart-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#856629]">
                      Fulfillment Method
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {(
                        [
                          'Dine-In Table Pre-Order',
                          'Mercer Courtyard Pickup',
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFulfillment(mode)}
                          className={`px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                            fulfillment === mode
                              ? 'bg-[#231712] text-[#FAF7F2]'
                              : 'border border-[#D7C9B4] bg-[#F4EFE6] text-[#231712]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cart-name"
                      className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                    >
                      Full Name
                    </label>
                    <input
                      id="cart-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Claire Beaumont"
                      className="mt-1.5 w-full border border-[#D7C9B4] bg-white px-3.5 py-2.5 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cart-phone"
                      className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                    >
                      Telephone
                    </label>
                    <input
                      id="cart-phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+1 (415) 555-0194"
                      className="mt-1.5 w-full border border-[#D7C9B4] bg-white px-3.5 py-2.5 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cart-notes"
                      className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                    >
                      Dietary or Timing Notes (Optional)
                    </label>
                    <textarea
                      id="cart-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Allergies, preferred arrival time, or celebration note..."
                      className="mt-1.5 w-full border border-[#D7C9B4] bg-white px-3.5 py-2.5 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#631829]">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <ul className="divide-y divide-[#E8DFD1]">
                  {items.map(({ item, quantity }) => (
                    <li key={item.id} className="flex gap-4 py-4 first:pt-0">
                      <div className="h-20 w-24 shrink-0 overflow-hidden bg-[#231712]">
                        <LuxuryImage
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#856629]">
                              {item.category}
                            </p>
                            <h3 className="font-serif text-base font-medium text-[#231712] leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          <span className="font-serif text-sm font-medium text-[#231712] tabular-nums shrink-0">
                            ${item.price * quantity}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#D7C9B4] bg-[#F4EFE6]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-[#231712] hover:bg-[#E8DFD1] cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-[#231712] hover:bg-[#E8DFD1] cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from order`}
                            className="inline-flex items-center gap-1 text-xs text-[#5C473D] hover:text-[#4A101D] cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !orderRef && (
              <div className="border-t border-[#E8DFD1] bg-[#F4EFE6] px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#5C473D]">Subtotal</span>
                  <span className="font-serif text-2xl font-medium text-[#231712] tabular-nums">
                    ${subtotal}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#5C473D]">
                  Complimentary sourdough service included · Taxes calculated upon presentation.
                </p>

                {checkoutMode ? (
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode(false)}
                      className="border border-[#D7C9B4] px-4 py-3 text-sm font-medium text-[#231712] hover:bg-[#E8DFD1] cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="cart-checkout-form"
                      disabled={submitting}
                      className="flex-1 bg-[#4A101D] py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Sending to Kitchen...' : `Submit Order · $${subtotal}`}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="border border-[#D7C9B4] px-4 py-3 text-xs font-medium text-[#5C473D] hover:text-[#231712] cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode(true)}
                      className="flex-1 bg-[#4A101D] py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
                    >
                      Proceed to Order
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
