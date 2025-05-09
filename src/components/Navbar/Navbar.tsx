import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { CoinContext } from "../../contexts/CoinContext";
import { Link } from "react-router-dom";
import { FaHome, FaBell, FaWallet, FaChartLine, FaGithub } from "react-icons/fa";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="nav">
      <Link to={`/`} className="logo">
        <img src={logo} alt="Crypto Tracker" />
      </Link>
      <ul>
        <li>
          <Link to={`/`}>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to={`/features`} className="feature-link">
            <FaChartLine /> Features
          </Link>
        </li>
        <li>
          <Link to={`/alerts`} className="feature-link">
            <FaBell /> Price Alerts
          </Link>
        </li>
        <li>
          <Link to={`/portfolio`} className="feature-link">
            <FaWallet /> Portfolio
          </Link>
        </li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <a 
          href="https://github.com/thegoofy-dev/crpytoTrack" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
