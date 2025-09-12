import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Data Security",
      role: "Advanced Protection",
      company: "Enterprise Grade",
      content: "At CoCounselor, we prioritize data security with advanced encryption and strict access controls. All data is stored on secure servers with regular backups to prevent loss.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Industry Compliance",
      role: "Regulatory Standards",
      company: "Legal Requirements",
      content: "We comply with industry standards and regulations to ensure that your sensitive information is protected. Our team is dedicated to maintaining the highest level of security.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    },
    {
      name: "Client Focus",
      role: "Peace of Mind",
      company: "Your Practice",
      content: "Focus on your clients without worrying about data breaches. CoCounselor offers comprehensive security so you can concentrate on what matters most.",
      avatar: "/placeholder-user.jpg",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why CoCounselor?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CoCounselor streamlines case management by providing tools that help personal injury firms efficiently track cases, manage client communications, and automate workflows.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
