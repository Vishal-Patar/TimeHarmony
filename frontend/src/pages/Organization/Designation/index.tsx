import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../../common/Loader";
import AddIcon from "@mui/icons-material/Add";
import { useGetDesignations } from "../../../api/designations/useDesingations";
import useCheckAccess from "../../../helper/useCheckAccess";
import DeleteButton from "../../../common/DeleteButton";
import routes from "../../../router/routes";
import { Link } from "react-router-dom";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";

const SECTION_ID = 8;

const Designation = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { data, isLoading } = useGetDesignations();
  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Label",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
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
          <DeleteButton
            onDelete={() => {
              // handleDelete(params.row._id)
            }}
            // loading={isPending}
          />
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
        <Typography variant="h6">All Designations</Typography>
        {hasWriteAccess && (
          <Button
            component={Link}
            to={`${routes.employeeDepartment()}/add`}
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
        columnVisibilityModel={{
          action: hasWriteAccess,
        }}
        autoHeight
      />
    </Box>
  );
};

export default Designation;
