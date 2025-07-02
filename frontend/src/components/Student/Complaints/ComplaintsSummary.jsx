import React from 'react';
const ComplaintsSummary = ({ complaints }) => {
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <div>
        <h4>Total</h4>
        <p className="text-2xl font-bold">{complaints.length}</p>
      </div>
      <div>
        <h4>Pending</h4>
        <p className="text-2xl font-bold text-yellow-600">{pending}</p>
      </div>
      <div>
        <h4>In Progress</h4>
        <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
      </div>
      <div>
        <h4>Resolved</h4>
        <p className="text-2xl font-bold text-green-600">{resolved}</p>
      </div>
    </div>
  );
};

export default ComplaintsSummary;

