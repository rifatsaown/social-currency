import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { currentUser, userData, isAdmin, isLoading } = useAuth();

  console.log(userData, 'userData');
  console.log(currentUser, 'currentUser');
  console.log(isAdmin, 'isAdmin');
  console.log(isLoading, 'isLoading');
  

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If requires admin and user is not admin, redirect to unauthorized
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  // If user is inactive, redirect to deactivated page
  if (userData && !userData.isActive) {
    return <Navigate to="/deactivated" />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
