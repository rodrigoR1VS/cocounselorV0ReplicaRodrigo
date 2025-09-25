import { NextRequest, NextResponse } from 'next/server';
import { BlogStorage } from '@/lib/blogStorage';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    console.log('Starting PostgreSQL migration...');
    
    // Initialize database
    await BlogStorage.initializeDatabase();
    
    // Read blogs.json file
    const blogsPath = path.join(process.cwd(), 'blogs.json');
    if (!fs.existsSync(blogsPath)) {
      return NextResponse.json({
        success: false,
        error: 'blogs.json file not found'
      }, { status: 404 });
    }

    const fileContent = fs.readFileSync(blogsPath, 'utf8');
    const blogsData = JSON.parse(fileContent);
    
    // Migrate data
    const result = await BlogStorage.migrateFromJSON(blogsData);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully',
        migratedCount: result.migratedCount
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
    
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Just initialize database (create tables if they don't exist)
    await BlogStorage.initializeDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    });
    
  } catch (error: any) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
