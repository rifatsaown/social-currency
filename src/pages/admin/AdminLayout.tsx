import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../asset/logo.jpeg';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/participants', name: 'Participants', icon: Users },
    { path: '/admin/invitations', name: 'Invitations', icon: Mail },
    {
      path: '/admin/eligibility-checks',
      name: 'Eligibility Checks',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } bg-gradient-to-b from-purple-900 to-purple-700 text-white transition-all duration-300 ease-in-out fixed h-full z-20 ${
          mobileMenuOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-purple-600">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded mr-2" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Admin Portal
              </h1>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-full hover:bg-purple-600 transition-all duration-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <nav className="mt-6 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-100 hover:bg-purple-800/50'
              }`}
            >
              <item.icon
                size={20}
                className={
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-purple-300'
                }
              />
              {!sidebarCollapsed && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-purple-600 bg-purple-800/30">
          <div className="px-4 py-3">
            {!sidebarCollapsed && (
              <div className="mb-3 py-2">
                <p className="text-sm text-purple-200">Signed in as</p>
                <p className="font-medium truncate text-white">
                  {userData?.displayName}
                </p>
                <p className="text-xs text-purple-200 truncate">
                  {userData?.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2 text-white rounded-lg transition-all duration-200 hover:bg-purple-700 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={20} />
              {!sidebarCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-72'
        } ${isMobile ? 'ml-0' : ''}`}
      >
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
