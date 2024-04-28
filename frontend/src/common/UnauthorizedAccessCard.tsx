import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import routes from "../router/routes";

const UnauthorizedAccessCard = () => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <Card
          sx={{ maxWidth: 400, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign={"center"}>
                <LockIcon fontSize="large" color="error" />
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5" gutterBottom>
                  Unauthorized Access
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Oops! You don't have access to this page.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                  textAlign={"center"}
                >
                  Please contact support if you believe this is an error or
                  return to the dashboard.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent
            sx={{ borderTop: "1px solid #ccc", textAlign: "center" }}
          >
            <Button
              component={Link}
              to={routes.dashboard()}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", marginTop: 2 }}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UnauthorizedAccessCard;
