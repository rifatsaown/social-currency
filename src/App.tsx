import BuyPostEarn from './components/BuyPostEarn';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import GetStart from './components/GetStart/GetStart';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white">
      <Navbar />
      <Hero />
      <BuyPostEarn />
      <Features />
      <Footer/>
      <GetStart/>
    </div>
  );
};

export default App;
