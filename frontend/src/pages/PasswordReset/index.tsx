import React from "react";
import { Link } from "react-router-dom";
import {
  // Button,
  // TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import { FullHeightContainer } from "../style";
import { Footer } from "../../components";

const PasswordReset: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [resetSuccess, setResetSuccess] = useState(false);

  // const handleReset = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // TODO: Add password reset logic here
  //   setResetSuccess(true);
  // };

  return (
    <FullHeightContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          <Typography variant="h5" align="center" gutterBottom>
            Please Contact Your Administrator
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            <Link to="/login">Back to login</Link>
          </Typography>
          {/* {resetSuccess ? (
            <>
              <Typography variant="body1" align="center" paragraph>
                Password reset instructions have been sent to your email.
              </Typography>
              <Typography variant="body2" align="center">
                <Link to="/login">Return to login</Link>
              </Typography>
            </>
          ) : (
            <form onSubmit={handleReset}>
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Reset Password
              </Button>
              <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                <Link to="/login">Back to login</Link>
              </Typography>
            </form>
          )} */}
        </Box>
      </Container>
      <Footer />
    </FullHeightContainer>
  );
};

export default PasswordReset;
