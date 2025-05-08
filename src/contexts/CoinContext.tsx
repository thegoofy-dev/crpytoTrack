import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type FC,
} from "react";

// Define Currency Type
export interface CurrencyType {
  name: string;
  symbol: string;
}

// Define Coin Type (you can extend this as needed)
export interface CoinType {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

// Define Context Type
export interface CoinContextType {
  allCoin: CoinType[];
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CoinContext = createContext<CoinContextType>({
  allCoin: [],
  currency: { name: "usd", symbol: "$" },
  setCurrency: () => { },
});

// Props type for the provider
interface Props {
  children: ReactNode;
}

const CoinContextProvider: FC<Props> = ({ children }) => {
  const [allCoin, setAllCoin] = useState<CoinType[]>([]);

  const [currency, setCurrency] = useState<CurrencyType>({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.CG_API_KEY,
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
