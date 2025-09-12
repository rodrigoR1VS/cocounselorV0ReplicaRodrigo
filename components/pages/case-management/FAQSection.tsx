'use client';

import { CASE_MANAGEMENT_FAQ_CONTENT } from '@/constants/content';
import { useState } from 'react';

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null); // Only tracks items 1+

  const toggleItem = (index: number) => {
    if (index === 0) return; // First item cannot be closed
    setOpenItem(prev => prev === index ? null : index); // Toggle between open/closed for items 1+
  };

  return (
    <div className="pt-20 pb-[10px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Title */}
          <div className="flex items-start justify-center md:justify-start">
            <h2 className="text-gray-900 leading-tight pt-[15px] md:pt-[25px] pl-0 md:pl-[100px] text-center md:text-left" style={{fontSize: '36px'}}>
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {CASE_MANAGEMENT_FAQ_CONTENT.QUESTIONS.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left py-6 ${
                    index === 0 ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                  } transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-gray-900 pr-4" style={{fontSize: '18px'}}>
                      {item.QUESTION}
                    </h3>
                  </div>
                </button>
                
                {(index === 0 || openItem === index) && (
                  <div className="pb-6">
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line" style={{fontSize: '14px'}}>
                      {item.ANSWER}
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

export default FAQSection;
