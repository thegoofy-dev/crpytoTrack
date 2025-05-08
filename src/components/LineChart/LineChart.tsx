import { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface HistoricalData {
  prices: [number, number][];
}

interface LineChartProps {
  historicalData: HistoricalData;
}

const LineChart = ({ historicalData }: LineChartProps) => {
  const [data, setData] = useState<{ date: string; price: number }[]>([]);

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const formattedData = historicalData.prices.map((item) => ({
        date: new Date(item[0]).toLocaleDateString().slice(0, -5),
        price: item[1],
      }));
      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#4500c6"
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
