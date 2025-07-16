import React from "react";
import { FaQuoteLeft, FaStar, FaUserGraduate, FaUserTie, FaUniversity } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Computer Science Student",
    institution: "University of Technology",
    avatar: "SJ",
    rating: 5,
    content: "The complaint system made it so easy to report issues in my dormitory. Within a week, the maintenance team fixed everything. I'm impressed with how efficiently the whole process worked!",
    category: "student"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Faculty Administrator",
    institution: "Engineering Department",
    avatar: "MC",
    rating: 5,
    content: "As an administrator, this platform has revolutionized how we handle student concerns. The real-time tracking and automated notifications save us hours of work every week.",
    category: "faculty"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Student",
    institution: "School of Management",
    avatar: "ER",
    rating: 5,
    content: "I love how transparent the process is. I can see exactly what's happening with my complaint and get updates in real-time. It gives me confidence that my voice is being heard.",
    category: "student"
  },
  {
    id: 4,
    name: "Prof. David Thompson",
    role: "Department Head",
    institution: "Science Faculty",
    avatar: "DT",
    rating: 5,
    content: "The analytics dashboard helps us identify common issues and improve our services. It's a game-changer for institutional management and student satisfaction.",
    category: "faculty"
  }
];

const TestimonialSection = () => (
  <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-60 rounded-full text-xs font-medium backdrop-blur-sm border border-gray-200 mb-4">
          ⭐ Trusted by Thousands
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          What Our{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Users Say
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Hear from students and administrators who have transformed their complaint 
          management experience with our platform.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden group"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-3 right-3 text-indigo-200 group-hover:text-indigo-300 transition-colors duration-300">
              <FaQuoteLeft className="text-lg" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-3 h-3" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-4 italic text-sm">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full flex items-center justify-center shadow-md text-sm">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {testimonial.category === 'student' ? (
                      <FaUserGraduate className="text-indigo-500 w-2.5 h-2.5" />
                    ) : (
                      <FaUserTie className="text-purple-500 w-2.5 h-2.5" />
                    )}
                    <span className="text-xs text-gray-500">{testimonial.institution}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">98%</div>
            <p className="text-gray-600 text-sm">Satisfaction Rate</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">24hrs</div>
            <p className="text-gray-600 text-sm">Average Response Time</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">10K+</div>
            <p className="text-gray-600 text-sm">Complaints Resolved</p>
          </div>
        </div>
      </div>


    </div>
  </section>
);

export default TestimonialSection;
