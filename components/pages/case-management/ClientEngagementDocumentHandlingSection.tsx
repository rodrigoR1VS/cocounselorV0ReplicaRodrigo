import { CLIENT_ENGAGEMENT_DOCUMENT_HANDLING_CONTENT } from '@/constants/content';
import Image from 'next/image';

const ClientEngagementDocumentHandlingSection = () => {
  return (
    <div className="pt-12 pb-[10px] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Client Engagement */}
          <div className="relative flex flex-col pt-[17px] pb-8 px-8 md:p-8 rounded-lg overflow-hidden h-[532px] md:h-auto">
            {/* Color Background */}
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: '#00AAFF' }}
            ></div>
            
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={CLIENT_ENGAGEMENT_DOCUMENT_HANDLING_CONTENT.LEFT_SECTION.IMAGE}
                alt={CLIENT_ENGAGEMENT_DOCUMENT_HANDLING_CONTENT.LEFT_SECTION.ALT}
                fill
                className="object-cover transform translate-y-[42px] md:translate-y-0"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 mb-8 text-center">
              <h2 className="mb-6 leading-tight text-[32px] md:text-[32px]">
                Improve <span className="text-white font-bold">client engagement</span> with integrated communication tools
              </h2>
              <p className="text-white leading-relaxed" style={{fontSize: '14px'}}>
                {/* Mobile: no forced line breaks */}
                <span className="md:hidden">
                  Utilize SMS integration, email templates, and automated reminders to ensure prompt, consistent, and effective communication with clients, keeping them informed and engaged.
                </span>
                {/* Desktop: with forced line breaks */}
                <span className="hidden md:inline">
                  Utilize SMS integration, email templates, and automated reminders
                  <br />
                  to ensure prompt, consistent, and effective communication with
                  <br />
                  clients, keeping them informed and engaged.
                </span>
              </p>
            </div>
          </div>

          {/* Right Section - Document Handling */}
          <div className="flex flex-col bg-gray-100 p-8 rounded-lg text-center h-[532px] md:h-auto">
            <h2 className="text-gray-900 mb-6 leading-tight text-[32px] md:text-[32px]">
              Optimize your <span className="font-bold" style={{ color: '#00AAFF' }}>document handling</span> with smart, secure solutions
            </h2>
            
            {/* Image */}
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-6">
              <Image
                src={CLIENT_ENGAGEMENT_DOCUMENT_HANDLING_CONTENT.RIGHT_SECTION.IMAGE}
                alt={CLIENT_ENGAGEMENT_DOCUMENT_HANDLING_CONTENT.RIGHT_SECTION.ALT}
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-gray-600 leading-relaxed" style={{fontSize: '14px'}}>
              {/* Mobile: no forced line breaks */}
              <span className="md:hidden">
                Use smart documents to auto-fill case details and template automation to quickly generate essential paperwork. Securely store and organize files for easy access and enhanced productivity.
              </span>
              {/* Desktop: with forced line breaks */}
              <span className="hidden md:inline">
                Use smart documents to auto-fill case details and template
                <br />
                automation to quickly generate essential paperwork. Securely store
                <br />
                and organize files for easy access and enhanced productivity.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientEngagementDocumentHandlingSection;
