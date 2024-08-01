import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Register from "../Components/Register";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
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
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            PlanITPoker
            <Link style={{margin:"10px"}} to="/home">Home</Link>
            <Link style={{margin:"10px"}} to="/">Vote</Link>
            <Link style={{margin:"10px"}} to="/rooms">Rooms</Link>
          </Typography>
          
          <Register />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
