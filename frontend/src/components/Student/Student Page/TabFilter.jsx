import React from 'react';
import { FaChartBar, FaList, FaClock, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TabFilter = ({ activeTab, setActiveTab, pillStyle = false }) => {
  const tabs = [
    { id: 'Dashboard', icon: FaChartBar, label: 'Dashboard' },
    { id: 'All Complaints', icon: FaList, label: 'All Complaints' },
    { id: 'Pending', icon: FaClock, label: 'Pending' },
    { id: 'In Progress', icon: FaSpinner, label: 'In Progress' },
    { id: 'Resolved', icon: FaCheckCircle, label: 'Resolved' },
    { id: 'Rejected', icon: FaTimesCircle, label: 'Rejected' }
  ];

  const getTabIcon = (iconComponent) => {
    const Icon = iconComponent;
    return <Icon className="text-sm" />;
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'Dashboard':
        return 'from-indigo-500 to-purple-600';
      case 'All Complaints':
        return 'from-blue-500 to-indigo-600';
      case 'Pending':
        return 'from-yellow-500 to-orange-600';
      case 'In Progress':
        return 'from-blue-500 to-cyan-600';
      case 'Resolved':
        return 'from-green-500 to-emerald-600';
      case 'Rejected':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (pillStyle) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${getTabColor(tab.id)} text-white shadow-lg`
                : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`transition-all duration-300 ${
              activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
            }`}>
              {getTabIcon(tab.icon)}
            </div>
            <span className="text-sm font-medium">{tab.label}</span>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            activeTab === tab.id
              ? `bg-gradient-to-r ${getTabColor(tab.id)} text-white shadow-lg`
              : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className={`transition-all duration-300 ${
            activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
          }`}>
            {getTabIcon(tab.icon)}
          </div>
          <span className="text-sm font-medium">{tab.label}</span>
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabFilter;

