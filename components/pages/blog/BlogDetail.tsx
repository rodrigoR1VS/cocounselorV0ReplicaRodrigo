
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/lib/blog';
import BlogDetailBanner from './BlogDetailBanner';

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <div className="min-h-screen">
       {/* Blog Banner */}
       <BlogDetailBanner
         title={blog.title}
         subtitle={blog.subtitle}
         bannerImage={blog.bannerImage}
       />
 
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="space-y-8">
            {blog.content.map((paragraph) => (
              <div key={paragraph.paragraphId} className="space-y-6">
                {/* Paragraph Text */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {paragraph.content}
                </p>
                
                {/* Paragraph Image */}
                {paragraph.img && (
                  <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={paragraph.img}
                      alt={`Illustration for paragraph ${paragraph.paragraphId}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Read More Articles
            </Link>
          </div>
        </footer>

      </div>
    </div>
  );
}
