import React, { useState } from 'react'
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';
import Button from '@mui/material/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EditCouponModal from '../Modal/EditCouponModal';
import { adminDeleteCouponAction } from '../../Redux/Actions/adminActions';
import { useDispatch } from 'react-redux';

function CouponTable({data}) {

    const dispatch = useDispatch()
    const [editModal,setEditModal] =useState(false)
    const [selectId,setSelectedId]=useState('')
   
    const handleDelete =(id)=>{
       dispatch(adminDeleteCouponAction(id))
    }
    return (
        <Box>
            <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>
                {
                    editModal ? <EditCouponModal couponId={selectId} open={editModal} onClose={() =>setEditModal(false)} /> : " "
                }
              
                    {
                         data ?

                            <DataTable value={data} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>

                                <Column field="couponName" header="Name" sortable></Column>
                                <Column field="couponCode" header="Code" sortable></Column>
                                <Column field="couponPrice" header="Price" sortable></Column>
                                <Column header="Action" body={(rowData) => (
                                    <div>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                            <Button variant="contained" sx={{ mr: 3 }} onClick={(e) => {  
                                                setEditModal(true)  
                                                setSelectedId(rowData._id)
                                                } } 
                                                >Edit</Button>
                                            {/* <EditLocationModal locationId={locationId} open={editModalOpen} onClose={() => setEditModalOpen(false)} /> */}
                                            <Button variant="contained" color="error" onClick={() => handleDelete(rowData._id)}>Delete</Button>
                                        </Box>

                                    </div>
                                )} />

                            </DataTable>
                            : "No location data available"
                    }
            </Container>
        </Box>
    )
}

export default CouponTable
