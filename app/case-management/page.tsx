import CaseManagementBanner from '@/components/pages/case-management/CaseManagementBanner';
import CaseManagementFeaturesBanner from '@/components/pages/case-management/CaseManagementFeaturesBanner';
import MasterOrganizationSection from '@/components/pages/case-management/MasterOrganizationSection';
import AutomateWorkflowsSection from '@/components/pages/case-management/AutomateWorkflowsSection';
import ClientEngagementDocumentHandlingSection from '@/components/pages/case-management/ClientEngagementDocumentHandlingSection';
import FAQSection from '@/components/pages/case-management/FAQSection';
import TransformingSection from '@/components/shared/TransformingSection';

export default function CaseManagementPage() {
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <CaseManagementBanner />
      
      {/* Features Banner */}
      <CaseManagementFeaturesBanner />
      
      {/* Master Organization Section */}
      <MasterOrganizationSection />
      
      {/* Automate Workflows Section */}
      <AutomateWorkflowsSection />
      
      {/* Client Engagement & Document Handling Section */}
      <ClientEngagementDocumentHandlingSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Transforming Section */}
      <TransformingSection />
      
      
    </div>
  )
}
