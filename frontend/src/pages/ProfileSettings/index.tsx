import React from "react";
import { useGetEmployeeById } from "../../api/employees/useEmployees";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import routes from "../../router/routes";
import ReportingEmployeeList from "./ReportingEmployeeList";

const ProfileSettings = () => {
  const emp = JSON.parse(localStorage?.getItem("employee") ?? "");
  const {
    data: {
      name,
      address,
      designation,
      department,
      reportingManager,
      user,
    } = {},
    isFetching,
  } = useGetEmployeeById(emp?._id);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Card>
        <CardContent>
          <Grid container gap={2}>
            <Grid
              item
              xs={12}
              sx={{
                borderBottom: "1px solid #dddd",
              }}
            >
              <Typography variant="h4">
                {name} <Chip label={user?.role?.label} color="info" />
              </Typography>
              <p>{user?.email}</p>
              <p style={{ color: "grey" }}>{address}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Designation:</strong> {designation?.label ?? 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Department:</strong> {department?.label ?? 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Reporting Manager:</strong>{" "}
                {reportingManager?.name ? <Link to={`${routes.employee()}/${reportingManager?._id}`}>
                  {reportingManager?.name}
                </Link> : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <ReportingEmployeeList />
    </Box>
  );
};

export default ProfileSettings;
