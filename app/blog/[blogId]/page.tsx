import { notFound } from 'next/navigation';
import { getBlogById, getAllBlogIds } from '@/lib/blog';
import BlogDetail from '@/components/pages/blog/BlogDetail';
import type { Metadata } from 'next';

interface BlogDetailPageProps {
  params: { blogId: string };
}

// Generate static params for all blog IDs
export async function generateStaticParams() {
  const blogIds = getAllBlogIds();
  return blogIds.map((blogId) => ({
    blogId: blogId,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = getBlogById(params.blogId);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.seo.metaTitle,
    description: blog.seo.metaDescription,
    keywords: blog.seo.keywords.join(', '),
    openGraph: {
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      images: [blog.bannerImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      images: [blog.bannerImage],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = getBlogById(params.blogId);

  if (!blog) {
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
