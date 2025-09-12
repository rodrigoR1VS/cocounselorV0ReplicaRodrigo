import { INTAKE_MANAGEMENT_BANNER_CONTENT } from '@/constants/content';
import Image from 'next/image';

const IntakeManagementBanner = () => {
  return (
    <div className="pt-8 pb-20 relative h-[740px] lg:h-[800px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/intakeBackgorund.svg"
          alt="Intake Management Background"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Text Content */}
          <div className="mb-12">
            <h2 className="text-sm md:text-base font-semibold mb-4 pt-8" style={{ color: '#00AAFF' }}>
              {INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.SUBTITLE}
            </h2>
            <h1 className="text-[42px] md:text-[52px] text-gray-900 leading-tight">
              {INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE.split('\n').map((line, index) => (
                <span key={index}>
                  {line.split(INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT).map((part, partIndex) => (
                    <span key={partIndex}>
                      {part}
                      {partIndex === 0 && line.includes(INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT) && (
                        <span className="font-bold" style={{ color: '#00AAFF' }}>
                          {INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT}
                        </span>
                      )}
                    </span>
                  ))}
                  {index < INTAKE_MANAGEMENT_BANNER_CONTENT.LEFT_SECTION.TITLE.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>


                
        </div>
      </div>
      </div>
    </div>
  );
};

export default IntakeManagementBanner;
