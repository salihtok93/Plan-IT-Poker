//Slinecek Dosya
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const NumbersDialog = ({ open, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    const numbersArray = inputValue.split(",").map((num) => num.trim());
    onSave(numbersArray);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Elle Sayı Dizisi Gir</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Diziyi buraya girin virgül ile ayırarak örnek kullanım : 1,1,3,5,8"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          İptal
        </Button>
        <Button onClick={handleSave} color="primary">
          Diziyi Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NumbersDialog;
