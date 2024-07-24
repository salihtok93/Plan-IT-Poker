// App.js

import React from "react";
import { Grid, Paper } from "@mui/material";

const data = [0, 1, 3, 5, 8, 13, 20, 40, 100];

function App() {
  return (
    <Grid container spacing={1}>
      {data.map((item, index) => (
        <Grid item xs={8} md={3} key={index}>
          <Paper
            style={{
              padding: 20,
              textAlign: "center",
              color: "#3f51b5",
            }}
          >
            {item}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
