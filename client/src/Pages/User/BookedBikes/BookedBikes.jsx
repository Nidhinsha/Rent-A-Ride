import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { userGetBookedBikeAction } from '../../../Redux/Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar/NavBar';
import { Container } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function BookedBikes() {
  const theme = useTheme();

  const userId = JSON.parse(localStorage.getItem("userInfo")).id
  const bookedBike = useSelector((state) => state.userGetBookedBikeReducer.bookedBikeData)
  console.log('boked data in c', bookedBike);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userGetBookedBikeAction(userId))
  }, [])


  return (
    <>
      <NavBar />
      {/* <div> */}
      <Container maxWidth="lg">
        <Container >
        <Typography variant='h5'>Booked Bikes</Typography>
        </Container>
        <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>


          <DataTable value={bookedBike} className="p-d-flex p-jc-center"  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
          <Column field="photo" header="Photo" body={(rowData) => <img src={rowData.photo} alt="User" style={{
                width: '5rem',
                height:'5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: '30%',
              }} />} />
            <Column field="bikeName" header="bikeName" sortable style={{ width: '25%' }}></Column>
            <Column field="description" header="description" sortable style={{ width: '25%' }}></Column>
            <Column field="pickupLocation" header="pickUp " sortable style={{ width: '25%' }}></Column>
            <Column field="dropOffLocation" header="dropOff" sortable style={{ width: '25%' }}></Column>
            <Column field="startDate" header="Start Date" sortable style={{ width: '25%' }}
             body={(rowData) => rowData.bookedTimeSlots.startDate} />
            <Column field="endDate" header="End Date" sortable style={{ width: '25%' }}
             body={(rowData) => rowData.bookedTimeSlots.endDate} />
            {/* </Column> */}

            <Column field="needHelmet" header="Helmet" sortable style={{ width: '25%' }}></Column>
            <Column field="totalHours" header="Hours" sortable style={{ width: '25%' }}></Column>
            <Column field="totalAmount" header="Amount" sortable style={{ width: '25%' }}></Column>
            {/* <Column
                body={(rowData) => (
                  <>
                    {rowData.status ? (
                      <Button label="Block" severity="danger" outlined className="my-button" onClick={() => handleBlockUser(rowData._id)} />
                    ) : (
                      <Button label="Unblock" severity="success" outlined className="my-button" onClick={() => handleBlockUser(rowData._id)} />
                    )}
                  </>
                )}
              /> */}

          </DataTable>
        </Container>

      </Container>
    </>
  )
}

export default BookedBikes
