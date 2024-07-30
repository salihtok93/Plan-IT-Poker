import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { updateUser } from "../Services/userService";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Seçilen kullanıcıyı tutmak için durum

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.103.14:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxClick = (user) => {
    setSelectedUser(user); // Seçilen kullanıcıyı ayarla
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null); // Dialog kapatıldığında seçilen kullanıcıyı sıfırla
  };

  const handleDeleteUser = (userId) => {
    console.log("Kullanıcı silme butonuna tıklandı");
    // Silme butonuna tıklandığında yapılacak işlemler buraya
  };

  const updateRole = async () => {
    if (selectedUser) {
      try {
        const newRole = "admin"; // Mevcut role göre yeni rolü belirle
        updateUser({ userId: selectedUser.id, newRole })
          .then((res) => {
            console.log(res);
            fetchUsers();
          })
          .catch((err) => {
            console.log(err);
          });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, role: newRole } : user
          )
        );
        handleClose(); // Dialogu kapat
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };

  return (
    <List>
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
          </ListItem>
        );
      })}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Kullanıcı Bilgileri"}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <DialogContentText>
              <Typography variant="body1">
                <strong>İsim:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>Rol:</strong> {selectedUser.role}
              </Typography>
              <Typography variant="body1">
                <strong>State:</strong>{" "}
                {selectedUser.status ? "Active" : "Inactive"}
              </Typography>
              <Typography variant="body1">
                <strong>id:</strong> {selectedUser.id}
              </Typography>
              <Typography variant="body1">
                <strong>score:</strong> {selectedUser.score}
              </Typography>
            </DialogContentText>
          )}
          <button onClick={updateRole}>Rolü Değiştir</button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </List>
  );
}

export default UserTable;
