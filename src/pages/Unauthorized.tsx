import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-red-500 mb-4">
        <ShieldX size={64} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Unauthorized Access
      </h1>
      <p className="text-gray-600 text-center mb-6">
        You don't have permission to access this page. This area is restricted
        to administrators.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
