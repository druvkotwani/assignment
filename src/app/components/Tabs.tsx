"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import { TabContext } from "../context/tabContext";

const tabs: string[] = [
  "Summary",
  "Chart",
  "Statistics",
  "Analysis",
  "Settings",
];

const Tabs = () => {
  const { selectedTab, setSelectedTab } = useContext(TabContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedIndex = tabs.indexOf(selectedTab);
    if (selectedIndex !== -1 && tabsContainerRef.current) {
      const tabWidth = tabsContainerRef.current.clientWidth / 5;
      const newScrollPosition = Math.max(0, (selectedIndex - 1) * tabWidth);
      setScrollPosition(newScrollPosition);
    }
  }, [selectedTab]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="mt-[40px] overflow-auto md:hidden">
        <div
          ref={tabsContainerRef}
          className="w-full pb-5 pl-[60px] relative border-b-[#EFF1F3] border-b flex gap-[30px] transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {tabs.map((tab, index) => (
            <div
              className="flex flex-col items-center justify-center flex-shrink-0"
              key={index}
              style={{ width: `${100 / 5}%` }}
            >
              <span
                onClick={() => handleTabClick(tab)}
                className={`hover:text-[#1A243A] ${
                  selectedTab === tab ? "text-[#1A243A]" : "text-[#6F7177]"
                } cursor-pointer text-lg whitespace-nowrap`}
              >
                {tab}
              </span>
              {selectedTab === tab && (
                <div className="w-[70px] -bottom-[0.5px] absolute h-[4px] bg-[#4B40EE]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[40px] hidden md:block">
        <div className="w-full pb-5 flex-wrap pl-[60px] relative border-b-[#EFF1F3] border-b flex gap-[30px]">
          {tabs.map((tab, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <span
                onClick={() => setSelectedTab(tab)}
                className={`hover:text-[#1A243A] ${
                  selectedTab === tab ? "text-[#1A243A]" : "text-[#6F7177]"
                } cursor-pointer text-lg textce`}
              >
                {tab}
              </span>
              {selectedTab === tab && (
                <div className="w-[70px] -bottom-[0.5px] absolute h-[4px] bg-[#4B40EE]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tabs;
