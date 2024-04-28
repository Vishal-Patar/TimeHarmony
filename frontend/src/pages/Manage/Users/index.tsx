import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../../common/Loader";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../../router/routes";
import { useGetUsers } from "../../../api/users/useUsers";
import { Link, useNavigate } from "react-router-dom";
import useCheckAccess from "../../../helper/useCheckAccess";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";

const SECTION_ID = 13;

const Users = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { data, isLoading } = useGetUsers();

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.manageUsers()}/${params.row?._id}`}>
          {params.row?.username}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (params) => params.row?.role?.label,
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
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() =>
              navigate(`${routes.manageUsers()}/${params.row?._id}/edit`)
            }
            aria-label="edit"
          >
            <EditIcon color="info" />
          </IconButton>
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
        <Typography variant="h6">All Users</Typography>
        {hasWriteAccess && (
          <Button
            component={Link}
            to={`${routes.manageUsers()}/add`}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add New
          </Button>
        )}
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
  );
};

export default Users;
