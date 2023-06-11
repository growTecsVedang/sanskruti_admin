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
import { PieChart, Pie } from "recharts";
import { Cell } from "recharts";

function BarChart() {
  const data1 = [
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

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className=" w-[95%] lg:w-[98%] mx-auto ">
      <div className="min-h-[90px] w-[100%]   bg-white  rounded-md flex flex-col justify-center  mb-3   shadow-md   ">
        <div className="  h-[333px] lg:min-h-[450px]  rounded-md ">
          <h1 className="ml-4  text-2xl font-bold   my-2 ">Top Categories</h1>
          <ResponsiveContainer>
            <LineChart
              data={data1}
              margin={{
                top: 30,
                bottom: 70,
                right: 20,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="name" interval={"preserveStartEnd"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="quantity" stroke="green" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
