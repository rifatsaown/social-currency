import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
