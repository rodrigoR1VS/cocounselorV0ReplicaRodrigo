import { BlogStorage } from '@/lib/blogStorage';
import BlogPreviewCard from '@/components/pages/blog/BlogPreviewCard';
import Pagination from '@/components/pages/blog/Pagination';

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const blogsPerPage = 9;
  
  try {
    // Get all blogs from PostgreSQL
    const blogsData = await BlogStorage.getAllBlogs();
    const allBlogs = blogsData.blogs;
    
    // Calculate pagination
    const totalBlogs = allBlogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const blogs = allBlogs.slice(startIndex, endIndex);
    
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Legal Practice <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Stay updated with the latest trends, tips, and best practices for Personal Injury law firms.
            </p>
            <p className="text-sm text-gray-500">
              {totalBlogs} articles • Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Blog Grid */}
          {blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.map((blog) => (
                  <BlogPreviewCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                basePath="/blog"
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
              <p className="text-gray-500">Check back later for new content.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Error loading blogs</h3>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }
}
