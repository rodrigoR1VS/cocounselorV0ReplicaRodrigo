import { FIRM_MANAGEMENT_BUSINESS_INSIGHTS_CONTENT } from '@/constants/content';
import Image from 'next/image';

const FirmManagementBusinessInsightsSection = () => {
  return (
    <div className="relative py-8 min-h-[773px] md:min-h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <Image
          src="/SvGGroupBckGround.svg"
          alt="Background"
          fill
          className="hidden md:block object-cover"
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/WomanAndManMobile.svg"
          alt="Mobile Background"
          fill
          className="block md:hidden object-cover"
          priority
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end lg:items-center min-h-[757px] md:min-h-[400px]">
          {/* Left Section - Text Content with UI Card */}
          <div className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 pt-[320px] lg:pt-8">

            {/* Content */}
            <div className="relative z-10 mb-8">
              <h2 className="font-normal mb-6 leading-tight text-white" style={{fontSize: '32px'}}>
                <span className="block">Track your firm's</span>
                <span className="block">performance and <span className="font-bold" style={{color: '#91DEF6'}}>gain</span></span>
                <span className="block font-bold" style={{color: '#91DEF6'}}>business insights</span>
              </h2>
              <p className="text-white leading-relaxed mb-6" style={{fontSize: '14px'}}>
                {FIRM_MANAGEMENT_BUSINESS_INSIGHTS_CONTENT.LEFT_SECTION.DESCRIPTION}
              </p>
              
              {/* Get Started Button */}
              <a 
                href="/request-demo"
                className="inline-block w-full md:w-auto text-center text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:opacity-90"
                style={{backgroundColor: '#00AAFF'}}
              >
                Get Started
              </a>
            </div>

          </div>

          {/* Right Section - Empty */}
          <div className="relative">
            {/* Empty space - background image shows through */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmManagementBusinessInsightsSection;
