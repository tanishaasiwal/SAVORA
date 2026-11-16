import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Clock, Users } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { useRouter } from '../context/RouterContext';
import { RESTAURANT_INFO, SAVORA_IMAGES } from '../data/savoraData';
import { ReservationConfirmation, ReservationFormState } from '../types';

const STORAGE_KEY = 'savora_latest_reservation';

const EVENING_SLOTS = [
  '5:30 PM',
  '6:00 PM',
  '6:45 PM',
  '7:30 PM',
  '8:15 PM',
  '9:00 PM',
];

const MATINEE_SLOTS = ['12:00 PM', '12:45 PM', '1:30 PM'];

const SEATING_OPTIONS: ReservationFormState['seating'][] = [
  'Main Dining Room',
  'Chef’s Hearth Counter',
  'Wine Cellar Table',
  'Garden Conservatory',
];

const OCCASION_OPTIONS = [
  'No Special Occasion',
  'Anniversary',
  'Birthday Celebration',
  'Engagement / Proposal',
  'Executive Dinner',
  'Grand Tasting Experience',
];

function getTomorrowDateISO(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // If tomorrow is Monday (1), advance to Tuesday since SAVORA is closed Mondays
  if (tomorrow.getDay() === 1) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }
  return tomorrow.toISOString().split('T')[0];
}

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export const ReservationsPage: React.FC = () => {
  const { navState, navigate } = useRouter();

  const [form, setForm] = useState<ReservationFormState>({
    date: getTomorrowDateISO(),
    time: '7:30 PM',
    guests: navState.prefillGuests || 2,
    seating: navState.prefillSeating || 'Main Dining Room',
    occasion: 'No Special Occasion',
    dietaryNotes: '',
    fullName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ReservationConfirmation) : null;
    } catch {
      return null;
    }
  });
  const [showFormOverride, setShowFormOverride] = useState(false);

  useEffect(() => {
    if (navState.prefillSeating) {
      setForm((prev) => ({ ...prev, seating: navState.prefillSeating! }));
      setShowFormOverride(true);
    }
  }, [navState.prefillSeating]);

  const dayOfWeek = useMemo(() => {
    if (!form.date) return null;
    const [y, m, d] = form.date.split('-').map(Number);
    return new Date(y, m - 1, d).getDay();
  }, [form.date]);

  const isMonday = dayOfWeek === 1;
  const isWeekendMatinee = dayOfWeek === 5 || dayOfWeek === 6;

  const availableTimeSlots = useMemo(() => {
    if (isMonday) return [];
    return isWeekendMatinee ? [...MATINEE_SLOTS, ...EVENING_SLOTS] : EVENING_SLOTS;
  }, [isMonday, isWeekendMatinee]);

  useEffect(() => {
    if (availableTimeSlots.length > 0 && !availableTimeSlots.includes(form.time)) {
      setForm((prev) => ({ ...prev, time: availableTimeSlots[0] }));
    }
  }, [availableTimeSlots, form.time]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ReservationFormState, string>> = {};
    if (!form.date) {
      nextErrors.date = 'Please select a dining date.';
    } else if (form.date < getTodayISO()) {
      nextErrors.date = 'Please select today or a future date.';
    } else if (isMonday) {
      nextErrors.date = 'SAVORA is closed on Mondays for market and cellar preparation.';
    }

    if (!form.time) {
      nextErrors.time = 'Please choose an available seating time.';
    }

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 7) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      const code = `SVR-${Math.floor(1000 + Math.random() * 9000)}`;
      const record: ReservationConfirmation = {
        ...form,
        referenceCode: code,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {
        // Ignore storage quota issues
      }
      setConfirmation(record);
      setShowFormOverride(false);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCancelStored = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setConfirmation(null);
    setShowFormOverride(true);
  };

  const formattedDate = useMemo(() => {
    const targetDate = confirmation && !showFormOverride ? confirmation.date : form.date;
    if (!targetDate) return '';
    const [y, m, d] = targetDate.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [confirmation, showFormOverride, form.date]);

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <PageHeroBanner
        image={SAVORA_IMAGES.terraceBar}
        imageAlt="The Mercer Bar and candlelit dining lounge at SAVORA"
        eyebrow="Table Booking"
        title="Reserve Your Table at SAVORA"
        description="Evening tasting and à la carte seatings are released thirty days ahead. For parties larger than eight, we recommend inquiring about The Burgundy Salon."
      />

      <section className="bg-[#FAF7F2] py-16 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            {/* Main Column: Booking Form or Confirmation */}
            <Reveal className="lg:col-span-8">
              {confirmation && !showFormOverride ? (
                <div className="border border-[#C5A059] bg-[#F4EFE6] p-8 md:p-10">
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="mt-1 h-7 w-7 shrink-0 text-[#4A101D]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#856629]">
                        Reservation Confirmed · Ref {confirmation.referenceCode}
                      </p>
                      <h2 className="mt-2 font-serif text-3xl font-medium text-[#231712]">
                        We Look Forward to Welcoming You, {confirmation.fullName}
                      </h2>
                      <p className="mt-2 text-sm text-[#5C473D]">
                        A confirmation itinerary has been prepared for{' '}
                        <span className="font-medium text-[#231712]">
                          {confirmation.email}
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 border-t border-b border-[#D7C9B4] py-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs tracking-[0.12em] uppercase text-[#5C473D]">
                        Date &amp; Time
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#231712]">
                        {formattedDate}
                      </p>
                      <p className="text-sm text-[#4A101D] tabular-nums">
                        {confirmation.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.12em] uppercase text-[#5C473D]">
                        Party &amp; Setting
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#231712] tabular-nums">
                        {confirmation.guests}{' '}
                        {confirmation.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                      <p className="text-sm text-[#5C473D]">{confirmation.seating}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.12em] uppercase text-[#5C473D]">
                        Occasion
                      </p>
                      <p className="mt-1 text-sm text-[#231712]">
                        {confirmation.occasion}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.12em] uppercase text-[#5C473D]">
                        Dietary &amp; Notes
                      </p>
                      <p className="mt-1 text-sm text-[#231712]">
                        {confirmation.dietaryNotes.trim() || 'None specified'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setShowFormOverride(true)}
                      className="bg-[#4A101D] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
                    >
                      Book Another Table
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelStored}
                      className="border border-[#D7C9B4] px-6 py-3 text-sm font-medium text-[#5C473D] transition-colors hover:border-[#231712] hover:text-[#231712] cursor-pointer"
                    >
                      Release This Reservation
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="border border-[#E8DFD1] bg-[#F4EFE6] p-6 sm:p-8 md:p-10"
                >
                  <h2 className="font-serif text-2xl font-medium text-[#231712]">
                    01. Seating Details
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Date */}
                    <div>
                      <label
                        htmlFor="res-date"
                        className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        <Calendar className="h-3.5 w-3.5 text-[#856629]" aria-hidden="true" />
                        Dining Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={getTodayISO()}
                        value={form.date}
                        onChange={(e) => {
                          setForm({ ...form, date: e.target.value });
                          setErrors((prev) => ({ ...prev, date: undefined }));
                        }}
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none tabular-nums"
                      />
                      {errors.date && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Party Size */}
                    <div>
                      <label
                        htmlFor="res-guests"
                        className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        <Users className="h-3.5 w-3.5 text-[#856629]" aria-hidden="true" />
                        Number of Guests
                      </label>
                      <select
                        id="res-guests"
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: Number(e.target.value) })
                        }
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none tabular-nums"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      {form.guests >= 9 && (
                        <p className="mt-1.5 text-xs text-[#856629]">
                          For parties of 9 or more, our concierge may arrange{' '}
                          <button
                            type="button"
                            onClick={() =>
                              navigate('/contact', {
                                prefillEnquirySubject: 'Private Dining Group Booking',
                              })
                            }
                            className="underline cursor-pointer"
                          >
                            The Burgundy Salon
                          </button>
                          .
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mt-6">
                    <span className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[#231712]">
                      <Clock className="h-3.5 w-3.5 text-[#856629]" aria-hidden="true" />
                      Available Seating Times
                    </span>
                    {isMonday ? (
                      <p className="mt-2 border border-[#D7C9B4] bg-[#FAF7F2] p-4 text-sm text-[#631829]">
                        SAVORA is closed on Mondays. Please select Tuesday through Sunday to view available seatings.
                      </p>
                    ) : (
                      <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                        {availableTimeSlots.map((slot) => {
                          const active = form.time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setForm({ ...form, time: slot });
                                setErrors((prev) => ({ ...prev, time: undefined }));
                              }}
                              className={`py-2.5 text-xs font-medium tabular-nums transition-colors cursor-pointer ${
                                active
                                  ? 'bg-[#4A101D] text-[#FAF7F2]'
                                  : 'border border-[#D7C9B4] bg-[#FAF7F2] text-[#231712] hover:border-[#4A101D]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {errors.time && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                        {errors.time}
                      </p>
                    )}
                  </div>

                  {/* Seating Environment */}
                  <div className="mt-6">
                    <span className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]">
                      Preferred Setting
                    </span>
                    <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {SEATING_OPTIONS.map((setting) => {
                        const active = form.seating === setting;
                        return (
                          <button
                            key={setting}
                            type="button"
                            onClick={() => setForm({ ...form, seating: setting })}
                            className={`px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#231712] text-[#FAF7F2]'
                                : 'border border-[#D7C9B4] bg-[#FAF7F2] text-[#231712] hover:border-[#231712]'
                            }`}
                          >
                            {setting}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <h2 className="mt-10 border-t border-[#D7C9B4] pt-8 font-serif text-2xl font-medium text-[#231712]">
                    02. Guest Information
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="res-name"
                        className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        Full Name
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({ ...form, fullName: e.target.value });
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="Claire Beaumont"
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] placeholder:text-[#5C473D]/60 focus:border-[#4A101D] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-email"
                        className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        Email Address
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="claire@example.com"
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] placeholder:text-[#5C473D]/60 focus:border-[#4A101D] focus:outline-none"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-phone"
                        className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        Telephone
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="+1 (415) 555-0194"
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] placeholder:text-[#5C473D]/60 focus:border-[#4A101D] focus:outline-none tabular-nums"
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-occasion"
                        className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        Occasion (Optional)
                      </label>
                      <select
                        id="res-occasion"
                        value={form.occasion}
                        onChange={(e) =>
                          setForm({ ...form, occasion: e.target.value })
                        }
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                      >
                        {OCCASION_OPTIONS.map((occ) => (
                          <option key={occ} value={occ}>
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="res-dietary"
                        className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                      >
                        Allergies or Requests (Optional)
                      </label>
                      <input
                        id="res-dietary"
                        type="text"
                        value={form.dietaryNotes}
                        onChange={(e) =>
                          setForm({ ...form, dietaryNotes: e.target.value })
                        }
                        placeholder="Shellfish allergy, vegan tasting, window table..."
                        className="mt-2 w-full border border-[#D7C9B4] bg-[#FAF7F2] px-4 py-3 text-sm text-[#231712] placeholder:text-[#5C473D]/60 focus:border-[#4A101D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#D7C9B4] pt-6 sm:flex-row sm:items-center">
                    <p className="text-xs text-[#5C473D]">
                      No deposit required for parties of 1–6. 24-hour notice appreciated for changes.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting || isMonday}
                      className="w-full bg-[#4A101D] px-8 py-3.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] disabled:opacity-50 sm:w-auto cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isSubmitting ? 'Confirming Table...' : 'Confirm Reservation'}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* Sidebar Info */}
            <Reveal
              delay={0.1}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:content-start"
            >
              <div className="border border-[#E8DFD1] bg-[#231712] p-7 text-[#FAF7F2]">
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#E4C98D]">
                  Dining Guidelines
                </p>
                <h3 className="mt-2 font-serif text-xl font-medium">
                  Preparing for Your Evening
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[#E8DFD1]">
                  <li>
                    <span className="block font-medium text-[#FAF7F2]">Attire</span>
                    Smart evening attire is kindly requested. Jackets are welcomed but not required.
                  </li>
                  <li>
                    <span className="block font-medium text-[#FAF7F2]">Tasting Pace</span>
                    Please allow 2.5 to 3 hours for our Nine-Course Grand Tasting experience.
                  </li>
                  <li>
                    <span className="block font-medium text-[#FAF7F2]">Corkage Policy</span>
                    $65 per 750ml bottle for vintages not currently represented on our cellar list (limit two bottles per table).
                  </li>
                </ul>
              </div>

              <div className="border border-[#E8DFD1] bg-[#F4EFE6] p-7">
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#856629]">
                  Direct Concierge
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#5C473D]">
                  Need same-day seating assistance or celebrating a milestone evening? Speak directly with our host stand.
                </p>
                <p className="mt-4 font-serif text-lg font-medium text-[#231712] tabular-nums">
                  {RESTAURANT_INFO.phone}
                </p>
                <p className="text-sm text-[#4A101D]">{RESTAURANT_INFO.conciergeEmail}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
