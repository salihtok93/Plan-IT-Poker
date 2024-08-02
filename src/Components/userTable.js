import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import {
  Typography,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, fetchUser, updateUser } from "../Services/userService";
import OpenSnackbar from "./snackbar";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetchUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    console.log("Kullanıcı silme butonuna tıklandı");
    deleteUser(userId)
      .then((response) => {
        console.log("Kullanıcı başarıyla silindi", response.data);
        setSnackbarMessage(`Kullanıcı başarıyla silindi`);
        setSnackbarOpen(true);
        fetchUsers();
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("Kullanıcı silinirken bir hata oluştu", error);
        // Hata yönetimi, örneğin kullanıcıya hata mesajı gösterme
      });
  };

  const updateRole = async () => {
    if (selectedUser) {
      try {
        const newRole = "admin";
        updateUser({ userId: selectedUser.id, newRole })
          .then((res) => {
            console.log(res);
            fetchUsers();
            setSnackbarMessage(
              `${selectedUser.name} kullanıcısının rolü başarıyla güncellendi!`
            );
            setSnackbarOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, role: newRole } : user
          )
        );

        handleClose();
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
                <strong>id:</strong> {selectedUser.id}
              </Typography>
              <Typography variant="body1">
                <strong>İsim:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                <strong>Rol:</strong> {selectedUser.role}
              </Typography>
              <Typography variant="body1">
                <strong>State:</strong>{" "}
                {selectedUser.status ? "Active" : "Inactive"}
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
      <OpenSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </List>
  );
}

export default UserTable;
