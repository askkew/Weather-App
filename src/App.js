import './App.css';
import React, {useState, useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Card, CardActions, CardContent, Button, Typography, Box, Grid, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import moment from 'moment';

const Testtest = styled('div')({
  
})

const CenterCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  width: '500', 
  height: '500'
})

const Searcharea = styled('div')({
  display: 'flex', 
  justifyContent: 'center',
  flexDirection: 'row',
})

const Highlow = styled('div')({
  display: 'flex',
  justifyContent: 'center', 
})

const Conditions = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#00e676',
    },
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#00e676',
    },
  }
})

function App() {

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=7402bcd03e0b88f6c75855bda3497673`
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container justifyContent="center" sx={{paddingTop: 2}}>
        <Card sx={{width: 1250, height: 1250, display: 'flex', justifyContent: 'center',}}>
            <CardContent>
              <Typography sx={{ fontSize: 40, display: 'flex', justifyContent: 'center' }} color="text.secondary" gutterBottom>
                {moment().format('LLLL')}
              </Typography>
              <Searcharea>
                <TextField id="outlined-basic" label="Enter City Name" variant="outlined" sx={{width: 500}} />
                <Button variant="contained" sx={{height: 55, marginLeft: 2}}>
                  test
                </Button>
              </Searcharea>
              <Divider sx={{paddingBottom: 2}}></Divider>
              <Typography sx={{ fontSize: 65, display: 'flex', justifyContent: 'center', }} color="text.primary" gutterBottom>
                Houston, Texas
              </Typography>
              <Typography sx={{ fontSize: 125, marginBottom: 0, paddingLeft: 5, display: 'flex', justifyContent: 'center', }} color="text.primary" gutterBottom>
                89°
              </Typography>
              <Highlow>
                <KeyboardDoubleArrowUpIcon sx={{ fontSize: 50}} />
                <Typography sx={{ fontSize: 35, marginBottom: 0, display: 'flex', justifyContent: 'center', }} color="text.primary" gutterBottom>
                  99°
                </Typography>
                <KeyboardDoubleArrowDownIcon sx={{ fontSize: 50}} />
                <Typography sx={{ fontSize: 35, marginBottom: 0, display: 'flex', justifyContent: 'center', }} color="text.primary" gutterBottom>
                  75°
                </Typography>
              </Highlow>
              <Conditions>
                <WbSunnyIcon sx={{ fontSize: 65}}/>
                <Typography sx={{ fontSize: 45, marginBottom: 0, marginLeft: 2, display: 'flex', justifyContent: 'center', }} color="text.primary" gutterBottom>
                  Clear
                </Typography>
              </Conditions>
              <Divider sx={{paddingBottom: 2}}></Divider>
              <Testtest>
                  <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item>
                                test
                            </Grid>
                            <Grid item>
                                test
                            </Grid>
                            <Grid item>
                                test
                            </Grid>
                            <Grid item>
                                test
                            </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
              </Testtest>
            </CardContent>
        </Card>
      </Grid>
    </ThemeProvider>

  );
}

export default App;
