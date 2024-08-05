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
import Navbar from "../Components/navbar";
import OpenSnackbar from "../Components/snackbar";
import ChartDialog from "../Components/chart";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const [clickCounts, setClickCounts] = useState(
    new Array(numbers.length).fill(0)
  ); //numbers dizisinin boyutunda yeni bir dizi oluştur ve bu diziyi 0 ile doldur
  const [triger, setTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleShowResults = () => {
    setDialogOpen(true);
  };

  const handleClick = (number, index) => {
    console.log("Paper clicked!", number);
    socket.emit("update score", { userId, score: number });

    //papera tıklandığında clickcounts u günceller
    setClickCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] += 1;
      return newCounts;
    });
  };

  const handlePause = () => {
    console.log("pause tıklandı");
    socket.emit("break request");
    setSnackbarMessage("Mola İsteniyor");
    setSnackbarPosition("center");
    setSnackbarOpen(true);
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

    socket.on("break notification", onNotification);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user list", onNewUser);

    return () => {
      socket.off("break notification", onNotification);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("user list", onNewUser);
    };
  }, []);

  return (
    <>
      <Navbar
        setTrigger={() => {
          setTrigger(triger + 1);
        }}
      />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item lg={8} sm={8}>
          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {numbers.map((number, index) => {
              return (
                <PointCard
                  key={"point-card-" + index}
                  index={index}
                  number={number}
                  handleClick={() => handleClick(number, index)} // Pass index to handleClick
                />
              );
            })}
          </Grid>
          <Choice />
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
      <ChartDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        xAxisData={numbers}
        seriesData={clickCounts}
      />
    </>
  );
};

export default Dashboard;
