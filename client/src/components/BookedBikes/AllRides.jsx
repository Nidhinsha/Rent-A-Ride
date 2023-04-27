import { Container, Tooltip, Typography } from '@mui/material'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import React, { useState } from 'react'
import CancelRideModal from '../Modal/CancelRideModal'
import EndRideModal from '../Modal/EndRideModal'
import ViewBikeModal from '../Modal/ViewBikeModal'

function AllRides({ data }) {

    const userId = JSON.parse(localStorage.getItem("userInfo")).id

    const [viewBike, setViewBike] = useState(false)
    const [bikeImage,setBikeImage] = useState([])
    const [cancelRide, setCancelRide] = useState(false)
    const [endRide, setEndRide] = useState(false)
    const [selectedBike, setSelectedBike] = useState("")
    const [selectedBooking, setSelectedBooking] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [price, setPrice] = useState('')

    return (
        <>
            <DataTable value={data} className="p-d-flex p-jc-center" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
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

                    <ViewBikeModal open={viewBike} onClose={()=> setViewBike(false)}/>

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

                <Column
                    header="Actions"
                    body={(rowData) => (
                        <>
                            {
                                rowData.status === "booked" ?
                                    <Button
                                        onClick={(e) => {
                                            setCancelRide(true)
                                            setSelectedBike(rowData.bikeId)
                                            setSelectedBooking(rowData._id)
                                            setStartTime(rowData.startingTime)
                                            setEndTime(rowData.endingTime)
                                            setPrice(rowData.totalAmount)

                                        }}
                                    >cancel ride</Button>
                                    :
                                    rowData.status === "onRide" ?

                                        <Button
                                            onClick={(e) => {
                                                setEndRide(true)
                                                setSelectedBike(rowData.bikeId)
                                                setSelectedBooking(rowData._id)
                                                setStartTime(rowData.startingTime)
                                                setEndTime(rowData.endingTime)
                                                setPrice(rowData.totalAmount)
                                            }}
                                        >end ride</Button>

                                        : ""

                            }
                        </>
                    )}
                    sortable style={{ width: '25%' }}
                />
            </DataTable>


            {/* Modal  */}

            {
                viewBike 
                    ? 
                    <ViewBikeModal
                        open={viewBike}
                        bikeImage={bikeImage}
                        onClose={(e) => setViewBike(false)}
                    />
                    :""
            }

            {
                cancelRide ?
                    <CancelRideModal
                        open={cancelRide}
                        bikeId={selectedBike}
                        bookingId={selectedBooking}
                        userId={userId}
                        startTime={startTime}
                        endTime={endTime}
                        price={price}
                        onClose={(e) => setCancelRide(false)}
                    /> : ""
            }
            {
                endRide ?
                    <EndRideModal
                        bikeId={selectedBike}
                        bookingId={selectedBooking}
                        userId={userId}
                        startTime={startTime}
                        endTime={endTime}
                        price={price}
                        open={endRide}
                        onClose={(e) => setEndRide(false)}
                    /> : ""
            }
        </>
    )
}

export default AllRides
