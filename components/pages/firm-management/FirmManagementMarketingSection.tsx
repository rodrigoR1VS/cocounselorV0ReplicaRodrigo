import { FIRM_MANAGEMENT_MARKETING_CONTENT } from '@/constants/content';

const FirmManagementMarketingSection = () => {
  return (
    <div 
      className="py-12"
      style={{ backgroundColor: FIRM_MANAGEMENT_MARKETING_CONTENT.BACKGROUND_COLOR }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {FIRM_MANAGEMENT_MARKETING_CONTENT.TITLE}
        </h2>

        {/* Button */}
        <div className="text-center mb-6">
          <button className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-blue-500 hover:text-white transition-colors">
            {FIRM_MANAGEMENT_MARKETING_CONTENT.BUTTON_TEXT}
          </button>
        </div>

        {/* Description */}
        <p className="text-base text-gray-700 leading-relaxed mb-6 text-center">
          {FIRM_MANAGEMENT_MARKETING_CONTENT.DESCRIPTION}
        </p>

        {/* Bullet Points */}
        <ul className="mb-6 max-w-3xl mx-auto">
          {FIRM_MANAGEMENT_MARKETING_CONTENT.BULLET_POINTS.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-base text-gray-700">{point}</span>
            </li>
          ))}
        </ul>

        {/* Conclusion */}
        <p className="text-base text-gray-700 leading-relaxed text-center">
          {FIRM_MANAGEMENT_MARKETING_CONTENT.CONCLUSION}
        </p>
      </div>
    </div>
  );
};

export default FirmManagementMarketingSection;
