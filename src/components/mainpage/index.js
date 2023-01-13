import React, {useState, useEffect} from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, Grid, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import moment from 'moment';
import axios from 'axios';
import { NightsStayTwoTone, Thunderstorm } from '@mui/icons-material';
import Weatherbutton from '../buttons/weatherbutton';
import Settingsbutton from '../buttons/settingsbutton';
import Forecastbutton from '../buttons/forecastbutton';


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
    // width: 650,
    // height: 1350,
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgb(11,18,47)',
})

const Locationarea = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center'
})

const Grid1 = styled(Grid) ({
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
    color: 'rgb(108,168,255)',
})

const Forecast = styled(CardContent)({

})

const Weatherdetails = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
})

const Fourbox = styled(Typography)({
    marginBottom: '5px',
    color: 'lightgrey'
})

const Mainpage = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7402bcd03e0b88f6c75855bda3497673`

    const handleSearch = () => {
    axios.get(url).then((response) => {
        if (response?.data) {
        console.log({response})
        setData(response.data)
        const { name, weather, main, sys} = response.data;
        const { temp, temp_max, temp_min, clouds } = main;
        const { country } = sys;
        const { main : weathermain } = weather[0];
        // const newLocation = {
        //     name,
        //     temp,
        //     temp_max,
        //     temp_min,
        //     country,
        //     clouds,
        //     weather,
        //     weathermain,
        // }
        }
    })
    }

    return (
    <Grid container justifyContent="center">
        <Primarycard>
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
                    <Grid1 container spacing={2}>
                        <Locationgrid item xs={9}>
                            <LocationOnIcon />
                            <Typography color="lightgrey">{data.name ? <Typography sx={{fontSize: '12px'}}>{data.name},  {data.sys?.country}</Typography> : null}</Typography>
                        </Locationgrid>
                        <Grid item xs={3}>
                            <NightsStayIcon sx={{transform: 'scale(2.3)', float: 'right'}}/>
                        </Grid>
                    </Grid1>
                </Locationarea>
                <CardContent>
                    <Grid1 container spacing={2}>
                        <Weathergrid item xs={7}>
                            <Typography>{data.main ? <Typography sx={{fontSize: '85px'}}>{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <Conditionbox>
                                <WbSunnyIcon sx={{fontSize: '25px', paddingRight: '10px'}}/>
                                <Typography variant="h6">{data.weather ? <Typography variant="h6">{data.weather[0].main}</Typography> : null}</Typography>
                            </Conditionbox>
                            <Typography color="lightgrey">Last Updated: {moment().format('LT')}</Typography>
                        </Weathergrid>
                        <Grid item xs={5}>
                        </Grid>
                    </Grid1>
                </CardContent>
                <Divider sx={{paddingBottom: 0.5}}></Divider>
                <Weatherdetails>
                    <Grid1 container spacing={2}>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>High:</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp_max)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>Low:</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp_min)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>Chances of rain:</Fourbox>
                            <Typography variant="h6">DATA</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>Precipitation:</Fourbox>
                            <Typography variant="h6">DATA</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>Wind:</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.wind?.speed)} mph</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox variant="h6" sx={{fontSize: '12px'}}>Humidity:</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.humidity)}%</Typography> : null}</Typography>
                        </Grid>
                    </Grid1>
                </Weatherdetails>
                <Divider sx={{paddingBottom: 1}}></Divider>
                <Forecast>
                    <Grid1 container spacing={2}>
                        <Grid item xs={2}>
                            <Fourbox variant="h6" sx={{fontSize: '14px'}}>{(moment().format('h') - 1)}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                        <Grid item xs={2} sx={{color: 'rgb(108,168,255)'}}>
                            <Fourbox variant="h6" sx={{fontSize: '14px', color: 'rgb(108,168,255)'}}>{moment().format('h')}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox variant="h6" sx={{fontSize: '14px'}}>{Number(moment().format('h'))+ 1}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox variant="h6" sx={{fontSize: '14px'}}>{Number(moment().format('h'))+ 2}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox variant="h6" sx={{fontSize: '14px'}}>{Number(moment().format('h'))+ 3}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h6">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                        <Grid item xs={2}>
                            <Fourbox variant="h6" sx={{fontSize: '14px'}}>{Number(moment().format('h'))+ 4}:{moment().format('m')}</Fourbox>
                            <Typography>{data.main ? <Typography variant="h5">{Math.round(data.main?.temp)}°</Typography> : null}</Typography>
                            <NightlightRoundIcon />
                        </Grid>
                    </Grid1>
                </Forecast>
                <Divider sx={{paddingBottom: 1}}></Divider>
                <CardContent>
                    <Grid1 container spacing={2}>
                        <Grid item xs={4}>
                            <Weatherbutton />
                        </Grid>
                        <Grid item xs={4}>
                            <Forecastbutton />
                        </Grid>
                        <Grid item xs={4}>
                            <Settingsbutton />
                        </Grid>
                    </Grid1>
                </CardContent>
                
            </CardContent>
        </Primarycard>
        </Grid>
  )
}

export default Mainpage