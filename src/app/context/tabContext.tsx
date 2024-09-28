"use client";

import { useState, createContext } from "react";

export const TabContext = createContext<{
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedTab: "Chart",
  setSelectedTab: () => {},
});

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Chart");

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
};
