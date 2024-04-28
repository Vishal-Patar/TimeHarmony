import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import Loader from "../../../common/Loader";
import routes from "../../../router/routes";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetRoleById, useUpdateRoles } from "../../../api/roles/useRoles";
import { rolePermissions } from "./helper";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { ModeType } from "../../../types/common";

const Edit = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModeType>("add");
  const { data: role, isFetching } = useGetRoleById(
    mode === "add" || !id ? "" : id
  );
  const { mutateAsync, isPending } = useUpdateRoles();
  const [rows, setRows] = useState<any>(rolePermissions);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const readOnly = mode === "view";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && location?.pathname?.includes("edit")) {
      setMode("edit");
    } else if (id === "add") {
      setMode("add");
    } else {
      setMode("view");
    }
  }, [id, location?.pathname]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setRows(
      rows.map((row: { id: any }) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "section",
      headerName: "Section",
      width: 180,
    },
    {
      field: "readAccess",
      headerName: "Read Access",
      width: 180,
      type: "boolean",
      editable: !readOnly,
    },
    {
      field: "writeAccess",
      headerName: "Write Access",
      width: 180,
      type: "boolean",
      editable: !readOnly,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    if (role) {
      setValue("name", role.name);
      setValue("label", role.label);
      setRows(role.permissions);
    }
    setLoading(false);
  }, [role, setValue]);

  const onSubmit = async (data: any) => {
    await mutateAsync({
      id: role?._id,
      data: {
        ...data,
        permissions: rows,
      },
    });
    navigate(routes.manageRoles());
  };

  if (isFetching || loading) {
    return <Loader />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={() => navigate(-1)}>
            {mode === "view" ? "BacK" : "Cancel"}
          </Button>

          <Button
            variant="contained"
            color="success"
            type="submit"
            loading={isPending}
            disabled={mode === "view"}
            sx={{
              display: mode === "view" ? "none" : "block",
            }}
          >
            {mode === "edit" ? "Update" : "Save"}
          </Button>
        </Box>

        <TextField
          label="Name"
          margin="normal"
          fullWidth
          required
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors?.name?.message?.toString()}
          inputProps={{ readOnly }}
        />

        <TextField
          label="Label"
          margin="normal"
          fullWidth
          required
          {...register("label", { required: "Label is required" })}
          error={!!errors.label}
          helperText={errors?.label?.message?.toString()}
          inputProps={{ readOnly }}
        />
        <Box
          sx={{
            marginY: 2,
          }}
        >
          <Typography variant="h6" marginY={1}>
            Permissions
          </Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slotProps={{
              toolbar: {
                setRows,
                setRowModesModel,
                showQuickFilter: true,
              },
            }}
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
            }}
            style={{
              minHeight: 300,
            }}
            columnVisibilityModel={{
              actions: !readOnly,
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Edit;
