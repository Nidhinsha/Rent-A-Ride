import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { adminGetBookedBikeAction } from '../../../Redux/Actions/adminActions';

function ViewBookedBike() {
  const dispatch = useDispatch()

  const { bookedData } = useSelector((state) => state.adminGetBookedBikeReducer)
  console.log(bookedData, 'nooded data');

  useEffect(() => {
    dispatch(adminGetBookedBikeAction())
  }, [])

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const statusBodyTemplate = (bikeData) => {
    return <Tag value={bikeData.status} severity={getSeverity(bikeData)}></Tag>;
  };

  const getSeverity = (bikeData) => {
    switch (bikeData.status) {
      case 'accepted':
        return 'success';

      case 'pending':
        return 'warning';

      case 'rejected':
        return 'danger';

      default:
        return null;
    }
  };

  return (
    <>

      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
          <DrawerHeader />
          <Box>
            <Typography variant='h4'>Booked Bike List</Typography>
          </Box>
          <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>
            <DataTable value={bookedData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
              <Column field="photo" header="Bike" body={(rowData) => <img src={rowData.photo[0]} alt="User" style={{
                width: '5rem',
                height: '5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: '30%',
              }} />} />
              <Column field="bikeName" header="BikeName" sortable ></Column>
              <Column field="bikeModel" header="User" sortable></Column>
              <Column field="pickupLocation" header="PickUp" sortable></Column>
              <Column field="dropOffLocation" header="Drop" sortable></Column>
              <Column field="startingTime" header="Start Date" sortable style={{ width: '25%' }}
              />
              <Column field="endingTime" header="End Date" sortable style={{ width: '25%' }}
              />

              {/* <Column field="rentPerHour" header="rent Per Hour" sortable ></Column> */}
              <Column field='totalHours' header="total Hours" sortable></Column>
              <Column field='totalAmount' header="Total" sortable></Column>
              {/* <Column field='status' header="status" body={statusBodyTemplate} sortable ></Column> */}
              <Column header="Action" body={(rowData) => (
                <div>
                  <i className="pi pi-file-edit" style={{ fontSize: '1.5rem', marginRight: '5px', color: 'blue' }}
                    onClick={(e) => {
                      //   navigate('/admin/edit-bike',{state:{bikeData:rowData}})
                    }} ></i>
                  <i className="pi pi-times" style={{ fontSize: '1.5rem', marginRight: '5px', color: 'red' }}
                  // onClick={()=> handleDelete(rowData._id)}
                  >

                  </i>
                </div>
              )} />

            </DataTable>
          </Container>
        </Box>

      </Box>
    </>
  )
}

export default ViewBookedBike
