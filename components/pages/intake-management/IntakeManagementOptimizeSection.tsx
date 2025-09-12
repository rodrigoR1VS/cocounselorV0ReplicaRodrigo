import { INTAKE_MANAGEMENT_OPTIMIZE_CONTENT } from '@/constants/content';
import Image from 'next/image';

const IntakeManagementOptimizeSection = () => {
  return (
    <div style={{ backgroundColor: '#1B2C4B' }} className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-white leading-tight text-[32px] lg:text-[42px]">
            {INTAKE_MANAGEMENT_OPTIMIZE_CONTENT.TITLE}{' '}
            <span className="font-bold" style={{ color: '#69D4FF' }}>
              {INTAKE_MANAGEMENT_OPTIMIZE_CONTENT.TITLE_HIGHLIGHT}
            </span>
            {INTAKE_MANAGEMENT_OPTIMIZE_CONTENT.TITLE_END}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {INTAKE_MANAGEMENT_OPTIMIZE_CONTENT.FEATURES.map((feature, index) => (
            <div key={index} className="text-center">
              {/* UI Card */}
              <div className="bg-transparent rounded-lg mb-0 mx-auto" style={{width: '408px', height: '263px'}}>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={feature.UI_IMAGE}
                    alt={`${feature.TITLE} Interface`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="p-[50px] mx-auto text-center" style={{width: '408px', height: '92px'}}>
                {/* Title */}
                <h3 className="text-white font-semibold mb-2" style={{fontSize: '18px'}}>
                  {feature.TITLE}
                </h3>

                {/* Description */}
                <p className="leading-relaxed" style={{fontSize: '14px', color: '#B2BCC1'}}>
                  {feature.DESCRIPTION}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntakeManagementOptimizeSection;
