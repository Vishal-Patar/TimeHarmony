import {
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCheckAccess from "../../helper/useCheckAccess";
import { ModeType } from "../../types/common";
import { useGetUserById, useUpdateUser } from "../../api/users/useUsers";
import { useGetRoles } from "../../api/roles/useRoles";
import routes from "../../router/routes";
import UnauthorizedAccessCard from "../../common/UnauthorizedAccessCard";
import Loader from "../../common/Loader";
import Button from "../../common/Button";
import { useApplyLeave, useGetLeaveTypes, useGetMyLeave } from "../../api/leaves/useLeaves";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SECTION_ID = 4;

const Apply = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = false;

  const { data: user, isFetching } = useGetUserById(id ?? "");
  const { mutateAsync, isPending } = useUpdateUser();
  const { data: leavesType, isLoading } = useGetMyLeave(employee?._id);

  const { mutateAsync: mutateCreateAsync, isPending: isCreatePending } =
    useApplyLeave();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch
  } = useForm();
  const startDate = watch("startDate");
  const selectedLeaveType = watch("leaveType");

  // useEffect(() => {
  //   if (id && location?.pathname?.includes("edit")) {
  //     setMode("edit");
  //   } else if (location?.pathname?.includes("add")) {
  //     setMode("add");
  //   } else {
  //     setMode("view");
  //   }
  // }, [id, location?.pathname]);

  useEffect(() => {
    setLoading(true);
    // if (user) {
    //   setValue("username", user.username);
    //   setValue("email", user.email);
    // }
    setLoading(false);
  }, [setValue]);

  const onSubmit = async (data: any) => {
    await mutateCreateAsync({
      employeeId: employee?._id,
      ...data,
      leavesType: data?.leavesType?._id
    });
    navigate(routes.leave());
  };

  if (!hasReadAccess || !hasWriteAccess) {
    return <UnauthorizedAccessCard />;
  }

  if (loading || isFetching || isLoading) {
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
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            type="submit"
            loading={isPending}
          >
            Apply
          </Button>
        </Box>

        <Autocomplete
          disablePortal
          id="leaveType"
          options={leavesType}
          autoSelect
          getOptionKey={(option: any) => option?._id}
          onChange={(e, val: any) => {
            setValue("leaveType", val, { shouldDirty: true });
          }}
          readOnly={readOnly}
          // defaultValue={user?.role}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Leave Type"
              margin="normal"
              required
              error={!!errors.leaveType}
              helperText={errors?.leaveType?.message?.toString()}
            />
          )}
        />
        <TextField
          label="Reason"
          margin="normal"
          fullWidth
          multiline
          {...register("reason")}
          inputProps={{ readOnly }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              marginTop: 2,
              alignItems: 'center'
            }}
          >
            <Controller
              name={'startDate'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Date From is required",
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  label="From"
                  disablePast
                  onChange={onChange}
                  onAccept={onChange}
                  value={value}
                  inputRef={ref}
                  slotProps={{
                    textField: {
                      error: !!errors.startDate,
                      helperText: errors?.startDate?.message?.toString(),
                    },
                  }}
                />
              )}
            />

            <Controller
              name={'endDate'}
              control={control}
              rules={{
                required: "End Date is required",
                validate: {
                  endDateBeforeStartDate: (value) =>
                    new Date(value) >= new Date(startDate) ||
                    "End Date must be equal to or greater than Start Date",
                  leaveDuration: (value) => {
                    const start = new Date(startDate);
                    const end = new Date(value);
                    const diffTime = Math.abs(end.getTime() - start.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const remainingDays = selectedLeaveType?.remainingDays ?? 0;
                    return diffDays <= remainingDays || `Leave duration must be less than or equal to ${remainingDays} days`;
                  },
                },
              }}
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  label="To"
                  disablePast
                  onChange={onChange}
                  onAccept={onChange}
                  value={value}
                  inputRef={ref}
                  slotProps={{
                    textField: {
                      error: !!errors.endDate,
                      helperText: errors?.endDate?.message?.toString(),
                    },
                  }}
                />
              )}
            />
            {selectedLeaveType?.remainingDays && (
              <Typography variant="button" color={'green'}>
                Available: {selectedLeaveType?.remainingDays}
              </Typography>
            )}
          </Box>
        </LocalizationProvider>
      </form>
    </Box>
  );
};

export default Apply;
