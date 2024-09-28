"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import Tabs from "./Tabs";


const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);
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
      className="bg-white w-[1000px] min-h-[789px] font-cic-std"
    >
      <Price />
      <Tabs />


      <Chart toggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
    </div>
  );
};

export default Dashboard;
