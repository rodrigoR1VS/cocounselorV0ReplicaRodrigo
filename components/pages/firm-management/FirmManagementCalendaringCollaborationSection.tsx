import { FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT } from '@/constants/content';
import Image from 'next/image';

const FirmManagementCalendaringCollaborationSection = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Calendaring */}
          <div className="relative flex flex-col p-8 rounded-lg overflow-hidden min-h-[500px]">
            {/* Color Background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.BACKGROUND_COLOR }}
            ></div>

            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.BACKGROUND_IMAGE}
                alt="Calendar interface"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight">
                {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.TITLE}{' '}
                <span className="text-white font-bold">
                  {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.TITLE_HIGHLIGHT}
                </span>
              </h2>
              <p className="text-white leading-tight text-center" style={{fontSize: '14px'}}>
                {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.DESCRIPTION.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.LEFT_SECTION.DESCRIPTION.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Right Section - Collaboration */}
          <div className="relative flex flex-col p-8 rounded-lg overflow-hidden min-h-[500px]">
            {/* Color Background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.BACKGROUND_COLOR }}
            ></div>

            {/* Title */}
            <div className="relative z-10 mb-6 text-center">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight">
                {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.TITLE}{' '}
                <span className="font-bold" style={{ color: '#00AAFF' }}>
                  {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.TITLE_HIGHLIGHT}
                </span>{' '}
                {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.TITLE_END}
              </h2>
            </div>

            {/* Image between title and description */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
              <Image
                src={FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.BACKGROUND_IMAGE}
                alt="Collaboration interface"
                fill
                className="object-cover"
              />
            </div>

            {/* Description */}
            <div className="relative z-10">
              <p className="text-gray-700 leading-tight text-center" style={{fontSize: '14px'}}>
                {FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.DESCRIPTION.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < FIRM_MANAGEMENT_CALENDARING_COLLABORATION_CONTENT.RIGHT_SECTION.DESCRIPTION.split('\n').length - 1 && <br />}
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

export default FirmManagementCalendaringCollaborationSection;
