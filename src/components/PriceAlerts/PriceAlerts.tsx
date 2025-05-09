import React, { useState, useEffect } from 'react';
import type { PriceAlert, AlertFormData, AlertCondition } from '../../types/alert';
import { FaBell, FaTrash } from 'react-icons/fa';
import { cryptoService } from '../../services/cryptoService';
import { storageService } from '../../services/storageService';
import './PriceAlerts.css';

interface CoinSearchResult {
  id: string;
  symbol: string;
  name: string;
}

const PriceAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [formData, setFormData] = useState<AlertFormData>({
    coinId: '',
    coinSymbol: '',
    condition: 'above',
    price: 0,
  });
  const [searchResults, setSearchResults] = useState<CoinSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load saved alerts
    const savedAlerts = storageService.getAlerts();
    setAlerts(savedAlerts);

    // Set up price checking interval
    const interval = setInterval(checkAlertPrices, 60000); // Check every minute
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSymbolChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const symbol = e.target.value.toUpperCase();
    setFormData({ ...formData, coinSymbol: symbol });

    if (symbol.length >= 2) {
      setIsSearching(true);
      try {
        const results = await cryptoService.searchCoins(symbol);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching coins:', error);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const selectCoin = (coin: CoinSearchResult) => {
    setFormData({
      ...formData,
      coinId: coin.id,
      coinSymbol: coin.symbol.toUpperCase(),
    });
    setSearchResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      createdAt: new Date(),
    };
    const updatedAlerts = [...alerts, newAlert];
    setAlerts(updatedAlerts);
    storageService.saveAlerts(updatedAlerts);
    setFormData({
      coinId: '',
      coinSymbol: '',
      condition: 'above',
      price: 0,
    });
  };

  const deleteAlert = (id: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    storageService.saveAlerts(updatedAlerts);
  };

  const checkAlertPrices = async () => {
    const activeAlerts = alerts.filter(alert => alert.isActive);
    if (activeAlerts.length === 0) return;

    try {
      const coinIds = [...new Set(activeAlerts.map(alert => alert.coinId))];
      const prices = await cryptoService.getMultipleCoinPrices(coinIds);

      const updatedAlerts = alerts.map(alert => {
        if (!alert.isActive) return alert;

        const currentPrice = prices[alert.coinId];
        if (!currentPrice) return alert;

        let triggered = false;
        switch (alert.condition) {
          case 'above':
            triggered = currentPrice > alert.price;
            break;
          case 'below':
            triggered = currentPrice < alert.price;
            break;
          case 'percent_change':
            // Implement percent change logic if needed
            break;
        }

        if (triggered) {
          // Show notification
          new Notification(`Price Alert: ${alert.coinSymbol}`, {
            body: `${alert.coinSymbol} is now ${alert.condition} $${alert.price}`,
          });
          return { ...alert, isActive: false, triggeredAt: new Date() };
        }

        return alert;
      });

      setAlerts(updatedAlerts);
      storageService.saveAlerts(updatedAlerts);
    } catch (error) {
      console.error('Error checking alert prices:', error);
    }
  };

  return (
    <div className="price-alerts-container">
      <h2><FaBell /> Price Alerts</h2>
      
      <form onSubmit={handleSubmit} className="alert-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Coin Symbol (e.g., BTC)"
            value={formData.coinSymbol}
            onChange={handleSymbolChange}
            required
          />
          {isSearching && <div className="searching">Searching...</div>}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(coin => (
                <div
                  key={coin.id}
                  className="search-result-item"
                  onClick={() => selectCoin(coin)}
                >
                  {coin.symbol.toUpperCase()} - {coin.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <select
            value={formData.condition}
            onChange={(e) => setFormData({...formData, condition: e.target.value as AlertCondition})}
          >
            <option value="above">Price Above</option>
            <option value="below">Price Below</option>
            <option value="percent_change">Percent Change</option>
          </select>
        </div>
        
        <div className="form-group">
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">Create Alert</button>
      </form>

      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${!alert.isActive ? 'triggered' : ''}`}>
            <div className="alert-info">
              <span className="coin-symbol">{alert.coinSymbol}</span>
              <span className="condition">
                {alert.condition === 'above' ? '>' : alert.condition === 'below' ? '<' : '±'} 
                ${alert.price.toLocaleString()}
              </span>
              {alert.triggeredAt && (
                <span className="triggered-time">
                  Triggered: {new Date(alert.triggeredAt).toLocaleString()}
                </span>
              )}
            </div>
            <button 
              onClick={() => deleteAlert(alert.id)}
              className="delete-button"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceAlerts; 