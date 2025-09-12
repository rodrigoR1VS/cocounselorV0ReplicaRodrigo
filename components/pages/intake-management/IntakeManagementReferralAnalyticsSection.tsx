import { INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT } from '@/constants/content';
import Image from 'next/image';

const IntakeManagementReferralAnalyticsSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Referral Channels */}
          <div className="relative flex flex-col p-8 rounded-lg overflow-hidden min-h-[600px]">
            {/* Color Background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: '#00AAFF' }}
            ></div>

            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.LEFT_SECTION.BACKGROUND_IMAGE}
                alt="Referral channels background"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 mb-8 text-center">
              <h2 className="mb-6 pt-2 lg:pt-8 leading-tight text-[32px] lg:text-[32px]">
                {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.LEFT_SECTION.TITLE}{' '}
                <span className="text-white font-bold">
                  {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT}
                </span>
              </h2>
              <p className="text-white leading-relaxed" style={{fontSize: '14px'}}>
                {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.LEFT_SECTION.DESCRIPTION.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.LEFT_SECTION.DESCRIPTION.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Right Section - Detailed Reports */}
          <div className="relative flex flex-col p-8 rounded-lg overflow-hidden min-h-[600px]">
            {/* Color Background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.BACKGROUND_COLOR }}
            ></div>

            {/* Content */}
            <div className="relative z-10 mb-8 text-center">
              <h2 className="mb-6 pt-2 lg:pt-8 leading-tight text-[32px] lg:text-[32px]">
                {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.TITLE}{' '}
                <span className="font-bold" style={{ color: '#00AAFF' }}>
                  {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.TITLE_HIGHLIGHT}
                </span>{' '}
                {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.TITLE_END}
              </h2>
             
            </div>

            {/* Image below text */}
            <div className="relative w-full rounded-lg overflow-hidden mb-6" style={{height: '345px'}}>
              <Image
                src={INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.BACKGROUND_IMAGE}
                alt="Detailed reports interface"
                fill
                className="object-cover"
              />
            </div>

            {/* Additional text below image */}
            <div className="relative z-10 text-center">
              <p className="text-gray-700 leading-relaxed" style={{fontSize: '14px'}}>
                {INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.DESCRIPTION.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < INTAKE_MANAGEMENT_REFERRAL_ANALYTICS_CONTENT.RIGHT_SECTION.DESCRIPTION.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeManagementReferralAnalyticsSection;
