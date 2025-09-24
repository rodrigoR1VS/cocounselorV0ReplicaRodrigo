import blogsData from '../blogs.json';

// Types
export interface BlogParagraph {
  paragraphId: number;
  content: string;
  img: string | null;
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Blog {
  blogId: string;
  publishedDate: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  content: BlogParagraph[];
  seo: BlogSEO;
}

export interface BlogPreview {
  blogId: string;
  publishedDate: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  metaDescription: string;
}

// Optimized blog map for O(1) lookups
let blogsMap: Map<string, Blog> | null = null;

function initializeBlogsMap(): Map<string, Blog> {
  if (blogsMap === null) {
    blogsMap = new Map();
    blogsData.blogs.forEach((blog: Blog) => {
      blogsMap!.set(blog.blogId, blog);
    });
  }
  return blogsMap;
}

// Helper function to get a blog by ID - O(1) lookup
export function getBlogById(blogId: string): Blog | null {
  const map = initializeBlogsMap();
  return map.get(blogId) || null;
}

// Helper function to get blog previews - lightweight for grid display
// Sorted by publishedDate DESC (newest first)
export function getBlogPreviews(): BlogPreview[] {
  return blogsData.blogs
    .map((blog: Blog) => ({
      blogId: blog.blogId,
      publishedDate: blog.publishedDate,
      title: blog.title,
      subtitle: blog.subtitle,
      bannerImage: blog.bannerImage,
      metaDescription: blog.seo.metaDescription,
    }))
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

// Pagination helper
export function getPaginatedBlogPreviews(page: number = 1, blogsPerPage: number = 9): {
  blogs: BlogPreview[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const allBlogs = getBlogPreviews();
  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const blogs = allBlogs.slice(startIndex, endIndex);

  return {
    blogs,
    currentPage,
    totalPages,
    totalBlogs,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

// Get all available blog IDs for static generation
export function getAllBlogIds(): string[] {
  return blogsData.blogs.map((blog: Blog) => blog.blogId);
}
