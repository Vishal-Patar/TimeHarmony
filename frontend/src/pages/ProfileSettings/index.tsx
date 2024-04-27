import React from "react";
import { useGetEmployeeById } from "../../api/employees/useEmployees";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const ProfileSettings = () => {
  const user = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { data: employee, isFetching } = useGetEmployeeById(user?._id);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{employee?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Designation:</strong> {employee?.designation?.label}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Department:</strong> {employee?.department?.label}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Reporting Manager:</strong> {employee?.reportingManager?.name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
