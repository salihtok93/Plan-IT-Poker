import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
const elmoUrl = (
  <img
    src={"/elmo.png"}
    alt="Logo"
    style={{ height: "175px", width: "auto" }}
  />
);

export const CardElmo = () => {
  return (
    <Paper
      sx={{
        padding: "16px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 1, 1, 0.3)", // Gölge efekti
        },
      }}
      style={{
        padding: "30px",
        height: "200px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100%",
          border: "1px solid gray",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <Typography
          variant="body1"
          style={{ position: "absolute", left: -25, top: -25 }}
        >
          {
            <img
              src={"/elmo.png"}
              alt="Logo"
              style={{ height: "40px", width: "auto" }}
            />
          }
        </Typography>
        <Typography variant="h2">{elmoUrl}</Typography>
        <Typography
          variant="body1"
          style={{
            position: "absolute",
            right: -25,
            bottom: -25,
            transform: "rotate(180deg)",
          }}
        >
          {
            <img
              src={"/elmo.png"}
              alt="Logo"
              style={{ height: "40px", width: "auto" }}
            />
          }
        </Typography>
      </Grid>
    </Paper>
  );
};
