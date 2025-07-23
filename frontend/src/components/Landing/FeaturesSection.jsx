import { FaBug, FaTachometerAlt, FaLock, FaUsers, FaShieldAlt, FaBell, FaChartLine, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: FaBug,
    title: "Easy Complaint Submission",
    description:
      "Submit your issues effortlessly with our intuitive and user-friendly platform designed for seamless interaction.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100"
  },
  {
    icon: FaTachometerAlt,
    title: "Real-Time Tracking",
    description:
      "Stay informed with live updates on the status of your complaints with instant notifications and progress tracking.",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100"
  },
  {
    icon: FaLock,
    title: "Secure & Private",
    description:
      "Your data and complaints are protected with top-tier security and privacy protocols ensuring complete confidentiality.",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100"
  },
  {
    icon: FaUsers,
    title: "Multi-Role Support",
    description:
      "Comprehensive support for students, administrators, and staff with role-based access and tailored interfaces.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100"
  },
  {
    icon: FaShieldAlt,
    title: "Data Protection",
    description:
      "Advanced encryption and compliance with data protection regulations to safeguard all user information.",
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    icon: FaBell,
    title: "Smart Notifications",
    description:
      "Intelligent notification system that keeps you updated on complaint progress and important announcements.",
    gradient: "from-yellow-500 to-yellow-600",
    bgGradient: "from-yellow-50 to-yellow-100"
  },
  {
    icon: FaChartLine,
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics and reporting tools to track complaint trends and improve institutional efficiency.",
    gradient: "from-teal-500 to-teal-600",
    bgGradient: "from-teal-50 to-teal-100"
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Responsive",
    description:
      "Fully responsive design that works seamlessly across all devices - desktop, tablet, and mobile phones.",
    gradient: "from-pink-500 to-pink-600",
    bgGradient: "from-pink-50 to-pink-100"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-60 rounded-full text-xs font-medium backdrop-blur-sm border border-gray-200 mb-4">
            ✨ Powerful Features
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Efficient Complaint Management
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools and features needed to streamline 
            complaint resolution and improve communication between students and administrators.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden mb-4"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-xl text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {feature.description}
                  </p>


                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default FeaturesSection;

