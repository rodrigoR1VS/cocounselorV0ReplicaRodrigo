import Link from 'next/link';
import { TRANSFORMING_SECTION_CONTENT } from '@/constants/content';

const HomeTransformingSection = () => {
  return (
    <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Group105.svg')`
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full pt-12 sm:pt-16 lg:pt-24">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24">
          <div className="text-center">
            {/* Text Content */}
            <h2 className="leading-tight mb-6 sm:mb-8 text-black" style={{fontSize: '53px'}}>
              Start <span className="font-bold" style={{color: '#00AAFF'}}>Transforming</span>
              <br />
              your practice today
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Link href="/request-demo">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg w-full sm:w-auto">
                  {TRANSFORMING_SECTION_CONTENT.CTA_BUTTON}
                </button>
              </Link>
              <Link href="/request-demo">
                <button className="bg-transparent border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
                  Contact Sales
                </button>
              </Link>
            </div>
            
            {/* Image below buttons */}
            <div className="flex justify-center relative -mb-16 sm:-mb-24 lg:-mb-32">
              <img 
                src="/Group33.png" 
                alt="Group 33" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTransformingSection;
