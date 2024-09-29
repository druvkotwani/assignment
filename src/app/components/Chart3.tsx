"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  Bar,
  ComposedChart,
} from "recharts";

interface DataPoint {
  date: string;
  price: number;
  volume: number;
  comparisonPrice?: number;
}

// Mock data generator
const generateMockData = (days: number): DataPoint[] => {
  const data: DataPoint[] = [];
  let price = 65000;
  let comparisonPrice = 60000;
  for (let i = 0; i < days; i++) {
    price += Math.random() * 1000 - 500;
    comparisonPrice += Math.random() * 800 - 400;
    data.push({
      date: new Date(2024, 0, i + 1).toISOString().split("T")[0],
      price: Math.round(price),
      volume: Math.floor(Math.random() * 1000000),
      comparisonPrice: Math.round(comparisonPrice),
    });
  }
  return data;
};

const CryptoChart: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("90");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [bitcoinData, setBitcoinData] = useState<DataPoint[]>(
    generateMockData(parseInt(activeTimeframe))
  );

  const timeframes = [
    { label: "1d", value: "1" },
    { label: "7d", value: "7" },
    { label: "30d", value: "30" },
    { label: "90d", value: "90" },
    { label: "1y", value: "365" },
    { label: "max", value: "max" },
  ];

  const handleTimeframeChange = (timeframe: string) => {
    setActiveTimeframe(timeframe);
    setBitcoinData(
      generateMockData(timeframe === "max" ? 1000 : parseInt(timeframe))
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const addGapsBetweenBars = (data: DataPoint[]): DataPoint[] => {
    return data.flatMap((item) => [item, { ...item, volume: 0, isGap: true }]);
  };

  return (
    <div
      ref={chartRef}
      className={`crypto-chart font-cic-std bg-white p-6 rounded-xl shadow-sm ${
        isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen"
          : "max-w-4xl mx-auto"
      }`}
    >
      <div
        className={`flex flex-col h-full ${
          isFullscreen ? "justify-between" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-2 text-[#6F7177] text-lg font-normal bg-gray-100 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out flex items-center"
            >
              <Image
                src="/icons/icon-1.svg"
                width={16}
                height={16}
                alt=""
                className="mr-1"
              />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <button
              onClick={toggleComparison}
              className={`px-3 py-2 text-lg font-normal rounded-md transition duration-150 ease-in-out flex items-center ${
                showComparison
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-100 text-[#6F7177] hover:bg-gray-200"
              }`}
            >
              <Image
                src="/icons/icon.svg"
                width={16}
                height={16}
                alt=""
                className="mr-1"
              />
              Compare
            </button>
          </div>
          <div className="ml-2 flex space-x-1 text-sm">
            {timeframes.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleTimeframeChange(value)}
                className={`px-3 py-1 rounded-md transition duration-150 ease-in-out text-lg font-normal ${
                  value === activeTimeframe
                    ? "bg-[#4F46E5] text-[#ffffff]"
                    : "bg-gray-100 text-[#6F7177] hover:bg-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-opacity-50`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`${
            isFullscreen ? "flex-grow" : "h-80"
          } w-full bg-white rounded-xl`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={addGapsBetweenBars(bitcoinData)}
              margin={{
                top: 5,
                right: -50,
                left: -50,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "transparent" }}
              />
              <YAxis
                yAxisId="left"
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "transparent" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, (dataMax: number) => dataMax * 2]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "transparent" }}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                }}
                cursor={{ stroke: "#4F46E5", strokeWidth: 1 }}
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    const currentPrice = payload.find(
                      (p) => p.dataKey === "price"
                    );
                    const comparisonPrice = payload.find(
                      (p) => p.dataKey === "comparisonPrice"
                    );
                    const volumeData = payload.find(
                      (p) => p.dataKey === "volume"
                    );
                    const date = new Date(label).toLocaleDateString();

                    return (
                      <div className="custom-tooltip bg-white p-3 rounded-lg shadow-md border border-gray-200">
                        <p className="text-sm font-normal text-gray-500 mb-1">
                          {date}
                        </p>
                        {currentPrice && (
                          <p className="text-lg font-normal text-[#4F46E5]">
                            ${Number(currentPrice?.value).toFixed(2)}
                          </p>
                        )}
                        {showComparison && comparisonPrice && (
                          <p className="text-lg font-normal text-orange-500">
                            ${Number(comparisonPrice.value).toFixed(2)}
                          </p>
                        )}
                        {volumeData && (
                          <p className="text-sm text-gray-600 font-normal">
                            Volume: {Number(volumeData.value).toLocaleString()}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id="colorComparison"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
              {showComparison && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="comparisonPrice"
                  stroke="#F97316"
                  fillOpacity={1}
                  fill="url(#colorComparison)"
                />
              )}
              <Bar
                yAxisId="right"
                dataKey="volume"
                fill="#E6E8EB"
                opacity={1}
                barSize={4}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#4F46E5",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              {showComparison && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="comparisonPrice"
                  stroke="#F97316"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#F97316",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;
