import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { deleteUser } from "../Services/userService";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ setTrigger }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const userRole = localStorage.getItem('userRole');

  React.useEffect(() => {
    setUserToDelete(localStorage.getItem("serverResponse"));
  }, []);

  const handleLogOut = () => {
    deleteUser(userToDelete)
      .then((response) => {
        console.log("Kullanıcı başarıyla silindi", response.data);
      })
      .catch((error) => {
        console.error("Kullanıcı silinirken bir hata oluştu", error);
      })
      .finally(() => {
        setUserToDelete(null);
      });
    localStorage.removeItem("serverResponse");
    localStorage.removeItem("userRole");
    localStorage.removeItem("numbers");
    localStorage.removeItem("selectedNumberKey");
    window.location.reload();
  };

  const checkLog = () => {
    if (localStorage.getItem("serverResponse")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  React.useEffect(() => {
    checkLog();
  }, []);

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
            component={Link}
            to="/"
          >
            <img
              src={"/samm_logo.png"}
              alt="Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
             SammITPoker 
             {!isLoggedIn && userRole === "admin" && (
              <>
                <Link style={{ margin: "10px" }} to="/">
                  Home
                </Link>
                <Link style={{ margin: "10px" }} to="/selection">
                  Card Selection
                </Link>
              </>
            )} 

            {isLoggedIn && (
              <Link style={{ margin: "10px" }} to="/register">
                Register
              </Link>
            )}
          </Typography>
          {!isLoggedIn && (
            <IconButton
              onClick={handleLogOut}
              size="large"
              edge="start"
              // sx={{ mr: 2 }}
              component={Link}
              to="/register"
              color="error"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
