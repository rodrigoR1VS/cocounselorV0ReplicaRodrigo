import { NextRequest, NextResponse } from 'next/server';
import { BlogStorage } from '@/lib/blogStorage';

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();
    
    // Validate required fields
    if (!blogData.title || !blogData.subtitle || !blogData.bannerImage || !blogData.content || !blogData.seo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare blog data (without blogId and publishedDate - these will be auto-generated)
    const newBlogData = {
      title: blogData.title,
      subtitle: blogData.subtitle,
      bannerImage: blogData.bannerImage,
      content: blogData.content.map((paragraph: any, index: number) => ({
        paragraphId: index + 1,
        content: paragraph.content,
        img: paragraph.img || null
      })),
      seo: {
        metaTitle: blogData.seo.metaTitle,
        metaDescription: blogData.seo.metaDescription,
        keywords: blogData.seo.keywords
      }
    };

    // Use BlogStorage to add the blog to Firebase
    const result = await BlogStorage.addBlog(newBlogData);

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Blog created successfully', 
          blogId: result.blogId 
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to create blog' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogsData = await BlogStorage.getAllBlogs();
    return NextResponse.json(blogsData);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
