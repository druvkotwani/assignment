"use client";

import React, { useState, useCallback, useRef, useMemo } from "react";
import { ExpandIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import Price from "./Price";
import Tabs from "./Tabs";

type TimeframeKey = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";

const generateChartData = (days: number): number[] => {
  const data: number[] = [];
  const basePrice = 60000;
  for (let i = 0; i < days; i++) {
    data.push(basePrice + Math.random() * 10000 - 5000);
  }
  return data;
};

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

export default function Component(): JSX.Element {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("1w");
  const [chartData, setChartData] = useState<number[]>(() =>
    generateChartData(timeframes["1w"])
  );
  const [volumeData, setVolumeData] = useState<number[]>(() =>
    generateVolumeData(timeframes["1w"])
  );
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const svgRef = useRef<SVGSVGElement>(null);

  const visibleDataPoints = Math.floor(chartData.length / zoomLevel);
  const visibleChartData = useMemo(
    () => chartData.slice(-visibleDataPoints),
    [chartData, visibleDataPoints]
  );
  const visibleVolumeData = useMemo(
    () => volumeData.slice(-visibleDataPoints),
    [volumeData, visibleDataPoints]
  );

  const maxValue = useMemo(
    () => Math.max(...visibleChartData),
    [visibleChartData]
  );
  const minValue = useMemo(
    () => Math.min(...visibleChartData),
    [visibleChartData]
  );

  const handleTimeframeChange = (newTimeframe: TimeframeKey) => {
    setTimeframe(newTimeframe);
    setChartData(generateChartData(timeframes[newTimeframe]));
    setVolumeData(generateVolumeData(timeframes[newTimeframe]));
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
        setHoveredPosition({ x: index * dataPointWidth, y });
      } else {
        setHoveredPrice(null);
        setHoveredPosition(null);
      }
    },
    [visibleChartData]
  );

  const handleMouseLeave = () => {
    setHoveredPrice(null);
    setHoveredPosition(null);
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prevZoom) => {
      if (direction === "in" && prevZoom < 5) return prevZoom + 0.5;
      if (direction === "out" && prevZoom > 1) return prevZoom - 0.5;
      return prevZoom;
    });
  };

  const points = useMemo(
    () =>
      visibleChartData
        .map(
          (value, index) =>
            `${index * (500 / (visibleDataPoints - 1))},${
              250 - ((value - minValue) / (maxValue - minValue)) * 230
            }`
        )
        .join(" "),
    [visibleChartData, visibleDataPoints, minValue, maxValue]
  );

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      <Price />
      <div className=" pb-6">
        <Tabs />
        <div className="flex justify-between items-center px-[60px] mt-4 mb-2">
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <ExpandIcon className="w-4 h-4 mr-2 inline-block" />
              Fullscreen
            </button>
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
          <div className="flex space-x-2">
            {(Object.keys(timeframes) as TimeframeKey[]).map((tf) => (
              <button
                key={tf}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  timeframe === tf
                    ? "bg-[#4B40EE] text-white"
                    : "text-[#6F7177] hover:bg-gray-200"
                } transition-colors`}
                onClick={() => handleTimeframeChange(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-80 bg-white rounded-md overflow-hidden relative">
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
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
            </defs>
            <path
              d={`M0,250 L0,${
                250 -
                ((visibleChartData[0] - minValue) / (maxValue - minValue)) * 230
              } ${points} L500,250 Z`}
              fill="url(#gradient)"
            />
            <path
              d={`M0,${
                250 -
                ((visibleChartData[0] - minValue) / (maxValue - minValue)) * 230
              } ${points}`}
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
            />
            {visibleVolumeData.map((volume, index) => (
              <rect
                key={index}
                x={index * (500 / visibleDataPoints)}
                y={250 - (volume / 100) * 20}
                width={500 / visibleDataPoints}
                height={(volume / 100) * 20}
                fill="rgba(99, 102, 241, 0.3)"
              />
            ))}
            {visibleChartData.map((price, index) => (
              <circle
                key={index}
                cx={index * (500 / (visibleDataPoints - 1))}
                cy={250 - ((price - minValue) / (maxValue - minValue)) * 230}
                r="4"
                fill="#6366F1"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
