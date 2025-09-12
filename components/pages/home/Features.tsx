"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURES_CONTENT } from '@/constants/content';

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setOpenFeature(prev => prev === index ? null : index);
  };

  // Function to get the correct route for each feature
  const getFeatureRoute = (title: string) => {
    switch (title) {
      case 'Firm Management':
        return '/firm-management';
      case 'Intake Management':
        return '/intake-management';
      case 'Case Management':
        return '/case-management';
      default:
        return '#';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-black mb-4" style={{fontSize: '36px'}}>
            Custom workflows created specifically<br />
            for <span className="font-bold" style={{color: '#00A1E0'}}>Personal Injury</span> Law Firms
          </h2>
          <Link href="/request-demo">
            <p className="text-lg sm:text-xl font-semibold hover:opacity-80 transition-opacity" style={{color: '#00A1E0'}}>
              Get Started today →
            </p>
          </Link>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_CONTENT.FEATURES.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image Section */}
              <div className="relative h-48 sm:h-56 lg:h-64 flex items-center justify-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={200}
                  className="object-contain"
                />
              </div>
              
              {/* Content Section */}
              <div className={`p-4 sm:p-6 ${feature.title === 'Case Management' ? 'pt-15 sm:pt-15' : 'pt-6 sm:pt-6'}`}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.learnMore && (
                  <Link 
                    href={getFeatureRoute(feature.title)}
                    className="inline-block text-sm sm:text-base font-semibold hover:opacity-80 transition-opacity"
                    style={{color: '#00A1E0'}}
                  >
                    Learn More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile FAQ Style */}
        <div className="md:hidden space-y-4">
          {FEATURES_CONTENT.FEATURES.map((feature, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              {/* Solo mostrar botón si no está abierto */}
              {openFeature !== index && (
                <button
                  onClick={() => toggleFeature(index)}
                  className="w-full text-left flex justify-between items-center py-2"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <span className="text-gray-500 text-xl">
                    +
                  </span>
                </button>
              )}
              
              {openFeature === index && (
                <div className="mt-4">
                  {/* Botón para cerrar */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setOpenFeature(null)}
                      className="text-gray-500 text-xl hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Card completa dentro del desplegable */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative h-48 flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className={`p-4 ${feature.title === 'Case Management' ? 'pt-15' : 'pt-6'}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      {feature.learnMore && (
                        <Link 
                          href={getFeatureRoute(feature.title)}
                          className="inline-block text-sm font-semibold hover:opacity-80 transition-opacity"
                          style={{color: '#00A1E0'}}
                        >
                          Learn More →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
