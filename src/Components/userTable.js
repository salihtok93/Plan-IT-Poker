import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

//AXİOS İLE GET YAPILIP KULLANICILAR ÖYLE ALINICAK
const users = [
  { id: 1, name: "Salih Tok", avatarUrl: "logo192.png" },
  { id: 2, name: "Emrah Daşdemir", avatarUrl: "logo192.png" },
];

function userTable() {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.avatarUrl} />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default userTable;
