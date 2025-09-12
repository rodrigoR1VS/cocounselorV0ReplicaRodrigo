import { MASTER_ORGANIZATION_CONTENT } from '@/constants/content';
import Image from 'next/image';

const MasterOrganizationSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-gray-900 leading-tight text-[32px] md:text-[42px]">
            Master Organization with
            <br />
            <span className="font-bold" style={{color: '#00AAFF'}}>Case Management</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTER_ORGANIZATION_CONTENT.FEATURES.map((feature, index) => (
            <div key={index} className="bg-transparent rounded-lg p-6 text-center">
              {/* Feature Image */}
              <div className="mb-6">
                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={feature.IMAGE}
                    alt={feature.ALT}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Feature Content */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3" style={{fontSize: '16px'}}>
                  {feature.TITLE}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '14px'}}>
                  {feature.DESCRIPTION}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterOrganizationSection;
