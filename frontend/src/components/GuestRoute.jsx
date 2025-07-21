import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  // If user is logged in, redirect to appropriate dashboard
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/adminDashboard" replace />;
    } else {
      return <Navigate to="/studentdashboard" replace />;
    }
  }

  // If not logged in, show the login/signup page
  return children;
};

export default GuestRoute; 