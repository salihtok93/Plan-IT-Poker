import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import Choice from "../Components/choice";
import { PointCard } from "../Components/pointCard";
import Usertable from "../Components/userTable";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const handleClick = (number) => {
    console.log("Paper clicked!", number);
  };

  return (
    <>
    <Grid container spacing={3} style={{ marginLeft: "20px", padding: "20px" }}>
      <Grid item lg={8} sm={8}>
        <Grid container spacing={2} style={{ marginBottom: "24px" }}>
          {numbers.map((number, index) => {
            return (
              <PointCard
                key={"point-card-" + index}
                index={index}
                number={number}
                handleClick={(data) => {
                  handleClick(data);
                }}
              />
            );
          })}
        </Grid>
        <Choice />
      </Grid>
      <Grid item lg={3} sm={8}>
        <Paper elevation={3} style={{ padding: 16, height: "96%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Typography>Oylamayı başlatmak için "Başlat" tıklayın</Typography>
            <Button variant="contained" color="info">
              Başlat
            </Button>
          </div>
          <hr />
          <Typography>Oyuncular</Typography>
          <hr />
          <Usertable />
          <hr />
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Takım Arkadaşı davet et</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>URL VE KOPYALAMA EKLENECEK</Typography>
            </AccordionDetails>
          </Accordion>
          <Typography variant="h6" style={{ textAlign: "center" }}></Typography>
        </Paper>
      </Grid>
    </Grid></>
  );
};

export default Dashboard;
