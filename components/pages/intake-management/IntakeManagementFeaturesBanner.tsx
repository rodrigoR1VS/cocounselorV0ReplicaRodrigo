import Image from 'next/image';

const IntakeManagementFeaturesBanner = () => {
  return (
    <div className="w-full">
      <Image
        src="/bannerFeaturesINtake.svg"
        alt="Intake Management Features Banner"
        width={1920}
        height={200}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
};

export default IntakeManagementFeaturesBanner;
