'use client';

import React, { useState } from 'react';
import { PAYMENT_CONTENT } from '@/constants/content';

/**
 * PaymentForm component for processing credit card payments
 * 
 * Features:
 * - Credit card information collection with auto-formatting
 * - Billing address collection
 * - Real-time form validation
 * - Responsive design
 * - Security indicators
 * 
 * Form Fields:
 * - Card Number (auto-formatted with spaces)
 * - Expiry Date (MM/YY format)
 * - CVV (3-4 digits)
 * - Cardholder Name
 * - Email Address
 * - Billing Address
 * - City, State, ZIP Code
 * - Country selection
 * 
 * @returns {JSX.Element} The payment form component
 */
const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Formatear número de tarjeta con espacios cada 4 dígitos
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // Formatear fecha de expiración MM/YY
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // Solo números para CVV
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // Solo números para código postal
    else if (name === 'zipCode') {
      const formatted = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate card number (16 digits)
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits || cardNumberDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must have 16 digits';
    }

    // Validate expiry date
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid date format (MM/YY)';
    }

    // Validate CVV
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must have at least 3 digits';
    }

    // Validate cardholder name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate address
    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Validate state
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Validate zip code
    if (!formData.zipCode || formData.zipCode.length < 5) {
      newErrors.zipCode = 'ZIP code must have at least 5 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here would go the payment processing logic
      console.log('Form data:', formData);
      alert('Payment processed successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Information */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {PAYMENT_CONTENT.CARD_INFO_TITLE}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Number */}
          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.CARD_NUMBER_LABEL}
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.EXPIRY_DATE_LABEL}
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.CVV_LABEL}
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={4}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="md:col-span-2">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.CARDHOLDER_NAME_LABEL}
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {PAYMENT_CONTENT.BILLING_INFO_TITLE}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.EMAIL_LABEL}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.ADDRESS_LABEL}
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.billingAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.billingAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.billingAddress}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.CITY_LABEL}
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.STATE_LABEL}
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.ZIP_CODE_LABEL}
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="12345"
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              {PAYMENT_CONTENT.COUNTRY_LABEL}
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="MX">Mexico</option>
              <option value="ES">Spain</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
              <option value="CO">Colombia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {PAYMENT_CONTENT.PAY_BUTTON}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
