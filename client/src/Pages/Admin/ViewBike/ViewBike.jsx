import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminDeleteBikeAction, adminGetAllBikeAction } from '../../../Redux/Actions/adminActions';
import SideBar from '../../../components/SideBar/SideBar';
import ViewBikeModal from '../../../components/Modal/ViewBikeModal'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Box, Tooltip, Typography, styled } from '@mui/material'
import { Container } from '@mantine/core';


function ViewBike() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [viewBike, setViewBike] = useState(false)
    const [bikeImage,setBikeImage] = useState([])

  const bikes = useSelector((state) => state.adminGetAllBikeReducer)

  const { bikeDataLoading, bikeData, bikeDataError } = bikes

  useEffect(() => {
    dispatch(adminGetAllBikeAction())
  }, [])


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

        <Typography variant='h5'>View Bikes</Typography>
        <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

          {/* <div className="card"> */}
          <DataTable value={bikeData} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>
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
                <i className="pi pi-file-edit" style={{ fontSize: '1.5rem',marginRight: '5px',color:'blue'  }}
                onClick={(e)=> {
                  navigate('/admin/edit-bike',{state:{bikeData:rowData}})
                }} ></i>
                <i className="pi pi-times" style={{ fontSize: '1.5rem',marginRight: '5px' ,color:'red' }}
                onClick={()=> handleDelete(rowData._id)}></i>
              </div>
            )} />

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
        </Container>
      </Box>
    </Box>


  )
}

export default ViewBike
