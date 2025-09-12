"use client";

import React, { useState, useEffect } from 'react';
import { HOME_FAQ_CONTENT, TESTIMONIAL_CAROUSEL_CONTENT } from '@/constants/content';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // Only one FAQ can be open at a time

  const toggleFAQ = (index: number) => {
    setOpenFAQ(prev => prev === index ? null : index);
  };

  const testimonials = TESTIMONIAL_CAROUSEL_CONTENT.TESTIMONIALS;

  // Auto-rotation removed - only manual navigation with arrows

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 sm:py-32 lg:py-40">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Group34BackGround.svg')`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24">
        {/* Testimonial Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors text-2xl sm:text-3xl lg:text-4xl"
            >
              ‹
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors text-2xl sm:text-3xl lg:text-4xl"
            >
              ›
            </button>

            {/* Testimonial Content */}
            <blockquote className="text-white leading-relaxed mb-6 sm:mb-8 px-4 sm:px-8 lg:px-16" style={{fontSize: '24px'}}>
              "{testimonials[currentTestimonial].quote.split('I haven\'t found anything comparable to CoCounselor')[0]}
              <span className="font-bold" style={{color: '#00A1E0'}}>I haven't found anything comparable to CoCounselor</span>
              {testimonials[currentTestimonial].quote.split('I haven\'t found anything comparable to CoCounselor')[1]}"
            </blockquote>
            
            <div className="text-white" style={{fontSize: '16px'}}>
              <p className="font-semibold">{testimonials[currentTestimonial].author}, <span className="text-blue-300">{testimonials[currentTestimonial].title}</span></p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
          {TESTIMONIAL_CAROUSEL_CONTENT.STATISTICS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                <div className="text-white text-4xl lg:text-[98px]">{stat.number}</div>
                <div className="text-blue-400 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl flex items-center justify-center">{stat.arrow}</div>
              </div>
              <div className="text-blue-300 whitespace-nowrap text-[10px] lg:text-[16px]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator Line - Full Width */}
      <div className="w-full h-px bg-white/10 mb-12 sm:mb-16 lg:mb-20"></div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24">
        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column - FAQ Title */}
          <div>
            <h2 className="text-white mb-6 sm:mb-8" style={{fontSize: '36px'}}>
              {HOME_FAQ_CONTENT.TITLE}<br />{HOME_FAQ_CONTENT.TITLE_SECOND_LINE}
            </h2>
          </div>

          {/* Right Column - FAQ Questions */}
          <div className="space-y-3 sm:space-y-4">
            {HOME_FAQ_CONTENT.FAQS.map((faq, index) => (
              <div key={index} className="border-b border-gray-600 pb-3 sm:pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-white text-base sm:text-lg hover:text-blue-300 transition-colors cursor-pointer"
                >
                  {faq.question}
                </button>
                
                {openFAQ === index && (
                  <div className="mt-3 sm:mt-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
