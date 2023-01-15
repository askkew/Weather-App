import React, {useState, useEffect} from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, Grid, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Weatherbutton from '../buttons/weatherbutton';
import Settingsbutton from '../buttons/settingsbutton';
import Forecastbutton from '../buttons/forecastbutton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import moment from 'moment';
import axios from 'axios';


const Searcharea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
})

const Submitbutton = styled(Button)({
    height: 55,
    marginLeft: 2,
    color: 'white',
    backgroundColor: 'rgb(108,168,255)'
})

const Primarycard = styled(Card)({
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    // minHeight: 844,
    // backgroundColor: 'rgb(11,18,47)',
    background: 'transparent',
})

const Locationarea = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: '89px',
})


const Locationgrid = styled(Grid) ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
})

const Weathergrid = styled(Grid) ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
})

const Conditionbox = styled('div')({
    display: 'flex',
    justifyContent: 'left',
    flexDirection: 'row',
    color: 'white',
})

const Forecast = styled(CardContent)({
    //minHeight: '133.39px',
})

const Temperaturearea = styled(CardContent)({
    paddingTop: 0,
    minHeight: '211px',
})

const Weatherdetails = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '232.56px',
})

const Fourbox = styled(Typography)({
    marginBottom: '5px',
    color: 'lightgrey'
})

const Mainpage = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7402bcd03e0b88f6c75855bda3497673`

    const urltwo = `https://api.openweathermap.org/data/3.0/onecall?lat=${data.weather?data.coord?.lat:null}&lon=${data.weather?data.coord?.lon:null}&exclude=hourly,daily&appid=7402bcd03e0b88f6c75855bda3497673`

    const handleSearch = () => {
    axios.get(url)
        .then((response) => { // first data fetch

            const newDataObj = {};
            let coordinates = {};

            if (response?.data) {
                console.log({response})
                const { name, weather, main, sys, coord } = response.data;
                newDataObj[name] = name;
                newDataObj[weather] = weather;
                newDataObj[main] = main;
                newDataObj[sys] = sys;
                coordinates = coord;
            } 
            setData(response.data)
            return { newDataObj, coordinates };
        })
        .then(({ newDataObj, coordinates }) => { // second data fetch
            console.log({ newDataObj, coordinates })
            const { lat, lon } = coordinates;
            //const urltwo = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat ? lat : null}&lon=${lon ? lon : null}&exclude=hourly,daily&appid=f64b214ed3018053fa460454469c6fa9`
            axios.get(urltwo).then((response2) => {
                console.log({ response2 })
            })
        })
    }

    const cityTemp = data.main?.temp;
    const locationName = data?.name;
    const countryName = data?.sys?.country
    const weatherIcon = data?.weather && data?.weather[0]?.icon ? data?.weather[0]?.icon : <AcUnitIcon />;
    const showPage = data?.main;
    const isData = data.main;

    return (
    <Grid container justifyContent="center">
        <Primarycard elevation={0}>
            <CardContent>
                <Searcharea>
                    <TextField
                    id="outlined-basic"
                    label="Enter City Name"
                    variant="outlined"
                    onChange={event => setLocation(event.target.value)}
                    value={location}
                    />
                    <Submitbutton
                    variant="contained"
                    onClick={handleSearch}
                    >
                        Submit
                    </Submitbutton>
                </Searcharea>
                <Divider sx={{paddingBottom: 2}}></Divider>
                <Locationarea>
                    <Grid container spacing={2}>
                        <Locationgrid item xs={9}>
                            <Typography>{isData ? <LocationOnIcon /> : null}</Typography>
                            <Typography color="lightgrey">{locationName ? <Typography sx={{fontSize: '12px'}}>{locationName},  {countryName}</Typography> : null}</Typography>
                        </Locationgrid>
                        <Grid item xs={3}>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 80, height: 80 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                            {/* { Number(currentHour) >= 7 && Number(currentHour) <= 19 ? <WbSunnyIcon sx={{transform: 'scale(2)', float: 'right', color: 'goldenrod'}}/> : <NightsStayIcon sx={{transform: 'scale(2)', float: 'right', color: 'rgb(251, 225, 112)'}}/>} */}
                        </Grid>
                    </Grid>
                </Locationarea>
                <Temperaturearea>
                    <Grid container spacing={2}>
                        <Weathergrid item xs={7}>
                            <Typography>{isData ? <Typography sx={{fontSize: '85px'}}>{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Conditionbox>
                                {/* <Typography variant="h6">{data.weather ? <img src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography> */}
                                <Typography variant="h6">{data.weather ? <Typography variant="h6">{data.weather[0].main}</Typography> : null}</Typography>
                            </Conditionbox>
                            <Typography>{isData ? <Typography color="lightgrey" sx={{fontSize: "13px"}}>Last Updated: {moment().format('LT')}</Typography> : null}</Typography>
                        </Weathergrid>
                        <Grid item xs={5}>
                        </Grid>
                    </Grid>
                </Temperaturearea>
                { showPage && <Divider sx={{paddingBottom: 0.5}}/>}
                <Weatherdetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>High:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.temp_max)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Low:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.temp_min)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Chance of rain:</Fourbox> : null }</Fourbox>
                            <Typography> {isData ? <Typography variant="h6">N/A</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Precipitation:</Fourbox> : null }</Fourbox>
                            <Typography> {isData ? <Typography variant="h6">N/A</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Wind:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.wind?.speed)} mph</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Humidity:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.humidity)}%</Typography> : null}</Typography>
                        </Grid>
                    </Grid>
                </Weatherdetails>
                { showPage && <Divider sx={{paddingBottom: 0.5}}/>}
                <Forecast>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>{(moment().format('h') - 1)} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{color: 'rgb(108,168,255)'}}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0, color: 'rgb(108,168,255)'}}>{moment().format('h')} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>{Number(moment().format('h'))+ 1} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>{Number(moment().format('h'))+ 2} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>{Number(moment().format('h'))+ 3} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>{Number(moment().format('h'))+ 4} {moment().format('a')}</Fourbox> : null} </Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Typography variant="h6">{data.weather ? <img style={{ width: 30, height: 30 }} src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography>
                        </Grid>
                    </Grid>
                </Forecast>

                

            </CardContent>
        </Primarycard>

        </Grid>
    )
}

export default Mainpage