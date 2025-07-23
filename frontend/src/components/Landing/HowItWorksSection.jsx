import React, { useRef, useEffect, useState } from "react";
import { FaUserPlus, FaFileAlt, FaChartLine, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const steps = [
  {
    icon: FaUserPlus,
    title: "Create an Account",
    desc: "Sign up with your institutional email and basic information to get started with our secure platform.",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: FaFileAlt,
    title: "Submit Your Complaint",
    desc: "Fill out our intuitive complaint form with all relevant details, attachments, and category selection.",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100"
  },
  {
    icon: FaChartLine,
    title: "Track Progress",
    desc: "Monitor real-time updates as administrators work on your case with detailed status tracking.",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    icon: FaCheckCircle,
    title: "Resolution Complete",
    desc: "Receive notifications when your complaint is resolved and provide feedback on the solution.",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100"
  }
];

const HowItWorksSection = () => {
  const step2Ref = useRef(null);
  const [step2Height, setStep2Height] = useState(null);

  useEffect(() => {
    if (step2Ref.current) {
      setStep2Height(step2Ref.current.offsetHeight);
    }
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium mb-4">
            📋 Simple Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our streamlined 4-step process makes complaint submission and tracking 
            simple, efficient, and transparent for everyone.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 to-indigo-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              // Attach ref to Step 2, set height for Step 4
              const cardProps = {};
              if (idx === 1) cardProps.ref = step2Ref;
              if (idx === 3 && step2Height) cardProps.style = { height: step2Height };
              return (
                <div key={idx} className="relative">
                  <div
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
                    {...cardProps}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {idx + 1}
            </div>
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${step.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-xl text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
              {step.title}
            </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-4 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <span>Step {idx + 1}</span>
                        <FaArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-3">
                      <FaArrowRight className="text-gray-400 w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </div>


    </div>
  </section>
);
};

export default HowItWorksSection;

