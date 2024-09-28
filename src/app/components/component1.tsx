"use client";
import React, { useState } from "react";

const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

const Component1 = () => {
  const [selectedTab, setSelectedTab] = useState("Chart");

  return (
    <div className="bg-white w-[1000px] min-h-[789px] font-cic-std">
      {/* Price */}
      <div className="flex flex-col pl-[60px] pt-[60px]">
        <div className="text-[70px] w-fit h-fit  text-black flex ">
          <span>63,179.71</span>
          <span className="text-[#BDBEBF]  text-2xl pt-[22.2px] pl-2">USD</span>
        </div>
        <span className="text-lg text-[#67BF6B] pt-2">+ 2,161.42 (3.54%)</span>
      </div>

      {/* Tabs */}
      <div className="mt-[40px] ">
        <div className="w-full pb-5 pl-[60px] relative border-b-[#EFF1F3] border-b flex gap-[30px]">
          {tabs.map((tab: string, index: number) => (
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
    </div>
  );
};

export default Component1;
