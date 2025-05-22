

import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Complainlist from './pages/Complainlist';
import AdminDashboard from './pages/admindashboard';

function App() {
  return (
    <>
      <Navbar role="student" />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Landingpage />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
      
        {/* Complain List Page */}
       <Route path="/complain-list" element={<Complainlist />} />

        {/* Admin Dashboard Page */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;


