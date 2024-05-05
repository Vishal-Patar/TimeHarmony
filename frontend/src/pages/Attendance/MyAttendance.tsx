import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import dayjs from 'dayjs';
import React from 'react'
import useCheckAccess from '../../helper/useCheckAccess';
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import { useGetAttendance } from '../../api/attendance/useAttendance';
import theme from '../../theme';

const SECTION_ID = 2;
const MyAttendance = () => {
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { hasReadAccess } = useCheckAccess(SECTION_ID);
  const { data, isFetching } = useGetAttendance(employee?._id);

  const columns: GridColDef[] = [
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
          {dayjs(params?.row?.checkIn)?.format('DD-MM-YYYY HH:MM')}
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
          {params?.row?.checkOut ? dayjs(params?.row?.checkOut)?.format('DD-MM-YYYY HH:MM') : '...'}
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

export default MyAttendance