import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaTrash, FaWallet } from 'react-icons/fa';
import { cryptoService } from '../../services/cryptoService';
import { storageService } from '../../services/storageService';
import { Portfolio, PortfolioAsset, PortfolioFormData } from '../../types/portfolio';
import { CoinContext } from '../../contexts/CoinContext';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  const { currency } = useContext(CoinContext);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    assets: [],
    totalValue: 0,
    totalProfitLoss: 0,
    totalProfitLossPercentage: 0
  });
  const [formData, setFormData] = useState<PortfolioFormData>({
    symbol: '',
    amount: 0,
    purchasePrice: 0,
    purchaseDate: new Date()
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load portfolio data from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = storageService.getPortfolio();
    if (savedPortfolio) {
      setPortfolio(savedPortfolio);
    }
  }, []);

  // Update portfolio values every minute
  useEffect(() => {
    if (portfolio.assets.length > 0) {
      const updateInterval = setInterval(updatePortfolioValues, 60000);
      return () => clearInterval(updateInterval);
    }
  }, [portfolio.assets]);

  // Update portfolio values when currency changes
  useEffect(() => {
    updatePortfolioValues();
  }, [currency]);

  const handleSymbolChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, symbol: value });

    if (value.length >= 2) {
      setIsSearching(true);
      try {
        const results = await cryptoService.searchCoins(value);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching coins:', error);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const selectCoin = (coin: any) => {
    setFormData({ ...formData, symbol: coin.id });
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'purchaseDate' ? new Date(value) : parseFloat(value) || 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const currentPrice = await cryptoService.getCurrentPrice(formData.symbol, currency.name);
      
      if (currentPrice === 0) {
        throw new Error('Could not fetch current price');
      }

      const newAsset: PortfolioAsset = {
        id: Date.now().toString(),
        symbol: formData.symbol.toUpperCase(),
        amount: formData.amount,
        purchasePrice: formData.purchasePrice,
        purchaseDate: formData.purchaseDate,
        currentPrice: currentPrice,
        value: formData.amount * currentPrice,
        profitLoss: (currentPrice - formData.purchasePrice) * formData.amount,
        profitLossPercentage: ((currentPrice - formData.purchasePrice) / formData.purchasePrice) * 100
      };

      const updatedPortfolio = {
        ...portfolio,
        assets: [...portfolio.assets, newAsset]
      };

      // Calculate new totals
      const totalValue = updatedPortfolio.assets.reduce((sum, asset) => sum + asset.value, 0);
      const totalCost = updatedPortfolio.assets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.amount), 0);
      const totalProfitLoss = totalValue - totalCost;
      const totalProfitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

      const finalPortfolio = {
        ...updatedPortfolio,
        totalValue,
        totalProfitLoss,
        totalProfitLossPercentage
      };

      setPortfolio(finalPortfolio);
      storageService.savePortfolio(finalPortfolio);
      setFormData({
        symbol: '',
        amount: 0,
        purchasePrice: 0,
        purchaseDate: new Date()
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Error adding asset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAsset = (assetId: string) => {
    const updatedAssets = portfolio.assets.filter(asset => asset.id !== assetId);
    
    if (updatedAssets.length === 0) {
      const emptyPortfolio = {
        assets: [],
        totalValue: 0,
        totalProfitLoss: 0,
        totalProfitLossPercentage: 0
      };
      setPortfolio(emptyPortfolio);
      storageService.savePortfolio(emptyPortfolio);
      return;
    }

    // Recalculate totals
    const totalValue = updatedAssets.reduce((sum, asset) => sum + asset.value, 0);
    const totalCost = updatedAssets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.amount), 0);
    const totalProfitLoss = totalValue - totalCost;
    const totalProfitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

    const updatedPortfolio = {
      ...portfolio,
      assets: updatedAssets,
      totalValue,
      totalProfitLoss,
      totalProfitLossPercentage
    };

    setPortfolio(updatedPortfolio);
    storageService.savePortfolio(updatedPortfolio);
  };

  const updatePortfolioValues = async () => {
    try {
      const updatedAssets = await Promise.all(
        portfolio.assets.map(async (asset) => {
          const currentPrice = await cryptoService.getCurrentPrice(asset.symbol, currency.name);
          return {
            ...asset,
            currentPrice,
            value: asset.amount * currentPrice,
            profitLoss: (currentPrice - asset.purchasePrice) * asset.amount,
            profitLossPercentage: ((currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100
          };
        })
      );

      const totalValue = updatedAssets.reduce((sum, asset) => sum + asset.value, 0);
      const totalCost = updatedAssets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.amount), 0);
      const totalProfitLoss = totalValue - totalCost;
      const totalProfitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

      const updatedPortfolio = {
        ...portfolio,
        assets: updatedAssets,
        totalValue,
        totalProfitLoss,
        totalProfitLossPercentage
      };

      setPortfolio(updatedPortfolio);
      storageService.savePortfolio(updatedPortfolio);
    } catch (error) {
      console.error('Error updating portfolio values:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return `${currency.symbol}${value.toFixed(2)}`;
  };

  return (
    <div className="portfolio-container">
      <h2>
        <FaWallet /> Portfolio
      </h2>

      <div className="portfolio-summary">
        <div className="summary-item">
          <span className="label">Total Value</span>
          <span className="value">{formatCurrency(portfolio.totalValue)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Profit/Loss</span>
          <span className={`value ${portfolio.totalProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(portfolio.totalProfitLoss)}
          </span>
        </div>
        <div className="summary-item">
          <span className="label">Profit/Loss %</span>
          <span className={`value ${portfolio.totalProfitLossPercentage >= 0 ? 'positive' : 'negative'}`}>
            {portfolio.totalProfitLossPercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-group">
          <label htmlFor="symbol">Cryptocurrency Symbol (e.g., BTC, ETH)</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleSymbolChange}
            placeholder="Search for a coin..."
            required
          />
          {isSearching && <div className="searching">Searching...</div>}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((coin) => (
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
          <label htmlFor="amount">Amount of Coins You Own</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount || ''}
            onChange={handleInputChange}
            placeholder="Enter amount..."
            step="any"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchasePrice">Price Per Coin When You Bought</label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={formData.purchasePrice || ''}
            onChange={handleInputChange}
            placeholder="Enter purchase price..."
            step="any"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchaseDate">Date of Purchase</label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate.toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          <FaPlus /> {isLoading ? 'Adding...' : 'Add to Portfolio'}
        </button>
      </form>

      <div className="assets-list">
        {portfolio.assets.map((asset) => (
          <div key={asset.id} className="asset-item">
            <div className="asset-info">
              <span className="coin-symbol">{asset.symbol}</span>
              <span className="amount">{asset.amount} coins</span>
              <span className="purchase-price">Bought at {formatCurrency(asset.purchasePrice)}</span>
              <span className="current-price">Current: {formatCurrency(asset.currentPrice)}</span>
              <span className={`profit-loss ${asset.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                {asset.profitLoss >= 0 ? '+' : ''}{formatCurrency(asset.profitLoss)} ({asset.profitLossPercentage.toFixed(2)}%)
              </span>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteAsset(asset.id)}
              title="Remove asset"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio; 