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

function BarChart(props) {
  const { data } = props;

  return (
    <div className=" w-[95%] lg:w-[98%] mx-auto ">
      <div className="min-h-[90px] w-[100%]   bg-white  rounded-md flex flex-col justify-center  mb-3   shadow-md   ">
        <div className="  h-[333px] lg:min-h-[450px]  rounded-md ">
          <h1 className="ml-4  text-2xl font-bold   my-2 ">
            Products Per Categories
          </h1>
          <ResponsiveContainer>
            <LineChart
              data={data}
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
