import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";

//AXİOS İLE GET YAPILIP KULLANICILAR ÖYLE ALINICAK
const USERS = [
  { id: 1, name: "Salih Tok", role: "user", status: true },
  {
    id: 2,
    name: "Emrah Dasdemir",
    role: "admin",
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
  const handleDeleteUser = (userId) => {
    console.log("Kullanıcı silme butonuna tıklandı");
    // Silme butonuna tıklandığında yapılacak işlemler buraya
  };

  const onAddUser = () => {
    console.log("ATEA");
    const newUser = {
      id: users.length + 1,
      name: "Samm Teknoloji",
      role: "user",
      status: false,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    console.log(newUser); // Yeni kullanıcıyı konsola yazdır

    //kullanıcının ID'sini localStorage'a kaydet
    localStorage.setItem(`user${newUser.id}.id`, newUser.id);
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
            <ListItemAvatar
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s",
                },
              }}
              onClick={() => handleCheckboxClick(user)}
            >
              <Badge badgeContent={""} color={badgeColor} variant="dot">
                <Avatar alt={user.name} variant="rounded">
                  {user.role === "admin" ? (
                    <VerifiedUserIcon />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
            {user.status ? null : (
              <DeleteIcon
                sx={{
                  "&:hover": {
                    color: "red",
                    transform: "scale(1.2)",
                    transition: "color 0.3s, transform 0.3s",
                  },
                }}
                onClick={() => handleDeleteUser(user.id)}
              />
            )}
            <Typography sx={{ marginLeft: 2 }}>1</Typography>

            {/* <Checkbox
              {...label}
              icon={<MenuIcon />}
              checkedIcon={<MenuOpenIcon />}
              onClick={() => handleCheckboxClick(user)}
            /> */}
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
