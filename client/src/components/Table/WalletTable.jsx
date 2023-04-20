
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { Box } from '@mui/material';

function WalletTable({ walletHistory }) {
    console.log(walletHistory, 'wallet data in wallet table');
    return (
        <Box sx={{mb:5}}>
            <DataTable value={walletHistory} tableStyle={{ minWidth: '60rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} resizableColumns showGridlines>

                <Column field="transactionType" header="transactionType" sortable></Column>
                 {/* <Column field={walletHistory.amountAdded ? "amountAdded" : "amountDeducted"} header="Amount" sortable /> */}
                 <Column field="amountAdded" header="Amount"
                  body={(rowData) => <span style={{ color: 'green',fontWeight:'bold' }}>+{rowData.amountAdded}</span>}
                   sortable ></Column>
              
                <Column field="Date" header="Date" sortable></Column>


            </DataTable>
        </Box>
    )
}

export default WalletTable
