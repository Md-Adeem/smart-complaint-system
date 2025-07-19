import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaChevronDown,
  FaUserCog,
} from "react-icons/fa";
import { useState } from "react";
import { removeUser } from "../utils/UserSlice";
// import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {});
      dispatch(removeUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const scrollToSection = (sectionId) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              🛠️
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Smart Complaint</h1>
              <p className="text-xs text-indigo-100 -mt-1">Management System</p>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile when logged in */}
          {!user && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white/10 ${
                  isActiveRoute("/")
                    ? "text-white bg-white/20"
                    : "text-indigo-100 hover:text-white"
                }`}
              >
                <FaHome className="text-sm" />
                Home
              </Link>

              <Link
                to="/about"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white/10 ${
                  isActiveRoute("/about")
                    ? "text-white bg-white/20"
                    : "text-indigo-100 hover:text-white"
                }`}
              >
                <FaInfoCircle className="text-sm" />
                About Us
              </Link>
            </div>
          )}

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                {/* User Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 group"
                >
                  {/* {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.firstName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )} */}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-white">
                      {user.firstName}
                    </p>
                    <p className="text-xs text-indigo-100">
                      {user.role === "admin" ? "Administrator" : "Student"}
                    </p>
                  </div>
                  <FaChevronDown
                    className={`text-xs text-indigo-100 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to={
                          user.role === "admin"
                            ? "/adminDashboard"
                            : "/studentdashboard"
                        }
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaUserCog className="text-gray-400" />
                        Dashboard
                      </Link>

                      {user.role === "student" && (
                        <Link
                          to="/student/new-complaint"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUser className="text-gray-400" />
                          New Complaint
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <FaSignOutAlt className="text-red-400" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/loginform">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                    <FaUser className="text-sm" />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                </Link>
                {location.pathname !== "/loginform" && (
                  <Link to="/signup">
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-0.5">
                      <span className="hidden sm:inline">Sign Up</span>
                      <span className="sm:hidden">Sign Up</span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation for logged in users */}
      {user && (
        <div className="md:hidden border-t border-white/20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-around">
              <Link
                to={
                  user.role === "admin"
                    ? "/adminDashboard"
                    : "/studentdashboard"
                }
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/adminDashboard") ||
                  isActiveRoute("/studentdashboard")
                    ? "text-white bg-white/20"
                    : "text-indigo-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <FaHome className="text-sm" />
                <span className="text-xs font-medium">Dashboard</span>
              </Link>

              {user.role === "student" && (
                <Link
                  to="/student/new-complaint"
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActiveRoute("/student/new-complaint")
                      ? "text-white bg-white/20"
                      : "text-indigo-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FaUser className="text-sm" />
                  <span className="text-xs font-medium">New Complaint</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
