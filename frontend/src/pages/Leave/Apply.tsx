import {
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCheckAccess from "../../helper/useCheckAccess";
import { ModeType } from "../../types/common";
import { useGetUserById, useUpdateUser } from "../../api/users/useUsers";
import { useGetRoles } from "../../api/roles/useRoles";
import routes from "../../router/routes";
import UnauthorizedAccessCard from "../../common/UnauthorizedAccessCard";
import Loader from "../../common/Loader";
import Button from "../../common/Button";
import { useGetLeaveTypes } from "../../api/leaves/useLeaves";

const SECTION_ID = 4;

const Apply = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = false;

  const { data: user, isFetching } = useGetUserById(id ?? "");
  const { mutateAsync, isPending } = useUpdateUser();
  const { data: leavesType, isLoading } = useGetLeaveTypes();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
    setLoading(false);
  }, [user, setValue]);

  const onSubmit = async (data: any) => {
    // await mutateAsync({
    //   id: user?._id,
    //   data,
    // });
    // navigate(routes.manageUsers());
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
          // getOptionLabel={(option: any) => option.name}
          onChange={(e, val: any) => {
            setValue("leaveType", val?._id, { shouldDirty: true });
          }}
          readOnly={readOnly}
          defaultValue={user?.role}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Leave Type"
              margin="normal"
              required
              error={!!errors.role}
              helperText={errors?.role?.message?.toString()}
            />
          )}
        />
        <TextField
          label="reason"
          margin="normal"
          fullWidth
          multiline
          {...register("reason")}
          inputProps={{ readOnly }}
        />
      </form>
    </Box>
  );
};

export default Apply;
