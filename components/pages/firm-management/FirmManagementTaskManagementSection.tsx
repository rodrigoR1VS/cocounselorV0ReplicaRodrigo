import { FIRM_MANAGEMENT_TASK_MANAGEMENT_CONTENT } from '@/constants/content';
import Image from 'next/image';

const FirmManagementTaskManagementSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-gray-900 mb-16 text-center" style={{fontSize: '42px'}}>
          {FIRM_MANAGEMENT_TASK_MANAGEMENT_CONTENT.TITLE}{' '}
          <span className="font-bold" style={{ color: '#00AAFF' }}>
            {FIRM_MANAGEMENT_TASK_MANAGEMENT_CONTENT.TITLE_HIGHLIGHT}
          </span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FIRM_MANAGEMENT_TASK_MANAGEMENT_CONTENT.CARDS.map((card, index) => (
            <div key={index} className="bg-white overflow-hidden">
              {/* Card Image */}
              <div className="relative w-full h-80">
                <Image
                  src={card.IMAGE}
                  alt={card.TITLE}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center">
                <h3 className="text-gray-900 mb-3" style={{fontSize: '18px'}}>
                  {card.TITLE}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '14px'}}>
                  {card.DESCRIPTION}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirmManagementTaskManagementSection;
