import { Link } from "react-router-dom";
import { FaRocket, FaArrowRight, FaShieldAlt, FaUsers, FaCheckCircle } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-8 right-8 w-24 h-24 bg-purple-500 bg-opacity-20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-10 rounded-full text-xs font-medium backdrop-blur-sm border border-white border-opacity-20 mb-4">
            🚀 Ready to Transform Your Institution?
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Start Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Digital Transformation
          </span>{" "}
          Today
        </h2>
        
        <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of educational institutions that have already revolutionized their 
          complaint management process with our modern, efficient platform.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white border-opacity-20">
            <FaShieldAlt className="text-blue-400 w-4 h-4" />
            <span className="text-xs font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white border-opacity-20">
            <FaUsers className="text-green-400 w-4 h-4" />
            <span className="text-xs font-medium">Easy to Use</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white border-opacity-20">
            <FaCheckCircle className="text-purple-400 w-4 h-4" />
            <span className="text-xs font-medium">24/7 Support</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/signup">
            <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[180px]">
              <FaRocket className="group-hover:animate-bounce" />
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link to="/login">
            <button className="group flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-opacity-20 transition-all duration-300 min-w-[180px]">
              Sign In
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-white border-opacity-20 pt-6">
          <p className="text-xs text-gray-300 mb-3">Trusted by educational institutions nationwide</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span className="text-xs">Free 30-Day Trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span className="text-xs">Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
      </div>
    </section>
  );
};

export default CTASection;
