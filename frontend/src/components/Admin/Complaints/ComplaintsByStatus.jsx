import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { truncateTitle, truncateDescription, formatDate } from "../../../utils/textUtils";

const ComplaintsByStatus = () => {
  const { status } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const normalizedStatus = decodeURIComponent(status)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get(`/complaints?status=${normalizedStatus}`);
        const data = res.data.complaints || [];
        if (data.length === 0) setError("No complaints found.");
        else setComplaints(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [status]);

  if (loading) return <p className="p-4">Loading complaints...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Complaints - {status}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((c) => (
          <div key={c._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-800 mb-3" title={c.title}>
              {truncateTitle(c.title, 50)}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Status:</strong> <span className="font-medium">{c.status}</span>
            </p>
            {c.reason && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={c.reason}>
                <strong>Admin's Reason:</strong> {truncateDescription(c.reason, 100)}
              </p>
            )}
            <p className="text-sm text-gray-800 mb-3 line-clamp-3" title={c.description}>
              {truncateDescription(c.description || "No detailed description.", 120)}
            </p>
            <div className="text-xs text-gray-500">
              {formatDate(c.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsByStatus;
