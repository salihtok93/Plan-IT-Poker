import * as React from "react";
import Dialog from "@mui/material/Dialog";

export default function ElmoDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <img src={"/elmotwo.png"} alt="Logo" />
      </Dialog>
    </React.Fragment>
  );
}
