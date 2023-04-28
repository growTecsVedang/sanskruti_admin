import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function BarChart() {
  const data = [
    {
      name: "salwar Kameez",
      quantity: 20,
    },
    {
      name: "lehengas",
      quantity: 50,
    },
    {
      name: "Indo western",
      quantity: 30,
    },
    {
      name: "Bridal",
      quantity: 80,
    },
    {
      name: "kurtis",
      quantity: 20,
    },
    {
      name: "western wear",
      quantity: 60,
    },
    {
      name: "dress material",
      quantity: 20,
    },
  ];

  return (
    <div className="w-full my-2">
      <h1 className="text-xl lg:text-3xl ml-4 my-1  font-semibold ">
        Product Categories
      </h1>
      <div className="w-[95%] h-[380px] lg:h-[550px] mx-auto rounded-md ">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 40,
              bottom: 100,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="name" interval={"preserveStartEnd"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="quantity" stroke="blue" activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChart;
