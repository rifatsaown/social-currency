import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../asset/logo.jpeg';
import { useAuth } from '../../context/AuthContext';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
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
    { path: '/user/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/user/campaigns', name: 'My Campaigns', icon: BarChart },
    { path: '/user/wallet', name: 'Coin Wallet', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile hamburger menu */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-30 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-lg shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } bg-gradient-to-b from-pink-600 to-purple-700 text-white transition-all duration-300 ease-in-out fixed h-full z-20 ${
          mobileMenuOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-pink-500">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded mr-2" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
                User Dashboard
              </h1>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-full hover:bg-pink-500 transition-all duration-200"
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
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-pink-100 hover:bg-pink-700/50'
              }`}
            >
              <item.icon
                size={20}
                className={
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-pink-200'
                }
              />
              {!sidebarCollapsed && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-pink-500 bg-purple-700/30">
          <div className="px-4 py-3">
            {!sidebarCollapsed && (
              <div className="mb-3 py-2">
                <p className="text-sm text-pink-200">Signed in as</p>
                <p className="font-medium truncate text-white">
                  {userData?.displayName || userData?.fullName}
                </p>
                <p className="text-xs text-pink-200 truncate">
                  {userData?.email}
                </p>
                {userData?.instaHandle && (
                  <p className="text-xs text-pink-200 truncate">
                    @{userData.instaHandle}
                  </p>
                )}
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2 text-white rounded-lg transition-all duration-200 hover:bg-pink-600 ${
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

export default UserLayout;
