import { Link } from "react-router-dom";
import {
  TextField,
  Typography,
  CssBaseline,
  Box,
  Snackbar,
} from "@mui/material";
import { FullHeightContainer } from "../style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../../api/users/useUsers";
import Button from "../../common/Button";
import routes from "../../router/routes";
import { useEffect, useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isPending, isError } = useLoginUser();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
    navigate(routes.dashboard());
  };

  useEffect(() => {
    console.log('isError', isError)
    setOpen(isError);
  }, [isError])
  

  return (
    <FullHeightContainer maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            margin="normal"
            fullWidth
            required
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
            error={!!errors.email}
            helperText={errors?.email?.message?.toString()}
          />

          <TextField
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            {...register("password", {
              required: "Password is required with minimum 8 character",
              minLength: 8,
            })}
            error={!!errors.password}
            helperText={errors?.password?.message?.toString()}
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={isPending}
            >
              Login
            </Button>
          </Box>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          <Link to="/password-reset">Forgot password?</Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Incorrect User Credentials!!!"
      />
    </FullHeightContainer>
  );
};

export default Login;
