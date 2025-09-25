import { NextRequest, NextResponse } from 'next/server';
import { BlogStorage } from '@/lib/blogStorage';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check for migration password
    const { password } = await request.json();
    if (password !== 'weAreMarketing2025!#') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Read existing blogs.json file
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    
    if (!fs.existsSync(blogsPath)) {
      return NextResponse.json(
        { error: 'No blogs.json file found to migrate' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsData = JSON.parse(fileContent);

    // Migrate to Firebase
    const result = await BlogStorage.migrateFromJSON(blogsData);

    if (result.success) {
      return NextResponse.json(
        { 
          message: 'Migration completed successfully', 
          migratedCount: result.migratedCount 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Migration failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error during migration:', error);
    return NextResponse.json(
      { error: 'Internal server error during migration' },
      { status: 500 }
    );
  }
}
