import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface RouteParams {
  params: { blogId: string };
}

// GET individual blog
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = params;
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsJson = JSON.parse(fileContent);

    const blog = blogsJson.blogs.find((b: any) => b.blogId === blogId);
    
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
    const { blogId } = params;
    const updateData = await request.json();
    
    // Validate required fields
    if (!updateData.title || !updateData.subtitle || !updateData.bannerImage || !updateData.content || !updateData.seo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blogsPath = path.join(process.cwd(), 'blogs.json');
    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsJson = JSON.parse(fileContent);

    const blogIndex = blogsJson.blogs.findIndex((b: any) => b.blogId === blogId);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Update blog object while preserving blogId and publishedDate
    const existingBlog = blogsJson.blogs[blogIndex];
    const updatedBlog = {
      blogId: existingBlog.blogId,
      publishedDate: existingBlog.publishedDate,
      title: updateData.title,
      subtitle: updateData.subtitle,
      bannerImage: updateData.bannerImage,
      content: updateData.content.map((paragraph: any, index: number) => ({
        paragraphId: index + 1,
        content: paragraph.content,
        img: paragraph.img || null
      })),
      seo: {
        metaTitle: updateData.seo.metaTitle,
        metaDescription: updateData.seo.metaDescription,
        keywords: updateData.seo.keywords
      }
    };

    blogsJson.blogs[blogIndex] = updatedBlog;

    // Write back to file
    fs.writeFileSync(blogsPath, JSON.stringify(blogsJson, null, 4));

    return NextResponse.json(
      { 
        message: 'Blog updated successfully', 
        blog: updatedBlog 
      },
      { status: 200 }
    );

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
    const { blogId } = params;
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsJson = JSON.parse(fileContent);

    const blogIndex = blogsJson.blogs.findIndex((b: any) => b.blogId === blogId);
    
    if (blogIndex === -1) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Remove blog from array
    const deletedBlog = blogsJson.blogs.splice(blogIndex, 1)[0];

    // Write back to file
    fs.writeFileSync(blogsPath, JSON.stringify(blogsJson, null, 4));

    return NextResponse.json(
      { 
        message: 'Blog deleted successfully',
        deletedBlog: deletedBlog
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
