import Hero from './components/Hero';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
