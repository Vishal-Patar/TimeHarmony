import React from "react";
import { useGetDepartments } from "../../../api/departments/useGetDepartments";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../common/Loader";
import Typography from "../../../common/Typography";
import Button from "../../../common/Button";
import AddIcon from "@mui/icons-material/Add";

const Department = () => {
  const { data, isLoading } = useGetDepartments();
  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Label",
      minWidth: 400,
    },
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
          <IconButton aria-label="edit">
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
        <Typography variant="h6">All Departments</Typography>
        <Button
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
        rows={data}
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

export default Department;
