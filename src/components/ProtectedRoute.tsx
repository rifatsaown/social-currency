import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireApproved?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireApproved = true,
}: ProtectedRouteProps) => {
  const { currentUser, userData, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Check if current route is a dashboard route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');
  const isDashboardRoute = isAdminRoute || isUserRoute;

  // Handle redirection after login for dashboard access
  useEffect(() => {
    if (!isLoading && currentUser && userData && isDashboardRoute) {
      // If user tries to access admin routes but is not admin
      if (isAdminRoute && !isAdmin) {
        console.log('User tried to access admin route but is not admin');
      }
      // If admin tries to access user routes
      else if (isUserRoute && isAdmin) {
        console.log('Admin tried to access user route');
      }
    }
  }, [
    isLoading,
    currentUser,
    userData,
    isAdmin,
    isDashboardRoute,
    isAdminRoute,
    isUserRoute,
  ]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <p className="ml-3 text-gray-700">Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  // If requires admin and user is not admin, redirect to unauthorized
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  // If user logged in but doesn't have a role yet (new user)
  if (!userData?.role) {
    console.log('User has no role yet');
    // They may still be in the approval process
    return <Navigate to="/apply-now" />;
  }

  // If user is inactive, redirect to deactivated page
  if (userData && userData.status === 'inactive') {
    return <Navigate to="/deactivated" />;
  }

  // Redirect users to appropriate dashboard if they try to access root paths
  if (location.pathname === '/dashboard' || location.pathname === '/') {
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
