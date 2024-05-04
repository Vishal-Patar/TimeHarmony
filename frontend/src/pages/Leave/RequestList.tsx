import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';
import routes from '../../router/routes';
import useCheckAccess from '../../helper/useCheckAccess';
import { useGetAppliedRequests } from '../../api/leaves/useLeaves';
import dayjs from 'dayjs';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import { status } from './helper';

const SECTION_ID = 4;
const RequestList = () => {
    const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
    const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
    const { data, isLoading } = useGetAppliedRequests(employee?._id);

    const columns: GridColDef[] = [
        {
            field: "leaveType",
            headerName: "Leave Type",
            flex: 1,
            valueGetter: (params) => params.row.leaveType.label,
        },
        {
            field: "startDate",
            headerName: "From",
            flex: 1,
            valueGetter: (params) => dayjs(params.row.startDate)?.format('DD-MM-YYYY'),
        },
        {
            field: "endDate",
            headerName: "To",
            flex: 1,
            valueGetter: (params) => dayjs(params.row.endDate)?.format('DD-MM-YYYY'),
        },
        {
            field: "reportingManagerId",
            headerName: "Manager",
            flex: 1,
            renderCell: (params) => (
                <Link to={`${routes.employee()}/${params.row?.reportingManagerId?._id}`}>
                    {params.row.reportingManagerId?.name}
                </Link>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: status[params.row.status]?.color
                    }}
                >
                    <Box
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: status[params.row.status]?.color,
                            marginRight: 5,
                        }}
                    />
                    {status[params.row.status]?.label}
                </Box>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        aria-label="edit"
                    // onClick={() => handleEdit(params.row._id)}
                    >
                        <EditIcon color="info" />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                    // onClick={() => handleEdit(params.row._id)}
                    >
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    if (!hasReadAccess) return <UnauthorizedAccessCard />;

    if (isLoading) return <Loader />;

    return (
        <Box my={4}>
            <Typography variant='h5' my={2}>
                Requests
            </Typography>
            <DataGrid
                getRowId={(row) => row?._id ?? 0}
                loading={isLoading}
                rows={data ?? []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                columnVisibilityModel={{
                    action: hasWriteAccess,
                }}
                autoHeight
            />
        </Box>
    )
}

export default RequestList