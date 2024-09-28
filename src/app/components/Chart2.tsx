"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

import Tabs from "./Tabs";
import Image from "next/image";
import { TabContext } from "../context/tabContext";
import Link from "next/link";

type TimeframeKey = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";

const generateChartData = (days: number): number[] => {
  const data: number[] = [];
  const basePrice = 60000;
  for (let i = 0; i < days; i++) {
    data.push(basePrice + Math.random() * 10000 - 5000);
  }
  return data;
};
const baseUrl = "http://api.mediastack.com/v1/news";

const generateVolumeData = (days: number): number[] => {
  return Array.from({ length: days }, () => Math.random() * 100);
};

const timeframes: Record<TimeframeKey, number> = {
  "1d": 1,
  "3d": 3,
  "1w": 7,
  "1m": 30,
  "6m": 180,
  "1y": 365,
  max: 1825, // 5 years
};

const randomCoins = [
  { id: "ethereum", name: "Ethereum" },
  { id: "cardano", name: "Cardano" },
  { id: "solana", name: "Solana" },
  { id: "polkadot", name: "Polkadot" },
  { id: "dogecoin", name: "Dogecoin" },
];

const Chart2 = () => {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("1m");
  const [chartData, setChartData] = useState<number[]>(() =>
    generateChartData(timeframes["1m"])
  );
  const [comparisonData, setComparisonData] = useState<number[] | null>(null);
  const [volumeData, setVolumeData] = useState<number[]>(() =>
    generateVolumeData(timeframes["1m"])
  );
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredComparisonPrice, setHoveredComparisonPrice] = useState<
    number | null
  >(null);
  const [hoveredPosition, setHoveredPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  interface NewsArticle {
    title: string;
    description: string;
    url: string;
  }

  const [news, setNews] = useState<NewsArticle[]>([]);
  const visibleDataPoints = Math.floor(chartData.length / zoomLevel);
  const visibleChartData = useMemo(
    () => chartData.slice(-visibleDataPoints),
    [chartData, visibleDataPoints]
  );
  const visibleComparisonData = useMemo(
    () => comparisonData?.slice(-visibleDataPoints) || [],
    [comparisonData, visibleDataPoints]
  );
  const visibleVolumeData = useMemo(
    () => volumeData.slice(-visibleDataPoints),
    [volumeData, visibleDataPoints]
  );

  const maxValue = useMemo(
    () =>
      Math.max(
        ...visibleChartData,
        ...(isComparing ? visibleComparisonData : [])
      ),
    [visibleChartData, visibleComparisonData, isComparing]
  );
  const minValue = useMemo(
    () =>
      Math.min(
        ...visibleChartData,
        ...(isComparing ? visibleComparisonData : [])
      ),
    [visibleChartData, visibleComparisonData, isComparing]
  );

  const handleTimeframeChange = (newTimeframe: TimeframeKey) => {
    setTimeframe(newTimeframe);
    setChartData(generateChartData(timeframes[newTimeframe]));
    setVolumeData(generateVolumeData(timeframes[newTimeframe]));
    if (isComparing) {
      setComparisonData(generateChartData(timeframes[newTimeframe]));
    }
    setZoomLevel(1);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const svgWidth = rect.width;
      const dataPointWidth = svgWidth / (visibleChartData.length - 1);
      const index = Math.round(x / dataPointWidth);
      const threshold = dataPointWidth / 2;

      if (
        Math.abs(x - index * dataPointWidth) <= threshold &&
        index >= 0 &&
        index < visibleChartData.length
      ) {
        setHoveredPrice(visibleChartData[index]);
        if (isComparing && visibleComparisonData[index]) {
          setHoveredComparisonPrice(visibleComparisonData[index]);
        }
        setHoveredPosition({ x: index * dataPointWidth, y });
      } else {
        setHoveredPrice(null);
        setHoveredComparisonPrice(null);
        setHoveredPosition(null);
      }
    },
    [visibleChartData, visibleComparisonData, isComparing]
  );

  const handleMouseLeave = () => {
    setHoveredPrice(null);
    setHoveredComparisonPrice(null);
    setHoveredPosition(null);
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prevZoom) => {
      if (direction === "in" && prevZoom < 5) return prevZoom + 0.5;
      if (direction === "out" && prevZoom > 1) return prevZoom - 0.5;
      return prevZoom;
    });
  };

  const toggleCompare = () => {
    if (!isComparing) {
      setIsComparing(true);
    } else {
      setIsComparing(false);
      setSelectedCoin(null);
      setComparisonData(null);
    }
  };

  const handleCoinSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const coinId = event.target.value;
    setSelectedCoin(coinId);
    setComparisonData(generateChartData(timeframes[timeframe]));
  };

  const getPoints = (data: number[]) =>
    data
      .map(
        (value, index) =>
          `${index * (500 / (visibleDataPoints - 1))},${
            250 - ((value - minValue) / (maxValue - minValue)) * 230
          }`
      )
      .join(" ");
  const mainPoints = useMemo(
    () => getPoints(visibleChartData),
    [visibleChartData, visibleDataPoints, minValue, maxValue]
  );
  const comparisonPoints = useMemo(
    () => getPoints(visibleComparisonData),
    [visibleComparisonData, visibleDataPoints, minValue, maxValue]
  );

  const [loading, setLoading] = useState(false);
  const anaylsisNews = async () => {
    setLoading(true);
    const res = await fetch(
      `${baseUrl}?access_key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    const data = await res.json();
    const news = data.data;
    setNews(news);
    setLoading(false);
  };

  useEffect(() => {
    anaylsisNews();
  }, []);

  const { selectedTab } = useContext(TabContext);
  return (
    <>
      <div className="pb-6">
        <Tabs />
        {selectedTab === "Chart" && (
          <>
            <div className="flex justify-between md:flex-row flex-col gap-8 md:gap-0 items-start px-2 md:px-[60px] mt-10 mb-2">
              <div className="flex gap-2 md:gap-5 text-lg">
                <div className="flex items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-100 py-2 px-4 rounded">
                  <Image
                    src="/icons/icon-1.svg"
                    width={24}
                    height={24}
                    alt="fullscreen"
                  />
                  Fullscreen
                </div>
                <div
                  className="flex items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-100 py-2 px-4 rounded"
                  onClick={toggleCompare}
                >
                  <Image
                    src="/icons/icon.svg"
                    width={24}
                    height={24}
                    alt="Compare"
                  />
                  {isComparing ? "Remove" : "Compare"}
                </div>
                {isComparing && (
                  <select
                    onChange={handleCoinSelect}
                    value={selectedCoin || ""}
                    className="w-[150px] text-base font-cic-std px-3 py-2  font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="" disabled className="text-lg">
                      Select a coin
                    </option>
                    {randomCoins.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex space-x-2">
                  {(Object.keys(timeframes) as TimeframeKey[]).map((tf) => (
                    <button
                      key={tf}
                      className={`cursor-pointer text-lg py-[5px] px-[14px] rounded-[5px] ${
                        timeframe === tf
                          ? "bg-[#4B40EE] text-white"
                          : "text-[#6F7177] hover:bg-gray-100"
                      } transition-colors`}
                      onClick={() => handleTimeframeChange(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1 self-end items-center justify-center">
                  <button
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleZoom("in")}
                    disabled={zoomLevel >= 5}
                  >
                    <ZoomInIcon className="w-4 h-4 inline-block" />
                  </button>
                  <button
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleZoom("out")}
                    disabled={zoomLevel <= 1}
                  >
                    <ZoomOutIcon className="w-4 h-4 inline-block" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-80 bg-white rounded-md overflow-hidden relative px-2 md:px-[60px] pt-10">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 500 250"
                preserveAspectRatio="none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                  </linearGradient>
                  <linearGradient
                    id="comparisonGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                    <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,250 L0,${
                    250 -
                    ((visibleChartData[0] - minValue) / (maxValue - minValue)) *
                      230
                  } ${mainPoints} L500,250 Z`}
                  fill="url(#gradient)"
                />
                <path
                  d={`M0,${
                    250 -
                    ((visibleChartData[0] - minValue) / (maxValue - minValue)) *
                      230
                  } ${mainPoints}`}
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2"
                />
                {isComparing && selectedCoin && (
                  <>
                    <path
                      d={`M0,250 L0,${
                        250 -
                        ((visibleComparisonData[0] - minValue) /
                          (maxValue - minValue)) *
                          230
                      } ${comparisonPoints} L500,250 Z`}
                      fill="url(#comparisonGradient)"
                      opacity="0.5"
                    />
                    <path
                      d={`M0,${
                        250 -
                        ((visibleComparisonData[0] - minValue) /
                          (maxValue - minValue)) *
                          230
                      } ${comparisonPoints}`}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2"
                    />
                  </>
                )}
                {visibleVolumeData.map((volume, index) => (
                  <rect
                    key={index}
                    x={index * (500 / visibleDataPoints)}
                    y={250 - (volume / 100) * 20}
                    width={500 / visibleDataPoints}
                    height={(volume / 100) * 20}
                    fill="#e8e9ec"
                  />
                ))}
                {visibleChartData.map((price, index) => (
                  <circle
                    key={index}
                    cx={index * (500 / (visibleDataPoints - 1))}
                    cy={
                      250 - ((price - minValue) / (maxValue - minValue)) * 230
                    }
                    r="4"
                    fill="#6366F1"
                    className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                  />
                ))}
                {isComparing &&
                  selectedCoin &&
                  visibleComparisonData.map((price, index) => (
                    <circle
                      key={`comparison-${index}`}
                      cx={index * (500 / (visibleDataPoints - 1))}
                      cy={
                        250 - ((price - minValue) / (maxValue - minValue)) * 230
                      }
                      r="4"
                      fill="#EF4444"
                      className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                    />
                  ))}
              </svg>
              {hoveredPrice !== null && hoveredPosition && (
                <div
                  className="absolute bg-[#6366F1] text-white px-2 py-1 rounded text-xs font-semibold pointer-events-none"
                  style={{
                    left: hoveredPosition.x,
                    top: hoveredPosition.y - 30,
                    transform: "translateX(-50%)",
                  }}
                >
                  {hoveredPrice.toFixed(2)}
                  {isComparing && hoveredComparisonPrice !== null && (
                    <span className="ml-2 text-red-300">
                      ({hoveredComparisonPrice.toFixed(2)})
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {selectedTab === "Summary" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-start justify-center font-cic-std text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            nulla ut rem corrupti porro in possimus, aperiam quae reiciendis
            quam odio ea beatae velit dolorem eveniet deleniti officia mollitia
            natus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Facere dolor ex accusamus pariatur voluptates quam ut accusantium
            delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem
            quo perspiciatis nihil sit!
            <br />
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            nulla ut rem corrupti porro in possimus, aperiam quae reiciendis
            quam odio ea beatae velit dolorem eveniet deleniti officia mollitia
            natus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Facere dolor ex accusamus pariatur voluptates quam ut accusantium
            delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem
            quo perspiciatis nihil sit!
          </div>
        )}
        {selectedTab === "Analysis" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-start font-cic-std text-lg">
            {loading ? (
              <p className="flex items-center justify-center w-full h-full">
                Loading...
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {news &&
                  news.slice(0, 3).map((article, index) => (
                    <>
                      <Link
                        href={article?.url}
                        key={index}
                        className="px-6 py-3 bg-gray-100 rounded flex items-center justify-start "
                      >
                        <div>
                          <h3 className="text-xl font-bold">
                            {article?.title}
                          </h3>
                          <p className="mt-2">{article?.description}</p>
                        </div>
                      </Link>
                    </>
                  ))}
              </div>
            )}
          </div>
        )}
        {selectedTab === "Statistics" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Statistics
          </div>
        )}
        {selectedTab === "Settings" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Settings
          </div>
        )}
      </div>
    </>
  );
};

export default Chart2;
