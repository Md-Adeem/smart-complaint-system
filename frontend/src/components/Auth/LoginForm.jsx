import React, { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../utils/UserSlice";
import { useDispatch } from "react-redux";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/login", {
        emailId: username,
        password: password,
      }, { withCredentials: true });

      dispatch(setUser(res.data));

      if (res.data.role === "student" || res.data.role === "faculty") {
        navigate("/studentDashboard");
      } else {
        navigate("/adminDashboard");
      }
    } catch (error) {
      if (error.response?.data) {
        alert(`Login failed: ${error.response.data}`);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" />
                Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaLock className="inline mr-2" />
                Password <span className="text-red-500">*</span>
          </label>
              <div className="relative">
          <input
                  type={showPassword ? "text" : "password"}
            id="password"
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">
                Forgot Password?
              </Link>
        </div>

        <button
          type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium"
        >
              {loading ? "Signing In..." : "Sign In"}
        </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
        </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline transition-all">
                Create Account
              </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
