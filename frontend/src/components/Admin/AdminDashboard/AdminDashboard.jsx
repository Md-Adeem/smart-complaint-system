import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaCalendarAlt,
  FaSearch,
  FaChartBar,
  FaClipboardList,
  FaEye,
  FaDownload,
  FaBell,
  FaUsers,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import axios from "../../../api/axiosInstance";
import AdminStatsGraph from "./AdminStatsGraph";
import NotificationCenter from "../Filter/NotificationCenter";
import AdminComplaintManager from "./AdminComplaintManager";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];

const statusIcons = {
  Pending: <FaClock className="text-yellow-500" />,
  "In Progress": <FaSpinner className="text-blue-500 animate-spin" />,
  Resolved: <FaCheckCircle className="text-green-500" />,
  Rejected: <FaTimesCircle className="text-red-500" />,
};

const cardColors = {
  Pending: "from-yellow-400 to-yellow-600",
  "In Progress": "from-blue-400 to-blue-600",
  Resolved: "from-green-400 to-green-600",
  Rejected: "from-red-400 to-red-600",
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showGraph, setShowGraph] = useState(false);
  const [counts, setCounts] = useState({
    Pending: 0,
    "In Progress": 0,
    Resolved: 0,
    Rejected: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("/complaints");
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.complaints)
        ? response.data.complaints
        : [];

      setComplaints(data);
      setTotalComplaints(data.length);

      const statusCount = {
        Pending: 0,
        "In Progress": 0,
        Resolved: 0,
        Rejected: 0,
      };

      data.forEach((complaint) => {
        const status = complaint.status;
        if (Object.prototype.hasOwnProperty.call(statusCount, status)) {
          statusCount[status]++;
        }
      });

      setCounts(statusCount);

      // Generate recent activity
      const recent = data
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
        .map(complaint => ({
          id: complaint._id,
          title: complaint.title,
          status: complaint.status,
          user: complaint.createdBy?.firstName || "Unknown",
          time: new Date(complaint.updatedAt).toLocaleDateString(),
          type: 'status_update'
        }));

      setRecentActivity(recent);
    } catch (error) {
      console.error("❌ Failed to fetch complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleCardClick = (status) => {
    const formattedStatus = status.toLowerCase().replace(/\s/g, "");
    navigate(`/admin/complaints/${formattedStatus}`);
  };

  const handleApplyFilter = () => {
    if (!selectedStatus) return alert("Please select a status.");
    const formattedStatus = selectedStatus.toLowerCase().replace(/\s/g, "");
    navigate(`/admin/complaints/${formattedStatus}`);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    const formattedQuery = searchQuery.trim().toLowerCase();
    navigate(`/admin/complaints/search/${formattedQuery}`);
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    let reason = "";

    if (["Rejected", "In Progress", "Resolved"].includes(newStatus)) {
      const messages = {
        Rejected: "Please provide a reason for rejecting the complaint:",
        "In Progress": "What actions will be taken to resolve this complaint?",
        Resolved: "Please describe how this complaint was resolved:",
      };

      reason = prompt(messages[newStatus]);
      if (!reason?.trim()) {
        alert("Reason is required to update status.");
        return;
      }
    }

    try {
      await axios.put(`/complaints/${complaintId}/status`, { status: newStatus, reason });

      const updatedComplaints = complaints.map((c) =>
        c._id === complaintId ? { ...c, status: newStatus, reason } : c
      );
      setComplaints(updatedComplaints);

      const newCounts = {
        Pending: 0,
        "In Progress": 0,
        Resolved: 0,
        Rejected: 0,
      };
      updatedComplaints.forEach((c) => {
        if (Object.prototype.hasOwnProperty.call(newCounts, c.status)) {
          newCounts[c.status]++;
        }
      });
      setCounts(newCounts);
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // const getPriorityComplaints = () => {
  //   return complaints.filter(c => c.status === 'Pending').length;
  // };

  // const getResolutionRate = () => {
  //   const resolved = counts.Resolved;
  //   const total = totalComplaints;
  //   return total > 0 ? Math.round((resolved / total) * 100) : 0;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                📊
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage complaints efficiently</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
          <NotificationCenter />
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaUsers className="text-gray-400" />
                <span>{totalComplaints} total complaints</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Stats Row - REMOVED */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          ...quick stats cards...
        </div>
        */}

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowGraph(!showGraph)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
        >
                <FaChartBar className="text-sm" />
                {showGraph ? "Hide Analytics" : "Show Analytics"}
        </button>

        <button
          onClick={() => navigate("/admin/complaints/summary")}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
              >
                <FaClipboardList className="text-sm" />
                Summary Report
              </button>

              <button
                onClick={() => navigate("/admin/complaints/datefilter")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
              >
                <FaCalendarAlt className="text-sm" />
                Date Filter
        </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-sm font-medium">
                <FaDownload className="text-sm" />
                Export Data
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Compact Filter */}
        <div className="relative">
          <button
            onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-sm font-medium"
          >
                  <FaFilter className="text-sm" />
            Filter
          </button>

          {showStatusFilter && (
                  <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10 w-64">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Filter by Status</h3>
              <select
                      className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                      <option value="">All Statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                onClick={handleApplyFilter}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium disabled:bg-gray-300"
                disabled={!selectedStatus}
              >
                Apply Filter
              </button>
            </div>
          )}
        </div>

              {/* Compact Search */}
        <div className="flex items-center gap-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
                    placeholder="Search complaints..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-48 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
                </div>
          <button
            onClick={handleSearch}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
          >
            Search
          </button>
              </div>
            </div>
        </div>
      </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics Cards */}
          <div className="lg:col-span-2">
      {!showGraph ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              onClick={() => handleCardClick(status)}
                    className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${cardColors[status]} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium opacity-90">{status}</h3>
                          <p className="text-2xl font-bold mt-1">{counts[status]}</p>
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-lg">
                  {statusIcons[status]}
                </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Click to view</span>
                        <FaEye className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaChartBar className="text-indigo-600" />
                  Complaint Analytics
          </h2>
          <AdminStatsGraph complaints={complaints} />
        </div>
      )}

            {/* Complaint Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <AdminComplaintManager
        complaints={complaints}
        onStatusChange={handleStatusChange}
      />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBell className="text-indigo-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEye className="text-indigo-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        activity.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        activity.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FaExclamationTriangle className="text-red-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Urgent Complaints</p>
                      <p className="text-xs text-gray-500">View high priority items</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Resolved Today</p>
                      <p className="text-xs text-gray-500">View completed complaints</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaDownload className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Export Report</p>
                      <p className="text-xs text-gray-500">Download monthly summary</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
