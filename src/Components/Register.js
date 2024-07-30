import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import OpenSnackbar from "./snackbar";

function UserRoleDialog({ open, onClose, onSubmit }) {
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
    axios
      .post("http://192.168.103.14:3000/new-user", {
        name: name,
        email: email,
      })
      .then((res) => {
        console.log(res);
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

export default function Register() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
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
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </>
  );
}
