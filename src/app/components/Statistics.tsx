import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "BTC", value: 1296913297036 },
  { name: "ETH", value: 321337470057 },
  { name: "XRP", value: 119424386441 },
  { name: "ADA", value: 87750791107 },
  { name: "DOGE", value: 73602374349 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

const formatValue = (value: number) => {
  return value.toLocaleString();
};

export default function Statistics() {
  return (
    <div className="font-sans max-w-xl mx-auto p-5 rounded-lg font-cic-std">
      <h2 className="text-center mb-1 text-gray-800 text-2xl font-bold">
        Statistics
      </h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string) =>
                typeof value === "number" ? formatValue(value) : value
              }
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center flex-wrap mt-5">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center m-1 bg-white p-2 rounded shadow"
          >
            <div
              className="w-5 h-5 mr-2 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="font-bold text-gray-800">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
