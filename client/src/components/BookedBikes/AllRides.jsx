import { Box, Tooltip, Typography } from '@mui/material'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import React, { useState } from 'react'
import CancelRideModal from '../Modal/CancelRideModal'
import EndRideModal from '../Modal/EndRideModal'
import ViewBikeModal from '../Modal/ViewBikeModal'
import NoData from '../Error/NoData'
import { useDispatch } from 'react-redux'
import { userPayFineAction } from '../../Redux/Actions/userActions'

function AllRides({ data }) {

    const dispatch = useDispatch()
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

    const handlePayFine =(bikeId,bookingId,startTime,endTime,price,photo,bikeName)=>{
       const fineData ={
        bikeId,
        bookingId,
        startTime,
        endTime,
        price,
        photo,
        bikeName
       }
       dispatch(userPayFineAction(fineData))
    }

    return (
        <>
        {
            data?.length > 0 ?
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
                    sortable ></Column>
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
                    header="pickUp" sortable ></Column>
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
                    header="dropOff" sortable ></Column>
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
                    sortable 
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
                    header="EndDate" sortable 
                />
                {/* </Column> */}

                <Column field="needHelmet" header="Helmet" sortable ></Column>
                <Column field="totalHours" header="Hours" sortable ></Column>
                <Column field="totalAmount" header="Amount" sortable ></Column>

                <Column
                    header="Actions"
                    body={(rowData) => (
                        <>
                            {
                                rowData.status === "booked" ?
                                    <Button
                                    className="p-button-raised p-button-danger"
                                    icon="pi pi-times"
                                        onClick={(e) => {
                                            setCancelRide(true)
                                            setSelectedBike(rowData.bikeId)
                                            setSelectedBooking(rowData._id)
                                            setStartTime(rowData.startingTime)
                                            setEndTime(rowData.endingTime)
                                            setPrice(rowData.totalAmount)

                                        }}
                                    >Cancel </Button>
                                    :
                                    rowData.status === "onRide" ?

                                        <Button
                                        className="p-button-raised p-button-danger"
                                        icon="pi pi-times"
                                            onClick={(e) => {
                                                setEndRide(true)
                                                setSelectedBike(rowData.bikeId)
                                                setSelectedBooking(rowData._id)
                                                setStartTime(rowData.startingTime)
                                                setEndTime(rowData.endingTime)
                                                setPrice(rowData.totalAmount)
                                            }}
                                        >end ride</Button>

                                        : 
                                        rowData.status === "time exceeded" ?

                                        <Button
                                            onClick={(e) => {
                                                handlePayFine(rowData.bikeId,
                                                    rowData._id,
                                                    rowData.startingTime,
                                                    rowData.endingTime,
                                                    rowData.totalAmount,
                                                    rowData.photo,
                                                    rowData.bikeName)
                                            }}
                                        >pay fine</Button>
                                        :"No Action"


                            }
                        </>
                    )}
                    sortable 
                />
            </DataTable>
            :<Box display="flex" justifyContent="center"><NoData/></Box>

        }


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
