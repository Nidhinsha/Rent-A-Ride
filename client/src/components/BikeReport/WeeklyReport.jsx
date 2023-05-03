import React from 'react'
import moment from "moment"
import MUIDataTable from "mui-datatables";
import { get } from "lodash";

function WeeklyReport({ bikeReport }) {

  const columns = [
    {
      name:"bikeId",
      label: "Bike Name",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            const brand = get(value, "bikeName");
            return <div style={{ textAlign: 'center' }}>{brand}</div>;
          },
      }
    },
    {
      name: "pickupLocation",
      label: "pickUp",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
    {
      name: "dropOffLocation",
      label: "drop Off",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
    {
      name: "bookedAt",
      label: "Booked Date",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
   
    {
      name: "totalHours",
      label: "Total Hours",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
    {
      name: "totalAmount",
      label: "Total Amount (in Rs)",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
    {
      name: "paymentType",
      label: "Payment Type",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
      }
    },
  ];

  const data= bikeReport.filter(sale => {
    const bookedAt = moment(sale.bookedAt, 'MMMM Do YYYY, h:mm:ss a');
    const currentTime = moment();
    const daysDiff = currentTime.diff(bookedAt, 'days');
    return daysDiff <= 7;
  }).map(sale => ({
    bikeId: sale.bikeId,
    pickupLocation: sale.pickupLocation,
    dropOffLocation: sale.dropOffLocation,
    bookedAt : sale.bookedAt,
    totalHours: sale.totalHours,
    totalAmount: sale.totalAmount,
    paymentType: sale.paymentType,
    status: sale.status
  }));

  const options = {
    filterType: 'checkbox',
    customHeadLabelStyle: {
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      },
      customBodyRender: (value, tableMeta, updateValue) => {
        return <div style={{ textAlign: 'center' }}>{value}</div>;
      },
  };
  

  return (
    <div>
         
             <MUIDataTable
        title={"Sales Data"}
        data={data}
        columns={columns}
        options={options}
      />
        </div>
  )
}

export default WeeklyReport
