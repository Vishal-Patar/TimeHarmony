import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../common/Loader";
import Button from "../../../common/Button";
import AddIcon from "@mui/icons-material/Add";
import { useGetEmployees } from "../../../api/employees/useEmployees";
import { useNavigate } from "react-router-dom";
import routes from "../../../router/routes";

const Employee = () => {
  const { data, isLoading } = useGetEmployees();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(routes.employee() + "/" + id);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 400,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row._id)}
          >
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
        <Typography variant="h6">All Employees</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
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

export default Employee;
