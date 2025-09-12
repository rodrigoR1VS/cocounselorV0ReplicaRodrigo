'use client';
import { FIRM_MANAGEMENT_FAQ_CONTENT } from '@/constants/content';
import { useState } from 'react';

const FirmManagementFAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item is always open

  const toggleItem = (index: number) => {
    if (FIRM_MANAGEMENT_FAQ_CONTENT.QUESTIONS[index].IS_ALWAYS_OPEN) return;
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="pt-12 pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex items-start">
            <h2 className="text-gray-900 leading-tight" style={{fontSize: '36px'}}>
              {FIRM_MANAGEMENT_FAQ_CONTENT.TITLE.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < FIRM_MANAGEMENT_FAQ_CONTENT.TITLE.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <div className="space-y-0">
            {FIRM_MANAGEMENT_FAQ_CONTENT.QUESTIONS.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left py-6 ${
                    item.IS_ALWAYS_OPEN ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                  } flex justify-between items-start`}
                >
                  <h3 className="text-gray-900" style={{fontSize: '18px'}}>
                    {item.QUESTION}
                  </h3>
                </button>
                {(openItems.includes(index) || item.IS_ALWAYS_OPEN) && (
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

export default FirmManagementFAQSection;
