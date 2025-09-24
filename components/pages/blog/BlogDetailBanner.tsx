import Image from 'next/image';
import Link from 'next/link';

interface BlogDetailBannerProps {
  title: string;
  subtitle: string;
  bannerImage: string;
}

export default function BlogDetailBanner({ title, subtitle, bannerImage }: BlogDetailBannerProps) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Back Navigation - Subtle in top left */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/blog"
          className="group inline-flex items-center justify-center w-12 h-12 bg-blue-400/20 backdrop-blur-sm rounded-full hover:bg-blue-400/30 transition-all duration-300 border border-blue-400/30"
        >
          <svg 
            className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300 group-hover:-translate-x-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </h2>
          
          {/* Decorative Line */}
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg 
          className="w-full h-12 text-white" 
          viewBox="0 0 1440 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 48H1440V0C1440 0 1140 24 720 24C300 24 0 0 0 0V48Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
