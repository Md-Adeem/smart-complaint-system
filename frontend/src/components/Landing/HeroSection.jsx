import React from "react";
import heroImage from "../../assets/IMG1.png";
import CountUp from "react-countup";
import {
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaArrowRight,
  FaPlay,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const stats = [
  {
    id: 1,
    icon: <FaCheckCircle className="text-green-400 w-6 h-6" />,
    end: 500,
    label: "Complaints Resolved",
    suffix: "+",
  },
  {
    id: 2,
    icon: <FaUsers className="text-blue-400 w-6 h-6" />,
    end: 1000,
    label: "Active Users",
    suffix: "+",
  },
  {
    id: 3,
    icon: <FaBuilding className="text-purple-400 w-6 h-6" />,
    end: 150,
    label: "Educational Institutions",
    suffix: "+",
  },
];

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 md:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left content */}
          <div className="text-center lg:text-left max-w-xl lg:max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-10 rounded-full text-xs font-medium backdrop-blur-sm border border-white border-opacity-20">
                🚀 Streamlined Complaint Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-6 text-white">
              Smart Complaint{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Management
              </span>{" "}
              System
          </h1>

            <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
              Empowering students and administrators with a modern, efficient
              platform for seamless complaint resolution and transparent
              communication.
            </p>

            {/* Animated Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {stats.map(({ id, icon, end, label, suffix }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl px-4 py-3 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 text-left"
                >
                  <div className="flex-shrink-0">{icon}</div>
                  <div className="text-left">
                    <div className="text-xl sm:text-2xl font-bold text-left text-white">
                      <CountUp end={end} duration={3} suffix={suffix} />
                    </div>
                    <p className="text-xs text-white/80 font-medium text-left">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link
                to="/signup"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to=""
                className="group flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-opacity-20 transition-all duration-300"
              >
                <FaPlay className="text-sm" />
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-white border-opacity-20">
              <p className="text-xs text-gray-300 mb-3 text-center lg:text-left">
                Trusted by educational institutions nationwide
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 opacity-60">
                <div className="flex items-center gap-1.5">
                  <FaShieldAlt className="text-xs" />
                  <span className="text-xs font-medium text-white">Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-xs" />
                  <span className="text-xs font-medium text-white">24/7 Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaUsers className="text-xs" />
                  <span className="text-xs font-medium text-white">Easy to Use</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[90vw] sm:max-w-sm lg:max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={heroImage}
                alt="Smart Complaint System Illustration"
                className="relative w-full h-auto drop-shadow-2xl rounded-2xl float-animate"
              />
            </div>
          </div>
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white border-opacity-30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white bg-opacity-60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
