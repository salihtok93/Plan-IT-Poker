import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Chart() {
  return (
    <BarChart
      series={[{ data: [35, 44, 24, 34] }]}
      height={290}
      xAxis={[{ data: ["0", "1/2", "1", "3"], scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
