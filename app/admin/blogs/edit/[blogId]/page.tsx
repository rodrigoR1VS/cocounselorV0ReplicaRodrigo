'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAdminAuth } from '@/lib/adminAuth';

interface BlogData {
  title: string;
  subtitle: string;
  bannerImage: string;
  content: Array<{
    paragraphId: number;
    content: string;
    img: string | null;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface EditBlogPageProps {
  params: { blogId: string };
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [blogNotFound, setBlogNotFound] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const [blogData, setBlogData] = useState<BlogData>({
    title: '',
    subtitle: '',
    bannerImage: '',
    content: [{ paragraphId: 1, content: '', img: null }],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });

  const router = useRouter();
  const { blogId } = params;
  const auth = useAdminAuth();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (auth.isAuthenticated()) {
        setIsAuthenticated(true);
        setRemainingTime(auth.getRemainingTime());
        fetchBlog();
      }
    };

    checkAuth();

    // Update remaining time every minute
    const interval = setInterval(() => {
      if (auth.isAuthenticated()) {
        const time = auth.getRemainingTime();
        setRemainingTime(time);
        if (time === 0) {
          setIsAuthenticated(false);
          setError('Session expired. Please login again.');
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (auth.verifyAndLogin(password)) {
      setIsAuthenticated(true);
      setRemainingTime(auth.getRemainingTime());
      await fetchBlog();
    } else {
      setError('Incorrect password');
    }
    
    setIsLoading(false);
  };

  const fetchBlog = async () => {
    setLoadingBlog(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (response.ok) {
        const blog = await response.json();
        setBlogData({
          title: blog.title,
          subtitle: blog.subtitle,
          bannerImage: blog.bannerImage,
          content: blog.content,
          seo: blog.seo
        });
      } else if (response.status === 404) {
        setBlogNotFound(true);
      } else {
        setError('Error loading blog');
      }
    } catch (err) {
      setError('Connection error');
    }
    setLoadingBlog(false);
  };

  const addParagraph = () => {
    setBlogData(prev => ({
      ...prev,
      content: [
        ...prev.content,
        {
          paragraphId: prev.content.length + 1,
          content: '',
          img: null
        }
      ]
    }));
  };

  const updateParagraph = (index: number, field: 'content' | 'img', value: string) => {
    setBlogData(prev => ({
      ...prev,
      content: prev.content.map((p, i) => 
        i === index ? { ...p, [field]: value || null } : p
      )
    }));
  };

  const removeParagraph = (index: number) => {
    if (blogData.content.length > 1) {
      setBlogData(prev => ({
        ...prev,
        content: prev.content.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setSuccess('Blog updated successfully!');
      } else {
        setError('Error updating blog');
      }
    } catch (err) {
      setError('Connection error');
    }

    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Edit Blog - {blogId}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter password to access
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Access'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loadingBlog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (blogNotFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">The blog post with ID "{blogId}" was not found.</p>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Blog - {blogId}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push('/admin')}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={() => window.open(`/blog/${blogId}`, '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Live →
              </button>
            </div>
          </div>

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={blogData.title}
                  onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={blogData.subtitle}
                  onChange={(e) => setBlogData(prev => ({ ...prev, subtitle: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Banner Image URL</label>
                <input
                  type="url"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={blogData.bannerImage}
                  onChange={(e) => setBlogData(prev => ({ ...prev, bannerImage: e.target.value }))}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Content</h3>
                <button
                  type="button"
                  onClick={addParagraph}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Add Paragraph
                </button>
              </div>

              {blogData.content.map((paragraph, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Paragraph {index + 1}</h4>
                    {blogData.content.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Text</label>
                      <textarea
                        required
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={paragraph.content}
                        onChange={(e) => updateParagraph(index, 'content', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                      <input
                        type="url"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={paragraph.img || ''}
                        onChange={(e) => updateParagraph(index, 'img', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SEO */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO</h3>
              
              <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={blogData.seo.metaTitle}
                    onChange={(e) => setBlogData(prev => ({ 
                      ...prev, 
                      seo: { ...prev.seo, metaTitle: e.target.value }
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={blogData.seo.metaDescription}
                    onChange={(e) => setBlogData(prev => ({ 
                      ...prev, 
                      seo: { ...prev.seo, metaDescription: e.target.value }
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Keywords (comma separated)</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="keyword1, keyword2, keyword3"
                    value={blogData.seo.keywords.join(', ')}
                    onChange={(e) => setBlogData(prev => ({ 
                      ...prev, 
                      seo: { 
                        ...prev.seo, 
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Blog'}
              </button>
            </div>
          </form>
          </div>

          {/* Preview Column */}
          <div className="bg-white shadow rounded-lg p-6 sticky top-8 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Live Preview</h2>
            
            {/* Blog Preview */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Banner Preview */}
              {blogData.bannerImage ? (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blogData.bannerImage}
                    alt={blogData.title || 'Blog preview'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
                  
                  {/* Title and Subtitle Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="space-y-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {blogData.title || 'Your Blog Title'}
                      </h1>
                      <h2 className="text-lg text-gray-200">
                        {blogData.subtitle || 'Your blog subtitle'}
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p>Banner image will appear here</p>
                  </div>
                </div>
              )}

              {/* Content Preview */}
              <div className="p-6">
                <div className="space-y-6">
                  {blogData.content.length > 0 && blogData.content[0].content ? (
                    blogData.content.map((paragraph, index) => (
                      <div key={index} className="space-y-4">
                        {paragraph.content && (
                          <p className="text-gray-700 leading-relaxed">
                            {paragraph.content}
                          </p>
                        )}
                        {paragraph.img && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                              src={paragraph.img}
                              alt={`Paragraph ${index + 1} image`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <div className="text-4xl mb-2">📝</div>
                      <p>Your blog content will appear here</p>
                    </div>
                  )}
                </div>

                {/* SEO Preview */}
                {(blogData.seo.metaTitle || blogData.seo.metaDescription) && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">SEO Preview</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-blue-600 text-lg font-medium line-clamp-1">
                        {blogData.seo.metaTitle || blogData.title}
                      </div>
                      <div className="text-green-600 text-sm">
                        yoursite.com/blog/{blogId}
                      </div>
                      <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {blogData.seo.metaDescription}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
