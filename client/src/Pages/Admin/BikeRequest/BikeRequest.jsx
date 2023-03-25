import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminGetAllBikeAction } from '../../../Redux/Actions/adminActions';
import SideBar from '../../../components/SideBar/SideBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';
import { acceptBikeAPI, getPendingBikeAPI, rejectBikeAPI } from '../../../Api/Admin/ApiCalls';

function BikeRequest() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pendingData,setPendingData] = useState([])
    // console.log(bikeData,'bike data');

    useEffect(()=>{    
        getPendingBikeAPI().then((data)=>{
            setPendingData(data.data)
        })
    },[pendingData])

       // accept and reject bikes

       const handleAccept = (id) => {
        // Handle accept logic here
        acceptBikeAPI(id).then((id)=>{
            console.log(id,'data after updated');
        })
        console.log("Accepted", id);

    };
    
    const handleReject = (id) => {
        // Handle reject logic here
        rejectBikeAPI(id).then((data)=>{
            console.log("rejected data",data);
        })
        console.log("Rejected", id);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const statusBodyTemplate = (pendingData) => {
        return <Tag value={pendingData.status} severity={getSeverity(pendingData)}></Tag>;
    };

    const getSeverity = (pendingData) => {
        switch (pendingData.status) {
            case 'approved':
                return 'success';

            case 'disApproved':
                return 'warning';

            case 'rejected':
                return 'danger';

            default:
                return null;
        }
    };

 

    return (

        <Box sx={{ display: 'flex' }}>

            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                <DrawerHeader />

                <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    {/* <div className="card"> */}
                    <DataTable value={pendingData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
                        <Column field="bikeName" header="Name" sortable ></Column>
                        <Column field="photo" header="Photo" body={(rowData) => <img src={rowData.photo[0]} alt="User" style={{
                            width: '5rem',
                            height: '5rem',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            borderRadius: '30%',
                        }} />} />
                        <Column field="bikeModel" header="Model" sortable></Column>
                        <Column field="brand" header="Brand" sortable></Column>
                        <Column field="color" header="Color" sortable></Column>
                        <Column field="engineNumber" header="engineNumber" sortable ></Column>
                        <Column field='fuel' header="fuel" sortable></Column>
                        <Column field='price' header="Price" sortable></Column>
                        <Column field='assured' header="Assured" sortable ></Column>
                        <Column field='status' header="Status" body={statusBodyTemplate} sortable ></Column>
                        <Column header="Action" body={(rowData) => (
                            <div>
                                <Button label="Accept" className="p-button-success p-mr-2" onClick={() => handleAccept(rowData._id)} />
                                <Button label="Reject" className="p-button-danger" onClick={() => handleReject(rowData._id)} />
                            </div>
                        )} />

                    </DataTable>
                </Container>
            </Box>
        </Box>


    )
}

export default BikeRequest
