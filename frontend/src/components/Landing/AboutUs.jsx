import { FaUsers, FaShieldAlt, FaLightbulb, FaChartLine, FaGraduationCap, FaHandshake, FaRocket, FaHeart, FaAward, FaGlobe, FaClock, FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Md Adeem",
      role: "Project Lead & React Developer",
      image: "/assets/md-adeem-photo.jpg",
      description: "Leading the development of innovative complaint management solutions with expertise in modern web technologies and project coordination.",
      skills: ["React", "Node.js", "GitHub", "Project Management", "Team Leadership"],
      social: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/md-adeem/",
        email: "mdadeem14@gmail.com"
      }
    },
    {
      name: "Fraz Ahmad Haidry",
      role: "Backend Developer & Technical Lead",
      image: "assets/Fraz.jpg",
      description: "Expert in full-stack development and system architecture with a focus on scalable backend solutions and database design.",
      skills: ["Node.js", "MongoDB", "Express", "System Design", "API Development"],
      social: {
        github: "#",
        linkedin: "#",
        email: "fraz@example.com"
      }
    },
    {
      name: "Md Asif Sheikh",
      role: "Frontend Developer",
      image: "/assets/Asif.jpg",
      description: "Creating intuitive and beautiful user experiences with modern design principles and responsive web development.",
      skills: ["React", "Tailwind CSS", "UI/UX", "JavaScript", "Responsive Design"],
      social: {
        github: "#",
        linkedin: "#",
        email: "asif@example.com"
      }
    },
    {
      name: "Inzamam Siddiqui",
      role: "Frontend Developer",
      image: "/assets/Inzamam.jpg",
      description: "Building robust and scalable frontend systems with attention to performance optimization and code quality.",
      skills: ["React", "TypeScript", "Performance", "Testing", "Code Quality"],
      social: {
        github: "#",
        linkedin: "#",
        email: "inzamam@example.com"
      }
    },
    {
      name: "Mohammad Faraz",
      role: "UI/UX Designer",
      image: "/assets/faraz.jpg",
      description: "Passionate about creating seamless user experiences and intuitive interface designs that enhance user engagement.",
      skills: ["UI/UX Design", "Figma", "Prototyping", "User Research", "Design Systems"],
      social: {
        github: "#",
        linkedin: "#",
        email: "faraz@example.com"
      }
    }
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, role-based access control, and GDPR compliance.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "AI-Powered Insights",
      description: "Smart analytics and machine learning algorithms to predict and prevent issues before they escalate.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with real-time metrics, trend analysis, and performance indicators.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Education-First Design",
      description: "Built specifically for educational institutions with features that enhance student experience.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "Constantly pushing boundaries to create better solutions"
    },
    {
      icon: <FaHeart />,
      title: "Empathy",
      description: "Understanding and addressing real user needs"
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "Delivering the highest quality in everything we do"
    },
    {
      icon: <FaHandshake />,
      title: "Trust",
      description: "Building lasting relationships through transparency"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-500 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Smart Complaint</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              We're revolutionizing how educational institutions handle student feedback and complaints, 
              making the process more efficient, transparent, and student-friendly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Trusted by 50+ Institutions
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                500+ Complaints Resolved
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                95% Satisfaction Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To bridge the gap between students and administration by providing a modern, 
                efficient platform that ensures every voice is heard and every concern is addressed promptly.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that better communication leads to better education. Our platform 
                empowers students to report issues easily while giving administrators the tools 
                they need to respond effectively and track improvements over time.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                  <FaHandshake className="text-xl" />
                  <span>Trusted by 50+ Institutions</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <FaAward className="text-xl" />
                  <span>Industry Award Winner</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Streamlined complaint submission process with smart categorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Real-time status tracking and instant notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comprehensive analytics and performance reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Enterprise-grade security with role-based access control</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mobile-responsive design for access anywhere, anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-centered design to deliver 
              the best complaint management experience for educational institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals is committed to building the best 
              complaint management system for educational institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-3">
                  <a href={member.social.github} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.018L12 12.27l10.346-8.449h.018c.904 0 1.636.732 1.636 1.636z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 