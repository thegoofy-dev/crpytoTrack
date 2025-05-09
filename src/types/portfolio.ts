export interface PortfolioAsset {
  id: string;
  symbol: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: Date;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface Portfolio {
  assets: PortfolioAsset[];
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export interface PortfolioFormData {
  symbol: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: Date;
} 