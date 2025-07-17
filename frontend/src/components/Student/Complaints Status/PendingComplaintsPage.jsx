import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const PendingComplaintsPage = () => {
  const [pendingComplaints, setPendingComplaints] = useState([]);

  useEffect(() => {
    const fetchPendingComplaints = async () => {
      try {
        const res = await axiosInstance.get('/complaints', {
          withCredentials: true,
        });

        // Filter only 'Pending' status complaints
        const filtered = res.data.complaints.filter(
          (complaint) => complaint.status === 'Pending'
        );

        setPendingComplaints(filtered);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      }
    };

    fetchPendingComplaints();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pending Complaints</h1>

      {pendingComplaints.length === 0 ? (
        <p className="text-gray-600 text-center">No pending complaints found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingComplaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description}</p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Category:</span> {c.category}
              </div>
              <div className="mt-1 text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className="font-semibold text-yellow-600">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingComplaintsPage;
