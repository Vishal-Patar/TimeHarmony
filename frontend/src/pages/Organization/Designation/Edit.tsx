import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../common/Button";
import Loader from "../../../common/Loader";
import routes from "../../../router/routes";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ModeType } from "../../../types/common";
import useCheckAccess from "../../../helper/useCheckAccess";
import UnauthorizedAccessCard from "../../../common/UnauthorizedAccessCard";
import { useCreateDesignation, useGetDesignationById, useUpdateDesignation } from "../../../api/designations/useDesignations";

const SECTION_ID = 8;

const Edit = () => {
  const { hasReadAccess, hasWriteAccess } = useCheckAccess(SECTION_ID);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModeType>("add");
  const { data: editData, isFetching } = useGetDesignationById(
    mode === "add" || !id ? "" : id
  );
  const { mutateAsync, isPending } = useUpdateDesignation();
  const { mutateAsync: mutateCreateAsync, isPending: isCreatePending } =
    useCreateDesignation();
  const readOnly = mode === "view";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && location?.pathname?.includes("edit")) {
      setMode("edit");
    } else if (location?.pathname?.includes("add")) {
      setMode("add");
    } else {
      setMode("view");
    }
  }, [id, location?.pathname]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    if (editData) {
      setValue("name", editData.name);
      setValue("label", editData.label);
    }
    setLoading(false);
  }, [editData, setValue]);

  const onSubmit = async (data: any) => {
    if (mode === "edit") {
      await mutateAsync({
        id: editData?._id,
        data,
      });
    } else {
      await mutateCreateAsync(data);
    }

    navigate(routes.employeeDesignations());
  };

  if (
    !hasReadAccess ||
    ((mode === "edit" || mode === "add") && !hasWriteAccess)
  ) {
    return <UnauthorizedAccessCard />;
  }

  if (isFetching || loading) {
    return <Loader />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Designation {mode}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
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
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors?.name?.message?.toString()}
          inputProps={{
            readOnly: readOnly || mode === "edit",
          }}
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
      </form>
    </Box>
  );
};

export default Edit;