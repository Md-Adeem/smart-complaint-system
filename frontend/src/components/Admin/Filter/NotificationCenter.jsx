import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaTimesCircle, FaCheckCircle, FaClock, FaSpinner } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const statusIcons = {
  Pending: <FaClock className="text-yellow-500" />,
  "In Progress": <FaSpinner className="text-blue-500 animate-spin" />,
  Resolved: <FaCheckCircle className="text-green-500" />,
  Rejected: <FaTimesCircle className="text-red-500" />,
};

const NotificationCenter = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch recent complaints/notifications
  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/complaints");
      if (res.data.success) {
        setNotifications(res.data.complaints);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const unreadCount = notifications.length;

  const handleNotificationClick = (complaintId) => {
    setIsOpen(false);
    navigate(`/admin/complaints/${complaintId}`);
  };

  return (
    <div className="relative max-w-md mx-auto mt-8">
      {/* Notification Bell */}
      <button
        aria-label="View Notifications"
        className="relative text-gray-700 hover:text-indigo-600 transition duration-300 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaBell className="text-3xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Complaints</h3>
            <button
              aria-label="Close notifications"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              ×
            </button>
          </div>

          {unreadCount === 0 ? (
            <p className="p-4 text-center text-gray-600">No new notifications</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {notifications.map(({ _id, username, status, createdAt }) => (
                <li
                  key={_id}
                  onClick={() => handleNotificationClick(_id)}
                  className="cursor-pointer hover:bg-gray-100 p-4 flex items-center gap-4 border-b border-gray-200 last:border-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleNotificationClick(_id);
                  }}
                >
                  <div className="text-2xl flex-shrink-0">
                    {statusIcons[status] || <FaClock className="text-gray-400" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700">{username || "Unknown User"}</span>
                    <span className="text-gray-600 text-sm capitalize">
                      Status: {status}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(createdAt).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
