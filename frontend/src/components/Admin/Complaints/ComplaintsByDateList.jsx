import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // your configured axios instance
import { useNavigate, useLocation } from "react-router-dom";

const ComplaintsByDateList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Parse query params
  const params = new URLSearchParams(search);
  const dateFrom = params.get("dateFrom");
  const dateTo = params.get("dateTo");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!dateFrom || !dateTo) {
      setError("Invalid date range.");
      setLoading(false);
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get(
          `/complaints?dateFrom=${dateFrom}&dateTo=${dateTo}`
        );

        if (res.data.success) {
          const complaintsData = res.data.complaints || [];
          setComplaints(complaintsData);

          if (complaintsData.length === 0) {
            setError("No complaints found for this date range.");
          } else {
            setError("");
          }
        } else {
          setError("Failed to fetch complaints.");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [dateFrom, dateTo]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 w-max px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        aria-label="Go back"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Complaints from{" "}
        <span className="font-mono text-blue-600">{dateFrom}</span> to{" "}
        <span className="font-mono text-blue-600">{dateTo}</span>
      </h2>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading complaints...</p>
      )}

      {error && !loading && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <ul className="space-y-6">
          {complaints.map((c) => (
            <li
              key={c._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{c.title}</h3>
              <p className="text-gray-700 mb-2">{c.description || "No description."}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Status:{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full font-medium ${
                      {
                        pending: "bg-yellow-100 text-yellow-800",
                        resolved: "bg-green-100 text-green-800",
                        rejected: "bg-red-100 text-red-800",
                        "in progress": "bg-blue-100 text-blue-800",
                        success: "bg-emerald-100 text-emerald-800",
                      }[c.status.toLowerCase()] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </span>
                <span>Created: {new Date(c.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplaintsByDateList;

