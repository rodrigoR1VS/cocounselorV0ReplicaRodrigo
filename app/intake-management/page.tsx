import TransformingSection from '@/components/shared/TransformingSection';
import IntakeManagementBanner from '@/components/pages/intake-management/IntakeManagementBanner';
import IntakeManagementFeaturesSection from '@/components/pages/intake-management/IntakeManagementFeaturesSection';
import IntakeManagementCTASection from '@/components/pages/intake-management/IntakeManagementCTASection';
import IntakeManagementFeaturesBanner from '@/components/pages/intake-management/IntakeManagementFeaturesBanner';
import IntakeManagementLeadNurtureSection from '@/components/pages/intake-management/IntakeManagementLeadNurtureSection';
import IntakeManagementOptimizeSection from '@/components/pages/intake-management/IntakeManagementOptimizeSection';
import IntakeManagementReferralAnalyticsSection from '@/components/pages/intake-management/IntakeManagementReferralAnalyticsSection';
import IntakeManagementFAQSection from '@/components/pages/intake-management/IntakeManagementFAQSection';

export default function IntakeManagementPage() {
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <IntakeManagementBanner />
      
      {/* Features Banner */}
      <IntakeManagementFeaturesBanner />

      {/* Lead Nurture Section */}
      <IntakeManagementLeadNurtureSection />

      {/* Optimize Section */}
      <IntakeManagementOptimizeSection />

      {/* Referral Analytics Section */}
      <IntakeManagementReferralAnalyticsSection />

      {/* FAQ Section */}
      <IntakeManagementFAQSection />
    
      {/* Transforming Section */}
      <TransformingSection />
    </div>
  )
}