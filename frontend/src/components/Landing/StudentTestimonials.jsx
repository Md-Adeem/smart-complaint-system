import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StudentTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      university: "Tech University",
      avatar: "👩‍🎓",
      rating: 5,
      text: "The complaint system is incredibly user-friendly! I submitted a hostel maintenance issue and it was resolved within 2 days. The real-time updates kept me informed throughout the process.",
      category: "Infrastructure"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Engineering Student",
      university: "Engineering Institute",
      avatar: "👨‍🎓",
      rating: 5,
      text: "As an international student, I was worried about language barriers. But the system is so intuitive and the admin team responded quickly to my academic concerns.",
      category: "Academic"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business Student",
      university: "Business School",
      avatar: "👩‍🎓",
      rating: 4,
      text: "The transparency of the complaint tracking is amazing. I can see exactly where my issue stands and get notifications when there are updates. Highly recommend!",
      category: "General"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Medical Student",
      university: "Medical College",
      avatar: "👨‍🎓",
      rating: 5,
      text: "I had a complex academic issue that required multiple follow-ups. The system made it easy to track all communications and the resolution was satisfactory.",
      category: "Academic"
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "Arts Student",
      university: "Arts University",
      avatar: "👩‍🎓",
      rating: 5,
      text: "The mobile responsiveness is perfect! I can submit and track complaints from my phone. The interface is clean and the process is straightforward.",
      category: "Technology"
    }
  ];

  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 3;
  const total = testimonials.length;

  // Calculate the current window of testimonials
  const getWindowTestimonials = () => {
    if (total <= windowSize) return testimonials;
    if (windowStart + windowSize <= total) {
      return testimonials.slice(windowStart, windowStart + windowSize);
    } else {
      // Wrap around
      return [
        ...testimonials.slice(windowStart, total),
        ...testimonials.slice(0, (windowStart + windowSize) % total)
      ];
    }
  };

  const nextWindow = () => {
    setWindowStart((prev) => (prev + 1) % total);
  };

  const prevWindow = () => {
    setWindowStart((prev) => (prev - 1 + total) % total);
  };

  // Dots: one for each possible window start
  const numDots = total;

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-full text-xs font-medium text-purple-700 mb-4">
            💬 Student Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            What Students{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real experiences from students who have used our complaint management system. 
            See how it has improved their academic journey.
          </p>
        </div>

        {/* Sliding Window Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {getWindowTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              <div className="relative mb-4">
                <FaQuoteLeft className="text-purple-200 text-2xl mb-2" />
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {testimonial.category}
                </span>
                <span className="text-xs text-gray-400">
                  Verified Student
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevWindow}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: numDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setWindowStart(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === windowStart ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextWindow}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">2.3</div>
            <div className="text-sm text-gray-600">Avg. Resolution Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials; 