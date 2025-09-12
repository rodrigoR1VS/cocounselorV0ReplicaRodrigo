import { CONTACT_CONTENT } from '@/constants/content';

/**
 * ContactCards component that displays contact information cards
 * 
 * Features:
 * - Three contact method cards (phone, email, chat)
 * - Icons for each contact method
 * - Email and phone information
 * - Responsive grid layout
 * 
 * @returns {JSX.Element} The contact cards section
 */
const ContactCards = () => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'phone':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_CONTENT.CONTACT_CARDS.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-left border border-gray-100">
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 border-2 border-blue-200">
                {getIcon(card.ICON)}
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-blue-900 mb-6" style={{fontSize: '24px'}}>
                {card.TITLE}
              </h3>
              
              {/* Contact Information */}
              <div className="space-y-2">
                <p className="text-gray-700" style={{fontSize: '24px'}}>
                 <span className="text-blue-600">{card.EMAIL}</span>
                </p>
                {card.PHONE && (
                  <p className="text-gray-700" style={{fontSize: '24px'}}>
                   <span className="text-blue-600">{card.PHONE}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
