import { NextRequest, NextResponse } from 'next/server';
import { BlogStorage } from '@/lib/blogStorage';

interface RouteParams {
  params: { slug: string };
}

// GET individual blog by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;
    const blog = await BlogStorage.getBlogBySlug(slug);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// UPDATE blog
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;
    const updateData = await request.json();
    
    // Validate required fields
    if (!updateData.title || !updateData.subtitle || !updateData.bannerImage || !updateData.content || !updateData.seo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First get the blog by slug to get its ID
    const existingBlog = await BlogStorage.getBlogBySlug(slug);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const blogUpdate = {
      title: updateData.title,
      subtitle: updateData.subtitle,
      bannerImage: updateData.bannerImage,
      content: updateData.content.map((paragraph: any, index: number) => ({
        content: paragraph.content,
        img: paragraph.img || null
      })),
      seo: {
        metaTitle: updateData.seo.metaTitle,
        metaDescription: updateData.seo.metaDescription,
        keywords: updateData.seo.keywords
      }
    };

    // Use BlogStorage to update the blog
    const result = await BlogStorage.updateBlog(existingBlog.id, blogUpdate);

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Blog updated successfully', 
          blog: result.blog 
        },
        { status: 200 }
      );
    } else {
      const status = result.error === 'Blog not found' ? 404 : 500;
      return NextResponse.json(
        { error: result.error },
        { status }
      );
    }

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    // First get the blog by slug to get its ID
    const existingBlog = await BlogStorage.getBlogBySlug(slug);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Use BlogStorage to delete the blog
    const result = await BlogStorage.deleteBlog(existingBlog.id);

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Blog deleted successfully',
          deletedBlog: result.deletedBlog
        },
        { status: 200 }
      );
    } else {
      const status = result.error === 'Blog not found' ? 404 : 500;
      return NextResponse.json(
        { error: result.error },
        { status }
      );
    }

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
