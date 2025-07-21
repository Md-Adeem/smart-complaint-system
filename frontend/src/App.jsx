import { Routes, Route } from "react-router-dom";
import "./App.css";

// Global Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth & Landing
import Home from "./components/Landing/Home";
import AboutUs from "./components/Landing/AboutUs";
import LoginForm from "./components/Auth/LoginForm";
import SignUp from "./components/Auth/SignUp";
import GuestRoute from "./components/GuestRoute";

// Admin Dashboard & Management
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminComplaintManagement from "./components/Admin/AdminDashboard/AdminComplaintManager";

// Complaints
import ComplaintDetail from "./components/Admin/Complaints/ComplaintDetail";
import ComplaintListByStatus from "./components/Admin/Complaints/ComplaintListByStatus";
import ComplaintsByDateList from "./components/Admin/Complaints/ComplaintsByDateList";
import ComplaintsByStatus from "./components/Admin/Complaints/ComplaintsByStatus";
import ComplaintSummary from "./components/Admin/Complaints/ComplaintSummary";
import DateFilterComplaints from "./components/Admin/Complaints/DateFilterComplaints";

// Filters & Tools
import FilterComplaints from "./components/Admin/Filter/FilterComplaints";
import NotificationCenter from "./components/Admin/Filter/NotificationCenter";
import SearchResults from "./components/Admin/Filter/SearchResults";
import Protected from "./components/Protected";
import NewComplaint from "./components/Student/Complaints/NewComplaint";
import StudentDashboard from "./components/Student/Student Page/StudentDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
         {/* Public Routes */}
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth - Protected from logged-in users */}
        <Route path="/loginform" element={
          <GuestRoute>
            <LoginForm />
          </GuestRoute>
        } />
        <Route path="/signup" element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        } />
        <Route path="/about" element={<AboutUs />} />

        {/* Student Routes */}
        <Route path="/studentdashboard" element={<StudentDashboard/>} />
        <Route path="/student/new-complaint" element={<NewComplaint />} />

        {/* Admin Dashboard */}
        {/* Protected Admin Routes */}
        <Route element={<Protected requireAdmin={true} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/complaint-management" element={<AdminComplaintManagement />} />
          <Route path="/admin/complaints/:complaintId" element={<ComplaintDetail />} />
          <Route path="/admin/complaints" element={<ComplaintListByStatus />} />
          <Route path="/admin/complaints/by-status" element={<ComplaintsByStatus />} />
          <Route path="/admin/complaints/summary" element={<ComplaintSummary />} />
          <Route path="/admin/complaints/datefilter/list" element={<ComplaintsByDateList />} />
          <Route path="/admin/complaints/datefilter" element={<DateFilterComplaints />} />
          <Route path="/admin/complaints/filter" element={<FilterComplaints />} />
          <Route path="/admin/complaints/search/:query" element={<SearchResults />} />
          <Route path="/admin/notifications" element={<NotificationCenter />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
