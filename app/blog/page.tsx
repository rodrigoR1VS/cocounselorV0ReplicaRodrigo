export default function BlogPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Legal Practice <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and best practices for Personal Injury law firms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700"></div>
            <div className="p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">Case Management</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Streamlining Your PI Case Workflow
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to optimize your case management process for better client outcomes and increased efficiency.
              </p>
              <div className="text-sm text-gray-500">March 15, 2024</div>
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-500 to-green-700"></div>
            <div className="p-6">
              <div className="text-sm text-green-600 font-semibold mb-2">Client Communication</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Building Strong Client Relationships
              </h3>
              <p className="text-gray-600 mb-4">
                Discover strategies for maintaining clear communication and building trust with your clients throughout their case.
              </p>
              <div className="text-sm text-gray-500">March 10, 2024</div>
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700"></div>
            <div className="p-6">
              <div className="text-sm text-purple-600 font-semibold mb-2">Technology</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                The Future of Legal Technology
              </h3>
              <p className="text-gray-600 mb-4">
                Explore how emerging technologies are transforming the legal industry and what it means for your practice.
              </p>
              <div className="text-sm text-gray-500">March 5, 2024</div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
