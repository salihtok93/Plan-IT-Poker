import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(title, record, time, lastused, laststory, totalprints) {
  return { title, record, time, lastused, laststory, totalprints };
}

const rows = [
  createData("Test 1", 159, 6.0, 24, 4.0, 8),
  createData("Test 2", 159, 6.0, 24, 4.0, 8),
  createData("Test 3", 159, 6.0, 24, 4.0, 8),
];

export default function BasicTable() {
  return (
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
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.record}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.lastused}</TableCell>
              <TableCell align="right">{row.laststory}</TableCell>
              <TableCell align="right">{row.totalprints}</TableCell>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
