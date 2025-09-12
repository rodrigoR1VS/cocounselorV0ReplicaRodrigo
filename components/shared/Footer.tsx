import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_CONTENT } from '@/constants/content';

const Footer = () => {
  return (
    <footer>
      {/* Main Section */}
      <div 
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: FOOTER_CONTENT.MAIN_SECTION.BACKGROUND }}
      >
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Container - Logo, Tagline and Left Links */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Logo and Tagline */}
              <div className="flex flex-col space-y-3 w-full">
                {/* Logo */}
                <div className="w-full flex justify-center lg:justify-start">
                  <Link href="/" className="cursor-pointer">
                        <Image
                          src="/logo-footer.avif"
                          alt="CoCounselor"
                          width={180}
                          height={60}
                          className="h-16 w-auto pl-8"
                        />
                  </Link>
                </div>
                
                {/* Tagline */}
                <div className="text-gray-600 text-left lg:text-left">
                  <span>{FOOTER_CONTENT.MAIN_SECTION.LOGO.TAGLINE.PART1}</span>
                  <br />
                  <span className="font-semibold">{FOOTER_CONTENT.MAIN_SECTION.LOGO.TAGLINE.PART2}</span>
                </div>
              </div>

              {/* Left Links */}
              <div className="flex flex-col space-y-2">
                {FOOTER_CONTENT.MAIN_SECTION.LINKS.LEFT.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    {link.label.split(link.highlight).map((part, i) => (
                      <span key={i}>
                        {part}
                        {i === 0 && (
                          <span className="text-blue-600 font-medium">
                            {link.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Container - Right Links */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Mobile: Get Pricing and Contact Us */}
              <div className="flex flex-col space-y-2 lg:hidden">
                {/* Separator Line */}
                <div className="w-full h-px bg-gray-300 mb-2 -mx-4 sm:-mx-6 lg:-mx-8"></div>
                
                <Link href="/pricing">
                  <span className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                    Get Pricing
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                    Contact Us
                  </span>
                </Link>
              </div>
              
              {/* Desktop: Right Links */}
              <div className="hidden lg:flex space-x-6">
                <Link href="/pricing">
                  <span className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                    Get Pricing
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;