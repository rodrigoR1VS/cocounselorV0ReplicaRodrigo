import { INTAKE_MANAGEMENT_LEAD_NURTURE_CONTENT } from '@/constants/content';
import Image from 'next/image';

const IntakeManagementLeadNurtureSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center">
          {/* Mobile: Image first, Desktop: Text first */}
          <div className="flex flex-col justify-center items-center lg:order-2">
            <div className='hidden lg:block h-[120px]'></div>
             <div className="relative">
              <Image
                src="/newRightColumnIntake.svg"
                alt="Intake Management Interface"
                width={1000}
                height={800}
                className="w-full lg:w-[150%] h-auto object-contain lg:transform lg:scale-125 lg:mr-[-180px]"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:order-1">
            {/* Main Title */}
            <h2 className="text-gray-900 leading-tight mb-12 text-[32px] lg:text-[42px]">
              {INTAKE_MANAGEMENT_LEAD_NURTURE_CONTENT.LEFT_SECTION.TITLE}{' '}
              <span className="font-bold" style={{ color: '#00AAFF' }}>
                {INTAKE_MANAGEMENT_LEAD_NURTURE_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT}
              </span>{' '}
              {INTAKE_MANAGEMENT_LEAD_NURTURE_CONTENT.LEFT_SECTION.TITLE_END}
            </h2>

            {/* Features */}
            <div className="space-y-6 relative">
              {/* Continuous blue line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
              
              {INTAKE_MANAGEMENT_LEAD_NURTURE_CONTENT.LEFT_SECTION.FEATURES.map((feature, index) => (
                <div key={index} className="flex">
                  <div className="w-4 flex-shrink-0"></div>
                  <div className="pl-[20px] pr-[20px] lg:pr-[200px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.TITLE}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.DESCRIPTION}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeManagementLeadNurtureSection;
