import { Link } from "react-router-dom";
import {
  TextField,
  Typography,
  CssBaseline,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FullHeightContainer } from "../style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../../api/users/useUsers";
import Button from "../../common/Button";
import routes from "../../router/routes";
import { Footer } from "../../components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isPending } = useLoginUser();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
    navigate(routes.dashboard());
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <FullHeightContainer maxWidth="xs">
      <CssBaseline />
      <Box>
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
            helperText={
              errors?.email?.message?.toString() ||
              (!!errors.email && "Enter Valid Email")
            }
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            required
            {...register("password", {
              required: "Password is required with minimum 8 characters",
              minLength: 8,
            })}
            error={!!errors.password}
            helperText={
              errors?.password?.message?.toString() ||
              "Password should be minimum 8 characters"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
      </Box>
      <Footer />
    </FullHeightContainer>
  );
};

export default Login;
