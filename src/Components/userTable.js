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
  DialogTitle,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, fetchUser, updateUser } from "../Services/userService";
import OpenSnackbar from "./snackbar";

function UserTable({ triger, setUsersP, showScore, showCard }) {
  const userRole = localStorage.getItem("userRole");
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetchUser();
      // console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    setUsersP(users);
  }, [users, setUsersP]);

  useEffect(() => {
    fetchUsers();
  }, [triger]);

  const handleCheckboxClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setConfirmDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete)
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
        })
        .finally(() => {
          setConfirmDialogOpen(false);
          setUserToDelete(null);
        });
    }
  };

  const cancelDeleteUser = () => {
    setConfirmDialogOpen(false);
    setUserToDelete(null);
  };

  const updateRole = async () => {
    if (selectedUser) {
      try {
        const newRole = "admin";
        updateUser({ userId: selectedUser.id, newRole })
          .then((res) => {
            console.log(res);
            fetchUsers();
            localStorage.setItem("userRole", newRole); // değiştirilebilir
            setSnackbarMessage(
              `${selectedUser.name} Kullanıcısını rolü başarıyla güncellendi!`
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

  // const updateRole = () => {
  //   if (selectedUser) {
  //     const newRole = "admin";
  //     socket.emit("updateRole", selectedUser.id, newRole);
  //     fetchUser();
  //     setSnackbarMessage(
  //       `${selectedUser.name} kullanicisin rolü başariyla güncellendi!`
  //     );
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <List>
      {users.map((user) => {
        console.log(user);

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
            <ListItemText
              primary={
                <Typography
                  fontWeight={
                    user.id === localStorage.getItem("serverResponse")
                      ? "bold"
                      : "normal"
                  }
                >
                  {user.name}
                </Typography>
              }
            />
            {user.status && userRole !== "admin" ? null : (
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
            {(showCard || showScore) && (
              <Typography sx={{ marginLeft: 2 }}>
                {user.score === -1
                  ? null
                  : showCard
                  ? "✓"
                  : showScore
                  ? user.score
                  : null}
              </Typography>
            )}
          </ListItem>
        ); //score yazma üstte
      })}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Kullanıcı Bilgileri"}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
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
              {userRole === "admin" && (
                <Typography variant="body1">
                  <strong>score:</strong> {selectedUser.score}
                </Typography>
              )}

              <Typography variant="body1">
                <strong>Created Time:</strong> {selectedUser.time}
              </Typography>
            </>
          )}
          {userRole === "admin" && (
            <Button onClick={updateRole}>Rolü Değiştir</Button>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog open={confirmDialogOpen} onClose={cancelDeleteUser}>
        <DialogTitle>Kullanıcıyı Sil</DialogTitle>
        <DialogContent>
          Bu kullanıcıyı silmek istediğinizden emin misiniz?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteUser} color="error">
            İptal
          </Button>
          <Button onClick={confirmDeleteUser} color="primary" autoFocus>
            Sil
          </Button>
        </DialogActions>
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
