import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
