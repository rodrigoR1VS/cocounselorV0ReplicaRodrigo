import { CASE_MANAGEMENT_BANNER_CONTENT } from '@/constants/content';
import Image from 'next/image';

const CaseManagementBanner = () => {
  return (
    <div className="min-h-[500px] md:min-h-[570px] w-full relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CaseManagementHeroBackground.svg"
          alt="Case Management Hero Background"
          fill
          className="object-cover object-left md:object-bottom"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[570px]">
            {/* Left Section - Text */}
            <div className="pt-[15px] md:pt-[100px] pb-12 px-12 flex flex-col justify-start">
              <div className="text-white">
                <h2 className="font-semibold mb-8 pt-2" style={{fontSize: '18px', color: '#012A48'}}>
                  {CASE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.SUBTITLE}
                </h2>
                
                <h1 className="leading-tight text-[42px] md:text-[52px]">
                  {CASE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE.split('Case Management').map((part, index) => (
                    <span key={index}>
                      {part}
                      {index === 0 && CASE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE.includes('Case Management') && (
                        <span className="font-bold" style={{color: '#012A48'}}>Case Management</span>
                      )}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Section - Empty */}
            <div className="flex items-center justify-center p-8">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseManagementBanner;
