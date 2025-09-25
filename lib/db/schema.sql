-- Create database for cocounselor blogs
-- Note: Run this manually in your PostgreSQL instance

-- Create the database (run this first)
-- CREATE DATABASE cocounselor_blogs;

-- Connect to the database and run the following:

-- Create blogs table with auto-incremental ID
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly identifier
    published_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    title VARCHAR(500) NOT NULL,
    subtitle TEXT,
    banner_image VARCHAR(1000),
    seo_meta_title VARCHAR(500),
    seo_meta_description TEXT,
    seo_keywords TEXT[], -- Array of keywords
    is_deleted BOOLEAN DEFAULT FALSE, -- Soft delete flag
    deleted_at TIMESTAMP WITH TIME ZONE NULL, -- When was it deleted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_paragraphs table for blog content
CREATE TABLE IF NOT EXISTS blog_paragraphs (
    id SERIAL PRIMARY KEY,
    blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
    paragraph_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(1000),
    is_deleted BOOLEAN DEFAULT FALSE, -- Soft delete flag for paragraphs
    deleted_at TIMESTAMP WITH TIME ZONE NULL, -- When was it deleted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(blog_id, paragraph_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published_date ON blogs(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_title ON blogs(title);
CREATE INDEX IF NOT EXISTS idx_blogs_is_deleted ON blogs(is_deleted);
CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_blog_id ON blog_paragraphs(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_order ON blog_paragraphs(blog_id, paragraph_id);
CREATE INDEX IF NOT EXISTS idx_blog_paragraphs_is_deleted ON blog_paragraphs(is_deleted);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data (optional)
-- INSERT INTO blogs (blog_id, title, subtitle, banner_image, seo_meta_title, seo_meta_description, seo_keywords)
-- VALUES (
--     'post-001',
--     'Welcome to Our Blog',
--     'Getting started with our legal practice insights',
--     'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
--     'Welcome to Our Legal Practice Blog',
--     'Discover insights, tips, and best practices for legal professionals and law firms.',
--     ARRAY['legal practice', 'law firm management', 'legal insights']
-- );

-- INSERT INTO blog_paragraphs (blog_id, paragraph_id, content, image_url)
-- VALUES 
--     ('post-001', 1, 'Welcome to our blog where we share insights about legal practice management and industry trends.', NULL),
--     ('post-001', 2, 'We are committed to providing valuable content that helps legal professionals improve their practice.', 'https://images.unsplash.com/photo-1664382953465-efe3e9c30c58?w=600&h=300&fit=crop');
