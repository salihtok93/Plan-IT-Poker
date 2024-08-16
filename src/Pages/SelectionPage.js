import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { socket } from '../Services/socket';

const SelectionPage = () => {
  const numbers = useMemo(() => ({
    scrum: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"],
    fibonacci: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"],
    sequential: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "?"],
    hours: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, "?"],
    playingCards: ["Ace", 2, 3, 5, 8, "King", "?"],
    tshirt: ["XS", "S", "M", "L", "XL", "XXL", "?"],
  }), []);

    
    const [selectedNumberKey, setSelectedNumberKey] = useState(null);
    useEffect(() => {
      const storedNumberKey = localStorage.getItem('selectedNumberKey')
      if(storedNumberKey && numbers[storedNumberKey]) {
        setSelectedNumberKey(storedNumberKey);
      } else {
        localStorage.setItem('numbers', JSON.stringify(numbers))
        const firstKey = Object.keys(numbers)[0];
        setSelectedNumberKey(firstKey);
        localStorage.setItem('selectedNumberKey',firstKey)

      }

    },[numbers,selectedNumberKey])


    const handleSelect = (key) => {
      setSelectedNumberKey(key);
      localStorage.setItem('selectedNumberKey',key)
      socket.emit('cardSelection',key,numbers)

    };



  // Tema tanımı
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
        <Card sx={{ margin: "80px", padding: "60px", minWidth: 350, minHeight: 300 }}>
        <div style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          {Object.entries(numbers).map(([key, number]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{key}</Typography>
                  <Typography variant="body2">{number.join(', ')}</Typography>
                  <Button
                    variant="contained"
                    color={selectedNumberKey === key ? 'primary' : 'secondary'}
                    style={{ marginTop: '10px' }}
                    onClick={() => handleSelect(key)}
                  >
                    {selectedNumberKey === key ? 'Seçildi' : 'Seç'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedNumberKey && (
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            Seçilen Dizi: {selectedNumberKey} - {numbers[selectedNumberKey].join(', ')}
          </Typography>
        )}
      </div>
            </Card>
     
    </ThemeProvider>
  );
};

export default SelectionPage;
