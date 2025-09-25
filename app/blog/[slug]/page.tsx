import { notFound } from 'next/navigation';
import { BlogStorage } from '@/lib/blogStorage';
import BlogDetail from '@/components/pages/blog/BlogDetail';
import type { Metadata } from 'next';

interface BlogDetailPageProps {
  params: { slug: string };
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  try {
    const blogsData = await BlogStorage.getAllBlogs();
    return blogsData.blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const blog = await BlogStorage.getBlogBySlug(params.slug);
    
    if (!blog) {
      return {
        title: 'Blog Not Found',
      };
    }

    return {
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      keywords: blog.seo.keywords,
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Not Found',
    };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  try {
    const blog = await BlogStorage.getBlogBySlug(params.slug);

    if (!blog) {
      notFound();
    }

    return <BlogDetail blog={blog} />;
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}
