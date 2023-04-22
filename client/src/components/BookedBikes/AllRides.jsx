import { Button, Container, Tooltip, Typography } from '@mui/material'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import CancelRideModal from '../Modal/CancelRideModal'
import EndRideModal from '../Modal/EndRideModal'

function AllRides({ data }) {

    const userId = JSON.parse(localStorage.getItem("userInfo")).id

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
            <Column field="photo" header="Photo" body={(rowData) => <img src={rowData?.photo[0]} alt="User" style={{
                width: '5rem',
                height: '5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: '30%',
            }} />} />
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
