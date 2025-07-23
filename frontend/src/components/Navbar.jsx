import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaChevronDown,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { removeUser } from "../utils/UserSlice";
// import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    // Add event listener if dropdown is open
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isProfileOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {});
      dispatch(removeUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeDropdown = () => {
    setIsProfileOpen(false);
  };

  // const scrollToSection = (sectionId) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // const isActiveRoute = (path) => {
  //   return location.pathname === path;
  // };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              🛠️
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Smart Complaint</h1>
              <p className="text-xs text-indigo-100 -mt-1">Management System</p>
            </div>
        </Link>

          {/* Navigation Links removed for non-logged-in users in desktop mode as requested */}

          {/* User Section */}
          <div className="hidden md:flex items-center gap-3">
          {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 group"
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
                        onClick={closeDropdown}
                      >
                        <FaUserCog className="text-gray-400" />
                        Dashboard
                      </Link>

                      {user.role === "student" && (
                        <Link
                          to="/student/new-complaint"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={closeDropdown}
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
                          closeDropdown();
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
                {/* Show Login button when NOT on login page */}
                {location.pathname !== "/loginform" && (
                  <Link to="/loginform" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <button className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                      location.pathname === "/signup" 
                        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                        : "bg-white text-indigo-600 hover:bg-gray-50"
                    }`}>
                      <FaUser className="text-sm" />
                      <span className="hidden sm:inline">Login</span>
                    </button>
                  </Link>
                )}
                
                {/* Show Sign Up button when NOT on signup page */}
                {location.pathname !== "/signup" && (
                  <Link to="/signup" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <button className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 ${
                      location.pathname === "/loginform"
                        ? "bg-white text-indigo-600 hover:bg-gray-50 shadow-sm hover:shadow-md"
                        : "border border-white/30 text-white hover:bg-white/10"
                    }`}>
                      <span className="hidden sm:inline">Sign Up</span>
                      <span className="sm:hidden">Sign Up</span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
          {/* Hamburger menu for mobile (always visible) */}
{(
  (user && !isMobileMenuOpen) || (!user && !isMobileMenuOpen)
) && (
  <button
    className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
    onClick={() => setIsMobileMenuOpen(true)}
    aria-label="Open menu"
  >
    <FaBars className="text-white text-2xl" />
  </button>
)}
        </div>
      </div>

      {/* Mobile Drawer for logged-in users */}
      {user && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          ></div>
          {/* Drawer */}
          <div className="ml-auto w-64 max-w-full h-full bg-white shadow-xl p-6 flex flex-col gap-6 animate-slide-in-right relative">
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes className="text-gray-700 text-2xl" />
            </button>
            <div className="flex flex-col gap-4 mt-8">
              <Link
                to={user.role === "admin" ? "/adminDashboard" : "/studentdashboard"}
                onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                className="w-full px-4 py-3 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 text-center transition-all"
              >
                Dashboard
              </Link>
              {user.role === "student" && (
                <Link
                  to="/student/new-complaint"
                  onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                  className="w-full px-4 py-3 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 text-center transition-all"
                >
                  Submit Complaint
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-center transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Drawer for non-logged-in users */}
      {!user && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          ></div>
          {/* Drawer */}
          <div className="ml-auto w-64 max-w-full h-full bg-white shadow-xl p-6 flex flex-col gap-6 animate-slide-in-right relative">
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes className="text-gray-700 text-2xl" />
            </button>
            <div className="flex flex-col gap-4 mt-8">
              <Link
                to="/loginform"
                onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                className="w-full px-4 py-3 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-50 text-center transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-center transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
