import Link from 'next/link';

/**
 * PricingCards component that displays the pricing plans
 * 
 * Features:
 * - Standard and Enterprise pricing cards
 * - Feature lists with checkmark icons
 * - Get Started buttons linking to demo request
 * - Responsive grid layout
 * - Consistent styling and spacing
 * 
 * @returns {JSX.Element} The pricing cards section
 */
const PricingCards = () => {
  const checkIcon = (
    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
      {/* Standard Plan */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">$199</div>
          <div className="text-gray-600 mb-2">user/month</div>
          <p className="text-gray-600 mb-2">Get the basics you need</p>
          <div className="text-sm text-gray-500 uppercase">BILLED ANNUALLY</div>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Case Management</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Contact/Client Relationship Management</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Firm Analytics</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">File storage</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Document generation</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Calendar (Gmail & Outlook integration)</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Marketing & Referral Tracking</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Custom fields & page layouts</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Intake management</span>
          </li>
        </ul>
        <Link href="/request-demo">
          <button className="w-full bg-gradient-to-b from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg">
            Get Started
          </button>
        </Link>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl text-blue-500 mr-2">∞</span>
            <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">$299</div>
          <div className="text-gray-600 mb-2">user/month</div>
          <p className="text-gray-600 mb-2">For teams with more needs</p>
          <div className="text-sm text-gray-500 uppercase">BILLED ANNUALLY</div>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Everything in Standard plus</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Custom workflows & automation</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Unlimited file storage</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">Call Tracking & Lead Generation</span>
          </li>
          <li className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              {checkIcon}
            </div>
            <span className="text-gray-600">SMS/MMS Texting</span>
          </li>
        </ul>
        <Link href="/request-demo">
          <button className="w-full bg-gradient-to-b from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCards;
