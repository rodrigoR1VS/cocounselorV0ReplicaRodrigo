import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Starting migration to auto-increment IDs...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // Create new blogs table with auto-increment ID
      console.log('Creating new blogs table with auto-increment...');
      await query(`
        CREATE TABLE IF NOT EXISTS blogs_new (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(100) UNIQUE NOT NULL,
          published_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          title VARCHAR(500) NOT NULL,
          subtitle TEXT,
          banner_image VARCHAR(1000),
          seo_meta_title VARCHAR(500),
          seo_meta_description TEXT,
          seo_keywords TEXT[],
          is_deleted BOOLEAN DEFAULT FALSE,
          deleted_at TIMESTAMP WITH TIME ZONE NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `);

      // Create new blog_paragraphs table with auto-increment ID
      console.log('Creating new blog_paragraphs table...');
      await query(`
        CREATE TABLE IF NOT EXISTS blog_paragraphs_new (
          id SERIAL PRIMARY KEY,
          blog_id INTEGER REFERENCES blogs_new(id) ON DELETE CASCADE,
          paragraph_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          image_url VARCHAR(1000),
          is_deleted BOOLEAN DEFAULT FALSE,
          deleted_at TIMESTAMP WITH TIME ZONE NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(blog_id, paragraph_id)
        )
      `);

      // Migrate data from old blogs table to new one
      console.log('Migrating blogs data...');
      const oldBlogs = await query(`
        SELECT * FROM blogs ORDER BY created_at ASC
      `);

      const blogIdMapping = new Map(); // old blog_id -> new id

      for (const oldBlog of oldBlogs.rows) {
        const result = await query(`
          INSERT INTO blogs_new (
            slug, published_date, title, subtitle, banner_image,
            seo_meta_title, seo_meta_description, seo_keywords,
            is_deleted, deleted_at, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id
        `, [
          oldBlog.slug,
          oldBlog.published_date,
          oldBlog.title,
          oldBlog.subtitle,
          oldBlog.banner_image,
          oldBlog.seo_meta_title,
          oldBlog.seo_meta_description,
          oldBlog.seo_keywords,
          oldBlog.is_deleted || false,
          oldBlog.deleted_at,
          oldBlog.created_at,
          oldBlog.updated_at
        ]);

        const newId = result.rows[0].id;
        blogIdMapping.set(oldBlog.blog_id, newId);
        console.log(`Migrated blog ${oldBlog.blog_id} -> ${newId}: ${oldBlog.title}`);
      }

      // Migrate paragraphs data
      console.log('Migrating paragraphs data...');
      const oldParagraphs = await query(`
        SELECT * FROM blog_paragraphs ORDER BY created_at ASC
      `);

      for (const oldParagraph of oldParagraphs.rows) {
        const newBlogId = blogIdMapping.get(oldParagraph.blog_id);
        if (newBlogId) {
          await query(`
            INSERT INTO blog_paragraphs_new (
              blog_id, paragraph_id, content, image_url,
              is_deleted, deleted_at, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          `, [
            newBlogId,
            oldParagraph.paragraph_id,
            oldParagraph.content,
            oldParagraph.image_url,
            oldParagraph.is_deleted || false,
            oldParagraph.deleted_at,
            oldParagraph.created_at
          ]);
        }
      }

      // Drop old tables
      console.log('Dropping old tables...');
      await query(`DROP TABLE IF EXISTS blog_paragraphs`);
      await query(`DROP TABLE IF EXISTS blogs`);

      // Rename new tables
      console.log('Renaming new tables...');
      await query(`ALTER TABLE blogs_new RENAME TO blogs`);
      await query(`ALTER TABLE blog_paragraphs_new RENAME TO blog_paragraphs`);

      // Create indexes
      console.log('Creating indexes...');
      await query(`CREATE INDEX IF NOT EXISTS idx_blogs_published_date ON blogs(published_date DESC)`);
      await query(`CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug) WHERE is_deleted = FALSE`);
      await query(`CREATE INDEX IF NOT EXISTS idx_blogs_is_deleted ON blogs(is_deleted)`);
      await query(`CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_blog_id ON blog_paragraphs(blog_id)`);
      await query(`CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_is_deleted ON blog_paragraphs(is_deleted)`);

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Migration to auto-increment IDs completed successfully',
        blogsCount: oldBlogs.rows.length,
        paragraphsCount: oldParagraphs.rows.length,
        blogIdMapping: Object.fromEntries(blogIdMapping)
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
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_name IN ('blogs', 'blog_paragraphs', 'blogs_new', 'blog_paragraphs_new') 
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
