import { query } from './db/postgres';

interface BlogParagraph {
  content: string;
  img: string | null;
}

interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string; // Comma-separated text
}

interface Blog {
  id: number;  // Auto-increment ID (SERIAL)
  slug: string;
  publishedDate: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  content: BlogParagraph[];
  seo: BlogSEO;
}

interface BlogsData {
  blogs: Blog[];
}

export class BlogStorage {
  // Helper function to generate URL-friendly slug from title
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove multiple consecutive hyphens
      .slice(0, 80); // Limit length
  }

  // Helper function to ensure unique slug
  static async ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    
    while (true) {
      const existingResult = await query(
        `SELECT id FROM blogs WHERE slug = $1 ${excludeId ? 'AND id != $2' : ''}`,
        excludeId ? [slug, excludeId] : [slug]
      );
      
      if (existingResult.rows.length === 0) {
        return slug;
      }
      
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  // Get all blogs (non-deleted)
  static async getAllBlogs(): Promise<BlogsData> {
    try {
      console.log('Fetching blogs from PostgreSQL...');
      
      const blogsResult = await query(`
        SELECT 
          id,
          slug,
          published_date,
          title,
          subtitle,
          banner_image,
          seo_meta_title,
          seo_meta_description,
          seo_keywords
        FROM blogs 
        WHERE is_deleted = 0
        ORDER BY published_date DESC
      `);

      const blogs: Blog[] = [];

      for (const blogRow of blogsResult.rows) {
        const paragraphsResult = await query(`
          SELECT content, image_url
          FROM blog_paragraphs
          WHERE blog_id = $1 AND is_deleted = 0
          ORDER BY id ASC
        `, [blogRow.id]);

        const blog: Blog = {
          id: blogRow.id,
          slug: blogRow.slug,
          publishedDate: blogRow.published_date.toISOString(),
          title: blogRow.title,
          subtitle: blogRow.subtitle || '',
          bannerImage: blogRow.banner_image || '',
          content: paragraphsResult.rows.map(p => ({
            content: p.content,
            img: p.image_url
          })),
          seo: {
            metaTitle: blogRow.seo_meta_title || '',
            metaDescription: blogRow.seo_meta_description || '',
            keywords: blogRow.seo_keywords || ''
          }
        };

        blogs.push(blog);
      }

      console.log(`Found ${blogs.length} blogs in PostgreSQL`);
      return { blogs };
    } catch (error) {
      console.error('Error getting blogs from PostgreSQL:', error);
      return { blogs: [] };
    }
  }

  // Add a new blog
  static async addBlog(newBlog: Omit<Blog, 'id' | 'slug' | 'publishedDate'>): Promise<{ success: boolean; blogId?: number; slug?: string; error?: string }> {
    try {
      console.log('Adding new blog to PostgreSQL...');
      
      // Generate slug from title
      const baseSlug = this.generateSlug(newBlog.title);
      const uniqueSlug = await this.ensureUniqueSlug(baseSlug);

      console.log(`Creating blog with slug: ${uniqueSlug}`);

      // Begin transaction
      await query('BEGIN');

      try {
        // Insert blog and get auto-generated ID
        const blogResult = await query(`
          INSERT INTO blogs (
            slug, title, subtitle, banner_image, 
            seo_meta_title, seo_meta_description, seo_keywords
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `, [
          uniqueSlug,
          newBlog.title,
          newBlog.subtitle,
          newBlog.bannerImage,
          newBlog.seo.metaTitle,
          newBlog.seo.metaDescription,
          newBlog.seo.keywords
        ]);

        const newBlogId = blogResult.rows[0].id;

        // Insert paragraphs
        for (const paragraph of newBlog.content) {
          await query(`
            INSERT INTO blog_paragraphs (blog_id, content, image_url)
            VALUES ($1, $2, $3)
          `, [
            newBlogId,
            paragraph.content,
            paragraph.img
          ]);
        }

        // Commit transaction
        await query('COMMIT');

        console.log(`Blog ${newBlogId} (${uniqueSlug}) added successfully to PostgreSQL`);
        return { success: true, blogId: newBlogId, slug: uniqueSlug };
      } catch (error) {
        // Rollback transaction on error
        await query('ROLLBACK');
        throw error;
      }
    } catch (error) {
      console.error('Error adding blog to PostgreSQL:', error);
      return { success: false, error: `PostgreSQL error: ${error.message}` };
    }
  }

  // Update an existing blog
  static async updateBlog(blogId: number, updateData: Omit<Blog, 'id' | 'slug' | 'publishedDate'>): Promise<{ success: boolean; blog?: Blog; error?: string }> {
    try {
      console.log(`Updating blog ${blogId} in PostgreSQL...`);
      
      // Check if blog exists and get current data
      const existingResult = await query(`
        SELECT id, slug, published_date FROM blogs WHERE id = $1 AND is_deleted = 0
      `, [blogId]);
      
      if (existingResult.rows.length === 0) {
        return { success: false, error: 'Blog not found' };
      }

      const existingBlog = existingResult.rows[0];
      
      // Generate new slug if title changed
      const baseSlug = this.generateSlug(updateData.title);
      const uniqueSlug = await this.ensureUniqueSlug(baseSlug, blogId);

      // Begin transaction
      await query('BEGIN');

      try {
        // Update blog
        await query(`
          UPDATE blogs SET 
            slug = $2,
            title = $3,
            subtitle = $4,
            banner_image = $5,
            seo_meta_title = $6,
            seo_meta_description = $7,
            seo_keywords = $8,
            updated_at = NOW()
          WHERE id = $1
        `, [
          blogId,
          uniqueSlug,
          updateData.title,
          updateData.subtitle,
          updateData.bannerImage,
          updateData.seo.metaTitle,
          updateData.seo.metaDescription,
          updateData.seo.keywords
        ]);

        // Delete existing paragraphs (soft delete)
        await query(`
          UPDATE blog_paragraphs 
          SET is_deleted = 1, deleted_at = NOW()
          WHERE blog_id = $1 AND is_deleted = 0
        `, [blogId]);

        // Insert new paragraphs
        for (const paragraph of updateData.content) {
          await query(`
            INSERT INTO blog_paragraphs (blog_id, content, image_url)
            VALUES ($1, $2, $3)
          `, [
            blogId,
            paragraph.content,
            paragraph.img
          ]);
        }

        // Commit transaction
        await query('COMMIT');

        const updatedBlog: Blog = {
          ...updateData,
          id: blogId,
          slug: uniqueSlug,
          publishedDate: existingBlog.published_date.toISOString(),
        };

        console.log(`Blog ${blogId} updated successfully in PostgreSQL`);
        return { success: true, blog: updatedBlog };
      } catch (error) {
        // Rollback transaction on error
        await query('ROLLBACK');
        throw error;
      }
    } catch (error) {
      console.error('Error updating blog in PostgreSQL:', error);
      return { success: false, error: 'Internal error updating blog' };
    }
  }

  // Soft delete a blog
  static async deleteBlog(blogId: number): Promise<{ success: boolean; deletedBlog?: Blog; error?: string }> {
    try {
      console.log(`Soft deleting blog ${blogId} from PostgreSQL...`);
      
      // Get blog data before deleting
      const blog = await this.getBlogById(blogId);
      
      if (!blog) {
        return { success: false, error: 'Blog not found' };
      }

      // Begin transaction
      await query('BEGIN');

      try {
        // Soft delete blog
        const result = await query(`
          UPDATE blogs 
          SET is_deleted = 1, deleted_at = NOW(), updated_at = NOW()
          WHERE id = $1 AND is_deleted = 0
        `, [blogId]);

        if (result.rowCount === 0) {
          await query('ROLLBACK');
          return { success: false, error: 'Blog not found or already deleted' };
        }

        // Soft delete all paragraphs of this blog
        await query(`
          UPDATE blog_paragraphs 
          SET is_deleted = 1, deleted_at = NOW()
          WHERE blog_id = $1 AND is_deleted = 0
        `, [blogId]);

        // Commit transaction
        await query('COMMIT');

        console.log(`Blog ${blogId} soft deleted successfully from PostgreSQL`);
        return { success: true, deletedBlog: blog };
      } catch (error) {
        // Rollback transaction on error
        await query('ROLLBACK');
        throw error;
      }
    } catch (error) {
      console.error('Error soft deleting blog from PostgreSQL:', error);
      return { success: false, error: 'Internal error deleting blog' };
    }
  }

  // Get a single blog by ID
  static async getBlogById(blogId: number): Promise<Blog | null> {
    try {
      console.log(`Getting blog ${blogId} from PostgreSQL...`);
      
      const blogResult = await query(`
        SELECT 
          id,
          slug,
          published_date,
          title,
          subtitle,
          banner_image,
          seo_meta_title,
          seo_meta_description,
          seo_keywords
        FROM blogs 
        WHERE id = $1 AND is_deleted = 0
      `, [blogId]);

      if (blogResult.rows.length === 0) {
        return null;
      }

      const blogRow = blogResult.rows[0];

      const paragraphsResult = await query(`
        SELECT content, image_url
        FROM blog_paragraphs
        WHERE blog_id = $1 AND is_deleted = 0
        ORDER BY id ASC
      `, [blogId]);

      const blog: Blog = {
        id: blogRow.id,
        slug: blogRow.slug,
        publishedDate: blogRow.published_date.toISOString(),
        title: blogRow.title,
        subtitle: blogRow.subtitle || '',
        bannerImage: blogRow.banner_image || '',
        content: paragraphsResult.rows.map(p => ({
          content: p.content,
          img: p.image_url
        })),
        seo: {
          metaTitle: blogRow.seo_meta_title || '',
          metaDescription: blogRow.seo_meta_description || '',
          keywords: blogRow.seo_keywords || ''
        }
      };

      return blog;
    } catch (error) {
      console.error('Error getting blog by ID from PostgreSQL:', error);
      return null;
    }
  }

  // Get a single blog by slug
  static async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      console.log(`Getting blog with slug ${slug} from PostgreSQL...`);
      
      const blogResult = await query(`
        SELECT 
          id,
          slug,
          published_date,
          title,
          subtitle,
          banner_image,
          seo_meta_title,
          seo_meta_description,
          seo_keywords
        FROM blogs 
        WHERE slug = $1 AND is_deleted = 0
      `, [slug]);

      if (blogResult.rows.length === 0) {
        return null;
      }

      const blogRow = blogResult.rows[0];

      const paragraphsResult = await query(`
        SELECT content, image_url
        FROM blog_paragraphs
        WHERE blog_id = $1 AND is_deleted = 0
        ORDER BY id ASC
      `, [blogRow.id]);

      const blog: Blog = {
        id: blogRow.id,
        slug: blogRow.slug,
        publishedDate: blogRow.published_date.toISOString(),
        title: blogRow.title,
        subtitle: blogRow.subtitle || '',
        bannerImage: blogRow.banner_image || '',
        content: paragraphsResult.rows.map(p => ({
          content: p.content,
          img: p.image_url
        })),
        seo: {
          metaTitle: blogRow.seo_meta_title || '',
          metaDescription: blogRow.seo_meta_description || '',
          keywords: blogRow.seo_keywords || ''
        }
      };

      return blog;
    } catch (error) {
      console.error('Error getting blog by slug from PostgreSQL:', error);
      return null;
    }
  }

  // Get all blogs including deleted ones (for admin)
  static async getAllBlogsIncludingDeleted(): Promise<BlogsData & { blogs: (Blog & { isDeleted?: boolean; deletedAt?: string })[] }> {
    try {
      console.log('Fetching all blogs (including deleted) from PostgreSQL...');
      
      const blogsResult = await query(`
        SELECT 
          blog_id,
          slug,
          published_date,
          title,
          subtitle,
          banner_image,
          seo_meta_title,
          seo_meta_description,
          seo_keywords,
          is_deleted,
          deleted_at
        FROM blogs 
        ORDER BY published_date DESC
      `);

      const blogs: (Blog & { isDeleted?: boolean; deletedAt?: string })[] = [];

      for (const blogRow of blogsResult.rows) {
        const paragraphsResult = await query(`
          SELECT paragraph_id, content, image_url
          FROM blog_paragraphs
          WHERE blog_id = $1 AND is_deleted = 0
          ORDER BY paragraph_id ASC
        `, [blogRow.blog_id]);

        const blog = {
          id: blogRow.blog_id,
          slug: blogRow.slug,
          publishedDate: blogRow.published_date.toISOString(),
          title: blogRow.title,
          subtitle: blogRow.subtitle || '',
          bannerImage: blogRow.banner_image || '',
          content: paragraphsResult.rows.map(p => ({
            content: p.content,
            img: p.image_url
          })),
          seo: {
            metaTitle: blogRow.seo_meta_title || '',
            metaDescription: blogRow.seo_meta_description || '',
            keywords: blogRow.seo_keywords || ''
          },
          isDeleted: blogRow.is_deleted,
          deletedAt: blogRow.deleted_at ? blogRow.deleted_at.toISOString() : undefined
        };

        blogs.push(blog);
      }

      console.log(`Found ${blogs.length} blogs (including deleted) in PostgreSQL`);
      return { blogs };
    } catch (error) {
      console.error('Error getting all blogs from PostgreSQL:', error);
      return { blogs: [] };
    }
  }

  // Restore a soft-deleted blog
  static async restoreBlog(blogId: string): Promise<{ success: boolean; restoredBlog?: Blog; error?: string }> {
    try {
      console.log(`Restoring blog ${blogId} in PostgreSQL...`);
      
      // Begin transaction
      await query('BEGIN');

      try {
        // Restore blog
        const result = await query(`
          UPDATE blogs 
          SET is_deleted = 0, deleted_at = NULL, updated_at = NOW()
          WHERE blog_id = $1 AND is_deleted = 1
        `, [blogId]);

        if (result.rowCount === 0) {
          await query('ROLLBACK');
          return { success: false, error: 'Blog not found or not deleted' };
        }

        // Restore all paragraphs of this blog
        await query(`
          UPDATE blog_paragraphs 
          SET is_deleted = 0, deleted_at = NULL
          WHERE blog_id = $1 AND is_deleted = 1
        `, [blogId]);

        // Commit transaction
        await query('COMMIT');

        // Get the restored blog
        const restoredBlog = await this.getBlogById(blogId);

        console.log(`Blog ${blogId} restored successfully in PostgreSQL`);
        return { success: true, restoredBlog: restoredBlog || undefined };
      } catch (error) {
        // Rollback transaction on error
        await query('ROLLBACK');
        throw error;
      }
    } catch (error) {
      console.error('Error restoring blog in PostgreSQL:', error);
      return { success: false, error: 'Internal error restoring blog' };
    }
  }
}
