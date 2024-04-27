import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetLeaveTypes, useGetMyLeave } from "../../api/leaves/useLeaves";
import Button from "../../common/Button";
import routes from "../../router/routes";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";

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
  
  if(isLoading) return <Loader />

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
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
            <Card
              key={name + _id}
              sx={{
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h5">{label}</Typography>
                <CircularProgress
                  variant="determinate"
                  value={(availableDays / allowedDays) * 100}
                />
                <Typography variant="subtitle1">
                  Available: {allowedDays}
                </Typography>
                <Typography variant="subtitle1">Used: {usedDays}</Typography>
                <Typography variant="subtitle1">{description}</Typography>
              </CardContent>
            </Card>
          )
        )}
      </Box>
    </Box>
  );
};

export default Leave;
