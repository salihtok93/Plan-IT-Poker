import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Register from "../Components/Register";
// import { Button } from "@mui/material";

export default function Navbar({ setTrigger }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Button
        onClick={() => {
          setTrigger();
        }}
      >
        ARTI
      </Button> */}
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
