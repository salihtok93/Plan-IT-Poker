import * as React from "react";
import Dialog from "@mui/material/Dialog";

export default function ElmoDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <img src={"/elmoG.gif"} alt="Logo" />
      </Dialog>
    </React.Fragment>
  );
}
