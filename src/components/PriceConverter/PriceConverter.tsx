import { useState, useEffect } from 'react';
import './PriceConverter.css';

interface CoinData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
}

const PriceConverter = () => {
    const [coins, setCoins] = useState<CoinData[]>([]);
    const [fromAmount, setFromAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState<string>('bitcoin');
    const [toCurrency, setToCurrency] = useState<string>('ethereum');
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchCoins();
    }, []);

    const fetchCoins = async () => {
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            );
            const data = await response.json();
            setCoins(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching coins:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (coins.length > 0) {
            const fromCoin = coins.find(coin => coin.id === fromCurrency);
            const toCoin = coins.find(coin => coin.id === toCurrency);
            
            if (fromCoin && toCoin) {
                const result = (Number(fromAmount) * fromCoin.current_price) / toCoin.current_price;
                setConvertedAmount(result);
            }
        }
    }, [fromAmount, fromCurrency, toCurrency, coins]);

    if (loading) {
        return <div className="converter-loading">Loading...</div>;
    }

    return (
        <div className="price-converter">
            <h2>Cryptocurrency Converter</h2>
            <div className="converter-form">
                <div className="converter-input">
                    <input
                        type="number"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        min="0"
                        step="any"
                    />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="converter-arrow">↓</div>
                <div className="converter-input">
                    <input
                        type="number"
                        value={convertedAmount.toFixed(8)}
                        readOnly
                    />
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PriceConverter; 