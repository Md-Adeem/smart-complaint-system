import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`text-white p-4 rounded-lg shadow-md ${color}`}>
      <div className="text-2xl">{icon}</div>
      <h3 className="text-sm mt-2">{title}</h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};

export default StatsCard;
