import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const ChartDialog = ({ xAxisData, seriesData }) => {
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

const palette = [
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "black",
  "pink",
  "purple",
  "brown",
];
export function PieActiveArc({ xAxisData, usersData }) {
  const [data, setData] = React.useState([]);
  const [averageScore, setAverageScore] = React.useState(0); // Yeni state
  console.log(averageScore.toFixed(2));

  React.useEffect(() => {
    const temp = [];
    let totalScore = 0;
    let votersCount = 0;

    xAxisData.forEach((element, index) => {
      const filteredUsers = usersData.filter(
        (user) => user.score === element && !isNaN(user.score) // burada ? işaretinin hesaba katılmamasını istedik
      );

      const count = filteredUsers.length;
      if (count > 0) {
        totalScore += element * count; // Puanları toplamak için
        votersCount += count; // Oy veren kişi sayısını artırmak için
      }

      temp.push({
        id: index,
        value: count,
        label: JSON.stringify(element),
      });
    });

    setData(temp);

    // Ortalamayı hesaplayın ve setAverageScore ile güncelleyin
    const average = votersCount > 0 ? totalScore / votersCount : 0;
    setAverageScore(average);
  }, [xAxisData, usersData]); // usersData'yı da bağımlılık olarak ekledik

  return (
    <div style={{ height: 300, width: "100%" }}>
      <PieChart
        colors={palette}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={380}
      />
    </div>
  );
}
