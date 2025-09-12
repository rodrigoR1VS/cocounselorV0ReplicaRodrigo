import Image from 'next/image';

const FirmManagementFeaturesBanner = () => {
  return (
    <div className="relative w-full h-[90px] md:h-[68px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <Image
          src="/FirmManagementFeaturesBanner.svg"
          alt="Firm Management Features Banner"
          fill
          className="hidden md:block object-cover"
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/CaracteristicsMobileFirm.svg"
          alt="Firm Management Features Mobile Banner"
          fill
          className="block md:hidden object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default FirmManagementFeaturesBanner;
