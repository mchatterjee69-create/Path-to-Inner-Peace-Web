import React from 'react';

interface AppDownloadSectionProps {
  className?: string;
}

// Crisp official Apple SVG Icon
const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.03-.5 2.64-1.24z"/>
  </svg>
);

// Crisp official Android Robot SVG Icon
const AndroidIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true"
  >
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1523-.5676.416.416 0 00-.5676.1523l-2.0223 3.503C15.5902 8.4126 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2876-5.1366.8249L4.8411 5.4469a.416.416 0 00-.5676-.1523.416.416 0 00-.1523.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.741h24c-.3432-4.0821-2.6889-7.5543-6.1185-9.4196"/>
  </svg>
);

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ className = '' }) => {
  const qrImageUrl = 'https://www.image2url.com/r2/default/images/1790253932350-c6d06baf-c9f8-44b0-b154-a7c17b06df8a.jpg';
  const downloadUrl = 'https://valid-plum-89rmn1tq.edgeone.dev/';

  return (
    <section 
      id="app-download-section"
      aria-label="Download Path to Inner Peace Mobile App"
      className={`w-full bg-white py-4 sm:py-6 ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto px-4 text-center">
        {/* Title with Android & iOS Icons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <h3 className="font-heading text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
            Now <span className="text-[#0B6B53]">Path to Inner Peace</span> is available on
          </h3>

          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-full shadow-xs">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800">
              <AndroidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DDC84]" />
              <span className="text-emerald-800">Android</span>
            </span>
            <span className="text-slate-300 font-light">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800">
              <AppleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
              <span>iOS</span>
            </span>
          </div>
        </div>

        {/* Prompt */}
        <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-2 mb-3">
          Click to download &amp; install:
        </p>

        {/* Simple QR Image (No download button) */}
        <div className="flex justify-center">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to download & install"
            className="inline-block group cursor-pointer"
          >
            <div className="p-1 bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200">
              <img
                src={qrImageUrl}
                alt="Scan QR code or click to download and install Path to Inner Peace on Android and iOS"
                className="w-40 sm:w-48 h-auto object-contain rounded-lg block"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
