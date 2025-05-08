import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from './components/Footer/Footer';
import Features from './pages/Features/Features';
import Pricing from './pages/Pricing/Pricing';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
