import TransformingSection from '@/components/shared/TransformingSection';
import FirmManagementBanner from '@/components/pages/firm-management/FirmManagementBanner';
import FirmManagementIntroSection from '@/components/pages/firm-management/FirmManagementIntroSection';
import FirmManagementFeaturesSection from '@/components/pages/firm-management/FirmManagementFeaturesSection';
import FirmManagementTaskManagementSection from '@/components/pages/firm-management/FirmManagementTaskManagementSection';
import FirmManagementBusinessInsightsSection from '@/components/pages/firm-management/FirmManagementBusinessInsightsSection';
import FirmManagementCalendaringCollaborationSection from '@/components/pages/firm-management/FirmManagementCalendaringCollaborationSection';
import FirmManagementMarketingSection from '@/components/pages/firm-management/FirmManagementMarketingSection';
import FirmManagementCTASection from '@/components/pages/firm-management/FirmManagementCTASection';
import FirmManagementFeaturesBanner from '@/components/pages/firm-management/FirmManagementFeaturesBanner';
import FirmManagementFAQSection from '@/components/pages/firm-management/FirmManagementFAQSection';

export default function FirmManagementPage() {
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <FirmManagementBanner />

      {/* Features Banner */}
      <FirmManagementFeaturesBanner />
      {/* Task Management Section */}
      <FirmManagementTaskManagementSection />
      {/* Business Insights Section */}
      <FirmManagementBusinessInsightsSection />

      {/* Calendaring & Collaboration Section */}
      <FirmManagementCalendaringCollaborationSection />

      {/* FAQ Section */}
      <FirmManagementFAQSection />
      
      {/* Transforming Section */}
      <TransformingSection />
    </div>
  )
}