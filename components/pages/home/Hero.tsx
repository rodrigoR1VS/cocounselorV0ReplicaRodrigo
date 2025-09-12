import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HERO_CONTENT } from '@/constants/content';

const Hero = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 lg:h-[800px] lg:pt-[100px]">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/cocounselorBKG+dark.png"
          alt="CoCounselor Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/HomeHeroDesktop.svg"
          alt="CoCounselor Background Desktop"
          fill
          className="object-cover object-[center_80%]"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Text Content - First on mobile, left on desktop */}
          <div className="space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 order-1">
            {/* Powered By Image */}
            <div className="mb-4">
              <Image
                src="/poweredBy.png"
                alt="Powered By"
                width={200}
                height={60}
                className="h-auto"
                priority
              />
            </div>
            
            <h1 className="text-white leading-tight" style={{fontSize: '36px'}}>
              Empowering Law<br />
              Firms With <span className="font-bold text-cyan-400">Tailored</span><br />
              <span className="font-bold text-cyan-400">Solutions</span>
            </h1>
            
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mt-4"
              dangerouslySetInnerHTML={{ __html: HERO_CONTENT.SUBTITLE }}
            />
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
              <Link href="/request-demo">
                <button className="text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90 transition-colors shadow-lg w-full sm:w-auto" style={{backgroundColor: '#69D4FF'}}>
                  {HERO_CONTENT.CTA_BUTTON}
                </button>
              </Link>
              <Link href="/request-demo">
                <button className="bg-transparent border-2 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto" style={{borderColor: '#69D4FF'}}>
                  Contact Sales
                </button>
              </Link>
            </div>
            
          </div>
          
          {/* Image - Second on mobile, right on desktop */}
          <div className="relative order-2 lg:order-2 flex justify-center lg:justify-end">
            <Image
              src="/Group20.png"
              alt="Modern Legal Dashboard"
              width={1000}
              height={750}
              className="w-full h-auto scale-100 md:scale-75 lg:scale-110 translate-x-0 sm:translate-x-12 md:-translate-x-16 lg:translate-x-8 relative -mb-24 sm:-mb-32 lg:mb-0 lg:hidden"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
