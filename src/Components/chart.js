import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const ChartDialog = ({ xAxisData, seriesData, usersData }) => {
  console.log(seriesData);

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

const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];

export function PieActiveArc({ xAxisData, usersData }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const temp = [];
    xAxisData.forEach((element, index) => {
      console.log(element, usersData);

      console.log(usersData.filter((user) => user.score == element));

      temp.push({
        id: index,
        value: usersData.filter((user) => user.score == element).length,
        label: JSON.stringify(element),
      });
    });
    setData(temp);
  }, [xAxisData]);
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
}
