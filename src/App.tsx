import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from './components/Footer/Footer';
import Features from './pages/Features/Features';
import Pricing from './pages/Pricing/Pricing';
import PriceAlerts from './components/PriceAlerts/PriceAlerts';
import PortfolioPage from './components/Portfolio/Portfolio';
import SuggestionForm from './components/SuggestionForm/SuggestionForm';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/alerts" element={<PriceAlerts />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/suggestions" element={<SuggestionForm />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
