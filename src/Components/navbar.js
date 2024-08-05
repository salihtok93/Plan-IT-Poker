import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Register from "../Components/Register";

export default function Navbar({ setTrigger }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", marginBottom: 2 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <img
              src={"/samm_logo.png"}
              alt="Logo"
              style={{ height: "40px", width: "auto" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            SammITPoker
          </Typography>
          <Register
            setTrigger={() => {
              setTrigger();
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
