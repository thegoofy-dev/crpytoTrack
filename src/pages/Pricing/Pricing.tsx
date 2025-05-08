// PricingPage.tsx
import React from "react";
import "./Pricing.css";

const Pricing: React.FC = () => {
  const handleButtonClick = (plan: string) => {
    console.log(`Selected plan: ${plan}`);
  };

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Choose Your Plan</h1>
      <p className="pricing-subtitle">
        Start tracking crypto markets like a pro
      </p>

      <div className="pricing-cards-container">
        <div className="pricing-card">
          <h2>Basic</h2>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">0</span>
            <span className="period">/month</span>
          </div>
          <ul className="features-list">
            <li>Real-time price tracking</li>
            <li>Basic portfolio management</li>
            <li>24-hour updates</li>
            <li>5 portfolio slots</li>
          </ul>
          <button
            className="plan-button"
            onClick={() => handleButtonClick("basic")}
          >
            Get Started
          </button>
        </div>

        <div className="pricing-card highlighted">
          <h2>Pro</h2>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">9.99</span>
            <span className="period">/month</span>
          </div>
          <ul className="features-list">
            <li>All Basic features</li>
            <li>Advanced analytics</li>
            <li>1-minute updates</li>
            <li>Unlimited portfolio slots</li>
            <li>Price alerts</li>
          </ul>
          <button
            className="plan-button highlighted-btn"
            onClick={() => handleButtonClick("pro")}
          >
            Start Free Trial
          </button>
        </div>

        <div className="pricing-card">
          <h2>Enterprise</h2>
          <div className="price">
            <span className="currency">$</span>
            <span className="amount">49.99</span>
            <span className="period">/month</span>
          </div>
          <ul className="features-list">
            <li>All Pro features</li>
            <li>Priority support</li>
            <li>Custom integrations</li>
            <li>Team management</li>
            <li>Dedicated account manager</li>
          </ul>
          <button
            className="plan-button"
            onClick={() => handleButtonClick("enterprise")}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
