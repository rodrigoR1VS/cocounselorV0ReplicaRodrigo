import React from 'react';
import Image from 'next/image';
import { INTEGRATIONS_CONTENT } from '@/constants/content';

const IntegrationsSection = () => {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden min-h-[673px] sm:h-[470px]" style={{background: 'linear-gradient(to right, #0097E5, #043C69)'}}>
      {/* Background Image Container - Desktop */}
      <div className="absolute inset-0 w-full hidden sm:block">
        <Image
          src={INTEGRATIONS_CONTENT.BACKGROUND_IMAGE}
          alt="Legal Office Background"
          fill
          className="object-cover w-full"
          priority
        />
      </div>
      
      {/* Background Image Container - Mobile */}
      <div className="absolute inset-0 w-full sm:hidden">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Group128Mobile.svg')`
          }}
        />
      </div>
      
      {/* Dark Overlay for better text readability - Desktop only */}
      <div className="absolute inset-0 bg-black/30 hidden sm:block"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24 h-full flex items-center sm:items-center pt-44 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column - Text and Icons */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left lg:pr-24">
            <h2 className="text-white leading-tight">
              <span className="sm:hidden" style={{fontSize: '36px'}}>
                Integrate<br />
                <span className="text-cyan-400 font-bold">CoCounselor</span> with all<br />
                the tools you already<br />
                love and use
              </span>
              <span className="hidden sm:block" style={{fontSize: '36px'}}>
                Integrate <span className="text-cyan-400 font-bold">CoCounselor</span> with all the tools you already love and use
              </span>
            </h2>
            
            <div className="text-center" style={{paddingBottom: '50px'}}>
              <a 
                href="/request-demo" 
                className="text-white text-base sm:text-lg transition-all"
              >
                Get Started today →
              </a>
            </div>
            
            {/* Integration Icons */}
            <div className="flex flex-wrap gap-4 mt-6 lg:mt-8 justify-center lg:justify-start">
             
            </div>
          </div>
          
          {/* Right Column - Empty, background image shows the app screenshot */}
          <div className="relative">
            {/* The app screenshot is already in the background image */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
