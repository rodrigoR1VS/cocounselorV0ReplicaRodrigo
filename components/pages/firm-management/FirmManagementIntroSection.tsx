import { FIRM_MANAGEMENT_INTRO_CONTENT } from '@/constants/content';

const FirmManagementIntroSection = () => {
  return (
    <div 
      className="py-12"
      style={{ backgroundColor: FIRM_MANAGEMENT_INTRO_CONTENT.BACKGROUND_COLOR }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {FIRM_MANAGEMENT_INTRO_CONTENT.PARAGRAPHS.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FirmManagementIntroSection;
