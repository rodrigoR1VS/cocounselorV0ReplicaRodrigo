'use client';
import Link from 'next/link';
import { TRANSFORMING_SECTION_CONTENT } from '@/constants/content';

interface TransformingSectionProps {
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  twoButtons?: boolean;
  buttonText?: string;
  buttonLink?: string;
  isDesktopOnly?: boolean;
}

const TransformingSection = ({
  titlePart1 = TRANSFORMING_SECTION_CONTENT.TITLE_PART1,
  titleHighlight = TRANSFORMING_SECTION_CONTENT.TITLE_HIGHLIGHT,
  titlePart2 = TRANSFORMING_SECTION_CONTENT.TITLE_PART2,
  twoButtons = true,
  buttonText = TRANSFORMING_SECTION_CONTENT.CTA_BUTTON,
  buttonLink = "/request-demo",
  isDesktopOnly = false
}: TransformingSectionProps) => {
  return (
    <div className="relative min-h-[720px] md:min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div 
          className="block md:hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/womanCommonMobile.svg)`
          }}
        />
        {/* Desktop Background */}
        <div 
          className="hidden md:block w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${TRANSFORMING_SECTION_CONTENT.BACKGROUND_IMAGE})`
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <h2 className="leading-tight mb-8 pt-[330px] md:pt-24 text-[42px] md:text-[53px]">
                <span className="md:hidden">
                  {TRANSFORMING_SECTION_CONTENT.TITLE_PART1}{' '}
                  <span className="font-bold" style={{color: '#00AAFF'}}>{TRANSFORMING_SECTION_CONTENT.TITLE_HIGHLIGHT}</span>
                  <br />
                  {TRANSFORMING_SECTION_CONTENT.TITLE_PART2}
                </span>
                <span className="hidden md:inline">
                  {isDesktopOnly ? titlePart1 : TRANSFORMING_SECTION_CONTENT.TITLE_PART1}{' '}
                  <span className="font-bold" style={{color: '#00AAFF'}}>
                    {isDesktopOnly ? titleHighlight : TRANSFORMING_SECTION_CONTENT.TITLE_HIGHLIGHT}
                  </span>
                  <br />
                  {isDesktopOnly ? titlePart2 : TRANSFORMING_SECTION_CONTENT.TITLE_PART2}
                </span>
              </h2>
              <div className={`flex flex-col md:flex-row gap-4`}>
                {/* Mobile buttons - always default */}
                <div className="md:hidden flex flex-col gap-4">
                  <Link href="/request-demo" className="w-full">
                    <button className="w-full text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:opacity-90" style={{backgroundColor: '#00AAFF'}}>
                      {TRANSFORMING_SECTION_CONTENT.CTA_BUTTON}
                    </button>
                  </Link>
                  <Link href="/request-demo" className="w-full">
                    <button className="w-full bg-white text-black border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:opacity-90">
                      Contact Sales
                    </button>
                  </Link>
                </div>
                
                {/* Desktop buttons - conditional */}
                <div className="hidden md:flex gap-4">
                  <Link href={isDesktopOnly ? buttonLink : "/request-demo"} className="w-auto">
                    <button className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:opacity-90" style={{backgroundColor: '#00AAFF'}}>
                      {isDesktopOnly ? buttonText : TRANSFORMING_SECTION_CONTENT.CTA_BUTTON}
                    </button>
                  </Link>
                  {(isDesktopOnly ? twoButtons : true) && (
                    <Link href="/request-demo" className="w-auto">
                      <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                        Contact Sales
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Side - Empty */}
            <div className="relative">
              {/* Empty column */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformingSection;
