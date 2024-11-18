import { FC } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { NasaNEO } from "../types/nasaNEO";
import CustomLegend from "./CustomLegend";
import { ILegend } from "../types/legend";

const DisplayChart: FC<{ data: NasaNEO[] }> = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={500}
      data={data}
      layout="vertical"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        label={{
          value: "Min Estimated Diameter(km)",
          position: "bottom",
          offset: -8,
        }}
      />
      <YAxis
        type="category"
        dataKey="name"
        label={{
          value: "NEO name",
          angle: -90,
          position: "insideLeft",
          offset: -15,
        }}
      />
      <Tooltip />
      <Legend
        verticalAlign="top"
        content={({ payload }) => (
          <CustomLegend payload={payload as ILegend[]} />
        )}
      />
      <Bar
        dataKey="estimatedDiameterMin"
        fill="#14389D"
        activeBar={<Rectangle fill="#14389D" stroke="#14389D" />}
      />
      <Bar
        dataKey="estimatedDiameterMax"
        fill="#C70039"
        activeBar={<Rectangle fill="#C70039" stroke="#C70039" />}
      />
    </BarChart>
  );
};

export default DisplayChart;
