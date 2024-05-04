import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetLeaveTypes, useGetMyLeave } from "../../api/leaves/useLeaves";
import Button from "../../common/Button";
import routes from "../../router/routes";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import { ContactSupportOutlined } from "@mui/icons-material";

interface LeaveType {
  name: string;
  label: string;
  description: string;
  allowedDays: number;
  _id: string;
}

const Leave = () => {
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");

  const { data, isLoading } = useGetMyLeave(employee?._id);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (!isLoading && !data?.length) {
    return (
      <Box sx={{
        flex: 1
      }}>
        <NoLeaveMessage />
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
          marginBottom: 4,
        }}
        onClick={() => navigate(routes.applyLeave())}
      >
        Apply Leave
      </Button>

      <Grid container spacing={4}>
        {data?.map(
          ({
            name,
            label,
            description,
            allowedDays,
            _id,
            usedDays,
            availableDays,
          }: any) => (
            <Grid item xs={12} sm={6} md={4} key={name + _id}>
              <Card
                sx={{
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h4">{label}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CircularProgress
                        variant="determinate"
                        value={(availableDays / allowedDays) * 100}
                        size={100}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Available: {allowedDays}
                      </Typography>
                      <Typography variant="subtitle1">
                        Used: {usedDays}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">{description}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Leave;


const NoLeaveMessage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ContactSupportOutlined sx={{ fontSize: 64, color: '#3f51b5' }} />
      <Box sx={{ mt: 2, fontSize: 24, fontWeight: 'bold', color: '#333' }}>
        No Leave Available!
      </Box>
      <Box sx={{ mt: 1, fontSize: 16, color: '#666' }}>
        Please contact your administrator.
      </Box>
    </Box>
  );
};
