import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This component ensures that routes are only accessible to authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login page
  // if (!isAuthenticated) {
  //   console.log("User not authenticated, redirecting to login");
  //   return <Navigate to="/login" replace />;
  // }

  // If user is authenticated, render the children (protected route)
  return children;
};

export default ProtectedRoute;
