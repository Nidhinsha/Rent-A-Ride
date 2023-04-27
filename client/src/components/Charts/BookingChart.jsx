import React from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend } from "chart.js"
import {Box, Typography} from "@mui/material"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function BookingChart({completed,onRide,pending,cancelled,rejected,accepted,title}) {
    const data = {
        labels :[''],
        datasets :[
            {
                label : 'Completed',
                data:[completed],
                backgroundColor : 'rgba(75, 192, 192, 0.2)',
                borderColor : 'rgb(75, 192, 192)',
                borderWidth : 1
            },
            {
                label : 'On-Ride',
                data:[onRide],
                backgroundColor : 'rgba(153, 102, 255, 0.2)',
                borderColor :  'rgb(153, 102, 255)',
                borderWidth : 1
            },
            {
                label : 'Pending',
                data:[pending],
                backgroundColor : 'rgba(255, 205, 86, 0.2)',
                borderColor :  'rgb(255, 205, 86)',
                borderWidth : 1
            },
            {
                label : 'Cancelled',
                data:[cancelled],
                backgroundColor : ' rgba(255, 99, 132, 0.2)',
                borderColor :  ' rgb(255, 99, 132)',
                borderWidth : 1
            },
        ]
    }
    const options = {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }
  return (
    <>
    <Box sx={{ width:'50vw',mr:5,}}>
      <Typography variant='h5'>{title}</Typography>
      <Box sx={{mt:5}}>
      <Bar
        data={data}
        options={options}
      />

      </Box>
    </Box>
    </>
  )
}

export default BookingChart
