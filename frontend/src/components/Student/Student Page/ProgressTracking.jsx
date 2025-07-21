import React from 'react';
import { FaChartLine, FaClock, FaSpinner, FaCheckCircle, FaTimesCircle, FaChartBar, FaCalendarAlt, FaTachometerAlt } from 'react-icons/fa';

const ProgressTracking = ({ progressData }) => {
  let { total, pending, inProgress, resolved, rejected, successRate, averageResponseTime } = progressData;

  // Defensive: ensure all are numbers
  total = isNaN(total) ? 0 : total;
  pending = isNaN(pending) ? 0 : pending;
  inProgress = isNaN(inProgress) ? 0 : inProgress;
  resolved = isNaN(resolved) ? 0 : resolved;
  rejected = isNaN(rejected) ? 0 : rejected;
  successRate = isNaN(successRate) ? 0 : successRate;
  averageResponseTime = isNaN(averageResponseTime) ? 0 : averageResponseTime;

  const getProgressPercentage = (value) => {
    const percent = total > 0 ? (value / total) * 100 : 0;
    return isNaN(percent) ? 0 : percent;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          light: 'bg-yellow-50'
        };
      case 'inProgress':
        return {
          bg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
          text: 'text-blue-700',
          border: 'border-blue-200',
          light: 'bg-blue-50'
        };
      case 'resolved':
        return {
          bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
          text: 'text-green-700',
          border: 'border-green-200',
          light: 'bg-green-50'
        };
      case 'rejected':
        return {
          bg: 'bg-gradient-to-r from-red-400 to-pink-500',
          text: 'text-red-700',
          border: 'border-red-200',
          light: 'bg-red-50'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          text: 'text-gray-700',
          border: 'border-gray-200',
          light: 'bg-gray-50'
        };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-lg" />;
      case 'inProgress':
        return <FaSpinner className="text-lg animate-spin" />;
      case 'resolved':
        return <FaCheckCircle className="text-lg" />;
      case 'rejected':
        return <FaTimesCircle className="text-lg" />;
      default:
        return <FaClock className="text-lg" />;
    }
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    if (rate >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSuccessRateMessage = (rate) => {
    if (rate >= 80) return 'Excellent!';
    if (rate >= 60) return 'Good progress!';
    if (rate >= 40) return 'Keep going!';
    return 'Needs attention';
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-6 shadow-xl border border-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50 floating-element"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full translate-y-12 -translate-x-12 opacity-50 floating-element" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg glow-effect">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Progress Overview</h3>
            <p className="text-sm text-gray-500 font-medium">Your complaint performance</p>
          </div>
        </div>
        
        {/* Success Rate Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaChartBar className="text-indigo-600" />
              <span className="font-semibold text-gray-800">Success Rate</span>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getSuccessRateColor(successRate)}`}>{isNaN(successRate) ? 0 : successRate}%</div>
              <div className="text-xs text-gray-500">{getSuccessRateMessage(successRate)}</div>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out relative`}
              style={{ width: `${isNaN(successRate) ? 0 : successRate}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaTachometerAlt className="text-indigo-600" />
            Status Breakdown
          </h4>
          
          {[
            { status: 'resolved', label: 'Resolved', value: resolved },
            { status: 'inProgress', label: 'In Progress', value: inProgress },
            { status: 'pending', label: 'Pending', value: pending },
            ...(rejected > 0 ? [{ status: 'rejected', label: 'Rejected', value: rejected }] : [])
          ].map((item, index) => {
            const statusColors = getStatusColor(item.status);
            const percentage = getProgressPercentage(item.value);
            
            return (
              <div
                key={item.status}
                className="quick-action-item group relative bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${statusColors.bg} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{item.label}</h5>
                      <p className="text-xs text-gray-500">{isNaN(percentage) ? 0 : percentage.toFixed(1)}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-800">{isNaN(item.value) ? 0 : item.value}</div>
                    <div className="text-xs text-gray-500">complaints</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${statusColors.bg} transition-all duration-700 ease-out`}
                    style={{ width: `${isNaN(percentage) ? 0 : percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-600" />
            Performance Metrics
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{isNaN(total) ? 0 : total}</div>
              <div className="text-xs text-gray-500 font-medium">Total Complaints</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">{isNaN(averageResponseTime) ? 0 : averageResponseTime}</div>
              <div className="text-xs text-gray-500 font-medium">Avg. Response (days)</div>
            </div>
          </div>
          
          {/* Performance Indicator */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Performance Level:</span>
              <span className={`font-semibold ${getSuccessRateColor(successRate)}`}>
                {successRate >= 80 ? 'Excellent' : successRate >= 60 ? 'Good' : successRate >= 40 ? 'Fair' : 'Needs Improvement'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking; 