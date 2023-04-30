import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminUserFetchAction } from "../../../Redux/Actions/adminActions";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import Loading from '../../../components/Loading/Loading';
import ErrorMessage from '../../../components/Alert/Error';
import SideBar from '../../../components/SideBar/SideBar'
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';
import { userBlockUnblockApi } from '../../../Api/Admin/ApiCalls';


function UserManage() {
  
  const dispatch = useDispatch();

  const adminUserDataList = useSelector((state) => state.adminUserFetchReducer);
  const { loading, adminUserData, adminUserDataError } = adminUserDataList;

  const handleBlockUser = (id) => {
    userBlockUnblockApi(id).then((data) => {
      localStorage.removeItem("userInfo")
      if (data) {
        dispatch(adminUserFetchAction())
      }
    })
  }

  useEffect(() => {
    dispatch(adminUserFetchAction())
  }, [])

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (

    <>
      <Box sx={{ display: 'flex' }}>

        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
          <DrawerHeader />

          <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>


            <DataTable value={adminUserData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
              <Column field="photo" header="Photo" body={(rowData) => <img src={rowData.photo} alt="User" style={{
                width: '5rem',
                height:'5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: '30%',
              }} />} />
              <Column field="firstName" header="firstName" sortable style={{ width: '25%' }}></Column>
              <Column field="lastName" header="lastName" sortable style={{ width: '25%' }}></Column>
              <Column field="email" header="Email" sortable style={{ width: '25%' }}></Column>
              <Column field="phone" header="Phone" sortable style={{ width: '25%' }}></Column>
              <Column field="status" header="Status" sortable style={{ width: '25%' }}></Column>
              <Column
                body={(rowData) => (
                  <>
                    {rowData.status ? (
                      <Button label="Block" severity="danger" outlined className="my-button" onClick={() => handleBlockUser(rowData._id)} />
                    ) : (
                      <Button label="Unblock" severity="success" outlined className="my-button" onClick={() => handleBlockUser(rowData._id)} />
                    )}
                  </>
                )}
              />

            </DataTable>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default UserManage;

