import Link from 'next/link';
import Image from 'next/image';
import { BlogPreview } from '@/lib/blog';

interface BlogPreviewCardProps {
  blog: BlogPreview;
}

// Function to format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPreviewCard({ blog }: BlogPreviewCardProps) {
  return (
    <Link href={`/blog/${blog.blogId}`} className="group">
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
        
        {/* Banner Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.bannerImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200 line-clamp-3 leading-tight">
            {blog.title}
          </h3>
          
          {/* Published Date */}
          <div className="flex items-center justify-between">
            <time className="text-sm text-gray-500 font-medium">
              {formatDate(blog.publishedDate)}
            </time>
            
            {/* Read More Arrow */}
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
              <span className="sr-only">Read More</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}