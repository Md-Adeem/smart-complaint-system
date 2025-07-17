import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import StatsCard from './StatsCard';
import TabFilter from './TabFilter';
import ComplaintsSummary from '../Complaints/ComplaintsSummary';
import ComplaintsByCategory from '../Complaints/ComplaintsByCategory';
import AllComplaintsPage from '../Complaints/AllComplaintsPage';
import PendingComplaintsPage from '../Complaints Status/PendingComplaintsPage';
import InProgressComplaintsPage from '../Complaints Status/InProgressComplaintsPage'; 
import ResolvedComplaintsPage from '../Complaints Status/ResolvedComplaintsPage';
import RejectedComplaintsPage from '../Complaints Status/RejectedComplaintsPage';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
// import axiosInstance from '../../../api/axiosInstance';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';

const StudentDashboard = () => {
  const user = useSelector((store) => store.user)
  // console.log(user)
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  // const [user, setUser] = useState({ firstName: 'Student', photoUrl: '' });

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

    // const fetchUser = async () => {
    //   try {
    //     const res = await axiosInstance.get("/user/me");
    //     setUser(res.data);
    //   } catch (error) {
    //     console.error("Error fetching user", error);
    //   }
    // };

    fetchComplaints();
    // fetchUser();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const successRate = total === 0 ? "0%" : `${Math.round((resolved / total) * 100)}%`;

  const handleNewComplaint = () => {
    navigate('/student/new-complaint');
  };
    if (!user) {
    // Redirect or show nothing or navigate to login
    return null; // or return <Navigate to="/login" /> if you're using React Router
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Modern Compact Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* {user.photoUrl ? (
              <img src={user.photoUrl} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                <FaUserCircle />
              </div>
            )} */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, {user.firstName || 'Student'}!</h1>
              <p className="text-sm md:text-base text-blue-100">Track and manage your complaints with ease. Your voice matters!</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
            <button
              onClick={handleNewComplaint}
              className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-lg border border-blue-600 font-semibold shadow hover:bg-blue-50 transition text-base"
            >
              <FaPlus />
              New Complaint
            </button>
            <p className="text-xs text-blue-100">Latest update: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total" value={total} icon="📊" color="bg-blue-500" />
          <StatsCard title="Pending" value={pending} icon="⏱️" color="bg-yellow-500" />
          <StatsCard title="Resolved" value={resolved} icon="✅" color="bg-green-500" />
          <StatsCard title="Success" value={successRate} icon="🎯" color="bg-purple-500" />
        </div>

        {/* Tab Navigation & Content */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} pillStyle />
          <div className="mt-6">
            {activeTab === 'Dashboard' && <ComplaintsByCategory complaints={complaints} />}
            {activeTab === 'All Complaints' && <AllComplaintsPage complaints={complaints} />}
            {activeTab === 'Pending' && <PendingComplaintsPage complaints={complaints} />}
            {activeTab === 'In Progress' && <InProgressComplaintsPage complaints={complaints} />}
            {activeTab === 'Resolved' && <ResolvedComplaintsPage complaints={complaints} />}
            {activeTab === 'Rejected' && <RejectedComplaintsPage complaints={complaints} />}
            <ComplaintsSummary complaints={complaints} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
