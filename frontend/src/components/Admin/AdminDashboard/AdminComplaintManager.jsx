import React, { useEffect, useState } from "react";
import { FaUser, FaFileAlt, FaCog, FaEdit, FaEye, FaTimes, FaCheck, FaClock } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  Pending: <FaClock className="text-yellow-600" />,
  "In Progress": <FaCog className="text-blue-600 animate-spin" />,
  Resolved: <FaCheck className="text-green-600" />,
  Rejected: <FaTimes className="text-red-600" />,
};

const AdminComplaintManager = ({ onStatusUpdate }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints");
      const data = res.data.complaints || res.data || [];
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load complaints.",err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSelectChange = (complaintId, status) => {
    if (["Rejected", "In Progress", "Resolved"].includes(status)) {
      setSelectedComplaintId(complaintId);
      setNewStatus(status);
      setReason("");
      setShowModal(true);
    } else {
      updateStatus(complaintId, status);
    }
  };

  const updateStatus = async (complaintId, status, reasonText = "") => {
    try {
      await axiosInstance.put(`/complaints/${complaintId}/status`, {
        status,
        reason: reasonText,
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status, reason: reasonText } : c
        )
      );

      if (onStatusUpdate) onStatusUpdate();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleModalSubmit = () => {
    if (!reason.trim()) {
      alert("Reason is required.");
      return;
    }
    updateStatus(selectedComplaintId, newStatus, reason);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading complaints...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-500 text-center">
          <FaTimes className="text-4xl mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FaEdit className="text-indigo-600" />
          Complaint Management
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {complaints.length} total complaints
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-gray-500">{complaints.filter(c => c.status === 'Pending').length} pending</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    User
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-gray-400" />
                    Title
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {(complaint.username || complaint.createdBy?.firstName || "U")[0].toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {complaint.username || complaint.createdBy?.firstName || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {complaint.createdBy?.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 font-medium">{complaint.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {complaint.description?.substring(0, 80)}...
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[complaint.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
                      >
                        {statusIcons[complaint.status]}
                        {complaint.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors rounded"
                        title="View Details"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <select
                        value={complaint.status}
                        onChange={(e) => handleSelectChange(complaint._id, e.target.value)}
                        className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:bg-gray-50"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {complaints.length === 0 && (
          <div className="text-center py-8">
            <FaFileAlt className="text-3xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No complaints found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl border border-gray-200 animate-fade-in mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Update Status</h3>
              <p className="text-sm text-gray-600">
                Please provide a reason for changing the status to{" "}
                <span className="font-semibold text-indigo-600">{newStatus}</span>.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason / Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Explain your reason for the status change..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleModalSubmit}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaintManager;
