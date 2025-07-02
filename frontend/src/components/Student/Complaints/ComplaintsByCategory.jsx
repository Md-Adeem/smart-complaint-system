import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const complaintCategoryData = [
  { category: 'Academic', count: 3 },
  { category: 'Hostel', count: 2 },
  { category: 'Administration', count: 1 },
  { category: 'Other', count: 4 },
];

const ComplaintsByCategory = () => {
  return (
    <div className="w-full h-[300px] bg-white rounded-xl shadow-md p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Complaints by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={complaintCategoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="No. of Complaints" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplaintsByCategory;




