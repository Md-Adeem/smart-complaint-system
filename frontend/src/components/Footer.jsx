import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/loginform" },
    { name: "Sign Up", path: "/signup" },
    { name: "About Us", path: "/about" },
    // { name: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: FaFacebookF, 
      url: "", 
      bgClass: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
    },
    { 
      name: "Twitter", 
      icon: FaTwitter, 
      url: "", 
      bgClass: "from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700" 
    },
    { 
      name: "LinkedIn", 
      icon: FaLinkedinIn, 
      url: "", 
      bgClass: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
    },
    { 
      name: "GitHub", 
      icon: FaGithub, 
      url: "", 
      bgClass: "from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900" 
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" role="contentinfo">
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
                <FaEnvelope className="text-indigo-400" aria-hidden="true" />
                <a 
                  href="mailto:support@smartcomplaint.edu" 
                  className="hover:text-indigo-400 transition-colors duration-200"
                  aria-label="Email us at support@smartcomplaint.edu"
                >
                  support@smartcomplaint.edu
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaPhone className="text-indigo-400" aria-hidden="true" />
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-indigo-400 transition-colors duration-200"
                  aria-label="Call us at +1 (555) 123-4567"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-indigo-400" aria-hidden="true" />
                <span>University Campus, Education District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group"
                      aria-label={`Navigate to ${link.name} page`}
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Connect With Us</h3>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media for updates and announcements.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.url} 
                    className={`w-10 h-10 bg-gradient-to-r ${social.bgClass} rounded-lg flex items-center justify-center text-white transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg`}
                    title={`Follow us on ${social.name}`}
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="text-sm" aria-hidden="true" />
                  </a>
                );
              })}
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
                © {currentYear} Smart Complaint Management System. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Crafted with <span className="text-red-400" aria-label="love">❤️</span> for students and administrators
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

