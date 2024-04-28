import {
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetEmployeeById,
  useGetEmployees,
  useUpdateEmployee,
} from "../../../api/employees/useEmployees";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../common/Button";
import { useGetDesignations } from "../../../api/designations/useDesingations";
import { useGetDepartments } from "../../../api/departments/useDepartments";
import routes from "../../../router/routes";
import Loader from "../../../common/Loader";
import { ModeType } from "../../../types/common";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModeType>("view");
  const location = useLocation();
  const readOnly = mode === "view";

  const { data: employee, isFetching } = useGetEmployeeById(id ?? "");
  const { mutateAsync, isPending } = useUpdateEmployee();
  const { data: designationList, isFetching: desingationFetching } =
    useGetDesignations();
  const { data: departmentList, isFetching: departmentFetching } =
    useGetDepartments();
  const { data: employeeList, isFetching: employeeFetching } =
    useGetEmployees();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id && location?.pathname?.includes("edit")) {
      setMode("edit");
    } else if (id === "add") {
      setMode("add");
    } else {
      setMode("view");
    }
  }, [id, location?.pathname]);

  useEffect(() => {
    setLoading(true);
    if (employee) {
      setValue("name", employee.name);
      setValue("address", employee.address);
    }
    setLoading(false);
  }, [employee, setValue]);

  const onSubmit = async (data: any) => {
    await mutateAsync({
      id: employee?._id,
      data,
    });
    navigate(routes.employee());
  };

  if (
    loading ||
    isFetching ||
    desingationFetching ||
    departmentFetching ||
    employeeFetching
  ) {
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
          <FormControlLabel
            control={
              <Switch
                color="success"
                defaultChecked={employee?.status}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("status", event.target?.checked);
                }}
                disabled={readOnly}
              />
            }
            label="Status"
          />
          <Button variant="contained" onClick={() => navigate(-1)}>
            {mode === "view" ? "Back" : "Cancel"}
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
          label="address"
          margin="normal"
          fullWidth
          multiline
          {...register("address")}
          inputProps={{ readOnly }}
        />
        <Autocomplete
          disablePortal
          id="employee-designation"
          options={designationList}
          autoSelect
          getOptionKey={(option: any) => option?._id}
          onChange={(e, val: any) => {
            setValue("designation", val?._id, { shouldDirty: true });
          }}
          readOnly={readOnly}
          defaultValue={employee?.designation}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Designation"
              margin="normal"
              required
              error={!!errors.designation}
              helperText={errors?.designation?.message?.toString()}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="employee-department"
          options={departmentList}
          defaultValue={employee?.department}
          getOptionKey={(option: any) => option?._id}
          onChange={(e, val: any) => {
            setValue("department", val?._id, { shouldDirty: true });
          }}
          readOnly={readOnly}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Department"
              margin="normal"
              required
              error={!!errors.department}
              helperText={errors?.department?.message?.toString()}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="employee-reporting-manager"
          options={employeeList}
          defaultValue={employee?.reportingManager}
          getOptionLabel={(option: any) => option.name}
          getOptionKey={(option: any) => option?._id}
          onChange={(e, val: any) => {
            setValue("reportingManager", val?._id, { shouldDirty: true });
          }}
          readOnly={readOnly}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Reporting manager"
              margin="normal"
              required
              error={!!errors.reportingManager}
              helperText={errors?.reportingManager?.message?.toString()}
            />
          )}
        />
      </form>
    </Box>
  );
};

export default Edit;
