import {
  Bell,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Mail,
  Search,
  Settings,
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
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <ChevronLeft size={24} />
                ) : (
                  <ChevronRight size={24} />
                )}
              </button>
            )}

            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {navItems.find((item) => item.path === location.pathname)?.name ||
                'Admin Dashboard'}
            </h2>

            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={18} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <Settings size={20} />
              </button>
              <div className="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
                {userData?.displayName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

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
