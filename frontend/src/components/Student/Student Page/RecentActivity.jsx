import React, { useState } from 'react';
import { FaClock, FaCheckCircle, FaSpinner, FaTimesCircle, FaExclamationTriangle, FaHistory, FaEye, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { formatDate } from '../../../utils/textUtils';

const RecentActivity = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <FaClock className="text-lg" />;
      case 'in progress':
        return <FaSpinner className="text-lg animate-spin" />;
      case 'resolved':
        return <FaCheckCircle className="text-lg" />;
      case 'rejected':
        return <FaTimesCircle className="text-lg" />;
      default:
        return <FaExclamationTriangle className="text-lg" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          light: 'bg-yellow-50'
        };
      case 'in progress':
        return {
          bg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
          text: 'text-blue-800',
          border: 'border-blue-200',
          light: 'bg-blue-50'
        };
      case 'resolved':
        return {
          bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
          text: 'text-green-800',
          border: 'border-green-200',
          light: 'bg-green-50'
        };
      case 'rejected':
        return {
          bg: 'bg-gradient-to-r from-red-400 to-pink-500',
          text: 'text-red-800',
          border: 'border-red-200',
          light: 'bg-red-50'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          text: 'text-gray-800',
          border: 'border-gray-200',
          light: 'bg-gray-50'
        };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-6 shadow-xl border border-gray-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 floating-element"></div>
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg glow-effect">
                <FaHistory className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Recent Activity</h3>
              <p className="text-sm text-gray-500 font-medium">Track your complaint updates</p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-4xl">📝</div>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Recent Activity</h4>
            <p className="text-gray-500 text-sm mb-4">Submit your first complaint to see activity here</p>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 floating-element"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full translate-y-12 -translate-x-12 opacity-50 floating-element" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg glow-effect">
                <FaHistory className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Recent Activity</h3>
              <p className="text-sm text-gray-500 font-medium">{activities.length} recent updates</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendarAlt className="text-indigo-500" />
            <span>Last 24 hours</span>
          </div>
        </div>
        
        {/* Activity Timeline */}
        <div className="relative space-y-4">
          {/* Timeline connector */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-blue-200"></div>
          
          {activities.map((activity, index) => {
            const statusColors = getStatusColor(activity.status);
            const timeAgo = getTimeAgo(activity.timestamp);
            
            return (
              <div
                key={activity.id || index}
                className="quick-action-item group relative bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ml-8"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 ${statusColors.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                {/* Timeline dot */}
                <div className="absolute -left-10 top-6 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                
                <div className="relative flex items-start gap-4">
                  {/* Status Icon */}
                  <div className={`relative w-12 h-12 ${statusColors.bg} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    {getStatusIcon(activity.status)}
                    {/* Glow effect */}
                    <div className={`absolute inset-0 ${statusColors.bg} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors text-base truncate" title={activity.title}>
                        {activity.title}
                      </h4>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColors.text} ${statusColors.border} border`}>
                        {activity.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed mb-3">
                      {activity.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-indigo-500" />
                          <span>{timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-gray-400" />
                          <span>{formatDate(activity.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                        <FaEye className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${statusColors.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-xl`}></div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-transparent border-r-[20px] border-r-white border-b-[20px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="font-medium">Real-time updates • Last updated {getTimeAgo(new Date())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity; 