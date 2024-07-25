import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function UserRoleDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleCancel = () => {
    setName("");
    setRole("");
    onClose();
  };

  const handleSubmit = () => {
    onSubmit({ name, role });
    handleCancel();
  };

  return (
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
          label="Rol"
          type="text"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
  );
}

export default function App() {
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
