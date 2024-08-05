import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const ChartDialog = ({ xAxisData, seriesData }) => {
  return (
    <BarChart
      series={[{ data: seriesData }]}
      height={290}
      xAxis={[{ data: xAxisData, scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default ChartDialog;
