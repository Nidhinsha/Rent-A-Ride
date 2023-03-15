import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminBlockUserAction, adminLogOut, adminUserFetchAction } from "../../../Redux/Actions/adminActions";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

function UserManage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayUsers = useSelector((state) => state.adminUserFetch);
  const { loading, error, adminUserData } = displayUsers;

  console.log(adminUserData ? adminUserData : 'No user data available');
  console.log(adminUserData, '||||||||');

  const adminBlock = useSelector((state)=>state.adminUserBlock)
  const {blockLoading,blockError,blockUserData} = adminBlock

  const [users, setUsers] = useState([]);
  console.log(users, ';;;;;');

  useEffect(() => {
    let adminData = localStorage.getItem("adminInfo");
    if (adminData != null) {
      dispatch(adminUserFetchAction());
      setUsers(adminUserData)
    } else {
      navigate("/admin/login");
    }
  }, [dispatch]);

  const OnAdminLogOut = () => {
    dispatch(adminLogOut());
    navigate("/admin");
  };


  const handleBlockUser = (id) => {
    dispatch(adminBlockUserAction(id))
  }

  // const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  // const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <div className="card">

      <Button icon="pi pi-user" rounded severity="info" aria-label="User" onClick={OnAdminLogOut} />

      <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="photo" header="Photo" body={(rowData) => <img src={rowData.photo} alt="User" height="50" />} />
        <Column field="firstName" header="firstName" sortable style={{ width: '25%' }}></Column>
        <Column field="lastName" header="lastName" sortable style={{ width: '25%' }}></Column>
        <Column field="email" header="Email" sortable style={{ width: '25%' }}></Column>
        <Column field="phone" header="Phone" sortable style={{ width: '25%' }}></Column>
        <Column field="status" header="Status" sortable style={{ width: '25%' }}></Column>
        <Column
          body={(rowData) => (
            <Button label="unBlock" severity="success" outlined className="my-button" onClick={() => handleBlockUser(rowData._id)} />
          )}
        />
       
      </DataTable>
    </div>
  );
}


export default UserManage;
