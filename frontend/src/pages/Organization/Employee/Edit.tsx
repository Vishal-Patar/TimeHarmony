import {
  Autocomplete,
  Box,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
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
import { useGetDesignations } from "../../../api/designations/useDesignations";
import { useGetDepartments } from "../../../api/departments/useDepartments";
import routes from "../../../router/routes";
import Loader from "../../../common/Loader";
import { ModeType } from "../../../types/common";
import useCheckAccess from "../../../helper/useCheckAccess";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";
import NoDataFound from "../../../common/NoDataFound";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SECTION_ID = 7;

const Edit = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModeType>("view");
  const location = useLocation();
  const readOnly = mode === "view";

  const { data: employee, isFetching, isError } = useGetEmployeeById(id ?? "");
  const { mutateAsync, isPending } = useUpdateEmployee();
  const { data: designationList, isFetching: designationFetching } =
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
    } else if (location?.pathname?.includes("add")) {
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
      setValue("phoneNumber", employee.phoneNumber);
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
    !hasReadAccess ||
    ((mode === "edit" || mode === "add") && !hasWriteAccess)
  ) {
    return <UnauthorizedAccessCard />;
  }

  if (
    loading ||
    isFetching ||
    designationFetching ||
    departmentFetching ||
    employeeFetching
  ) {
    return <Loader />;
  }

  if (!isFetching && isError) {
    return <NoDataFound />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: ["column-reverse", "row"],
            gap: 1,
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              gap: 1,
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="h6">Employee {mode}</Typography>
            <Chip
              label={employee?.user?.email}
              variant="outlined"
              color="info"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  defaultChecked={mode === "add" ? true : employee?.status}
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
      <Typography variant="h6">Personal Info</Typography>
      <TextField
        label="Address"
        margin="normal"
        fullWidth
        multiline
        {...register("address")}
        inputProps={{ readOnly }}
      />
      <TextField
        label="Phone Number"
        margin="normal"
        fullWidth
        type="tel"
        inputProps={{
          maxLength: 10,
        }}
        {...register("phoneNumber")}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date of Birth" />
    </LocalizationProvider>
    </Box>
  );
};

export default Edit;
