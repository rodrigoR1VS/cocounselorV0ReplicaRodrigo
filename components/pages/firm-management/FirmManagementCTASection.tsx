import { FIRM_MANAGEMENT_CTA_CONTENT } from '@/constants/content';

const FirmManagementCTASection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Divider Line */}
        <div className="w-24 h-px bg-gray-400 mx-auto mb-12"></div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {FIRM_MANAGEMENT_CTA_CONTENT.TITLE}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto">
          {FIRM_MANAGEMENT_CTA_CONTENT.DESCRIPTION}
        </p>

        {/* CTA Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
          {FIRM_MANAGEMENT_CTA_CONTENT.BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};

export default FirmManagementCTASection;
