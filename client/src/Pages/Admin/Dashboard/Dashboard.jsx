import React from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import { Avatar, FormHelperText, Grid, styled } from '@mui/material'

function Dashboard() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  return (
    <div>
      <DrawerHeader />
      <SideBar/>
      <div>

      dashboard
      </div>
    </div>
  )
}

export default Dashboard
