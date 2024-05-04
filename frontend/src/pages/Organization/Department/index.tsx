import React from "react";
import { useDeleteDepartment, useGetDepartments } from "../../../api/departments/useDepartments";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../../common/Loader";
import AddIcon from "@mui/icons-material/Add";
import useCheckAccess from "../../../helper/useCheckAccess";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../router/routes";
import DeleteButton from "../../../common/DeleteButton";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";

const SECTION_ID = 9;

const Department = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { data, isLoading } = useGetDepartments();
  const { mutateAsync, isPending } = useDeleteDepartment();

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`${routes.employeeDepartment()}/${id}/edit`);
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
        <Link to={`${routes.employeeDepartment()}/${params.row._id}`}>
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
        <Typography variant="h6">All Departments</Typography>
        {hasWriteAccess && (
          <Button
            component={Link}
            to={routes.employeeDepartmentAdd()}
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

export default Department;
