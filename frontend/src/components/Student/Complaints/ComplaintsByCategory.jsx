import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FaChartBar, FaGraduationCap, FaHome, FaCog, FaEllipsisH } from 'react-icons/fa';

const ComplaintsByCategory = ({ complaints = [] }) => {
  // Calculate category data from actual complaints
  const getCategoryData = () => {
    const categoryCounts = {};
    
    complaints.forEach(complaint => {
      const category = complaint.category || 'Other';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Default categories with icons
    const categories = [
      { name: 'Academic', icon: FaGraduationCap, color: '#8B5CF6' },
      { name: 'Hostel', icon: FaHome, color: '#3B82F6' },
      { name: 'Administration', icon: FaCog, color: '#10B981' },
      { name: 'Other', icon: FaEllipsisH, color: '#F59E0B' }
    ];

    return categories.map(cat => ({
      category: cat.name,
      count: categoryCounts[cat.name] || 0,
      icon: cat.icon,
      color: cat.color
    }));
  };

  const categoryData = getCategoryData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-indigo-600 font-medium">
            No. of Complaints: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    const category = categoryData[index];
    
    return (
      <g>
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={category.color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={category.color} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={`url(#gradient-${index})`}
          rx={4}
          ry={4}
        />
        {/* Glow effect */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="none"
          stroke={category.color}
          strokeWidth={2}
          opacity={0.3}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 floating-element"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg glow-effect">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Complaints by Category</h3>
            <p className="text-sm text-gray-500 font-medium">Distribution of your complaints</p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  shape={<CustomBar />}
                  radius={[4, 4, 0, 0]}
                />
        </BarChart>
      </ResponsiveContainer>
          </div>
        </div>

        {/* Category Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.category}
                className="quick-action-item group bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: category.color }}
                  >
                    <IconComponent className="text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{category.category}</h4>
                    <p className="text-xs text-gray-500">{category.count} complaints</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsByCategory;




