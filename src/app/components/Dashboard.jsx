"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import Tabs from "./Tabs";
import { TabContext } from "../context/tabContext";


const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const { selectedTab } = useContext(TabContext);

  useEffect(() => {
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
          <div className="min-h-[338px] px-[60px] pt-[38px]  flex items-start justify-center font-cic-std text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nulla ut rem corrupti porro in possimus, aperiam quae reiciendis quam odio ea beatae velit dolorem eveniet deleniti officia mollitia natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor ex accusamus pariatur voluptates quam ut accusantium delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem quo perspiciatis nihil sit!

            <br />
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nulla ut rem corrupti porro in possimus, aperiam quae reiciendis quam odio ea beatae velit dolorem eveniet deleniti officia mollitia natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor ex accusamus pariatur voluptates quam ut accusantium delectus, nobis quibusdam odit magni iusto eum assumenda. Dolorem quo perspiciatis nihil sit!
          </div>
        )
      }

      {
        selectedTab === "Analysis" && (
          <div className="min-h-[338px] px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Analysis
          </div>)
      }
      {
        selectedTab === "Statistics" && (
          <div className="min-h-[338px] px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Statistics
          </div>)
      }
      {
        selectedTab === "Settings" && (
          <div className="min-h-[338px] px-[60px] pt-[38px]  flex items-center justify-center font-cic-std text-lg">
            Settings
          </div>)
      }
    </div>
  );
};

export default Dashboard;
