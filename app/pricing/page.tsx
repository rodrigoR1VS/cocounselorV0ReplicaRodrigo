import PricingHero from '@/components/pages/pricing/PricingHero';
import PricingBenefits from '@/components/pages/pricing/PricingBenefits';
import PricingFAQ from '@/components/pages/pricing/PricingFAQ';
import TransformingSection from '@/components/shared/TransformingSection';
import { PRICING_TRANSFORMING_SECTION_CONTENT } from '@/constants/content';

export default function PricingPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section with integrated pricing cards */}
      <PricingHero />

      {/* Benefits Section */}
      <PricingBenefits />

      {/* FAQ Section */}
      <PricingFAQ />

      {/* Transforming Section */}
      <TransformingSection 
        titlePart1={PRICING_TRANSFORMING_SECTION_CONTENT.TITLE_PART1}
        titleHighlight={PRICING_TRANSFORMING_SECTION_CONTENT.TITLE_HIGHLIGHT}
        titlePart2={PRICING_TRANSFORMING_SECTION_CONTENT.TITLE_PART2}
        twoButtons={PRICING_TRANSFORMING_SECTION_CONTENT.TWO_BUTTONS}
        buttonText={PRICING_TRANSFORMING_SECTION_CONTENT.BUTTON_TEXT}
        buttonLink={PRICING_TRANSFORMING_SECTION_CONTENT.BUTTON_LINK}
        isDesktopOnly={PRICING_TRANSFORMING_SECTION_CONTENT.IS_DESKTOP_ONLY}
      />
    </div>
  )
}
