import React, { useEffect, useState } from 'react'
import { Container } from '@mantine/core';
import { Box, styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import BasicModal from '../../../components/BasicModal/BasicModal';
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

    const [open, setOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [locationId,setLocationId] = useState('')

    const dispatch = useDispatch()
    // const [location,setLocation] = useState('')

    const location = useSelector((state) => state.adminGetLocationReducer.location)
    console.log(location, 'location data ');

   

    const addLocation = () => {
        setOpen(true)
    }

    
    const handleSubmit = () => {
        console.log('hi')
    }
    const handleEdit =(id)=>{
        // dispatch()
        setEditModalOpen(true);
        setLocationId(id)
        console.log('edit',id);
    }
    const handleDelete =(id)=>{
        dispatch(adminDeleteLocation(id))
        console.log('delete');
    }

    useEffect(() => {
        dispatch(adminGetLocation())
    }, [dispatch,open,editModalOpen])


    return (
        <Box sx={{ display: 'flex' }}>

            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                <DrawerHeader />

                <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    <Box
                        sx={{

                            backgroundColor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >
                        <h2>
                            Add Location
                        </h2>
                    </Box>
                    <Box>
                        <Button
                            onClick={addLocation}>add location</Button>
                        <AddLocationModal open={open} onClose={() => setOpen(false)} />

                    </Box>

                    <Box>
                        <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                            {/* <div className="card"> */}
                            <DataTable value={location} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
                               
                                <Column field="location" header="Model" sortable></Column>
                                <Column header="Action" body={(rowData) => (
                                    <div>
                                        <Box>

                                        <Button variant="contained"  onClick={() => handleEdit(rowData._id)}>Edit</Button>
                                        <EditLocationModal locationId={locationId} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
                                        </Box>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(rowData._id)}>Delete</Button>
                                       
                                    </div>
                                )} />

                            </DataTable>
                        </Container>
                    </Box>

                </Container>
            </Box>
        </Box>
    )
}

export default Location
