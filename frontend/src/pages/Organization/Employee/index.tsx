import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../../common/Loader";
import { useGetEmployees } from "../../../api/employees/useEmployees";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../router/routes";
import useCheckAccess from "../../../helper/useCheckAccess";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";

const SECTION_ID = 7;

const Employee = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);

  const { data, isLoading } = useGetEmployees();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`${routes.employee()}/${id}/edit`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`${routes.employee()}/${params.row?._id}`}>
          {params.row?.name}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.user?.email || "N/A",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (params) => params.row.department?.label || "N/A",
    },
    {
      field: "designation",
      headerName: "Desgination",
      flex: 1,
      valueGetter: (params) => params.row.designation?.label || "N/A",
    },
    {
      field: "reportingManager",
      headerName: "Reporting Manager",
      flex: 1,
      renderCell: (params) =>
        params.row.reportingManager?.name ? (
          <Link to={`${routes.employee()}/${params.row.reportingManager?._id}`}>
            {params.row.reportingManager?.name}
          </Link>
        ) : (
          "N/A"
        ),
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
            aria-label="edit"
            onClick={() => handleEdit(params.row._id)}
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
        <Typography variant="h6">All Employees</Typography>
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

export default Employee;
