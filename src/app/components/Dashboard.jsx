"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import Tabs from "./Tabs";
import { TabContext } from "../context/tabContext";
import Link from "next/link";
const baseUrl = "https://newsapi.org/v2/everything";
const query = "bitcoin"

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);
  const [news, setNews] = useState([]);
  const { selectedTab } = useContext(TabContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // fetch(`${baseUrl}?q=${query}&from=2024-09-27&to=2024-09-27&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setNews(data.articles);
    //   });

    anaylsisNews();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (fullscreenContainerRef?.current?.requestFullscreen) {
        fullscreenContainerRef.current.requestFullscreen();
      } else if (fullscreenContainerRef.current.mozRequestFullScreen) {
        // Firefox
        fullscreenContainerRef.current.mozRequestFullScreen();
      } else if (fullscreenContainerRef?.current?.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        fullscreenContainerRef.current.webkitRequestFullscreen();
      } else if (fullscreenContainerRef.current.msRequestFullscreen) {
        // IE/Edge
        fullscreenContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  const anaylsisNews = async () => {
    setLoading(true);
    const res = await fetch(`${baseUrl}?q=${query}&from=2024-09-27&to=2024-09-27&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)

    const data = await res.json();
    const news = data.articles
    const filtered = news.filter((article) => article.description);
    setNews(filtered);
    setLoading(false);
  }

  return (
    <div
      ref={fullscreenContainerRef}
      className="bg-white w-full max-w-[400px] md:min-w-[1000px] pb-8 font-cic-std rounded-lg"
    >
      <Price />
      <Tabs />


      {
        selectedTab === "Chart" && (
          <Chart toggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
        )
      }

      {
        selectedTab === "Summary" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-start justify-center font-cic-std text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nulla ut rem corrupti porro in possimus, aperiam quae reiciendis quam odio ea beatae velit dolorem eveniet deleniti officia mollitia natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor ex accusamus pariatur voluptates quam ut accusantium delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem quo perspiciatis nihil sit!

            <br />
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nulla ut rem corrupti porro in possimus, aperiam quae reiciendis quam odio ea beatae velit dolorem eveniet deleniti officia mollitia natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor ex accusamus pariatur voluptates quam ut accusantium delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem quo perspiciatis nihil sit!
          </div>
        )
      }

      {
        selectedTab === "Analysis" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            {
              loading ? <p>Loading...</p> : (
                <div className="flex flex-col gap-2">

                  {news && news.slice(0, 4).map((article, index) => (
                    <>
                      <Link href={
                        article?.url
                      } key={index} className="px-6 py-3 bg-gray-100 rounded flex items-center justify-start ">
                        <div>
                          <h3 className="text-xl font-bold">{article?.title}</h3>
                          <p className="mt-2">{article?.description}</p>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              )
            }
          </div>)
      }
      {
        selectedTab === "Statistics" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Statistics
          </div>)
      }
      {
        selectedTab === "Settings" && (
          <div className="min-h-[338px] px-8 md:px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Settings
          </div>)
      }
    </div>
  );
};

export default Dashboard;
