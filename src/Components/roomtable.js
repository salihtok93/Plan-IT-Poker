import React, { useState } from "react"; // useState'i React'ten doğru şekilde içe aktarın
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function createData(title, record, time, lastused, laststory, totalprints) {
  return { title, record, time, lastused, laststory, totalprints };
}

const rows = [createData("Test 1", 159, 6.0, 24, 4.0, 8)];

export default function BasicTable() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Record</TableCell>
              <TableCell align="right">Time&nbsp;</TableCell>
              <TableCell align="right">Last Used&nbsp;</TableCell>
              <TableCell align="right">Last Story&nbsp;</TableCell>
              <TableCell align="right">Total Prints&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={handleClickOpen} // Satıra tıklama işlemini ekleyin
                style={{ cursor: "pointer" }} // İşaretçiyi tıklanabilir olarak ayarlayın
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.record}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.lastused}</TableCell>
                <TableCell align="right">{row.laststory}</TableCell>
                <TableCell align="right">{row.totalprints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog bileşeni */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ODAYA GİRİŞ OLUCAK</DialogTitle>
        <DialogContent>{/* Buraya boş bırakıldı */}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
