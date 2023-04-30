import { Box, Tooltip, Typography } from '@mui/material'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import ViewBikeModal from '../Modal/ViewBikeModal';
import { Button } from 'primereact/button';
import NoData from '../Error/NoData';

function CancelledRides({ data }) {

    const cancelledRides = data?.filter((ride) => ride?.status === "cancelled");
    const [viewBike, setViewBike] = useState(false)
    const [bikeImage, setBikeImage] = useState([])

    return (
        <>

            {
                cancelledRides?.length > 0 ?

                    <DataTable value={cancelledRides} className="p-d-flex p-jc-center" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
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

                        <ViewBikeModal open={viewBike} onClose={() => setViewBike(false)} />

                        <Column header="bikeName"
                            body={(rowData) => (
                                <div>
                                    <Tooltip title={rowData.bikeName}>
                                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                            {rowData.bikeName}
                                        </Typography>
                                    </Tooltip>
                                </div>
                            )}
                            sortable style={{ width: '25%' }}></Column>
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
                            header="pickUp" sortable style={{ width: '25%' }}></Column>
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
                            header="dropOff" sortable style={{ width: '25%' }}></Column>
                        <Column header="StartDate"
                            body={(rowData) => (
                                <div>
                                    <Tooltip title={rowData.startingTime}>
                                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>
                                            {rowData.startingTime}
                                        </Typography>
                                    </Tooltip>
                                </div>
                            )}
                            sortable style={{ width: '25%' }}
                        />
                        <Column
                            body={(rowData) => (
                                <div>
                                    <Tooltip title={rowData.endingTime}>
                                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80px' }}>
                                            {rowData.endingTime}
                                        </Typography>
                                    </Tooltip>
                                </div>
                            )}
                            header="EndDate" sortable style={{ width: '25%' }}
                        />
                        {/* </Column> */}

                        <Column field="needHelmet" header="Helmet" sortable style={{ width: '25%' }}></Column>
                        <Column field="totalHours" header="Hours" sortable style={{ width: '25%' }}></Column>
                        <Column field="totalAmount" header="Amount" sortable style={{ width: '25%' }}></Column>

                    </DataTable>
                    : <Box display="flex" justifyContent="center"><NoData /></Box>
            }

            {/* modal */}

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
        </>
    )
}

export default CancelledRides
