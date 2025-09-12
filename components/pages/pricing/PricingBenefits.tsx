import { PRICING_BENEFITS_CONTENT } from '@/constants/content';

/**
 * PricingBenefits component that displays the benefits section
 * 
 * Features:
 * - Dynamic content from constants
 * - Title with highlighted text
 * - 3-column responsive grid
 * - Benefit items with titles and descriptions
 * - Gray background section
 * 
 * @returns {JSX.Element} The pricing benefits section
 */
const PricingBenefits = () => {
  return (
    <div className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[32px] md:text-[42px]">
            Get started quickly and start running your
            <br />
            firm efficiently with <span className="font-bold" style={{color: '#00AAFF'}}>CoCounselor</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-[159px]">
          {PRICING_BENEFITS_CONTENT.BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center w-full md:w-[286px] md:h-[134px] px-[50px] md:px-0"
            >
              <h3 className="font-bold text-gray-900 mb-4" style={{fontSize: '16px'}}>
                {benefit.title.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < benefit.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{fontSize: '14px'}}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingBenefits;
