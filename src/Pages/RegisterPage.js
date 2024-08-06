import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardActions,
  Typography,
} from "@mui/material";
import OpenSnackbar from "../Components/snackbar";
import { fetchUser, registerUser } from "../Services/userService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserRoleCard({ onSubmit }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  //kod çalışmazsa array dizisi mi diye kontrol et
  const allUsers = fetchUser();

  const userVerification = () => {
    const lastUserID = localStorage.getItem("serverResponse");

    if (lastUserID) {
      const valueFound = allUsers.some((user) => user === lastUserID);
      if (!valueFound) {
        localStorage.removeItem("serverResponse");
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    navigate("/");
  };

  const handleServerSubmit = () => {
    registerUser({ name: name, email: email })
      .then((res) => {
        console.log(res);
        localStorage.setItem("serverResponse", res.data.id);
        handleCancel();
        setSnackbarMessage("Kullanıcı başarıyla eklendi!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage("Kullanıcı eklenirken hata oluştu.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleSubmit = () => {
    handleServerSubmit();
    userVerification();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{ margin: "80px", padding: "60px", minWidth: 350, minHeight: 300 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Kullanıcı Bilgileri
        </Typography>
        <Typography sx={{ marginTop: "20px", marginBottom: "40px" }}>
          <TextField
            autoFocus
            margin="dense"
            label="İsim"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Typography>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Button
            component={Link}
            to="/home"
            onClick={handleCancel}
            color="warning"
          >
            İptal
          </Button>
          <Button onClick={handleSubmit} color="success">
            Gönder
          </Button>
        </CardActions>
      </Card>
      <OpenSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
      />
    </div>
  );
}

export default function RegisterPage() {
  const handleSubmit = (data) => {
    console.log("Submitted data:", data); // şuan logluyo socket io ile post yollanacak
  };

  return <UserRoleCard onSubmit={handleSubmit} />;
}
