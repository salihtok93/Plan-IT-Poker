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
import OpenSnackbar from "../Components/snackbar";
import ChartDialog from "../Components/chart";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const [clickCounts, setClickCounts] = useState(
    new Array(numbers.length).fill(0)
  );
  const [triger, setTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const userId = localStorage.getItem("serverResponse");

  const handleShowResults = () => {
    setDialogOpen(true);
  };

  const handleClick = (number, index) => {
    if (selectedVote !== null) return; // Birden fazla oylamayı engelle

    console.log("Paper clicked!", number);

    // clickCounts değerlerini güncelle
    setClickCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] += 1;
      return newCounts;
    });

    // Seçilen oyu ayarla
    setSelectedVote(index);

    // Kullanıcının puanını güncelleme olayını sunucuya gönder
    socket.emit("update user score", { userId, score: number });
  };

  const handlePause = () => {
    console.log("pause tıklandı");
    socket.emit("break request");
  };

  const [snackbarPosition, setSnackbarPosition] = useState("bottom");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log(triger);
  }, [triger]);

  useEffect(() => {
    console.log("TEST");
    function onConnect() {
      console.log("CONNECTED ");
    }

    function onDisconnect() {
      console.log("onDisconnect ");
      setTrigger((t) => t + 1);
    }

    function onNewUser() {
      console.log("yeni kullanıcı");
      setTrigger((t) => t + 1);
    }

    function onNotification() {
      console.log("Mola isteği geldi");
      setSnackbarMessage("Elmo!");
      setSnackbarPosition("center");
      setSnackbarOpen(true);
    }

    function onUpdateScore({ userId, score }) {
      console.log(`Kullanıcı ${userId} puanını ${score} olarak güncelledi`);
      // Yerel kullanıcı durumunu güncelleme fonksiyonunu çağır
      setTrigger((t) => t + 1);
    }

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
  }, [userId]);

  return (
    <>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item lg={8} sm={8}>
          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {dialogOpen ? (
              <ChartDialog xAxisData={numbers} seriesData={clickCounts} />
            ) : (
              numbers.map((number, index) => (
                <PointCard
                  key={"point-card-" + index}
                  index={index}
                  number={number}
                  handleClick={() => handleClick(number, index)}
                  selected={selectedVote === index}
                />
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
            <Usertable triger={triger} />
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
              <Button
                variant="contained"
                style={{ marginLeft: "70px" }}
                onClick={handleShowResults}
              >
                Sonuç Göster
              </Button>
              <OpenSnackbar
                position={snackbarPosition}
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
              />
            </>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
