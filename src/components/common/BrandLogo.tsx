import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  showSubtitle?: boolean;
  variant?: 'full' | 'compact';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showLogo = true,
  showSubtitle = true,
  variant = 'full'
}) => {
  const imgHeights = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12'
  };

  const textSizes = {
    sm: 'text-sm font-black',
    md: 'text-base sm:text-lg font-black',
    lg: 'text-xl font-black'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Kolibri Logo Asset with crisp contrast container */}
      {showLogo && (
        <div className="bg-white rounded-lg p-1 sm:p-1.5 border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-center justify-center shrink-0">
          <img
            src="/assets/aistudio/KOLIBRI_c7902324.png"
            alt="Kolibri Media & IT Consultant"
            className={`${imgHeights[size]} w-auto object-contain`}
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight leading-none">
            <span className={`${textSizes[size]} text-red-600 dark:text-red-500 font-black tracking-tight`}>
              KOLIBRINEST.ID
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-0.5">
              Media & IT Consultant
            </span>
          )}
        </div>
      )}
    </div>
  );
};
