import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//AXİOS İLE GET YAPILIP KULLANICILAR ÖYLE ALINICAK
const USERS = [
  { id: 1, name: "Salih Tok", avatarUrl: "classic_avatar.png", status: true },
  {
    id: 2,
    name: "Emrah Dasdemir",
    avatarUrl: "classic_avatar.png",
    status: false,
  },
];

function UserTable() {
  const [users, setUsers] = useState(USERS);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCheckboxClick = (user) => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const onAddUser = () => {
    console.log("ATEA");
    const copy = JSON.parse(JSON.stringify(users));
    copy.push({
      id: copy.length + 1,
      name: "Samm Teknoloji",
      avatarUrl: "classic_avatar.png",
      status: true,
    });
    setUsers(copy);
  };

  return (
    <List>
      <Button
        onClick={() => {
          onAddUser();
        }}
      >
        Add new User
      </Button>
      {users.map((user) => {
        const badgeColor = user.status ? "success" : "error";
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Badge badgeContent={""} color={badgeColor}></Badge>
              <Avatar alt={user.name} src={user.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
            <Checkbox
              {...label}
              icon={<MenuIcon />}
              checkedIcon={<MenuOpenIcon />}
              onClick={() => handleCheckboxClick(user)}
            />
          </ListItem>
        );
      })}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Kullanıcı bilgileri"}</DialogTitle>
        <DialogContent>
          <DialogContentText>DİALOG EKRANI İÇERİK GELİCEK</DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </List>
  );
}

export default UserTable;
