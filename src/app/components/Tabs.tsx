"use client";

import React, { useState } from "react";
const tabs: string[] = [
  "Summary",
  "Chart",
  "Statistics",
  "Analysis",
  "Settings",
];

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Chart");

  return (
    <div className="mt-[40px] ">
      <div className="w-full pb-5 pl-[60px] relative border-b-[#EFF1F3] border-b flex gap-[30px]">
        {tabs.map((tab, index) => (
          <div
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <span
              onClick={() => setSelectedTab(tab)}
              className={`${
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
  );
};

export default Tabs;
