import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StudentTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Md Adeem",
      role: "Computer Science Student",
      // university: "Integral University",
      avatar: "👨‍🎓",
      rating: 5,
      text: "Honestly, I was skeptical at first, but the complaint system really surprised me. I reported a broken fan in my hostel room, and not only did I get updates, but the maintenance team actually fixed it the next day.",
      category: "Infrastructure"
    },
    {
      id: 2,
      name: "Inzamam siddiqui",
      role: "Engineering Student",
      // university: "Engineering Institute",
      avatar: "👨‍🎓",
      rating: 4,
      text: "I had an issue with my exam schedule clashing with a lab. I submitted a complaint, and while it took a couple of days to get a response, the admin team did follow up and helped me sort it out.",
      category: "Academic"
    },
    {
      id: 3,
      name: "Md Asif sheikh ",
      role: "Business Student",
      // university: "Business School",
      avatar: "👩‍🎓",
      rating: 3,
      text: "I love how transparent the system is. I could see every step after I submitted my complaint about the library WiFi. It took a week to resolve, but at least I knew what was happening. The notifications are super helpful!",
      category: "Technology"
    },
    {
      id: 4,
      name: "Fraz ahmad haidry",
      role: "Medical Student",
      // university: "Medical College",
      avatar: "👨‍🎓",
      rating: 4,
      text: "The system is easy to use, but I wish the response time was a bit faster. My complaint about lab equipment took almost a week to get sorted. Still, it's better than chasing staff in person.",
      category: "Academic"
    },
    {
      id: 5,
      name: "Mohammad Faraz",
      role: "Arts Student",
      // university: "Arts University",
      avatar: "👩‍🎓",
      rating: 5,
      text: "I submitted a complaint from my phone while waiting for class, and it actually worked! The interface is clean, and I got a reply from the admin the same day. Super convenient for busy students like me.",
      category: "General"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);
  const total = testimonials.length;

  // Auto-advance every 6 seconds unless hovered
  useEffect(() => {
    if (!hovered) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 6000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, hovered]);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + total) % total);
      setFade(true);
    }, 250);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
      setFade(true);
    }, 250);
  };

  const t = testimonials[current];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-full text-xs font-medium text-purple-700 mb-4">
            💬 Student Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            What Students{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real experiences from students who have used our complaint management system.
          </p>
        </div>

        {/* Carousel Card */}
        <div
          className="relative flex justify-center items-center min-h-[320px] sm:min-h-[370px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-gray-600 text-lg sm:text-xl" />
          </button>

          {/* Testimonial Card with Fade */}
          <div
            className={`w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ minHeight: 240, maxWidth: '100%' }}
          >
            <span className="text-3xl sm:text-5xl mb-4">{t.avatar}</span>
            <FaQuoteLeft className="text-purple-200 text-2xl sm:text-3xl mb-2" />
            <div className="mb-6 w-full relative flex items-center justify-center" style={{ minHeight: '5.5rem' }}>
              <p className="text-gray-700 text-lg italic text-center line-clamp-5" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                "{t.text}"
              </p>
              {/* Fade-out gradient overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)' }} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-800 text-lg">{t.name}</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-2">
                {t.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{t.role}</p>
            <p className="text-xs text-gray-400 mb-2">{t.university}</p>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
              ))}
            </div>
            <span className="text-xs text-gray-400">Verified Student</span>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-gray-600 text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials; 