import { INTAKE_MANAGEMENT_CTA_CONTENT } from '@/constants/content';

const IntakeManagementCTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
          {INTAKE_MANAGEMENT_CTA_CONTENT.TITLE}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
          {INTAKE_MANAGEMENT_CTA_CONTENT.DESCRIPTION}
        </p>

        {/* CTA Button */}
        <div className="mb-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
            {INTAKE_MANAGEMENT_CTA_CONTENT.BUTTON_TEXT}
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-gray-600 text-base">
          {INTAKE_MANAGEMENT_CTA_CONTENT.FOOTER_TEXT}
        </p>
      </div>
    </div>
  );
};

export default IntakeManagementCTASection;
