import { Box, Typography } from '@mui/material';
import Loader from '../../common/Loader';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import useCheckAccess from '../../helper/useCheckAccess';
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import { Link } from 'react-router-dom';
import routes from '../../router/routes';
import { useGetReportingEmployees } from '../../api/employees/useEmployees';

const SECTION_ID = 5;
const ReportingEmployeeList = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { data, isLoading } = useGetReportingEmployees(employee?._id);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.employee()}/${params.row?._id}`}>
          {params.row?.name}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.user?.email || "N/A",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (params) => params.row.department?.label || "N/A",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      valueGetter: (params) => params.row.designation?.label || "N/A",
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
            color: params.row.status ? "green" : "red",
          }}
        >
          <Box
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: params.row.status ? "green" : "red",
              marginRight: 5,
            }}
          />
          {params.row.status ? "Active" : "Inactive"}
        </Box>
      ),
    },
  ];


  if (!hasReadAccess) return <UnauthorizedAccessCard />;

  if (isLoading) return <Loader />;

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
        <Typography variant="h6">Employees Reporting To You</Typography>
      </Box>
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

export default ReportingEmployeeList


