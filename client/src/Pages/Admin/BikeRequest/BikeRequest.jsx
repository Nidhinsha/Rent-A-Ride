import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../components/SideBar/SideBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Box, CircularProgress, styled } from '@mui/material'
import { Container } from '@mantine/core';


import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { adminAcceptBikeAction, adminGetPendingBikeAction, adminRejectBikeAction } from '../../../Redux/Actions/adminActions';
function BikeRequest() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [pendingData, setPendingData] = useState([])
    const pendingDataList = useSelector((state) => state.adminRentRequestBikeReducer)
    const { loading, bikeRequestData, bikeRequestDataError } = pendingDataList
    console.log('pendign data selector', pendingDataList);


    // accept and reject bikes

    const handleAccept = (id) => {
        // Handle accept logic here

        dispatch(adminAcceptBikeAction(id))
        // console.log("Accepted", id);

    };

    const handleReject = (id) => {
        // Handle reject logic here
        dispatch(adminRejectBikeAction(id))
        console.log("Rejected", id);
    };

    useEffect(() => {
        dispatch(adminGetPendingBikeAction())
    }, [dispatch])



    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const statusBodyTemplate = (bikeRequestData) => {
        return <Tag value={bikeRequestData.status} severity={getSeverity(bikeRequestData)}></Tag>;
    };

    const getSeverity = (bikeRequestData) => {
        switch (bikeRequestData.status) {
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

    const toast = useRef(null);

    const acceptToast = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirm1 = (id) => {
        confirmPopup({
            // target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleAccept(id), acceptToast,
            reject
        });
    };

    const confirm2 = (id) => {
        confirmPopup({
            // target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => handleReject(id),
            reject
        });
    };




    return (

        <Box sx={{ display: 'flex' }}>

            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                <DrawerHeader />

                <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    {loading ? (
                        <CircularProgress />
                    ) : (

                        <DataTable value={bikeRequestData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
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
                                    <Toast ref={toast} />
                                    <ConfirmPopup />
                                    <Button label="Accept" className="p-button-success p-mr-2" onClick={() => confirm1(rowData._id)} />
                                    <Button label="Reject" className="p-button-danger" onClick={() => confirm2(rowData._id)} />
                                </div>
                            )} />
                        </DataTable>
                    )
                    }
                </Container>
            </Box>
        </Box>
    )
}

export default BikeRequest
