"use client";

import { useState } from 'react';
import { PRICING_FAQ_CONTENT } from '@/constants/content';

/**
 * PricingFAQ component that displays the FAQ section with interactive functionality
 * 
 * Features:
 * - Two-column layout (title left, FAQs right)
 * - Interactive FAQ items with expand/collapse
 * - Dynamic content from constants
 * - Always-open items support
 * - Hover effects and transitions
 * - Plus/minus toggle icons
 * 
 * @returns {JSX.Element} The pricing FAQ section
 */
const PricingFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // Only one FAQ open at a time

  const toggleFAQ = (index: number) => {
    if (PRICING_FAQ_CONTENT.FAQS[index].isAlwaysOpen) return;
    setOpenFAQ(prev => prev === index ? null : index);
  };

  return (
    <div className="bg-white pt-20 pb-[60px] md:pb-0" style={{marginBottom: '-20px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Title */}
          <div className="flex items-start">
            <h2 className="text-gray-900 leading-tight" style={{fontSize: '36px'}}>
              Frequently asked
              <br />
              questions
            </h2>
          </div>
          
          {/* Right Column - Questions and Answers */}
          <div className="space-y-0">
            {PRICING_FAQ_CONTENT.FAQS.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left py-6 ${
                    faq.isAlwaysOpen ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                  } flex justify-between items-center`}
                >
                  <h3 className="text-gray-900" style={{fontSize: '18px'}}>
                    {faq.question}
                  </h3>
                </button>
                {(openFAQ === index || faq.isAlwaysOpen) && (
                  <div className="pb-6">
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line" style={{fontSize: '14px'}}>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingFAQ;
