import React, { useEffect, useState } from 'react'
import { Container } from '@mantine/core';
import { Box, styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Button from '@mui/material/Button';
import AddLocationModal from '../../../components/Modal/AddLocationModal';
import { useDispatch, useSelector } from 'react-redux';
import { adminDeleteLocation, adminGetLocation } from '../../../Redux/Actions/adminActions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EditLocationModal from '../../../components/Modal/EditLocationModal';


function Location() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const [open, setOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [locationId, setLocationId] = useState('')
   

    const dispatch = useDispatch()

    const locationData = useSelector((state) => state.adminGetLocationReducer?.location)

    const addLocation = () => {
        setOpen(true)
    }


    const handleEdit = (id) => {
        setEditModalOpen(true);
        setLocationId(id)
      
    }
    const handleDelete = (id) => {
        dispatch(adminDeleteLocation(id))
    }

    useEffect(() => {
        dispatch(adminGetLocation())
    }, [dispatch,open,editModalOpen])

    return (
        <Box sx={{ display: 'flex' }}>

            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                <DrawerHeader />

                <Container sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    <Box >
                        <h2>
                            Add Location
                        </h2>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 3 }}>
                        <Button
                            onClick={addLocation}
                            variant='contained'
                        >add location</Button>
                        <AddLocationModal open={open} onClose={() => setOpen(false)} />

                    </Box>

                    <Box>
                        <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                            {/* <div className="card"> */}
                            {
                                locationData ?

                                    <DataTable value={locationData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>

                                        <Column field="location" header="Location" sortable></Column>
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
                            }
                        </Container>
                    </Box>

                </Container>
            </Box>
        </Box>
      

    )
}

export default Location
