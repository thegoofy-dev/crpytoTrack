import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../contexts/CoinContext";
import { Link } from "react-router-dom";
import { cryptoService } from "../../services/cryptoService";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState<Coin[]>([]);
  const [input, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

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

    if (value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectCoin = (coin: any) => {
    setInput(coin.name);
    setSearchResults([]);
    const filteredCoins = allCoin.filter((item) => 
      item.name.toLowerCase().includes(coin.name.toLowerCase())
    );
    setDisplayCoin(filteredCoins);
  };

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  if (!allCoin.length) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto MarketPlace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler} className="search-form">
          <div className="search-container">
            <input
              onChange={inputHandler}
              value={input}
              type="text"
              placeholder="Search Crypto.."
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
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {Array.isArray(displayCoin) ? (
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{`${item.name} - ${item.symbol}`}</p>
              </div>
              <p >
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p style={{textAlign:"center"}}
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        ) : (
          <p>Loading or failed to load data.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
