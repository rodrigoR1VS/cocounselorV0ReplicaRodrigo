import { CONTACT_CONTENT } from '@/constants/content';
import Image from 'next/image';

/**
 * ContactHero component that displays the hero section with blue background and wave pattern
 * 
 * Features:
 * - Blue gradient background
 * - Wave pattern SVG overlay
 * - Responsive title and subtitle
 * 
 * @returns {JSX.Element} The contact hero section
 */
const ContactHero = () => {
  return (
    <div className="py-20 min-h-[365px] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <Image
          src="/BackGroundContactUsDesktop.svg"
          alt="Contact Background Desktop"
          fill
          className="hidden md:block object-cover"
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/BackGroundContactUsMobile.svg"
          alt="Contact Background Mobile"
          fill
          className="block md:hidden object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8 text-left md:text-center pt-[15px]" style={{paddingLeft: 'calc(1rem + 15px)'}}>
        <h1 className="text-lg text-white mb-4">
          {CONTACT_CONTENT.HERO.TITLE}
        </h1>
        <h2 className="text-white text-[42px] md:text-[52px]">
          {CONTACT_CONTENT.HERO.MAIN_TITLE}
        </h2>
      </div>
    </div>
  );
};

export default ContactHero;
