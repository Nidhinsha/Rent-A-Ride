import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Tooltip, Typography, styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { adminGetBookedBikeAction } from '../../../Redux/Actions/adminActions';
import ViewBikeModal from '../../../components/Modal/ViewBikeModal'
import { Button } from 'primereact/button';

function ViewBookedBike() {
  const dispatch = useDispatch()

  const [viewBike, setViewBike] = useState(false)
  const [bikeImage, setBikeImage] = useState([])

  const { bookedData } = useSelector((state) => state.adminGetBookedBikeReducer)


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
;

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
              <Column header="Photo"
                body={(rowData) =>
                (
                  <Button
                    icon="pi pi-image"

                    onClick={() => {
                      setViewBike(true)
                      setBikeImage(rowData?.photo)
                    }}
                  />
                )} />
              {/* modal */}
              <ViewBikeModal open={viewBike} onClose={() => setViewBike(false)} />
              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.bikeName}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                        {rowData.bikeName}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="BikeName" sortable ></Column>

              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.userName}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                        {rowData.userName}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="User" sortable></Column>
              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.pickupLocation}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                        {rowData.pickupLocation}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="PickUp" sortable></Column>
              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.dropOffLocation}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                        {rowData.dropOffLocation}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="Drop" sortable></Column>
              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.startDate}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {rowData.startDate}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="StartDate" sortable style={{ width: '25%' }}
              />
              <Column
                body={(rowData) => (
                  <div>
                    <Tooltip title={rowData.endDate}>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {rowData.endDate}
                      </Typography>
                    </Tooltip>
                  </div>
                )}
                header="EndDate" sortable style={{ width: '25%' }}
              />
              <Column field='totalHours' header="Hours" sortable></Column>
              <Column field='status' header="Status" sortable></Column>
              <Column field='totalAmount' header="Total" sortable></Column>


            </DataTable>
                {
                  viewBike
                      ?
                      <ViewBikeModal
                        open={viewBike}
                        bikeImage={bikeImage}
                        onClose={(e) => setViewBike(false)}
                       />
                        : ""
                    }
          </Container>
        </Box>

      </Box>
    </>
  )
}

export default ViewBookedBike
