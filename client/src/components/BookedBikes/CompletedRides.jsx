import { Tooltip, Typography } from '@mui/material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'

function CompletedRides({data}) {

  const completedRides = data.filter((ride) => ride.status === "completed");

  if (completedRides.length === 0) {
    return <div>No canceled rides</div>
  }

  return (
    <>
      <DataTable value={completedRides} className="p-d-flex p-jc-center" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
            <Column field="photo" header="Photo" body={(rowData) => <img src={rowData.photo[0]} alt="User" style={{
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

        </DataTable>
    </>
  )
}

export default CompletedRides
