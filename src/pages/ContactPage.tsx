import React, { useEffect, useState } from 'react';
import { Check, CheckCircle2, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { DistrictMap } from '../components/DistrictMap';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { Reveal } from '../components/Reveal';
import { useRouter } from '../context/RouterContext';
import { RESTAURANT_INFO, SAVORA_IMAGES } from '../data/savoraData';

interface EnquiryState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ENQUIRY_TOPICS = [
  'General Hospitality Enquiry',
  'Private Dining — The Burgundy Salon',
  'Private Dining Group Booking',
  'Dietary & Allergen Consultation',
  'Cellar & Sommelier Requests',
  'Press & Media',
];

export const ContactPage: React.FC = () => {
  const { navState } = useRouter();

  const [form, setForm] = useState<EnquiryState>({
    name: '',
    email: '',
    subject: navState.prefillEnquirySubject || ENQUIRY_TOPICS[0],
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    if (navState.prefillEnquirySubject) {
      setForm((prev) => ({
        ...prev,
        subject: navState.prefillEnquirySubject!,
      }));
    }
  }, [navState.prefillEnquirySubject]);

  const handleCopyAddress = async () => {
    const text = `${RESTAURANT_INFO.addressLine1}, ${RESTAURANT_INFO.addressLine2}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2400);
    } catch {
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2400);
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof EnquiryState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      next.message = 'Please share a brief message (at least 12 characters).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 550);
  };

  return (
    <div className="pt-[72px]">
      {/* Page Header */}
      <PageHeroBanner
        image={SAVORA_IMAGES.contactCourtyardDesktop}
        mobileImage={SAVORA_IMAGES.contactCourtyardMobile}
        imgClassName="object-[center_42%] md:object-center"
        imageAlt="Twilight view of SAVORA's 1924 brick carriage house courtyard entrance in Mercer Courtyard"
        eyebrow="Location & Concierge"
        title="Visit SAVORA in Mercer Courtyard"
        description="Reach our dining room concierge for private salon bookings, dietary consultations, or arrival details."
      />

      {/* Details & Hours + Interactive District Map */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            {/* Contact & Hours */}
            <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-start lg:gap-8">
              <div className="border border-[#E8DFD1] bg-[#F4EFE6] p-7">
                <h2 className="font-serif text-2xl font-medium text-[#231712]">
                  Address &amp; Direct Lines
                </h2>
                <div className="mt-5 space-y-4 text-sm text-[#5C473D]">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#4A101D]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-[#231712]">
                        {RESTAURANT_INFO.addressLine1}
                      </p>
                      <p>{RESTAURANT_INFO.addressLine2}</p>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#4A101D] hover:text-[#856629] cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            Address Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            Copy Street Address
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#4A101D]"
                      aria-hidden="true"
                    />
                    <div className="tabular-nums">
                      <p className="font-medium text-[#231712]">
                        {RESTAURANT_INFO.phone}
                      </p>
                      <p className="text-xs">Concierge desk answered Tue–Sun from 11:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#4A101D]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-[#231712]">
                        {RESTAURANT_INFO.conciergeEmail}
                      </p>
                      <p className="text-xs">Private Events: {RESTAURANT_INFO.eventsEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border border-[#E8DFD1] bg-[#F4EFE6] p-7">
                <h2 className="font-serif text-2xl font-medium text-[#231712]">
                  Hours of Service
                </h2>
                <div className="mt-5 divide-y divide-[#E8DFD1]">
                  {RESTAURANT_INFO.hours.map((row) => (
                    <div
                      key={`${row.days}-${row.service}`}
                      className="flex items-start justify-between gap-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-[#231712]">{row.days}</p>
                        <p className="text-xs text-[#5C473D]">{row.service}</p>
                      </div>
                      <span className="text-right font-medium text-[#4A101D] tabular-nums whitespace-nowrap">
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Redesigned Interactive Architectural Map */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <DistrictMap />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="border-t border-[#E8DFD1] bg-[#F4EFE6] py-16 md:py-24 lg:py-28">
        <Reveal className="mx-auto w-full max-w-[960px] px-6 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#856629]">
              Write to Our Concierge
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight font-medium text-[#231712] md:text-4xl lg:text-5xl">
              Hospitality &amp; Private Event Enquiries
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5C473D] md:text-base lg:text-lg">
              Our Guest Relations team responds to all private salon, menu, and press enquiries within one business day.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 border border-[#C5A059] bg-[#FAF7F2] p-8 text-center">
              <CheckCircle2
                className="mx-auto h-8 w-8 text-[#4A101D]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-2xl font-medium text-[#231712]">
                Enquiry Received
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#5C473D]">
                Thank you, {form.name}. Your message regarding{' '}
                <span className="font-medium text-[#231712]">{form.subject}</span>{' '}
                has been routed to our concierge desk. We will reply to {form.email} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: '',
                    email: '',
                    subject: ENQUIRY_TOPICS[0],
                    message: '',
                  });
                }}
                className="mt-6 bg-[#4A101D] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] cursor-pointer"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 border border-[#E8DFD1] bg-[#FAF7F2] p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enq-name"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                  >
                    Your Name
                  </label>
                  <input
                    id="enq-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Julian Mercer"
                    className="mt-2 w-full border border-[#D7C9B4] bg-white px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enq-email"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                  >
                    Email Address
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@domain.com"
                    className="mt-2 w-full border border-[#D7C9B4] bg-white px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="enq-subject"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                  >
                    Enquiry Topic
                  </label>
                  <select
                    id="enq-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="mt-2 w-full border border-[#D7C9B4] bg-white px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                  >
                    {ENQUIRY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="enq-message"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#231712]"
                  >
                    Message
                  </label>
                  <textarea
                    id="enq-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Share your preferred dates, guest count, or questions for our kitchen and cellar teams..."
                    className="mt-2 w-full border border-[#D7C9B4] bg-white px-4 py-3 text-sm text-[#231712] focus:border-[#4A101D] focus:outline-none"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#631829]">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#4A101D] px-8 py-3.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#3D0C17] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </div>
  );
};
