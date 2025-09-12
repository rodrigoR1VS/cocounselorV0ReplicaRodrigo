import React from 'react';
import Image from 'next/image';
import { WHY_SECTION_CONTENT } from '@/constants/content';

const WhySection = () => {
  const features = WHY_SECTION_CONTENT.FEATURES;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24">
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4" style={{color: '#69D4FF'}}>
            Why CoCounselor?
          </h3>
          <h2 className="text-gray-900" style={{fontSize: '36px'}}>
            {WHY_SECTION_CONTENT.TITLE} <span style={{color: '#00A1E0'}}>{WHY_SECTION_CONTENT.TITLE_HIGHLIGHT}</span>
          </h2>
        </div>
        
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll">
            {/* Duplicate the features for seamless loop */}
            {[...features, ...features, ...features].map((feature, index) => (
              <div key={index} className="flex-shrink-0 w-64 sm:w-72 lg:w-80 mx-2 sm:mx-4">
                {/* Card with Image */}
                <div className="bg-gray-100 rounded-xl shadow-lg h-48 sm:h-56 lg:h-64 relative overflow-hidden mb-3 sm:mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className={feature.title === "Simplified Legal Document Management solutions" ? "object-contain" : "object-cover"}
                  />
                </div>
                
                {/* Text Outside Card */}
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm text-gray-900 px-2">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
