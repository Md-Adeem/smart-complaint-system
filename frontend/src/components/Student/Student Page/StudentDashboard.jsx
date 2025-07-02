// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import StatsCard from './StatsCard';
// //import TabFilter from './TabFilter';
// import TabFilter from './TabFilter';
// import ComplaintsSummary from '../Complaints/ComplaintsSummary';
// import ComplaintsByCategory from '../Complaints/ComplaintsByCategory';
// import AllComplaintsPage from '../Complaints/AllComplaintsPage';
// import PendingComplaintsPage from '../Complaints Status/PendingComplaintsPage';
// import InProgressComplaintsPage from '../Complaints Status/InProgressComplaintsPage'; 
// import ResolvedComplaintsPage from '../Complaints Status/ResolvedComplaintsPage';
// import RejectedComplaintsPage from '../Complaints Status/RejectedComplaintsPage';
// // ✅ ensure this is imported
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [complaints, setComplaints] = useState([]);
//   const [activeTab, setActiveTab] = useState('Dashboard'); // ✅ NEW STATE

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/complaints", {
//           withCredentials: true
//         });
//         console.log(res);
//         setComplaints(res.data.complaints);
//       } catch (error) {
//         console.error("Error fetching complaints", error);
//       }
//     };

//     fetchComplaints();
//   }, []);

  
//   const total = complaints.length;
//   const pending = complaints.filter(c => c.status === "Pending").length;
//   const resolved = complaints.filter(c => c.status === "Resolved").length;
//   const successRate = total === 0 ? "0%" : `${Math.round((resolved / total) * 100)}%`;


//   const handleNewComplaint = () => {
//     navigate('/student/new-complaint');
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl p-6 shadow-md">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-3xl font-bold">Welcome back, Student User!</h1>
//             <p className="mt-2 text-md">Track and manage your complaints with ease. Your voice matters!</p>
//           </div>
//           <div>
//             <button
//               onClick={handleNewComplaint}
//               className="bg-white text-blue-700 px-4 py-2 rounded border hover:bg-blue-50"
//             >
//               New Complaint
//             </button>
            
//             <p className="text-sm mt-2">Latest update: {new Date().toLocaleDateString()}</p>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <StatsCard title="Total Complaints" value={total} icon="📊" color="bg-blue-500" />
//           <StatsCard title="Pending" value={pending} icon="⏱️" color="bg-yellow-500" />
//           <StatsCard title="Resolved" value={resolved} icon="✅" color="bg-green-500" />
//           <StatsCard title="Success Rate" value={successRate} icon="🎯" color="bg-purple-500" />
//         </div>
//       </div>

//       <div className="mt-6 bg-white rounded-xl shadow-md p-4">
//         <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} />

//         {activeTab === 'Dashboard' && (
//           <ComplaintsByCategory complaints={complaints} />
//         )}

//         {activeTab === 'All Complaints' && (
//           <AllComplaintsPage complaints={complaints} />
          
//         )}

//         {activeTab === 'Pending' && (
//           <PendingComplaintsPage complaints={complaints} />
          
//         )}

//         {activeTab === 'In Progress' && (
//           <InProgressComplaintsPage complaints={complaints} />
          
//         )}

//         {activeTab === 'Resolved' && (
//           <ResolvedComplaintsPage complaints={complaints} />
          
//         )}

//         {activeTab === 'Rejected' && (
//           <RejectedComplaintsPage complaints={complaints} />
//         )}

//         <ComplaintsSummary complaints={complaints} />
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [role, setRole] = useState('student'); // Default to student

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:8000/complaints", {
          withCredentials: true
        });
        setComplaints(res.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/me", {
          withCredentials: true
        });
        setRole(res.data.role); // 'student' or 'faculty'
      } catch (error) {
        console.error("Error fetching user role", error);
      }
    };

    fetchComplaints();
    fetchUser(); // 👈 fetch role too
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const successRate = total === 0 ? "0%" : `${Math.round((resolved / total) * 100)}%`;

  const handleNewComplaint = () => {
    navigate('/student/new-complaint');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {role === 'faculty' ? 'Faculty' : 'Student'} User!
            </h1>
            <p className="mt-2 text-md">Track and manage your complaints with ease. Your voice matters!</p>
          </div>
          <div>
            <button
              onClick={handleNewComplaint}
              className="bg-white text-blue-700 px-4 py-2 rounded border hover:bg-blue-50"
            >
              New Complaint
            </button>
            <p className="text-sm mt-2">Latest update: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard title="Total Complaints" value={total} icon="📊" color="bg-blue-500" />
          <StatsCard title="Pending" value={pending} icon="⏱️" color="bg-yellow-500" />
          <StatsCard title="Resolved" value={resolved} icon="✅" color="bg-green-500" />
          <StatsCard title="Success Rate" value={successRate} icon="🎯" color="bg-purple-500" />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-md p-4">
        <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Dashboard' && (
          <ComplaintsByCategory complaints={complaints} />
        )}
        {activeTab === 'All Complaints' && (
          <AllComplaintsPage complaints={complaints} />
        )}
        {activeTab === 'Pending' && (
          <PendingComplaintsPage complaints={complaints} />
        )}
        {activeTab === 'In Progress' && (
          <InProgressComplaintsPage complaints={complaints} />
        )}
        {activeTab === 'Resolved' && (
          <ResolvedComplaintsPage complaints={complaints} />
        )}
        {activeTab === 'Rejected' && (
          <RejectedComplaintsPage complaints={complaints} />
        )}

        <ComplaintsSummary complaints={complaints} />
      </div>
    </div>
  );
};

export default StudentDashboard;
