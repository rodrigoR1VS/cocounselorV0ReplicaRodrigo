import { INTAKE_MANAGEMENT_FEATURES_CONTENT } from '@/constants/content';

const IntakeManagementFeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Horizontal divider line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Vertical divider line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {INTAKE_MANAGEMENT_FEATURES_CONTENT.FEATURES.map((feature, index) => (
              <div key={index} className="p-8 relative">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {feature.TITLE}
              </h3>

              {/* Highlight Button */}
              <div className="mb-6">
                <span className="inline-block bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {feature.HIGHLIGHT}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {feature.DESCRIPTION}
              </p>

              {/* Bullet Points */}
              {feature.BULLET_POINTS && feature.BULLET_POINTS.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  {feature.BULLET_POINTS.map((point, pointIndex) => (
                    <li key={pointIndex} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Conclusion */}
              {feature.CONCLUSION && (
                <p className="text-gray-700 leading-relaxed">
                  {feature.CONCLUSION}
                </p>
              )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeManagementFeaturesSection;
