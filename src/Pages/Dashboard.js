import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState } from "react";
import Choice from "../Components/choice";
import { PointCard } from "../Components/pointCard";
import Usertable from "../Components/userTable";
import { socket } from "../Services/socket";
import { PieActiveArc } from "../Components/chart";
import { updateVote } from "../Services/voteService";
import { updateStatus } from "../Services/userService";
import ElmoDialog from "../Components/elmoDialog";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const [triger, setTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const userId = localStorage.getItem("serverResponse");
  const [openElmo, setOpenElmo] = useState(false);
  const [showPointCards, setShowPointCards] = useState(true); // PointCard görünürlüğü için durum

  const handleShowResults = () => {
    setDialogOpen(true);
    setShowPointCards(false);
  };

  const handleShowCard = () => {
    setShowPointCards(true);
    setDialogOpen(false);
  };

  const handleClick = (number) => {
    setSelectedVote(number);
    updateVote({ userId: userId, score: number })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePause = () => {
    console.log("pause tıklandı");
    socket.emit("break request");
  };
  useEffect(() => {
    console.log(triger);
  }, [triger]);

  useEffect(() => {
    console.log("TEST");

    socket.on("break notification", onNotification);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user list", onNewUser);
    socket.on("update score", onUpdateScore);

    return () => {
      socket.off("break notification", onNotification);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("user list", onNewUser);
      socket.off("update score", onUpdateScore);
    };
  }, []);

  const onConnect = () => {
    console.log("CONNECTED ");
  };

  const onDisconnect = () => {
    console.log("onDisconnect ");
    updateStatus({ userId: userId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTrigger((t) => t + 1);
  };

  const onNewUser = () => {
    console.log("yeni kullanıcı");
    setTrigger((t) => t + 1);
  };

  const onNotification = () => {
    setOpenElmo(true);
  };

  const onUpdateScore = ({ userId, score }) => {
    console.log(`Kullanıcı ${userId} puanını ${score} olarak güncelledi`);
    setTrigger((t) => t + 1);
  };

  const [usersData, setUsersData] = useState([]);

  return (
    <>
      <ElmoDialog open={openElmo} setOpen={(data) => setOpenElmo(data)} />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item lg={8} sm={8}>
          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {dialogOpen ? (
              <PieActiveArc xAxisData={numbers} usersData={usersData} />
            ) : (
              showPointCards &&
              numbers.map((number, index) => (
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={4}
                  xs={6}
                  key={"point-card-" + index}
                  onClick={() => handleClick(number, index)}
                >
                  <PointCard
                    index={index}
                    number={number}
                    selected={selectedVote === number}
                  />
                </Grid>
              ))
            )}
          </Grid>
          {!dialogOpen && <Choice />}
        </Grid>
        <Grid item lg={3} sm={8}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Typography>Oylamayı başlatmak için "Başlat" tıklayın</Typography>
              <Button variant="contained" color="info">
                Başlat
              </Button>
            </div>
            <hr />
            <Typography>Oyuncular</Typography>
            <hr />
            <Usertable
              triger={triger}
              setUsersP={(usersData) => {
                setUsersData(usersData);
              }}
            />
            <hr />
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Takım Arkadaşı davet et</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>URL VE KOPYALAMA EKLENECEK</Typography>
              </AccordionDetails>
            </Accordion>
            <hr />
            <>
              <Button variant="contained" onClick={handlePause}>
                Mola İste
              </Button>

              {showPointCards && (
                <Button
                  variant="contained"
                  style={{ marginLeft: "70px" }}
                  onClick={handleShowResults}
                >
                  Sonuç Göster
                </Button>
              )}

              {dialogOpen && ( // Sadece sonuç gösterildiğinde "Kartları göster" butonunu göster
                <Button
                  variant="contained"
                  style={{ marginLeft: "70px" }}
                  onClick={handleShowCard}
                >
                  Kart göster
                </Button>
              )}
            </>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
