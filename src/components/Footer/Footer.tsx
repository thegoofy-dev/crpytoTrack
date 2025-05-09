import "./Footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
        <p>&#169;Copyright &#64;2025, CryptoTrack - All Right Reserved.</p>
        <div className="footer-links">
            <Link to="/suggestions" className="suggestions-link">
                Share Your Suggestions
            </Link>
        </div>
    </div>
  )
}

export default Footer
