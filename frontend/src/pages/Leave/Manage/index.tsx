import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../../common/Loader";
import Button from "../../../common/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import routes from "../../../router/routes";
import { useGetLeaveTypes } from "../../../api/leaves/useLeaves";

const Manage = () => {
  const { data, isLoading } = useGetLeaveTypes();
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
    },
    {
      field: "label",
      headerName: "Label",
      minWidth: 150,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 400,
    },
    {
      field: "allowedDays",
      headerName: "Allowed Days",
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
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
        <Typography variant="h6">All Leave Types</Typography>
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

export default Manage;
