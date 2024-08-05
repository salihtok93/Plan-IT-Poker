import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import OpenSnackbar from "./snackbar";
import { registerUser } from "../Services/userService";
import { socket } from "../Services/socket";

function UserRoleDialog({ open, onClose, onSubmit, setTrigger }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    onClose();
  };

  const handleSubmit = () => {
    registerUser({ name: name, email: email })
      .then((res) => {
        console.log(res);
        handleCancel();
        setTrigger();
        socket.emit("user list", { name });
        socket.emit("user online", res.data.id);
        localStorage.setItem("userId", res.data.id);
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

  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Kullanıcı Bilgileri</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="warning">
            İptal
          </Button>
          <Button onClick={handleSubmit} color="success">
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
      <OpenSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
      />
    </>
  );
}

export default function Register({ setTrigger }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarPosition, setSnackbarPosition] = useState("bottom");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDialog = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setSnackbarMessage("Zaten Kayıtlısınız.");
      setSnackbarPosition("center");
      setSnackbarOpen(true);
      return;
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    // setTrigger();
    setDialogOpen(false);
  };

  const handleSubmit = (data) => {
    console.log("Submitted data:", data); // şuan logluyo socket io ile post yollanacak
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Kullanıcı Kayıt
      </Button>
      <UserRoleDialog
        setTrigger={() => {
          setTrigger();
        }}
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
      <OpenSnackbar
        position={snackbarPosition}
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
}
