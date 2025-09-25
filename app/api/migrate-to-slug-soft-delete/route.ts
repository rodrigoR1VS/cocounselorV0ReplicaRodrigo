import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Starting migration to add slug and soft delete columns...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // Add slug column to blogs table if it doesn't exist
      try {
        await query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug VARCHAR(100)`);
        console.log('Added slug column to blogs table');
      } catch (error) {
        console.log('Slug column might already exist, continuing...');
      }

      // Add soft delete columns to blogs table if they don't exist
      try {
        await query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE`);
        await query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL`);
        console.log('Added soft delete columns to blogs table');
      } catch (error) {
        console.log('Soft delete columns might already exist, continuing...');
      }

      // Add soft delete columns to blog_paragraphs table if they don't exist
      try {
        await query(`ALTER TABLE blog_paragraphs ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE`);
        await query(`ALTER TABLE blog_paragraphs ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL`);
        console.log('Added soft delete columns to blog_paragraphs table');
      } catch (error) {
        console.log('Soft delete columns for paragraphs might already exist, continuing...');
      }

      // Generate slugs for existing blogs that don't have them
      const blogsWithoutSlugs = await query(`
        SELECT blog_id, title FROM blogs WHERE slug IS NULL OR slug = ''
      `);

      for (const blog of blogsWithoutSlugs.rows) {
        // Generate slug from title
        const slug = blog.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 80);
        
        // Ensure unique slug
        let uniqueSlug = slug;
        let counter = 1;
        
        while (true) {
          const existingResult = await query(
            `SELECT blog_id FROM blogs WHERE slug = $1 AND blog_id != $2`,
            [uniqueSlug, blog.blog_id]
          );
          
          if (existingResult.rows.length === 0) {
            break;
          }
          
          uniqueSlug = `${slug}-${counter}`;
          counter++;
        }

        // Update the blog with the unique slug
        await query(`UPDATE blogs SET slug = $1 WHERE blog_id = $2`, [uniqueSlug, blog.blog_id]);
        console.log(`Generated slug "${uniqueSlug}" for blog ${blog.blog_id}: ${blog.title}`);
      }

      // Make slug column unique and not null after populating data
      try {
        await query(`ALTER TABLE blogs ALTER COLUMN slug SET NOT NULL`);
        await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_blogs_slug_unique ON blogs(slug) WHERE is_deleted = FALSE`);
        console.log('Made slug column NOT NULL and added unique constraint');
      } catch (error) {
        console.log('Slug constraints might already exist, continuing...');
      }

      // Create indexes for soft delete columns
      try {
        await query(`CREATE INDEX IF NOT EXISTS idx_blogs_is_deleted ON blogs(is_deleted)`);
        await query(`CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_is_deleted ON blog_paragraphs(is_deleted)`);
        console.log('Created indexes for soft delete columns');
      } catch (error) {
        console.log('Soft delete indexes might already exist, continuing...');
      }

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Migration completed successfully',
        blogsUpdated: blogsWithoutSlugs.rows.length
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
    // Check current schema status
    const tablesInfo = await query(`
      SELECT 
        table_name, 
        column_name, 
        data_type, 
        is_nullable
      FROM information_schema.columns 
      WHERE table_name IN ('blogs', 'blog_paragraphs') 
      ORDER BY table_name, ordinal_position
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Schema information retrieved',
      tables: tablesInfo.rows
    });
    
  } catch (error: any) {
    console.error('Schema check error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
