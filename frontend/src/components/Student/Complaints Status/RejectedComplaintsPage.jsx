import React from 'react';

const RejectedComplaintsPage = ({ complaints }) => {
  const rejectedComplaints = complaints.filter(c => c.status.toLowerCase() === 'rejected');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rejected Complaints</h2>
      {rejectedComplaints.length === 0 ? (
        <p className="text-gray-600">No rejected complaints found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rejectedComplaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description}</p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Category:</span> {c.category}
              </div>
              <div className="mt-1 text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className="font-semibold text-red-600">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedComplaintsPage;
