import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useState, useCallback } from "react";
import { PointCard } from "../Components/pointCard";
import Usertable from "../Components/userTable";
import { socket } from "../Services/socket";
import { PieActiveArc } from "../Components/chart";
import { updateVote } from "../Services/voteService";
import ElmoDialog from "../Components/elmoDialog";
import Choice from "../Components/choice";
import { CardElmo } from "../Components/cardElmo";
import BreakDialog from "../Components/breakDialog";
import OpenSnackbar from "../Components/snackbar";

const Dashboard = () => {
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const userRole = localStorage.getItem("userRole"); // değiştirilebilir
  const numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];
  const [triger, setTrigger] = useState(0);
  const [openchart, setOpenchart] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const userId = localStorage.getItem("serverResponse");
  const [openElmo, setOpenElmo] = useState(false);
  const [openBreak, setOpenBreak] = useState(false);
  const [showPointCards, setShowPointCards] = useState(true);
  const [selectedTime, setSelectedTime] = useState(15); // geri sayma başlangıcı
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [isSelectionLocked, setIsSelectionLocked] = useState(true); // true iken oy veremiyor false iken veriyor
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (seconds === 0) {
        setIsActive(false); // Geri sayım bitince aktif durumu kapat
        setIsSelectionLocked(true);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startCountdown = () => {
    if (userRole === "admin") {
      setSeconds(selectedTime);
      setIsActive(true);
      setShowCounter(true);
      setSelectedVote(null);
      // setIsSelectionLocked(false);
      socket.emit("startcount", selectedTime);
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  const onYetoClick = () => {
    socket.emit("elmo-req");
  };

  const handleShowResults = () => {
    setOpenchart(true);
    setShowPointCards(false);
    socket.emit("show results");
  };

  const handleShowCard = () => {
    setShowPointCards(true);
    setOpenchart(false);
    socket.emit("show card");
  };

  const handleClick = (number) => {
    if (!isSelectionLocked) {
      setSelectedVote(number);
      updateVote({ userId: userId, score: number })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Yöneticinin Oylamayı başlatması bekleniyor.");
      setOpenSnackbar(true);
    }
  };

  const handlePause = () => {
    console.log("pause tıklandı");
    const userName = // EMRAH İSTEĞİ ÜZERİNE
      usersData.find(
        (user) => user.id === localStorage.getItem("serverResponse")
      )?.name || "User not found";

    socket.emit("break request", userName);
  };

  const resetVotes = () => {
    setSnackbarSeverity("success");
    setSnackbarMessage("Oylama sıfırlandı");
    setOpenSnackbar(true);
    socket.emit("voteReset");
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log(triger);
  }, [triger]);

  const onConnect = useCallback(() => {
    console.log("CONNECTED ");
  }, []);

  // const onDisconnect = useCallback(() => {
  //   console.log("onDisconnect ");
  //   updateStatus({ userId: userId })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setTrigger((t) => t + 1);
  // }, [userId]);

  const onNewUser = useCallback(() => {
    console.log("UserList Dinleniyor");
    setTrigger((t) => t + 1);
  }, []);

  const onNotification = useCallback(() => {
    setOpenBreak(true);
  }, []);
  const onElmo = useCallback(() => {
    setOpenElmo(true);
  }, []);
  const onShowresults = useCallback(() => {
    setOpenchart(true);
    setShowPointCards(false);
    setIsActive(false);
    setShowCounter(false);
    setIsSelectionLocked(true);
  }, []);

  const onShowCard = useCallback(() => {
    setOpenchart(false);
    setShowPointCards(true);
    setSelectedVote(null);
  }, []);
  const onStartCount = useCallback((time) => {
    setSeconds(time);
    setIsActive(true);
    setShowCounter(true);
    setIsSelectionLocked(false);
  }, []);

  const onResetButton = useCallback(() => {
    setSelectedVote(false);
  }, []);

  const onDeleteUser = (userId) => {
    const loggedInUserId = localStorage.getItem("serverResponse");

    if (userId === loggedInUserId) {
      localStorage.clear();
      window.location.reload();
    } else {
      setTrigger((t) => t + 1);
    }
  };

  const onUpdateRole = ({ userId, newRole }) => {
    console.log(`Kullanıcı rolü güncellendi:`, userId, newRole);

    const loggedInUserId = localStorage.getItem("serverResponse");

    if (userId === loggedInUserId) {
      localStorage.setItem("userRole", newRole);
      window.location.reload();
    } else if (newRole === "admin") {
      if (loggedInUserId) {
        localStorage.setItem("userRole", "user");
      }
      setTrigger((t) => t + 1);
    }
  };

  const onIdCheckResult = useCallback((result) => {
    if (!result) {
      localStorage.removeItem("serverResponse");
      localStorage.removeItem("userRole");
    }
  }, []);

  useEffect(() => {
    console.log("TEST");
    socket.on("elmo-req", onElmo);
    socket.on("break notification", onNotification);
    socket.on("connect", onConnect);
    socket.on("user list", onNewUser);
    socket.on("show-results", onShowresults);
    socket.on("show-card", onShowCard);
    socket.on("start-count", onStartCount);
    socket.on("voteReset", onResetButton);
    socket.on("userDeleted", onDeleteUser);
    socket.on("updatedRole", onUpdateRole);
    socket.on("idCheckResult", onIdCheckResult);

    return () => {
      socket.off("elmo-req", onElmo);
      socket.off("break notification", onNotification);
      socket.off("connect", onConnect);
      socket.off("user list", onNewUser);
      socket.off("show-results", onShowresults);
      socket.off("show-card", onShowCard);
      socket.off("start-count", onStartCount);
      socket.off("voteReset", onResetButton);
      socket.off("userDeleted", onDeleteUser);
      socket.off("updatedRole", onUpdateRole);
      socket.off("idCheckResult", onIdCheckResult);
    };
  }, [
    onNotification,
    onConnect,
    onNewUser,
    onShowresults,
    onShowCard,
    onStartCount,
    onElmo,
    onResetButton,
    onIdCheckResult,
  ]);

  const [usersData, setUsersData] = useState([]);

  const textToCopy = "http://192.168.102.193:3001"; // değiştirilecek değer
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setSnackbarMessage(`Panoya Kopyalandı`);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

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
      <BreakDialog open={openBreak} setOpen={(data) => setOpenBreak(data)} />
      <ElmoDialog open={openElmo} setOpen={(data) => setOpenElmo(data)} />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item lg={8} sm={8}>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            style={{ marginBottom: "24px" }}
          >
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
                  key={`point-card-${index}`}
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

            <Grid
              item
              lg={3}
              md={3}
              sm={4}
              xs={6}
              onClick={() => onYetoClick()}
            >
              {showPointCards && <CardElmo />}
            </Grid>
          </Grid>
          {!openchart && <Choice />}
        </Grid>
        <Grid item lg={3} sm={8}>
          <Paper elevation={3} style={{ width: "400px", padding: 16 }}>
            {userRole === "admin" && (
              <div
                style={{
                  height: "75px",
                  display: "flex",
                  marginBottom: 16,
                }}
              >
                <Paper elevation={0} style={{ width: "400px" }}>
                  <>
                    <div>
                      <Typography>
                        Oylamayı başlatmak için "Başlat" tıklayın
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Select
                        style={{ height: "37px" }}
                        value={selectedTime}
                        onChange={(e) =>
                          setSelectedTime(Number(e.target.value))
                        }
                        displayEmpty
                      >
                        <MenuItem value={15}>15 Saniye</MenuItem>
                        <MenuItem value={30}>30 Saniye</MenuItem>
                        <MenuItem value={45}>45 Saniye</MenuItem>
                        <MenuItem value={60}>60 Saniye</MenuItem>
                      </Select>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={startCountdown}
                        variant="contained"
                        color="info"
                      >
                        Başlat
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={resetVotes}
                        variant="contained"
                        color="error"
                      >
                        Puanları Sıfırla
                      </Button>
                    </div>
                  </>
                </Paper>
              </div>
            )}
            {userRole === "admin" && <hr />}
            <Typography>Oyuncular</Typography>
            <hr />
            <Usertable
              // selected={selectedVote}
              showCard={showPointCards}
              showScore={openchart}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography>{textToCopy}</Typography>
                  <Button
                    style={{ marginLeft: "auto" }}
                    onClick={copyToClipboard}
                  >
                    Kopyala
                  </Button>
                </div>
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

              {showPointCards &&
                userRole === "admin" && ( // Sadece admin için göstermek için localstorage den aldığımız bilgi ile yapıyoruz
                  <Button variant="contained" onClick={handleShowResults}>
                    Sonuç Göster
                  </Button>
                )}

              {openchart && userRole === "admin" && (
                <Button variant="contained" onClick={handleShowCard}>
                  Kart Göster
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
        <OpenSnackbar
          open={openSnackbar}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          position="center"
        />
      </Grid>
    </>
  );
};

export default Dashboard;
