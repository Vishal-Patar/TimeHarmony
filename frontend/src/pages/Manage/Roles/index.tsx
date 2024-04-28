import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../../common/Loader";
import Button from "../../../common/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../../router/routes";
import { useDeleteRole, useGetRoles } from "../../../api/roles/useRoles";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "../../../common/DeleteButton";

const Roles = () => {
  const { data, isLoading } = useGetRoles();
  const { mutateAsync, isPending } = useDeleteRole();

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`${routes.manageRoles()}/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    await mutateAsync({
      id,
    });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.manageRoles()}/${params.row._id}`}>
          {params?.row?.name}
        </Link>
      ),
    },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row._id)}
          >
            <EditIcon color="info" />
          </IconButton>

          <DeleteButton
            onDelete={() => handleDelete(params.row._id)}
            loading={isPending}
            disabled={
              params.row?.name === "employee" ||
              params.row?.name === "super-admin" ||
              params.row?.name === "admin"
            }
          />
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
        <Typography variant="h6">All Roles</Typography>
        <Button
          onClick={() => {
            navigate(`${routes.manageRoles()}/add`);
          }}
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
  );
};

export default Roles;
