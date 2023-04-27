import React from 'react'
import {Box, Typography} from "@mui/material"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,
        ArcElement,
        Tooltip,
        Legend
     } from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function UserPieChart({title,totalUser,blockedUser,unBlockedUser,totalOwners}) {
    const data = {
        labels: ['TotalUser', 'BlockedUser', 'UnBlockedUser','Bike Owners'],
        datasets: [
          {
            label: 'Users',
            data: [totalUser,blockedUser, unBlockedUser,totalOwners ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 205, 86, 0.2)'
              
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)',
              'rgb(153, 102, 255)',
              'rgb(255, 205, 86)',
             
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            position: 'right',
          },
        },
      };

  return (
    <>
      <Box sx={{ width:'35vw',mb:4}}>
      <Typography variant='h5'>{title}</Typography>
      <Pie data={data} options={options} />
    </Box>
    </>
  )
}

export default UserPieChart
