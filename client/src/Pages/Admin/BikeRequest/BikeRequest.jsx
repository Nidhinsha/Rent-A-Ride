import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../components/SideBar/SideBar';
import ViewBikeModal from '../../../components/Modal/ViewBikeModal'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Box, CircularProgress, Tooltip, Typography, styled } from '@mui/material'
import { Container } from '@mantine/core';


import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method

import { Toast } from 'primereact/toast';
import { adminAcceptBikeAction, adminGetPendingBikeAction, adminRejectBikeAction } from '../../../Redux/Actions/adminActions';
function BikeRequest() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [viewBike, setViewBike] = useState(false)
    const [bikeImage, setBikeImage] = useState([])

    // const [pendingData, setPendingData] = useState([])
    const pendingDataList = useSelector((state) => state.adminRentRequestBikeReducer)
    const { loading, bikeRequestData, bikeRequestDataError } = pendingDataList

    // accept and reject bikes
    const handleAccept = (id) => {
        // Handle accept logic here
        dispatch(adminAcceptBikeAction(id))
    };

    const handleReject = (id) => {
        // Handle reject logic here
        dispatch(adminRejectBikeAction(id))
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
                <Typography variant='h5'>Bikes Request</Typography>
                {/* modal */}
                <ViewBikeModal open={viewBike} onClose={() => setViewBike(false)} />

                <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    {loading ? (
                        <CircularProgress />
                    ) : (

                        <DataTable value={bikeRequestData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
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
                                header="Name" sortable ></Column>

                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.bikeModel}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.bikeModel}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="Model" sortable></Column>
                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.brand}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.brand}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="Brand" sortable></Column>
                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.color}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.color}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="Color" sortable></Column>
                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.engineNumber}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.engineNumber}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="engineNumber" sortable ></Column>
                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.fuel}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.fuel}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="fuel" sortable></Column>
                            <Column
                                body={(rowData) => (
                                    <div>
                                        <Tooltip title={rowData.price}>
                                            <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                                {rowData.price}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                )}
                                header="price" sortable></Column>
                            <Column field='assured'
                                header="assured" sortable ></Column>
                            <Column field='status' header="status" body={statusBodyTemplate} sortable ></Column>
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
    )
}

export default BikeRequest
