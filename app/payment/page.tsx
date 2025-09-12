import React from 'react';
import PaymentForm from '@/components/pages/payment/PaymentForm';
import { PAYMENT_CONTENT } from '@/constants/content';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {PAYMENT_CONTENT.TITLE}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {PAYMENT_CONTENT.SUBTITLE}
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <PaymentForm />
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm">{PAYMENT_CONTENT.SECURITY_NOTICE}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
