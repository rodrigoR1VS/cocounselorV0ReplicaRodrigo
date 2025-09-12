import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CALL_TO_ACTION_CONTENT } from '@/constants/content';

const CallToActionBanner = () => {
  return (
    <section className="relative py-64 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/SeeHowItWorks.png"
          alt="See How It Works"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {CALL_TO_ACTION_CONTENT.TITLE}{' '}
              <span className="text-blue-400">{CALL_TO_ACTION_CONTENT.TITLE_HIGHLIGHT}</span>
            </h2>
            
          </div>
          
          {/* Right Column - Empty for now, could add additional content */}
          <div className="relative">
            {/* This space is intentionally left for potential future content */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
