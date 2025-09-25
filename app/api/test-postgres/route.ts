import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing PostgreSQL connection...');
    
    // Import the query function inside the handler to avoid import issues
    const { query } = await import('@/lib/db/postgres');
    
    // Test basic connection
    const result = await query('SELECT NOW() as current_time, version() as postgres_version');
    
    console.log('PostgreSQL connection successful');
    
    // Test blogs table
    let blogsTableExists = false;
    try {
      await query('SELECT COUNT(*) FROM blogs');
      blogsTableExists = true;
    } catch (error) {
      console.log('Blogs table does not exist yet');
    }
    
    return NextResponse.json({
      success: true,
      message: 'PostgreSQL connection successful',
      data: {
        currentTime: result.rows[0].current_time,
        postgresVersion: result.rows[0].postgres_version,
        blogsTableExists
      }
    });
    
  } catch (error: any) {
    console.error('PostgreSQL connection test failed:', error);
    console.error('Error details:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      stack: error.stack
    }, { status: 500 });
  }
}
