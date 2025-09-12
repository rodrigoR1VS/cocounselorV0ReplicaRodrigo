import Image from 'next/image';

const CaseManagementFeaturesBanner = () => {
  return (
    <div className="w-full">
      <Image
        src="/BannerCaseManagementFeatures.svg"
        alt="Case Management Features Banner"
        width={1920}
        height={200}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
};

export default CaseManagementFeaturesBanner;
