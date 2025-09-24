import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    // Read current blogs
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsJson = JSON.parse(fileContent);

    // Generate new blog ID
    const existingIds = blogsJson.blogs.map((blog: any) => {
      const match = blog.blogId.match(/post-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const nextId = Math.max(...existingIds, 0) + 1;
    const newBlogId = `post-${nextId.toString().padStart(3, '0')}`;

    // Create new blog object
    const newBlog = {
      blogId: newBlogId,
      publishedDate: new Date().toISOString(),
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

    // Add new blog to the beginning of the array (newest first)
    blogsJson.blogs.unshift(newBlog);

    // Write back to file
    fs.writeFileSync(blogsPath, JSON.stringify(blogsJson, null, 4));

    return NextResponse.json(
      { 
        message: 'Blog created successfully', 
        blogId: newBlogId 
      },
      { status: 201 }
    );

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
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsJson = JSON.parse(fileContent);

    return NextResponse.json(blogsJson);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
