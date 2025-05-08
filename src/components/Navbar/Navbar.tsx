import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { MdArrowOutward } from "react-icons/md";
import { CoinContext } from "../../contexts/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {

    const { setCurrency } = useContext(CoinContext);

    const currencyHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" })
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" })
                break;
            }
            default: {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
        }
    }
    return (
        <div className="nav">
            <Link to={`/`}>
                <img src={logo} alt="" className="logo" />
            </Link>
            <ul>
                <Link to={`/`}>
                    <li>Home</li>
                </Link>
                <Link to={`/features`}>
                <li>Features</li>
                </Link>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="nav-right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
                <button className="signup">
                    <span>Sign Up</span> <MdArrowOutward size={18} />
                </button>
            </div>
        </div>
    )
}

export default Navbar;
