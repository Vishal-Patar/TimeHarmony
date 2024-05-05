import React from "react";
import { useDeleteDepartment, useGetDepartments } from "../../../api/departments/useDepartments";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../../common/Loader";
import AddIcon from "@mui/icons-material/Add";
import useCheckAccess from "../../../helper/useCheckAccess";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../router/routes";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";
import ConfirmationButton from "../../../common/ConfirmationButton";

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

          <ConfirmationButton
            onConfirm={() => handleDelete(params.row._id)}
            loading={isPending}
          >
            <GridDeleteIcon color="error" />
          </ConfirmationButton>
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
          alignItems: "center",
          flexDirection: ['column-reverse', 'row'],
          gap: 1,
          justifyContent: 'space-between',
          marginBottom: 1
        }}
      >
        <Typography variant="h6" alignSelf={'flex-start'}>All Departments</Typography>
        {hasWriteAccess && (
          <Button
            component={Link}
            to={routes.employeeDepartmentAdd()}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              alignSelf: 'flex-end'
            }}
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
