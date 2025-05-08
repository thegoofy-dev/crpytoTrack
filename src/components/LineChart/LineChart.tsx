import { useEffect, useState } from "react";
import Chart from "react-google-charts";

interface HistoricalData {
  prices: [number, number][]; 
}

interface LineChartProps {
  historicalData: HistoricalData;
}

const LineChart = ({ historicalData }: LineChartProps) => {
  const [data, setData] = useState<[string, string | number][]>([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const formattedData: [string, string | number][] = [["Date", "Price"]];
      historicalData.prices.map((item) => {
        formattedData.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
      })
      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
