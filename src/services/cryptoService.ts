import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const cryptoService = {
  async getCoinPrice(coinId: string, currency: string = 'usd'): Promise<number> {
    try {
      const response = await axios.get(`${API_BASE_URL}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: currency
        }
      });
      return response.data[coinId][currency];
    } catch (error) {
      console.error('Error fetching coin price:', error);
      throw error;
    }
  },

  async searchCoins(query: string): Promise<CoinPrice[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
      const data = await response.json();
      return data.coins.slice(0, 5);
    } catch (error) {
      console.error('Error searching coins:', error);
      return [];
    }
  },

  async getMultipleCoinPrices(coinIds: string[], currency: string = 'usd'): Promise<Record<string, number>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/simple/price`, {
        params: {
          ids: coinIds.join(','),
          vs_currencies: currency
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching multiple coin prices:', error);
      throw error;
    }
  },

  getCurrentPrice: async (symbol: string, currency: string = 'usd'): Promise<number> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=${currency}`
      );
      const data = await response.json();
      return data[symbol.toLowerCase()]?.[currency] || 0;
    } catch (error) {
      console.error('Error getting current price:', error);
      return 0;
    }
  }
}; 