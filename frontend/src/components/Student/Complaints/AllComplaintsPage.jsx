

// src/pages/AllComplaintsPage.jsx
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosInstance from '../../../api/axiosInstance';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { truncateTitle, truncateDescription, formatDate } from '../../../utils/textUtils';

const COLORS = ['#f97316', '#ec4899', '#ef4444', '#3b82f6'];

const StylishComplaintCard = ({ title, description, category, status, resolvedBy, resolutionNote, createdAt }) => {
  const themeColors = {
    Resolved: {
      base: 'orange-500',
      light: 'orange-100',
      ring: 'ring-orange-300',
    },
    Pending: {
      base: 'pink-500',
      light: 'pink-100',
      ring: 'ring-pink-300',
    },
    Rejected: {
      base: 'red-500',
      light: 'red-100',
      ring: 'ring-red-300',
    },
    'In Progress': {
      base: 'blue-500',
      light: 'blue-100',
      ring: 'ring-blue-300',
    },
  };

  const color = themeColors[status] || {
    base: 'gray-500',
    light: 'gray-100',
    ring: 'ring-gray-300',
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md border px-4 pt-16 pb-6 hover:shadow-lg transition-shadow">
      {/* Avatar */}
      <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2`}>
        <div className={`w-16 h-16 rounded-full bg-${color.light} ring-4 ${color.ring} flex items-center justify-center text-${color.base} text-2xl`}>
          <i className="fas fa-user" />
        </div>
      </div>

      {/* Content */}
      <h3 className={`text-center text-lg font-semibold text-${color.base} mb-2`} title={title}>
        {truncateTitle(title, 40)}
      </h3>
      <p className="text-center text-sm text-gray-500 mb-3">Complaint Category: {category}</p>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3 text-center" title={description}>
        {truncateDescription(description, 100)}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Status:</strong> <span className={`text-${color.base} font-medium`}>{status}</span>
      </p>

      {resolvedBy && (
        <p className="text-sm text-gray-700 mb-2">
          <strong>Resolved By:</strong> {resolvedBy.name || 'Admin'}
        </p>
      )}
      {resolutionNote && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2" title={resolutionNote}>
          <strong>Note:</strong> {truncateDescription(resolutionNote, 80)}
        </p>
      )}

      {/* Star Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 fill-${color.base}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
        </div>
        <i className={`fas fa-quote-right text-${color.base}`} />
      </div>
      {/* Created At */}
      <p className="text-xs text-gray-400 mt-2">{formatDate(createdAt)}</p>
    </div>
  );
};

const AllComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await axiosInstance.get('/complaints');
        setComplaints(res.data.complaints);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      }
    };

    fetchAllComplaints();
  }, []);

  const categoryCounts = complaints.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const dataForChart = Object.entries(categoryCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Complaints</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Complaints by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataForChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {dataForChart.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((c) => (
          <StylishComplaintCard
            key={c._id}
            title={c.title}
            description={c.description}
            category={c.category}
            status={c.status}
            resolvedBy={c.resolvedBy}
            resolutionNote={c.resolutionNote}
            createdAt={c.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default AllComplaintsPage;



