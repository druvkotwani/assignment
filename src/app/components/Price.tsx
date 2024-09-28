import React from "react";

const Price = () => {
  return (
    <div className="flex flex-col px-8 md:px-[60px] pt-8 md:pt-[60px] ">
      <div className="text-[70px] w-fit h-fit  text-black flex ">
        <span>63,179.71</span>
        <span className="text-[#BDBEBF]  text-2xl pt-[22.2px] pl-2">USD</span>
      </div>
      <span className="text-lg text-[#67BF6B] pt-2">+ 2,161.42 (3.54%)</span>
    </div>
  );
};

export default Price;
