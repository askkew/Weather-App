import React from 'react'
import { Button, Typography } from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud';

const Weatherbutton = () => {
  return (
    <>
    <Button sx={{display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', color: 'lightgrey'}}>
        <CloudIcon fontSize='large'/>
        <Typography>Weather</Typography>
    </Button>
    </>
  )
}

export default Weatherbutton