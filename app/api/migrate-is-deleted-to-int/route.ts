import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Starting migration to change is_deleted from boolean to integer...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // Add new integer columns for blogs
      console.log('Adding new is_deleted_int column for blogs...');
      await query(`
        ALTER TABLE blogs 
        ADD COLUMN IF NOT EXISTS is_deleted_int INTEGER DEFAULT 0
      `);

      // Migrate boolean data to integer for blogs
      console.log('Migrating is_deleted data for blogs...');
      await query(`
        UPDATE blogs 
        SET is_deleted_int = CASE 
          WHEN is_deleted = true THEN 1 
          ELSE 0 
        END
      `);

      // Drop old boolean column for blogs
      console.log('Dropping old is_deleted boolean column for blogs...');
      await query(`
        ALTER TABLE blogs 
        DROP COLUMN IF EXISTS is_deleted
      `);

      // Rename new column for blogs
      console.log('Renaming is_deleted_int to is_deleted for blogs...');
      await query(`
        ALTER TABLE blogs 
        RENAME COLUMN is_deleted_int TO is_deleted
      `);

      // Do the same for blog_paragraphs
      console.log('Adding new is_deleted_int column for blog_paragraphs...');
      await query(`
        ALTER TABLE blog_paragraphs 
        ADD COLUMN IF NOT EXISTS is_deleted_int INTEGER DEFAULT 0
      `);

      console.log('Migrating is_deleted data for blog_paragraphs...');
      await query(`
        UPDATE blog_paragraphs 
        SET is_deleted_int = CASE 
          WHEN is_deleted = true THEN 1 
          ELSE 0 
        END
      `);

      console.log('Dropping old is_deleted boolean column for blog_paragraphs...');
      await query(`
        ALTER TABLE blog_paragraphs 
        DROP COLUMN IF EXISTS is_deleted
      `);

      console.log('Renaming is_deleted_int to is_deleted for blog_paragraphs...');
      await query(`
        ALTER TABLE blog_paragraphs 
        RENAME COLUMN is_deleted_int TO is_deleted
      `);

      // Recreate indexes
      console.log('Recreating indexes...');
      await query(`CREATE INDEX IF NOT EXISTS idx_blogs_is_deleted ON blogs(is_deleted)`);
      await query(`CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_is_deleted ON blog_paragraphs(is_deleted)`);

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully - is_deleted now uses integer (0/1) instead of boolean'
      });
      
    } catch (error) {
      // Rollback transaction on error
      await query('ROLLBACK');
      throw error;
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
    // Check current schema status for is_deleted columns
    const columnInfo = await query(`
      SELECT 
        table_name,
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_name IN ('blogs', 'blog_paragraphs') 
      AND column_name LIKE '%is_deleted%'
      ORDER BY table_name, column_name
    `);
    
    // Get sample data
    const sampleData = await query(`
      SELECT id, title, is_deleted
      FROM blogs 
      LIMIT 3
    `);
    
    return NextResponse.json({
      success: true,
      message: 'is_deleted schema information retrieved',
      columns: columnInfo.rows,
      sampleData: sampleData.rows
    });
    
  } catch (error: any) {
    console.error('Schema check error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
