import FeaturesSection from '@/components/shared/FeaturesSection';
import { FIRM_MANAGEMENT_FEATURES_CONTENT } from '@/constants/content';

const FirmManagementFeaturesSection = () => {
  return (
    <FeaturesSection 
      features={FIRM_MANAGEMENT_FEATURES_CONTENT.FEATURES}
      showDividers={true}
    />
  );
};

export default FirmManagementFeaturesSection;
