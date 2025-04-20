import { UserX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Deactivated = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-red-500 mb-4">
        <UserX size={64} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Account Deactivated
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Your account has been deactivated by an administrator. Please contact
        support if you believe this is an error.
      </p>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Deactivated;
