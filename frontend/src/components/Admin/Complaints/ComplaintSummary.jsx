import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ChevronDown, ChevronUp } from "lucide-react";
import { truncateTitle, truncateDescription, formatDate } from "../../../utils/textUtils";

const ComplaintSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/complaints");
        if (res.data.success) {
          const complaints = res.data.complaints;

          const total = complaints.length;

          const latest =
            complaints.length > 0
              ? complaints.reduce((latest, current) =>
                  new Date(current.createdAt) > new Date(latest.createdAt)
                    ? current
                    : latest,
                complaints[0])
              : null;

          const statusCount = complaints.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
          }, {});

          const mostCommonStatus = Object.entries(statusCount).sort(
            (a, b) => b[1] - a[1]
          )[0]?.[0];

          setSummary({ total, latest, mostCommonStatus, statusCount, complaints });
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const toggleStatus = (status) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
      setFilteredComplaints([]);
    } else {
      const filtered = summary.complaints.filter((c) => c.status === status);
      setSelectedStatus(status);
      setFilteredComplaints(filtered);
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold text-gray-500">Loading summary...</div>;
  if (!summary || summary.total === 0) return <div className="text-center text-gray-500">No complaints to summarize.</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Complaint Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-lg shadow-sm text-center">
          <p className="text-sm font-medium text-indigo-600">Total Complaints</p>
          <p className="text-2xl font-bold text-indigo-900 mt-1">{summary.total}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg shadow-sm text-center">
          <p className="text-sm font-medium text-yellow-700">Most Common Status</p>
          <p className="text-lg font-semibold text-yellow-900 mt-1">
            {summary.mostCommonStatus || "N/A"}
          </p>
        </div>

        {summary.latest && (
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg shadow-sm text-center">
            <p className="text-sm font-medium text-emerald-700">Latest Complaint</p>
            <p className="text-base font-semibold text-emerald-900 mt-1" title={summary.latest.title}>
              {truncateTitle(summary.latest.title, 30)}
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              {formatDate(summary.latest.createdAt)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Status Breakdown</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(summary.statusCount).map(([status, count]) => (
            <li
              key={status}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-100 transition"
              onClick={() => toggleStatus(status)}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium capitalize">{status}</span>
                <span className="text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {count}
                </span>
              </div>
              {selectedStatus === status && (
                <div className="mt-3 text-sm text-gray-600 space-y-2 max-h-64 overflow-y-auto">
                  {filteredComplaints.map((c) => (
                    <div key={c._id} className="bg-white p-3 rounded-md border shadow-sm">
                      <p className="font-semibold text-gray-800" title={c.title}>
                        {truncateTitle(c.title, 40)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(c.createdAt)}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2" title={c.description}>
                        {truncateDescription(c.description, 80)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end mt-1">
                {selectedStatus === status ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintSummary;
