// src/components/AdminDashboard/AdminStatsGraph.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminStatsGraph = ({ complaints }) => {
  // Count number of complaints per status
  const statusCounts = {
    Pending: 0,
    "In Progress": 0,
    Resolved: 0,
    Rejected: 0,
  };

  complaints.forEach((complaint) => {
    if (complaint.status && Object.prototype.hasOwnProperty.call(statusCounts, complaint.status)) {
      statusCounts[complaint.status]++;
    }
  });

  // Prepare data for recharts
  const data = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminStatsGraph;
