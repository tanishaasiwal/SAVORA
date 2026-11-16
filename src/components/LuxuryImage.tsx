import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface LuxuryImageProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  priority?: boolean;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = 'object-center',
  fallbackTitle = 'SAVORA',
  fallbackSubtitle = 'Culinary Atelier',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#29070F] via-[#231712] to-[#160E0B] p-6 text-center ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-[#C5A059]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,160,89,0.14),transparent_65%)]"
        />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border border-[#C5A059]/45 text-[#E4C98D]">
            <Utensils className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-serif text-lg tracking-wide text-[#FAF7F2]">
            {fallbackTitle}
          </span>
          <span className="text-xs tracking-[0.18em] uppercase text-[#D1B06B]">
            {fallbackSubtitle}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#231712] ${className}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#231712] to-[#36251E]"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
