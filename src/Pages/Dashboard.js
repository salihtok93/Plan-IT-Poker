import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Grid container spacing={1}>
          {numbers.map((number, index) => (
            <Grid item lg={3} sm={6} key={index}>
              <Paper>
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
          <Typography variant="h6" style={{ textAlign: "center" }}></Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
