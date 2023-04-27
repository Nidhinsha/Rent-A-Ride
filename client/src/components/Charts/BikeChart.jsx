import React from 'react'
import { Line } from 'react-chartjs-2' 
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js"
import { Box, Typography } from '@mui/material';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)


function BikeChart({allBikes,rendRequest,rejectRequest,title}) {
    const data = {
        labels: ['Total Bikes', 'Rent Request', 'Rejected Request'],
        datasets: [
          {
            label: 'Users',
            data: [allBikes,rendRequest, rejectRequest,],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                
              ],
              borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(153, 102, 255)',
               
              ],
            borderWidth: 1,
            pointBorder:'transparent',
            pointBorderWidth:4
          },
        ],
      };
      const options = {
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }
  return (
    <>
      <Box sx={{ width:'50vw',mr:5 }}>
      <Typography variant='h5'>{title}</Typography>
      <Line 
        data={data} 
        options={options} 
        />
      </Box>
    </>
  )
}

export default BikeChart
