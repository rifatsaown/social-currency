import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout, userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-gray-900 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold">Admin Portal</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded hover:bg-gray-800"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className={`flex items-center px-4 py-3 ${
              location.pathname === '/admin/dashboard'
                ? 'bg-gray-800 text-blue-400'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard size={20} />
            {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link
            to="/admin/participants"
            className={`flex items-center px-4 py-3 ${
              location.pathname === '/admin/participants'
                ? 'bg-gray-800 text-blue-400'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Users size={20} />
            {!sidebarCollapsed && <span className="ml-3">Participants</span>}
          </Link>
          <Link
            to="/admin/invitations"
            className={`flex items-center px-4 py-3 ${
              location.pathname === '/admin/invitations'
                ? 'bg-gray-800 text-blue-400'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Mail size={20} />
            {!sidebarCollapsed && <span className="ml-3">Invitations</span>}
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-gray-800">
          <div className="px-4 py-3">
            {!sidebarCollapsed && (
              <div className="mb-2">
                <p className="text-sm text-gray-400">Signed in as</p>
                <p className="font-medium truncate">{userData?.displayName}</p>
                <p className="text-xs text-gray-400 truncate">
                  {userData?.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-800"
            >
              <LogOut size={20} />
              {!sidebarCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between h-16 px-6 bg-white shadow">
          <div>
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
