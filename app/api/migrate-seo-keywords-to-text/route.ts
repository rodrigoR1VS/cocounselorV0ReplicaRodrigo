import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Starting migration to change seo_keywords from array to text...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // First, let's see the current data
      const currentData = await query(`
        SELECT id, title, seo_keywords 
        FROM blogs 
        WHERE seo_keywords IS NOT NULL
      `);

      console.log(`Found ${currentData.rows.length} blogs with SEO keywords`);

      // Add new text column
      console.log('Adding new seo_keywords_text column...');
      await query(`
        ALTER TABLE blogs 
        ADD COLUMN IF NOT EXISTS seo_keywords_text TEXT
      `);

      // Migrate data from array to comma-separated text
      console.log('Migrating keywords data...');
      for (const row of currentData.rows) {
        if (row.seo_keywords && Array.isArray(row.seo_keywords)) {
          const keywordsText = row.seo_keywords.join(', ');
          await query(`
            UPDATE blogs 
            SET seo_keywords_text = $1 
            WHERE id = $2
          `, [keywordsText, row.id]);
          
          console.log(`Migrated keywords for blog ${row.id}: "${keywordsText}"`);
        }
      }

      // Drop the old array column
      console.log('Dropping old seo_keywords array column...');
      await query(`
        ALTER TABLE blogs 
        DROP COLUMN IF EXISTS seo_keywords
      `);

      // Rename the new column to the original name
      console.log('Renaming seo_keywords_text to seo_keywords...');
      await query(`
        ALTER TABLE blogs 
        RENAME COLUMN seo_keywords_text TO seo_keywords
      `);

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully - SEO keywords now stored as comma-separated text',
        migratedBlogs: currentData.rows.length
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
    // Check current schema status for seo_keywords
    const columnInfo = await query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name LIKE '%seo_keywords%'
      ORDER BY column_name
    `);
    
    // Get sample data
    const sampleData = await query(`
      SELECT id, title, seo_keywords
      FROM blogs 
      WHERE seo_keywords IS NOT NULL
      LIMIT 3
    `);
    
    return NextResponse.json({
      success: true,
      message: 'SEO keywords schema information retrieved',
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
