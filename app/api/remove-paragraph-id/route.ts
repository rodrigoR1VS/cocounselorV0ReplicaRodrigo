import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Starting migration to remove paragraph_id column...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // Check if paragraph_id column exists
      const columnCheck = await query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'blog_paragraphs' AND column_name = 'paragraph_id'
      `);

      if (columnCheck.rows.length > 0) {
        console.log('Removing paragraph_id column from blog_paragraphs...');
        
        // Drop the unique constraint first (it includes paragraph_id)
        await query(`
          ALTER TABLE blog_paragraphs 
          DROP CONSTRAINT IF EXISTS blog_paragraphs_blog_id_paragraph_id_key
        `);
        
        // Remove the paragraph_id column
        await query(`
          ALTER TABLE blog_paragraphs 
          DROP COLUMN paragraph_id
        `);
        
        console.log('paragraph_id column removed successfully');
      } else {
        console.log('paragraph_id column does not exist, skipping...');
      }

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully - paragraph_id column removed'
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
    // Check current schema status for blog_paragraphs
    const tablesInfo = await query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_name = 'blog_paragraphs'
      ORDER BY ordinal_position
    `);
    
    return NextResponse.json({
      success: true,
      message: 'blog_paragraphs schema information retrieved',
      columns: tablesInfo.rows
    });
    
  } catch (error: any) {
    console.error('Schema check error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
