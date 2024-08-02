import React from "react";
import { Snackbar, Alert } from "@mui/material";

function OpenSnackbar({ open, message, onClose, severity, position }) {
  const anchorOrigin =
    position === "center"
      ? { vertical: "top", horizontal: "center" }
      : { vertical: "bottom", horizontal: "left" };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default OpenSnackbar;
