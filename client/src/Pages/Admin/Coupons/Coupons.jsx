import React from 'react'
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';
import Button from '@mui/material/Button';
import SideBar from '../../../components/SideBar/SideBar';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Coupons() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar/>
          <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
          <DrawerHeader />
          <Container sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

<Box >
    <h2>
        Add Coupon
    </h2>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 3 }}>
    <Button
        // onClick={addLocation}
        variant='contained'
    >add Coupon</Button>
    {/* <AddLocationModal open={open} onClose={() => setOpen(false)} /> */}

</Box>

<Box>
    <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

        {/* <div className="card"> */}
        {/* {
            location ?

                <DataTable value={location} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>

                    <Column field="location" header="Model" sortable></Column>
                    <Column header="Action" body={(rowData) => (
                        <div>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                <Button variant="contained" sx={{ mr: 3 }} onClick={() => handleEdit(rowData._id)}>Edit</Button>
                                <EditLocationModal locationId={locationId} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
                                <Button variant="contained" color="error" onClick={() => handleDelete(rowData._id)}>Delete</Button>
                            </Box>

                        </div>
                    )} />

                </DataTable>
                : "No location data available"
        } */}
    </Container>
</Box>

</Container>
          </Box>
    </Box>
  )
}

export default Coupons
