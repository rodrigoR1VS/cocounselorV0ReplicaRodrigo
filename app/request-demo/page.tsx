import { REQUEST_DEMO_CONTENT } from '@/constants/content';
import Image from 'next/image';
import Script from 'next/script';

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/BackgroundRequestADemo.svg"
          alt="Request Demo Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logoRequestADemo.svg"
            alt="CoCounselor Logo"
            style={{width: '270px', height: '52px'}}
            className="object-contain"
          />
        </div>
        
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Section - Gray Background with Demo Information */}
          <div className="bg-gray-100 px-12 pt-0 pb-8 flex flex-col justify-center">
            <div className="text-gray-800">
              <h2 className="mb-4 pt-10 md:pt-0" style={{fontSize: '18px', color: '#00AAFF'}}>
                {REQUEST_DEMO_CONTENT.LEFT_SECTION.SUBTITLE}
              </h2>
              
              <h1 className="mb-6 leading-tight text-gray-800 pb-10 text-[32px] md:text-[42px]">
                {REQUEST_DEMO_CONTENT.LEFT_SECTION.TITLE.split('free demo session').map((part, index) => (
                  <span key={index}>
                    {part}
                    {index === 0 && <span className="font-bold" style={{color: '#00AAFF'}}>free demo session</span>}
                  </span>
                ))}
              </h1>
              {/* Benefits List */}
              <div className="space-y-6 mb-20">
                {REQUEST_DEMO_CONTENT.LEFT_SECTION.BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/check_circle.svg"
                        alt="Check"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="text-gray-700" style={{fontSize: '16px'}}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-6">
                {REQUEST_DEMO_CONTENT.LEFT_SECTION.BADGES.map((badge, index) => (
                  <img 
                    key={index}
                    src={badge.src} 
                    alt={badge.alt} 
                    className="object-contain w-[91px] h-[72px] md:w-[138px] md:h-[108px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - White Background with HubSpot Form */}
          <div className="bg-white p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* HubSpot Form */}
              <div 
                className="hs-form-frame" 
                data-region="na2" 
                data-form-id="38259c81-89bc-45d5-b095-24ba291fa181" 
                data-portal-id="242352326"
              ></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* HubSpot Form Script */}
      <Script 
        src="https://js-na2.hsforms.net/forms/embed/242352326.js" 
        strategy="lazyOnload"
      />
    </div>
  )
}
