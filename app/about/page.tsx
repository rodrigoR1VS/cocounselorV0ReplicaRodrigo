export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About CoCounselor</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            CoCounselor is the leading legal practice management software designed specifically for Personal Injury law firms.
          </p>
          <p className="text-gray-600 mb-6">
            Our platform streamlines case management, client communication, and administrative tasks, allowing attorneys to focus on what matters most - representing their clients and winning cases.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To empower Personal Injury law firms with tailored solutions that maximize efficiency, enhance client service, and drive success.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose CoCounselor?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Custom workflows designed for PI law firms</li>
            <li>Automated case management and client communication</li>
            <li>Advanced security and compliance features</li>
            <li>Dedicated support team</li>
            <li>Seamless integration with existing tools</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
