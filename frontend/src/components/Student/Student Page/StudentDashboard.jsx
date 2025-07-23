import React, { useEffect, useState } from 'react';
import TabFilter from './TabFilter';
import ComplaintsByCategory from '../Complaints/ComplaintsByCategory';
import AllComplaintsPage from '../Complaints/AllComplaintsPage';
import PendingComplaintsPage from '../Complaints Status/PendingComplaintsPage';
import InProgressComplaintsPage from '../Complaints Status/InProgressComplaintsPage'; 
import ResolvedComplaintsPage from '../Complaints Status/ResolvedComplaintsPage';
import RejectedComplaintsPage from '../Complaints Status/RejectedComplaintsPage';
import RecentActivity from './RecentActivity';
import ProgressTracking from './ProgressTracking';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPlus, FaSun, FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { 
  getGreeting, 
  getMotivationalMessage, 
  getRecentActivity, 
  getProgressData, 
  
} from '../../../utils/notificationUtils';

const StudentDashboard = () => {
  const user = useSelector((store) => store.user)
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get("/complaints", {
          withCredentials: true
        });
        setComplaints(res.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    };

    fetchComplaints();
  }, []);

  // Calculate dashboard data
  const progressData = getProgressData(complaints);
  const recentActivities = getRecentActivity(complaints);
  // const quickActions = getQuickActions();
  const greeting = getGreeting(user?.firstName);
  const motivationalMessage = getMotivationalMessage(progressData.total, progressData.resolved);

  const handleNewComplaint = () => {
    navigate('/student/new-complaint');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} p-4 flex flex-col items-center`}>
      <div className="w-full max-w-7xl">
        {/* Enhanced Header with Notifications */}
        <div className={`flex flex-col sm:flex-row items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white rounded-2xl p-4 sm:p-6 shadow-lg mb-6`}>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
              <FaUserCircle />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-1">{greeting}</h1>
              <p className="text-sm md:text-base text-blue-100">{motivationalMessage}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white/20'} hover:bg-opacity-30 transition-colors`}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            {/* New Complaint Button */}
            <button
              onClick={handleNewComplaint}
              className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-lg border border-blue-600 font-semibold shadow hover:bg-blue-50 transition text-base"
            >
              <FaPlus />
              New Complaint
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 md:mb-8">
          {/* Left Column - Quick Actions & Progress */}
          <div className="lg:col-span-1 space-y-6">
            <div className="dashboard-card">
              <ProgressTracking progressData={progressData} />
            </div>
          </div>

          {/* Right Column - Recent Activity & Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="dashboard-card">
              <RecentActivity activities={recentActivities} />
            </div>
            
            {/* Tab Navigation & Content */}
            <div className={`dashboard-card ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-4 sm:p-6`}>
              <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} pillStyle />
              <div className="mt-6">
                {activeTab === 'Dashboard' && <ComplaintsByCategory complaints={complaints} />}
                {activeTab === 'All Complaints' && <AllComplaintsPage complaints={complaints} />}
                {activeTab === 'Pending' && <PendingComplaintsPage complaints={complaints} />}
                {activeTab === 'In Progress' && <InProgressComplaintsPage complaints={complaints} />}
                {activeTab === 'Resolved' && <ResolvedComplaintsPage complaints={complaints} />}
                {activeTab === 'Rejected' && <RejectedComplaintsPage complaints={complaints} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
