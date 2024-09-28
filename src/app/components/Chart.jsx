"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    createChart,
    ColorType,
    CrosshairMode,
} from "lightweight-charts";
import Image from "next/image";


const timeframes = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];
const randomCoins = [
    { id: "ethereum", name: "Ethereum" },
    { id: "cardano", name: "Cardano" },
    { id: "solana", name: "Solana" },
    { id: "polkadot", name: "Polkadot" },
    { id: "dogecoin", name: "Dogecoin" },
];
const Chart = ({ toggleFullscreen, isFullscreen }) => {

    const fetchData = async (timeframe) => {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const endDate = new Date();
        const startDate = new Date(endDate);

        switch (timeframe) {
            case "1d":
                startDate.setDate(startDate.getDate() - 1);
                break;
            case "3d":
                startDate.setDate(startDate.getDate() - 3);
                break;
            case "1w":
                startDate.setDate(startDate.getDate() - 7);
                break;
            case "1m":
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case "6m":
                startDate.setMonth(startDate.getMonth() - 6);
                break;
            case "1y":
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            case "max":
                startDate.setFullYear(startDate.getFullYear() - 5);
                break;
        }

        const chartData = [];
        const volumeData = [];
        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            const price = 60000 + Math.random() * 5000;
            const volume = Math.random() * 1000000;
            chartData.push({
                time: d.getTime() / 1000,
                value: price,
            });
            volumeData.push({
                time: d.getTime() / 1000,
                value: volume,
            });
        }

        return {
            price: 63179.71,
            change: 2161.42,
            changePercent: 3.54,
            liquidity: 1234567.89,
            chartData,
            volumeData,
        };
    };

    const [data, setData] = useState(null);
    const [timeframe, setTimeframe] = useState("1m");
    const [isComparing, setIsComparing] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [comparisonData, setComparisonData] = useState(null);

    const chartContainerRef = useRef(null);
    useEffect(() => {
        fetchData(timeframe).then(setData);
    }, [timeframe]);

    useEffect(() => {
        if (isComparing && selectedCoin) {
            fetchData(timeframe, true).then(setComparisonData);
        }
    }, [isComparing, selectedCoin, timeframe]);


    useEffect(() => {
        if (data && chartContainerRef.current) {
            const chartOptions = {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { type: ColorType.Solid, color: "white" },
                    textColor: "black",
                },
                grid: {
                    vertLines: { visible: false },
                    horzLines: { color: "#f0f3fa" },
                },
                rightPriceScale: {
                    visible: false,
                },
                timeScale: {
                    borderVisible: false,
                    visible: false,
                },
                crosshair: {
                    mode: CrosshairMode.Normal,
                    vertLine: {
                        width: 1,
                        color: "rgba(224, 227, 235, 0.6)",
                        style: 0,
                    },
                    horzLine: {
                        visible: false,
                        labelVisible: false,
                    },
                },
            };

            const chart = createChart(
                chartContainerRef.current,
                chartOptions
            );

            const areaSeries = chart.addAreaSeries({
                topColor: "#4B40EE",
                bottomColor: "rgba(231, 229, 241, 0)",
                lineColor: "#4B40EE",
                lineWidth: 2,
                priceScaleId: "right",
            });

            const volumeSeries = chart.addHistogramSeries({
                color: "#eee",
                priceFormat: {
                    type: "volume",
                },
                priceScaleId: "volume",
            });

            chart.priceScale("right").applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
                visible: true,
                borderVisible: false,
            });
            if (isComparing && comparisonData) {
                const comparisonSeries = chart.addLineSeries({
                    color: "#EF4444",
                    lineWidth: 2,
                    priceScaleId: "right",
                });
                comparisonSeries.setData(comparisonData.chartData);
            }

            chart.priceScale("volume").applyOptions({
                scaleMargins: {
                    top: 0.9,
                    bottom: 0,
                },
                visible: false,
            });

            areaSeries.setData(data.chartData);
            volumeSeries.setData(data.volumeData);

            chart.timeScale().fitContent();

            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            window.addEventListener("resize", handleResize);

            // Create and style the price label
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.right = "10px";
            container.style.top = "10px";
            container.style.zIndex = "2";
            container.style.pointerEvents = "none";
            container.style.padding = "5px";
            container.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            container.style.borderRadius = "4px";
            container.style.fontSize = "14px";
            container.style.fontWeight = "bold";
            chartContainerRef.current.appendChild(container);

            // Update price label on crosshair move
            chart.subscribeCrosshairMove((param) => {
                if (param.point) {
                    const price = param.seriesData.get(areaSeries);
                    if (price !== undefined) {
                        if (typeof price === "number") {
                            container.textContent = `$${price.toFixed(2)}`;
                        }
                        container.style.display = "block";
                    }
                } else {
                    container.style.display = "none";
                }
            });

            return () => {
                window.removeEventListener("resize", handleResize);
                chart.remove();
                container.remove();
            };
        }
    }, [data, isComparing, comparisonData]);
    const toggleCompare = () => {
        setIsComparing(!isComparing);
        if (!isComparing) {
            setSelectedCoin(null);
            setComparisonData(null);
        }
    };

    const handleCoinSelect = (event) => {
        const coinId = event.target.value;
        setSelectedCoin(coinId);
    };


    if (!data) return <div className="min-h-[338px] flex items-center justify-center font-cic-std text-lg">Loading...</div>;

    return (
        <>
            {/* Timeline Tabs */}
            <div className="mt-10 mb-3 px-[40px] flex justify-between items-center md:flex-row flex-col gap-4 md:gap-0">
                <div className="flex gap-5 text-lg">
                    <div onClick={toggleFullscreen} className="flex items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-100 py-2 px-4 rounded">
                        <Image src="/icons/icon-1.svg" width={24} height={24} alt="fullscreen" />
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </div>
                    <div onClick={toggleCompare} className="flex items-center justify-center gap-[10px] cursor-pointer hover:bg-gray-100 py-2 px-4 rounded">
                        <Image src="/icons/icon.svg" width={24} height={24} alt="Compare" />
                        {isComparing ? "Remove" : "Compare"}
                    </div>
                    {isComparing && (
                        <select
                            onChange={handleCoinSelect}
                            value={selectedCoin || ""}
                            className="w-[150px] text-base font-cic-std px-3 py-1 font-normal text-[#6F7177] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="" disabled className="text-base ">
                                Select a coin
                            </option>
                            {randomCoins.map((coin) => (
                                <option key={coin.id} value={coin.id} className="text-base font-medium">
                                    {coin.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="flex space-x-2">
                    {timeframes.map((tf) => (
                        <div
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`cursor-pointer text-lg py-[5px] px-[14px] rounded-[5px] ${timeframe === tf
                                ? "bg-[#4B40EE] text-white"
                                : "text-[#6F7177] hover:bg-gray-100"
                                }`}
                        >
                            {tf}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="mt-auto md:max-w-full  max-w-[380px]">
                <div ref={chartContainerRef} className="h-[300px] w-full relative" />
            </div>
        </>
    );
};

export default Chart;



