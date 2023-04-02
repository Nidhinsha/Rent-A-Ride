import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminDeleteBikeAction, adminGetAllBikeAction } from '../../../Redux/Actions/adminActions';
import SideBar from '../../../components/SideBar/SideBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';


function ViewBike() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bikes = useSelector((state) => state.adminGetAllBikeReducer)

  const { bikeDataLoading, bikeData, bikeDataError } = bikes
  // console.log(bikeData,'bike data');

  useEffect(() => {
    dispatch(adminGetAllBikeAction())
  }, [])

  const handleEdit =()=>{
    console.log('edit');
  }

  const handleDelete =(id)=>{
    dispatch(adminDeleteBikeAction(id))
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const statusBodyTemplate = (bikeData) => {
    return <Tag value={bikeData.status} severity={getSeverity(bikeData)}></Tag>;
  };

  const getSeverity = (bikeData) => {
    switch (bikeData.status) {
      case 'accepted':
        return 'success';

      case 'pending':
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
          <DataTable value={bikeData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
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
            <Column field='price' header="price" sortable></Column>
            <Column field='assured' header="assured" sortable ></Column>
            <Column field='status' header="status" body={statusBodyTemplate} sortable ></Column>
            <Column header="Action" body={(rowData) => (
              <div>
                <i className="pi pi-file-edit" style={{ fontSize: '1.5rem',marginRight: '5px',color:'blue'  }}
                onClick={()=> handleEdit(rowData._id)} ></i>
                <i className="pi pi-times" style={{ fontSize: '1.5rem',marginRight: '5px' ,color:'red' }}
                onClick={()=> handleDelete(rowData._id)}></i>
              </div>
            )} />

          </DataTable>
        </Container>
      </Box>
    </Box>


  )
}

export default ViewBike
