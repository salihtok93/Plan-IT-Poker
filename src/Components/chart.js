import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const ChartDialog = ({ open, onClose, xAxisData, seriesData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Grafik</DialogTitle>
      <DialogContent>
        <BarChart
          series={[{ data: seriesData }]}
          height={290}
          xAxis={[{ data: xAxisData, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChartDialog;
