import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaGraduationCap, FaBuilding, FaExclamationTriangle } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "",
    department: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const validDomains = ['@student.iul.ac.in', '@iul.ac.in'];
    const emailLower = email.toLowerCase();
    
    // Check if email ends with any valid domain
    const isValidDomain = validDomains.some(domain => emailLower.endsWith(domain));
    
    if (!isValidDomain) {
      return {
        isValid: false,
        message: "Please use your college email id "
      };
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address"
      };
    }
    
    return { isValid: true, message: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear email error when user starts typing
    if (name === "emailId") {
      setEmailError("");
    }
  };

  const sendOtp = async () => {
    if (!formData.emailId) {
      alert("Please enter your email address first.");
      return;
    }

    // Validate email before sending OTP
    const emailValidation = validateEmail(formData.emailId);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    setLoading(true);
    try {
       await axiosInstance.post("/send-otp", {
        emailId: formData.emailId,
      });
      setOtpSent(true);
      setCurrentStep(2);
    } catch (error) {
      console.error("Send OTP error:", error);
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/verify-otp", {
        emailId: formData.emailId,
        otp,
      });

      if (res.data.success) {
        setEmailVerified(true);
        setCurrentStep(3);
      } else {
        alert("OTP verification failed.");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
      alert("Invalid or expired OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      alert("Please verify your email with OTP first.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/signup", formData, {
        withCredentials: true,
      });
      alert("Signup successful! Please login.");
      navigate("/loginform");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Signup failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && formData.firstName && formData.lastName && formData.emailId) {
      // Validate email before proceeding
      const emailValidation = validateEmail(formData.emailId);
      if (!emailValidation.isValid) {
        setEmailError(emailValidation.message);
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-blue-100">Join our Smart Complaint System</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Basic Info</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Verify Email</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      First Name <span className="text-red-500">*</span>
                    </label>
          <input
            type="text"
            name="firstName"
                      placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Last Name <span className="text-red-500">*</span>
                    </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
                  </div>
        </div>

        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
          <input
            type="email"
            name="emailId"
                    placeholder="Enter your college email address"
            value={formData.emailId}
            onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
            required
          />
                  {emailError && (
                    <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                      <FaExclamationTriangle className="text-red-500" />
                      <span>{emailError}</span>
                    </div>
                  )}
                  {/* <div className="mt-2 text-xs text-gray-500">
                    <p>✓ Use your college email address</p>
                    <p>✓ Students: @student.iul.ac.in</p>
                    <p>✓ Faculty: @iul.ac.in</p>
                  </div> */}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.firstName || !formData.lastName || !formData.emailId || emailError}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Email Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                  <p className="text-gray-600">We've sent a verification code to {formData.emailId}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <FaEnvelope className="text-blue-600 mr-3 text-xl" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Check Your Email</h3>
                      <p className="text-blue-600 text-sm">{formData.emailId}</p>
                    </div>
        </div>

        {!otpSent ? (
          <button
            type="button"
            onClick={sendOtp}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all font-medium"
          >
                      {loading ? "Sending..." : "Send Verification Code"}
          </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaShieldAlt className="inline mr-2" />
                          Enter Verification Code
                        </label>
            <input
              type="text"
                          placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                          maxLength="6"
              required
            />
                      </div>
                      
                      <div className="flex gap-3">
            <button
              type="button"
              onClick={verifyOtp}
                          disabled={loading || !otp}
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all font-medium"
                        >
                          {loading ? "Verifying..." : "Verify Code"}
                        </button>
                        
                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={loading}
                          className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
                        >
                          Resend
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Back
                  </button>
                  
                  {emailVerified && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                    >
                      Continue
            </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Complete Registration */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Registration</h2>
                  <p className="text-gray-600">Set up your account details</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <FaEnvelope className="text-green-600 mr-3 text-xl" />
                    <div>
                      <h3 className="font-semibold text-green-800">Email Verified ✓</h3>
                      <p className="text-green-600 text-sm">{formData.emailId}</p>
                    </div>
                  </div>
                </div>

        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaLock className="inline mr-2" />
                    Password <span className="text-red-500">*</span>
                  </label>
          <input
            type="password"
            name="password"
                    placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaShieldAlt className="inline mr-2" />
                      Role <span className="text-red-500">*</span>
                    </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
                      <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
                      {/* <option value="admin">Admin</option> */}
          </select>
        </div>

        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaBuilding className="inline mr-2" />
                      Department <span className="text-red-500">*</span>
                    </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
                      <option value="">Select department</option>
            <option value="bca">BCA</option>
            <option value="btech-cse">CSE</option>
            <option value="btech-dsai">B.Tech DSAI</option>
            <option value="btech-cloud">B.Tech Cloud Application</option>
            <option value="btech-ai">B.Tech AI</option>
            <option value="mca">MCA</option>
            <option value="mtech">M.Tech</option>
          </select>
                  </div>
        </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Back
        </button>

                  <button
                    type="submit"
                    disabled={loading || !formData.password || !formData.role || !formData.department}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
          Already have an account?{" "}
              <Link to="/loginform" className="text-blue-600 font-semibold hover:underline transition-all">
                Sign In
              </Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
