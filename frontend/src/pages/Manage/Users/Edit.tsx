import {
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import routes from "../../../router/routes";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ModeType } from "../../../types/common";
import Button from "../../../common/Button";
import { useGetRoles } from "../../../api/roles/useRoles";
import { useGetUserById, useRegisterUser, useUpdateUser } from "../../../api/users/useUsers";
import useCheckAccess from "../../../helper/useCheckAccess";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";
import NoDataFound from "../../../common/NoDataFound";

const SECTION_ID = 13;

const Edit = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModeType>("view");
  const location = useLocation();
  const readOnly = mode === "view";

  const { data: user, isFetching, isError } = useGetUserById(id ?? "");
  const { mutateAsync, isPending } = useUpdateUser();
  const { data: Roles, isLoading } = useGetRoles();
  const { mutateAsync: mutateCreateAsync, isPending: isCreatePending } =
    useRegisterUser();
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
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
    setLoading(false);
  }, [user, setValue]);

  const onSubmit = async (data: any) => {
    if (mode === "edit") {
      await mutateAsync({
        id: user?._id,
        data,
      });
    } else {
      await mutateCreateAsync({
        ...data,
        login: false
      });
    }
    navigate(routes.manageUsers());
  };

  if (
    !hasReadAccess ||
    ((mode === "edit" || mode === "add") && !hasWriteAccess)
  ) {
    return <UnauthorizedAccessCard />;
  }

  if (loading || isFetching || isLoading) {
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
            flexDirection: ['column-reverse', 'row'],
            gap: 1,
            justifyContent: 'space-between',
            marginBottom: 1
          }}
        >
          <Typography variant="h6" alignSelf={'flex-start'}>User {mode}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              alignSelf: 'flex-end'
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  defaultChecked={mode === "add" ? true : user?.status}
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
              loading={isPending || isCreatePending}
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
          {...register("username", { required: "Name is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
          inputProps={{ readOnly }}
        />

        <TextField
          label="Email"
          margin="normal"
          fullWidth
          required
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
          inputProps={{ readOnly }}
        />

        {mode !== "view" && (
          <TextField
            label="New Password"
            margin="normal"
            fullWidth
            multiline
            {...register("password")}
            inputProps={{ readOnly }}
            helperText={'Password should be minimum 8 character'}
          />
        )}

        <Autocomplete
          disablePortal
          id="user-role"
          options={Roles}
          autoSelect
          getOptionKey={(option: any) => option?._id}
          onChange={(e, val: any) => {
            setValue("role", val?._id, { shouldDirty: true });
          }}
          readOnly={readOnly}
          defaultValue={user?.role}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Role"
              margin="normal"
              required
              error={!!errors.role}
              helperText={errors?.role?.message?.toString()}
            />
          )}
        />
      </form>
    </Box>
  );
};

export default Edit;
