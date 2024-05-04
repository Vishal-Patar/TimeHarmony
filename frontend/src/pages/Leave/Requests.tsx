import { ContactSupportOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useGetLeaveRequests } from '../../api/leaves/useLeaves';
import Loader from '../../common/Loader';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import useCheckAccess from '../../helper/useCheckAccess';
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import { Link } from 'react-router-dom';
import routes from '../../router/routes';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const SECTION_ID = 5;
const Requests = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { data, isLoading } = useGetLeaveRequests(employee?._id);

  const status: any = {
    pending: {
      color: 'orange',
      label: 'Pending'
    },
    approved: {
      color: 'green',
      label: 'Approved'
    },
    rejected: {
      color: 'red',
      label: 'Rejected'
    }
  }

  const columns: GridColDef[] = [
    {
      field: "employeeId",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.employee()}/${params.row?._id}`}>
          {params.row.employeeId.name}
        </Link>
      ),
    },
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
    },
    {
      field: "endDate",
      headerName: "To",
      flex: 1,
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
            <CloseOutlinedIcon color="error" />
          </IconButton>

          <IconButton
            aria-label="edit"
          // onClick={() => handleEdit(params.row._id)}
          >
            <DoneOutlinedIcon color="success" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!hasReadAccess) return <UnauthorizedAccessCard />;

  if (isLoading) return <Loader />;
  if (!isLoading && !data?.length) {
    return (
      <Box sx={{
        flex: 1
      }}>
        <NoLeaveRequestMessage />
      </Box>
    )
  }

  return (
    <Box>
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

export default Requests

const NoLeaveRequestMessage = () => {

  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ContactSupportOutlined sx={{ fontSize: 64, color: '#3f51b5' }} />
      <Box sx={{ mt: 2, fontSize: 24, fontWeight: 'bold', color: '#333' }}>
        No Leave Request Available!
      </Box>
    </Box>
  );
};


