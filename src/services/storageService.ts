import type { PriceAlert } from '../types/alert';
import type { Portfolio, PortfolioAsset } from '../types/portfolio';

const STORAGE_KEYS = {
  ALERTS: 'crypto_tracker_alerts',
  PORTFOLIO: 'crypto_portfolio'
};

export const storageService = {
  // Alerts
  getAlerts(): PriceAlert[] {
    const alerts = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return alerts ? JSON.parse(alerts) : [];
  },

  saveAlerts(alerts: PriceAlert[]): void {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
  },

  // Portfolio
  getPortfolio: (): Portfolio | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (!data) return null;
    
    try {
      const portfolio = JSON.parse(data);
      // Convert string dates back to Date objects
      portfolio.assets = portfolio.assets.map((asset: Omit<PortfolioAsset, 'purchaseDate'> & { purchaseDate: string }) => ({
        ...asset,
        purchaseDate: new Date(asset.purchaseDate)
      }));
      return portfolio;
    } catch (error) {
      console.error('Error parsing portfolio data:', error);
      return null;
    }
  },

  savePortfolio: (portfolio: Portfolio): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  }
}; 