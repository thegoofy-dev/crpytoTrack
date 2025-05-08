import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../contexts/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
    high_24h: {
      [key: string]: number;
    };
    low_24h: {
      [key: string]: number;
    };
  };
  market_cap_rank: number;
}

interface HistoricalData {
  prices: [number, number][];
}

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY || "", // fallback
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch coin data: ${response.statusText}`);
      }

      const data = await response.json();
      setCoinData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Failed to load coin data. Please try again later.");
    }
  };

  const fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch historical data: ${response.statusText}`
        );
      }

      const data = await response.json();
      setHistoricalData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Failed to load historical data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId, currency]);

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.high_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.low_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
