'use client';
import { INTAKE_MANAGEMENT_FAQ_CONTENT } from '@/constants/content';
import { useState } from 'react';

const IntakeManagementFAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null); // Only tracks items 1+

  const toggleItem = (index: number) => {
    if (index === 0) return; // First item cannot be closed
    setOpenItem(prev => prev === index ? null : index); // Toggle between open/closed for items 1+
  };

  return (
    <div className="pt-20 pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex items-start">
            <h2 className="leading-tight" style={{fontSize: '36px'}}>
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>
          <div className="space-y-0">
            {INTAKE_MANAGEMENT_FAQ_CONTENT.QUESTIONS.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left py-6 ${
                    index === 0 ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                  } flex justify-between items-center`}
                >
                  <h3 className="text-gray-900" style={{fontSize: '18px'}}>
                    {item.QUESTION}
                  </h3>
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

export default IntakeManagementFAQSection;
