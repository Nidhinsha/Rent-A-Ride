import React from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend } from "chart.js"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function BookingChart({completed,onRide,pending,cancelled,rejected,accepted}) {
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
            // {
            //     label : 'Rejected',
            //     data:[rejected],
            //     backgroundColor : 'rgba(255, 159, 64, 0.2)',
            //     borderColor :  'rgb(255, 159, 64)',
            //     borderWidth : 1
            // },
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
      <Bar
        data={data}
        options={options}
      />
    </>
  )
}

export default BookingChart
