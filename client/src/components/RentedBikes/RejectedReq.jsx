import React, { useState } from 'react'
import ViewBikeModal from '../Modal/ViewBikeModal'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Box, Tooltip, Typography } from '@mui/material'
import { Button } from 'primereact/button'
import NoData from '../Error/NoData'

function RejectedReq({rejectedReq}) {
   

    const [viewBike, setViewBike] = useState(false)
    const [bikeImage, setBikeImage] = useState([])

  return (
    <>
    {
        rejectedReq?.length >0 ?
       <DataTable value={rejectedReq} className="p-d-flex p-jc-center" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
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
                    sortable ></Column>
                <Column header="bikeModel"
                    body={(rowData) => (
                        <div>
                            <Tooltip title={rowData.bikeModel}>
                                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                    {rowData.bikeModel}
                                </Typography>
                            </Tooltip>
                        </div>
                    )}
                    sortable ></Column>
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
                    header="Brand" sortable ></Column>
                <Column
                    body={(rowData) => (
                        <div>
                            <Tooltip title={rowData.description}>
                                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50px' }}>
                                    {rowData.description}
                                </Typography>
                            </Tooltip>
                        </div>
                    )}
                    header="Description" sortable ></Column>
                <Column field="price" header="Price" sortable ></Column>
                <Column field="status" header="Status" sortable ></Column>

            </DataTable>
            :  <Box display="flex" justifyContent="center"><NoData/></Box> 

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
    </>
  )
}

export default RejectedReq
