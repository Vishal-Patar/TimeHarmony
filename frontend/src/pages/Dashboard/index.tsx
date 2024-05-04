import { Card, CardContent, Fade, Grid, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    padding: 20,
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    fontSize: 64,
    color: "#2196f3",
    marginBottom: 16,
  },
});

const Dashboard = () => {
  const emp = JSON.parse(localStorage?.getItem("employee") ?? "");
  const classes = useStyles();

  return (
    <Fade in={true} timeout={1000}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4">Hello {emp?.name ?? "User"},</Typography>
              <Typography variant="h5">Welcome to Time Harmony</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Your one-stop solution for attendance and leave management.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent>
                  <AccessTimeIcon className={classes.icon} />
                  <Typography variant="h6">Track Attendance</Typography>
                  <Typography variant="body2">
                    Monitor employee attendance effortlessly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent>
                  <EventAvailableIcon className={classes.icon} />
                  <Typography variant="h6">Manage Leaves</Typography>
                  <Typography variant="body2">
                    Streamline leave requests and approvals.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent>
                  <BarChartIcon className={classes.icon} />
                  <Typography variant="h6">Generate Reports</Typography>
                  <Typography variant="body2">
                    Analyze data and generate insightful reports.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent>
                  <SettingsIcon className={classes.icon} />
                  <Typography variant="h6">Customize Settings</Typography>
                  <Typography variant="body2">
                    Configure TimeHarmony to suit your needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Get started today and experience the benefits of TimeHarmony!
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default Dashboard;
