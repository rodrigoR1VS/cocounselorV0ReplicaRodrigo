"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS, HEADER_BUTTONS, BRAND, COLORS } from '@/constants/navigation';

/**
 * Header component that provides the main navigation for the application
 * 
 * Features:
 * - Responsive navigation with mobile menu
 * - Clickable logo that redirects to home
 * - Navigation links to different pages
 * - Login and Request Demo buttons
 * - Search functionality
 * 
 * @returns {JSX.Element} The header component with navigation
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Use specific colors for different pages
  const getHeaderBackground = () => {
    if (pathname === '/') return '#012A48';
    if (pathname === '/firm-management') return '#0057BE';
    if (pathname === '/intake-management') return '#F1F7FF';
    if (pathname === '/case-management') return '#00AAFF';
    if (pathname === '/pricing') return '#F1F7FF';
    return COLORS.HEADER_BACKGROUND;
  };
  
  const headerBackground = getHeaderBackground();
  
  // Use dark text for light background pages
  const isLightBackground = pathname === '/intake-management' || pathname === '/pricing';
  const linkTextColor = isLightBackground ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-300';
  const requestDemoButtonClass = isLightBackground 
    ? 'text-black border border-black px-5 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-colors bg-transparent whitespace-nowrap'
    : 'text-white border border-white px-5 py-2 rounded-md text-sm hover:bg-white hover:text-gray-900 transition-colors bg-transparent whitespace-nowrap';
  
  // Use specific logos for different pages
  const getLogoSrc = () => {
    if (pathname === '/intake-management') return '/LogoIntake.svg';
    if (pathname === '/case-management') return '/LogoCaseManagement.svg';
    if (pathname === '/pricing') return '/LogoIntake.svg';
    return BRAND.LOGO.src;
  };
  
  const logoSrc = getLogoSrc();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow-sm" style={{backgroundColor: headerBackground}}>
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-none lg:px-12 xl:px-16 2xl:px-24 mx-auto">
        {/* Single row layout for large screens */}
        <div className="hidden xl:flex items-center h-20 w-full pb-[15px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <Image
                src={logoSrc}
                alt={BRAND.LOGO.alt}
                width={200}
                height={55}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          {/* Centered Navigation */}
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-6">
              {NAVIGATION_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <a 
                    key={index}
                    href={link.href} 
                    className={`${linkTextColor} px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                      isActive 
                        ? `${isLightBackground ? 'bg-gray-500/30' : 'bg-white/30'} rounded-md font-semibold` 
                        : ''
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className={`${isLightBackground ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-300'} p-2`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <a 
              href={HEADER_BUTTONS.LOGIN.href}
              className="bg-sky-400 text-black px-4 py-2 rounded-md text-sm hover:bg-sky-500 transition-colors whitespace-nowrap"
            >
              {HEADER_BUTTONS.LOGIN.label}
            </a>
            
            <a 
              href={HEADER_BUTTONS.REQUEST_DEMO.href}
              className={requestDemoButtonClass}
            >
              {HEADER_BUTTONS.REQUEST_DEMO.label}
            </a>
          </div>
        </div>

        {/* Two row layout for medium screens */}
        <div className="hidden sm:block xl:hidden">
          {/* First row: Logo and Buttons */}
          <div className="flex justify-between items-center h-16 w-full">
            <div className="flex-shrink-0">
              <Link href="/" className="cursor-pointer">
                <Image
                  src={logoSrc}
                  alt={BRAND.LOGO.alt}
                  width={180}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className={`${isLightBackground ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-300'} p-1`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <a 
                href={HEADER_BUTTONS.LOGIN.href}
                className="bg-sky-400 text-black px-3 py-1 rounded-md text-xs hover:bg-sky-500 transition-colors whitespace-nowrap"
              >
                {HEADER_BUTTONS.LOGIN.label}
              </a>
              
              <a 
                href={HEADER_BUTTONS.REQUEST_DEMO.href}
                className={`${isLightBackground ? 'text-black border border-black px-3 py-1 rounded-md text-xs hover:bg-black hover:text-white' : 'text-white border border-white px-3 py-1 rounded-md text-xs hover:bg-white hover:text-gray-900'} transition-colors bg-transparent whitespace-nowrap`}
              >
                {HEADER_BUTTONS.REQUEST_DEMO.label}
              </a>
            </div>
          </div>
          
          {/* Second row: Navigation */}
          <div className="flex justify-center py-3 border-t border-white/20">
            <nav className="flex space-x-4 md:space-x-6">
              {NAVIGATION_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <a 
                    key={index}
                    href={link.href} 
                    className={`${linkTextColor} px-2 py-1 text-xs md:text-sm transition-colors whitespace-nowrap ${
                      isActive 
                        ? `${isLightBackground ? 'bg-gray-500/30' : 'bg-white/30'} rounded-md font-semibold` 
                        : ''
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile: Just logo and hamburger */}
        <div className="flex sm:hidden justify-between items-center h-20 w-full">
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <Image
                src={logoSrc}
                alt={BRAND.LOGO.alt}
                width={170}
                height={45}
                className="h-14 w-auto"
              />
            </Link>
          </div>
          
          <div>
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-300 p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-700">
              {/* Navigation Links */}
              {NAVIGATION_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-white hover:text-blue-300 block px-3 py-2 text-base transition-colors ${
                      isActive 
                        ? 'bg-white/30 rounded-md font-semibold' 
                        : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              
              {/* Mobile Buttons */}
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <a
                  href={HEADER_BUTTONS.LOGIN.href}
                  className="bg-sky-400 text-black block px-4 py-2 rounded-md text-sm hover:bg-sky-500 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {HEADER_BUTTONS.LOGIN.label}
                </a>
                <a
                  href={HEADER_BUTTONS.REQUEST_DEMO.href}
                  className="text-white border border-white block px-4 py-2 rounded-md text-sm hover:bg-white hover:text-gray-900 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {HEADER_BUTTONS.REQUEST_DEMO.label}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;