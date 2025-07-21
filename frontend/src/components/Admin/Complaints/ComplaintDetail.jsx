import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/complaints/${id}`);
        if (res.data.success) {
          setComplaint(res.data.complaint);
        } else {
          setError("Complaint not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching complaint");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-300 rounded">
        Back
      </button>

      {loading && <p>Loading complaint details...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {complaint && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">{complaint.title}</h2>
          <p className="mb-4">{complaint.description}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <p><strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          {/* Add more complaint details as needed */}
        </div>
      )}
    </div>
  );
};

export default ComplaintDetail;
