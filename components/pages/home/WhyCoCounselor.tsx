import React from 'react';
import Image from 'next/image';
import { WHY_COCOUNSELOR_CONTENT } from '@/constants/content';

const WhyCoCounselor = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {WHY_COCOUNSELOR_CONTENT.TITLE}
            </h2>
            <p className="text-xl text-white">
              {WHY_COCOUNSELOR_CONTENT.SUBTITLE}
            </p>
          </div>

          {/* Right Column - Video */}
          <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-lg">
              <iframe
                src="https://fast.wistia.net/embed/iframe/kvczyi86cz?seo=false&videoFoam=true&controlsVisibleOnLoad=false&playbar=false&smallPlayButton=false&volumeControl=false&fullscreenButton=false"
                title="Welcome to CoCounselor"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-64 md:h-80 lg:h-96"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCoCounselor;
