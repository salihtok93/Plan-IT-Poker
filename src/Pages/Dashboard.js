import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState, useCallback } from "react";
import { PointCard } from "../Components/pointCard";
import Usertable from "../Components/userTable";
import { socket } from "../Services/socket";
import { PieActiveArc } from "../Components/chart";
import { updateVote } from "../Services/voteService";
import { updateStatus } from "../Services/userService";
import ElmoDialog from "../Components/elmoDialog";
import Choice from "../Components/choice";

const Dashboard = () => {
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const [triger, setTrigger] = useState(0);
  const [openchart, setOpenchart] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const userId = localStorage.getItem("serverResponse");
  const [openElmo, setOpenElmo] = useState(false);
  const [showPointCards, setShowPointCards] = useState(true);

  const initialSeconds = 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [showCounter, setShowCounter] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (seconds === 0) {
        setIsActive(false);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startCountdown = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
    setShowCounter(true);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleShowResults = () => {
    setOpenchart(true);
    setShowPointCards(false);
  };

  const handleShowCard = () => {
    setShowPointCards(true);
    setOpenchart(false);
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

  const onConnect = useCallback(() => {
    console.log("CONNECTED ");
  }, []);

  const onDisconnect = useCallback(() => {
    console.log("onDisconnect ");
    updateStatus({ userId: userId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTrigger((t) => t + 1);
  }, [userId]);

  const onNewUser = useCallback(() => {
    console.log("UserList Dinleniyor");
    setTrigger((t) => t + 1);
  }, []);

  const onNotification = useCallback(() => {
    setOpenElmo(true);
  }, []);

  useEffect(() => {
    console.log("TEST");

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
  }, [onNotification, onConnect, onDisconnect, onNewUser]);

  const [usersData, setUsersData] = useState([]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showCounter && <h1>{formatTime(seconds)}</h1>}
      </div>
      <ElmoDialog open={openElmo} setOpen={(data) => setOpenElmo(data)} />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item lg={8} sm={8}>
          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {openchart ? (
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
          {!openchart && <Choice />}
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
              <Button onClick={startCountdown} variant="contained" color="info">
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
                <Typography>{process.env.REACT_APP_BASE}</Typography>
              </AccordionDetails>
            </Accordion>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={handlePause}
                aria-hidden={!showPointCards}
              >
                Mola İste
              </Button>

              {showPointCards && (
                <Button variant="contained" onClick={handleShowResults}>
                  Sonuç Göster
                </Button>
              )}

              {openchart && (
                <Button variant="contained" onClick={handleShowCard}>
                  Kart Göster
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
