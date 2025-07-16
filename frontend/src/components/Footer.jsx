import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                🛠️
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Smart Complaint
                </h2>
                <p className="text-sm text-gray-400">Management System</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              A secure and efficient platform for campus issue resolution and complaint management. 
              Empowering students and administrators with streamlined communication and transparent processes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaEnvelope className="text-indigo-400" />
                <span>support@smartcomplaint.edu</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaPhone className="text-indigo-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-indigo-400" />
                <span>University Campus, Education District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Sign Up
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Connect With Us</h3>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media for updates and announcements.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                title="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg flex items-center justify-center text-white hover:from-sky-600 hover:to-sky-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                title="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                title="LinkedIn"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white hover:from-gray-800 hover:to-gray-900 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                title="GitHub"
              >
                <FaGithub className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Smart Complaint Management System. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Crafted with <span className="text-red-400">❤️</span> for students and administrators
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

