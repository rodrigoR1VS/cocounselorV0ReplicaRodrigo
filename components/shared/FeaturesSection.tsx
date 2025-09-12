/**
 * Interface for individual feature items
 */
interface Feature {
  TITLE: string;
  TITLE_HIGHLIGHT?: string;
  BUTTON_TEXT?: string;
  DESCRIPTION?: string;
  BULLET_POINTS?: string[];
  CONCLUSION?: string;
}

/**
 * Props for the FeaturesSection component
 */
interface FeaturesSectionProps {
  features: Feature[];
  showDividers?: boolean;
}

/**
 * Reusable FeaturesSection component for displaying features in a grid layout
 * 
 * Features:
 * - Responsive grid layout (1-4 columns based on screen size)
 * - Optional divider lines between features
 * - Support for highlighted titles
 * - Bullet points and descriptions
 * - Call-to-action buttons
 * 
 * @param {FeaturesSectionProps} props - Component props
 * @param {Feature[]} props.features - Array of feature objects to display
 * @param {boolean} [props.showDividers=true] - Whether to show divider lines between features
 * @returns {JSX.Element} The features section component
 */
const FeaturesSection = ({ features, showDividers = true }: FeaturesSectionProps) => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Horizontal divider line */}
          {showDividers && (
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
          )}

          {/* Vertical divider line */}
          {showDividers && (
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
          )}

          <div className={`grid grid-cols-1 ${features.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-8`}>
            {features.map((feature, index) => (
              <div key={index} className="pt-8 pb-12 px-8 relative">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {feature.TITLE}
                  {feature.TITLE_HIGHLIGHT && (
                    <span style={{ color: '#00AAFF' }}> {feature.TITLE_HIGHLIGHT}</span>
                  )}
                </h2>

                {/* Button */}
                {feature.BUTTON_TEXT && (
                  <div className="mb-6">
                    <button className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-blue-500 hover:text-white transition-colors">
                      {feature.BUTTON_TEXT}
                    </button>
                  </div>
                )}

                {/* Description */}
                {feature.DESCRIPTION && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {feature.DESCRIPTION}
                  </p>
                )}

                {/* Bullet Points */}
                {feature.BULLET_POINTS && (
                  <ul className="mb-6 space-y-2">
                    {feature.BULLET_POINTS.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Conclusion */}
                {feature.CONCLUSION && (
                  <p className="text-lg text-gray-700 leading-relaxed">
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

export default FeaturesSection;
