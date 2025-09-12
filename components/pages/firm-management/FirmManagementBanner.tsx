import { FIRM_MANAGEMENT_BANNER_CONTENT } from '@/constants/content';
import Image from 'next/image';

const FirmManagementBanner = () => {
  return (
    <div className="relative py-10 min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <Image
          src="/FirmManagementBanner.svg"
          alt="Firm Management Background"
          fill
          className="hidden md:block object-cover scale-105"
          style={{ objectPosition: 'center bottom' }}
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/FirmManagemetnMobileBanner.svg"
          alt="Firm Management Mobile Background"
          fill
          className="block md:hidden object-cover scale-105"
          style={{ objectPosition: 'center bottom' }}
          priority
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full">
          {/* Text Content - Left Aligned */}
          <div className="relative max-w-2xl">
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-sm md:text-base font-bold mb-4" style={{color: '#91DEF6'}}>
                {FIRM_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.SUBTITLE}
              </h2>
              <h1 className="text-white leading-tight font-normal" style={{fontSize: '42px'}}>
                {FIRM_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_PART1}
                <br />
                {FIRM_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_PART2}
                <br />
                <span className="font-bold" style={{color: '#91DEF6'}}>
                  {FIRM_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmManagementBanner;
