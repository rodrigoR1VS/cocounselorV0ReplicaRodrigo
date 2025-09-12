import Image from 'next/image';
import Link from 'next/link';

/**
 * PricingHero component that displays the hero section of the pricing page
 * 
 * Features:
 * - Main title with highlighted "Transparent" text
 * - Descriptive subtitle
 * - Pricing cards integrated in hero
 * - Background image without opacity (777px height)
 * - Centered layout
 * - Responsive typography
 * 
 * @returns {JSX.Element} The pricing hero section with integrated cards
 */
const PricingHero = () => {
  const checkIcon = (
    <Image
      src="/check_circle.svg"
      alt="Check"
      width={20}
      height={20}
    />
  );

  return (
    <div className="relative">
      {/* Background Image Section with integrated content */}
      <div className="relative min-h-[777px] pt-20">
        <div className="absolute inset-0">
          <Image
            src="/whiteBackground.svg"
            alt="Pricing Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Hero Text integrated with background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-medium mb-4" style={{color: '#00AAFF', fontSize: '18px'}}>CoCounselor Pricing</p>
            <h1 className="text-gray-900 mb-8 text-[42px] md:text-[52px] leading-tight">
              Simple and transparent <span style={{color: '#00AAFF'}}>pricing</span>
              <br />
              for your firm
            </h1>
          </div>
        </div>
      </div>

      {/* Pricing Cards positioned outside but overlapping */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{marginTop: '-450px', marginBottom: '-60px'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200" style={{height: '734px'}}>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-[30px]">
                <Image
                  src="/standardPricing.svg"
                  alt="Standard Plan"
                  width={166}
                  height={31.34}
                />
              </div>
              <div className="font-semibold text-gray-900" style={{fontSize: '50px'}}>$199</div>
              <div className="text-gray-600 mb-2" style={{fontSize: '18px'}}>user/month</div>
              <p className="text-gray-600 mb-2">Get the basics you need</p>
              <div className="text-gray-500 uppercase" style={{fontSize: '11px'}}>BILLED ANNUALLY</div>
            </div>
            <ul className="mb-8" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Case Management</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Contact & Client Relationship Management</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Firm Analytics</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>File storage</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Document generation</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Calendar (Gmail & Outlook integration)</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Intake management</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Custom fields & page layouts</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Marketing & Referral Tracking</span>
              </li>
            </ul>
            <Link href="/request-demo">
              <button 
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-80 transition-all shadow-lg relative overflow-hidden"
                style={{
                  backgroundImage: 'url(/ButtonBackGroundPricing.svg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                Get Started with Standard
              </button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200" style={{height: '579px'}}>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-[30px]">
                <Image
                  src="/premiumPricing.svg"
                  alt="Premium Plan"
                  width={162.08}
                  height={31.34}
                />
              </div>
              <div className="font-semibold text-gray-900" style={{fontSize: '50px'}}>$299</div>
              <div className="text-gray-600 mb-2" style={{fontSize: '18px'}}>user/month</div>
              <p className="text-gray-600 mb-2">For teams with more needs</p>
              <div className="text-gray-500 uppercase" style={{fontSize: '11px'}}>BILLED ANNUALLY</div>
            </div>
            <ul className="mb-8" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Everything in Standard plus</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Custom workflows & automation</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Unlimited file storage</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>Call Tracking & Lead Generation</span>
              </li>
              <li className="flex items-center">
                {checkIcon}
                <span className="text-gray-600 ml-3" style={{fontSize: '14px'}}>SMS/MMS Texting</span>
              </li>
            </ul>
            <Link href="/request-demo">
              <button 
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-80 transition-all shadow-lg relative overflow-hidden"
                style={{
                  backgroundImage: 'url(/ButtonBackGroundPricing.svg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                Upgrade to Premium
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
