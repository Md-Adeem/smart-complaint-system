import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { truncateTitle, truncateDescription, formatDate } from '../../../utils/textUtils';

const InProgressComplaintsPage = () => {
  const [inProgressComplaints, setInProgressComplaints] = useState([]);

  useEffect(() => {
    const fetchInProgressComplaints = async () => {
      try {
        const res = await axiosInstance.get('/complaints', {
          withCredentials: true,
        });

        // Filter only 'In Progress' status complaints
        const filtered = res.data.complaints.filter(
          (complaint) => complaint.status === 'In Progress'
        );

        setInProgressComplaints(filtered);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      }
    };

    fetchInProgressComplaints();
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">In Progress Complaints</h1>

      {inProgressComplaints.length === 0 ? (
        <p className="text-gray-600 text-center">No complaints in progress found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inProgressComplaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-2" title={c.title}>
                {truncateTitle(c.title)}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={c.description}>
                {truncateDescription(c.description)}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Category:</span> {c.category}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Status:</span>{' '}
                <span className="font-semibold text-blue-600">{c.status}</span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {formatDate(c.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InProgressComplaintsPage;
