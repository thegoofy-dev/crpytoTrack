import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../contexts/CoinContext";

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
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
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

  useEffect(() => {
    fetchCoinData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId, currency]);

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!coinData) {
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
      {/* <div className="coin-price">
        <p>
          Current Price: {currency.symbol}{" "}
          {coinData.market_data.current_price[currency.name].toLocaleString()}
        </p>
      </div> */}
    </div>
  );
};

export default Coin;
