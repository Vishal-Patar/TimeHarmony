import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import dayjs from 'dayjs';
import React from 'react'
import useCheckAccess from '../../helper/useCheckAccess';
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import { useGetAllAttendance } from '../../api/attendance/useAttendance';
import theme from '../../theme';
import { Link } from 'react-router-dom';
import routes from '../../router/routes';

const SECTION_ID = 3;
const AllAttendance = () => {
  const { hasReadAccess } = useCheckAccess(SECTION_ID);
  const { data, isFetching } = useGetAllAttendance();

  const columns: GridColDef[] = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.employee()}/${params.row?._id}`}>
          {params.row?.employee?.name}
        </Link>
      ),
    },
    {
      field: "checkIn",
      headerName: "Check In",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant='body1'
          sx={{
            color: theme?.palette?.success?.main
          }}>
          {dayjs(params?.row?.checkIn)?.format('DD-MM-YYYY HH:mm:ss')}
        </Typography>
      ),
    },
    {
      field: "checkOut",
      headerName: "Check Out",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant='body1'
          sx={{
            color: theme?.palette?.warning?.main
          }}>
          {params?.row?.checkOut ? dayjs(params?.row?.checkOut)?.format('DD-MM-YYYY HH:mm:ss') : '...'}
        </Typography>
      ),
    },
  ];

  if (!hasReadAccess) return <UnauthorizedAccessCard />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Attendance History</Typography>
      </Box>
      <DataGrid
        getRowId={(row) => row?._id ?? 0}
        loading={isFetching}
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
        autoHeight
      />
    </Box>
  )
}

export default AllAttendance