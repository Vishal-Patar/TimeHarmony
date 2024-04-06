import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import { useGetUsers } from '../../api/users/useGetUsers';

const columns: GridColDef[] = [
    {
        field: 'username',
        headerName: 'User Name',
        // width: 150,
        editable: true,
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
];

const Users = () => {
    const { data, isLoading, isError } = useGetUsers()

    if (isLoading) return "loadin..."
    return (
        <Box>
            users
            {/* <DataGrid
                getRowId={(row) => row?._id ?? 0}
                loading={isLoading}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            /> */}
        </Box>
    )
}

export default Users