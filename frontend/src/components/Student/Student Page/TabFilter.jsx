import React from 'react';

const TabFilter = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard', 'All Complaints', 'Pending', 'In Progress', 'Resolved', 'Rejected'];

  return (
    <div className="flex gap-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-1 rounded-md ${
            activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabFilter;

