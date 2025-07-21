import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axiosInstance";
import { truncateTitle, truncateDescription, formatDate } from "../../../utils/textUtils";

const ComplaintListByStatus = () => {
  const { status } = useParams(); // status will be like "pending", "resolved", etc.
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaintsByStatus = async () => {
      try {
        setLoading(true);
        setError("");
        // API expects status with spaces, so convert from 'inprogress' to 'In Progress'
        const formatStatus = (status) => {
          if (!status) return "";
          if (status === "inprogress") return "In Progress";
          // Capitalize first letter for others
          return status.charAt(0).toUpperCase() + status.slice(1);
        };

        const formattedStatus = formatStatus(status);

        const response = await axios.get(`/complaints?status=${encodeURIComponent(formattedStatus)}`);
        const data = response.data;

        const complaintsData = Array.isArray(data)
          ? data
          : Array.isArray(data?.complaints)
          ? data.complaints
          : [];

        setComplaints(complaintsData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsByStatus();
  }, [status]);

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (complaints.length === 0) return <p>No complaints found for status: {status}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Complaints with status: {status}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <div className="mb-3">
              <p className="text-sm text-gray-600">
                <strong>User:</strong> {complaint.username || complaint.user || "Unknown"}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-800 font-medium" title={complaint.title || complaint.name || complaint.subject}>
                <strong>Title:</strong> {truncateTitle(complaint.title || complaint.name || complaint.subject, 50)}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 line-clamp-3" title={complaint.description || complaint.details}>
                <strong>Description:</strong> {truncateDescription(complaint.description || complaint.details, 120)}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> <span className="font-medium">{complaint.status}</span>
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <strong>Date:</strong> {formatDate(complaint.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintListByStatus;

