import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import Usertable from "../Components/userTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Grid container spacing={1}>
          {numbers.map((number, index) => (
            <Grid item lg={3} sm={6} key={index}>
              <Paper
                style={{
                  padding: "20px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ textAlign: "center", height: "80" }}
                >
                  {number}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <Paper elevation={3} style={{ padding: 16, height: "100%" }}>
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
    </Grid>
  );
};

export default Dashboard;
