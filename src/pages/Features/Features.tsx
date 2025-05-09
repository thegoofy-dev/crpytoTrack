import "./Features.css";
import PriceConverter from "../../components/PriceConverter/PriceConverter";

const Features = () => {
    return (
        <div className="features">
            <header className="features-header">
                <h1>Features</h1>
                <p>
                    Discover the powerful tools and features that make CryptoTrack your ultimate
                    cryptocurrency tracking solution.
                </p>
            </header>

            {/* Live Price Converter Feature */}
            <div className="feature-section">
                <h2>Live Cryptocurrency Converter</h2>
                <p className="feature-description">
                    Convert between different cryptocurrencies in real-time using our powerful converter.
                    Get instant price conversions for over 100 cryptocurrencies.
                </p>
                <PriceConverter />
            </div>

            <div className="features-list">
                <div className="feature-item">
                    <h2>Real-Time Tracking</h2>
                    <p>Stay updated with real-time cryptocurrency prices and market trends.</p>
                </div>
                <div className="feature-item">
                    <h2>Customizable Dashboard</h2>
                    <p>Personalize your dashboard to track your favorite cryptocurrencies.</p>
                </div>
                <div className="feature-item">
                    <h2>Secure Transactions</h2>
                    <p>Experience secure and seamless cryptocurrency transactions.</p>
                </div>
                <div className="feature-item">
                    <h2>Global Currency Support</h2>
                    <p>Switch between multiple currencies to view prices in your preferred format.</p>
                </div>
                <div className="feature-item">
                    <h2>Advanced Analytics</h2>
                    <p>
                        Gain insights with detailed analytics, charts, and historical data for
                        informed decision-making.
                    </p>
                </div>
                <div className="feature-item">
                    <h2>Portfolio Management</h2>
                    <p>
                        Manage your cryptocurrency portfolio with ease and track your investments
                        in one place.
                    </p>
                </div>
                <div className="feature-item">
                    <h2>Mobile-Friendly</h2>
                    <p>
                        Access CryptoTrack on the go with a responsive design optimized for all
                        devices.
                    </p>
                </div>
                <div className="feature-item">
                    <h2>24/7 Support</h2>
                    <p>
                        Get assistance anytime with our dedicated support team available around the
                        clock.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;