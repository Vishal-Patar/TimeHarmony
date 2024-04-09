import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../../common/Loader";
import Button from "../../../common/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "../../../common/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import routes from "../../../router/routes";
import { useGetUsers } from "../../../api/users/useUsers";

const Users = () => {
  const { data, isLoading } = useGetUsers();
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "User Name",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
      valueGetter: (params) => params.row?.role?.label,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: params.row.status === "active" ? "green" : "red",
          }}
        >
          <Box
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: params.row.status === "active" ? "green" : "red",
              marginRight: 5,
            }}
          />
          {params.row.status === "active" ? "Active" : "Inactive"}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => (
        <Box>
          <IconButton href={routes.editUser()} aria-label="edit">
            <EditIcon color="info" />
          </IconButton>
          <IconButton
            // onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

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
        <Button
          href={routes.createUser()}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add New
        </Button>
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
        // checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        style={{
          minHeight: 300,
        }}
      />
    </Box>
  );
};

export default Users;
