import React from 'react'
import { Button, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

const Settingsbutton = () => {
  return (
    <>
    <Button sx={{display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', color: 'lightgrey'}}>
        <SettingsIcon fontSize='medium'/>
        <Typography>Settings</Typography>
    </Button>
    </>
  )
}

export default Settingsbutton