// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
// import './App.css'
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import AdminDashboard from './pages/admindashboard';

// function App() {
//   return (
//     <>
//       <Navbar role="student" />
//       <div className="p-4">
//         <h1 className="text-3xl font-bold">Welcome to Smart Complaint System</h1>
//         <h2>Hello guyz you know what time it is ?</h2>
//         <h2>Hye Everyone hope you doing well!</h2>
//       </div>
//     </>
//   );
// }

// export default App

// import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar';
// import Landingpage from './pages/Landingpage';
// import Login from './pages/Login';
// import AdminDashboard from './pages/admindashboard';
// import Register from './pages/Register';

// function App() {
//   return (
//     <>
//       <Navbar role="student" />
//       <Landingpage />
  
//       <div className="p-4">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <h1 className="text-3xl font-bold">Welcome to Smart Complaint System</h1>
//               <h2>Hello guyz you know what time it is ?</h2>
//               <h2>Hye Everyone hope you doing well!</h2>
//             </>
//           } />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/landingpage" element={<Landingpage />} /> */}
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;

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

        {/* Register Page */}
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


