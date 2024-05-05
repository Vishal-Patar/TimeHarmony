import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useGetMyLeave } from "../../api/leaves/useLeaves";
import Button from "../../common/Button";
import routes from "../../router/routes";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import RequestList from "./RequestList";
import theme from "../../theme";
import NoLeaveMessage from "../../components/Leave/NoLeaveMassage";

interface LeaveType {
  name: string;
  label: string;
  description: string;
  allowedDays: number;
  usedDays: number;
  remainingDays: number
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

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: 3,
        flexWrap:'wrap'
      }}>
        {data?.map(
          ({
            name,
            label,
            description,
            allowedDays,
            _id,
            usedDays,
            remainingDays,
          }: LeaveType) => (
            <Box key={name + _id} sx={{maxWidth: 300}}>
              <Card
                sx={{
                  textAlign: "center",
                  height: '100%',
                }}
              >
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h5">{label}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CircularProgress
                        variant="determinate"
                        value={(remainingDays / allowedDays) * 100}
                        size={100}
                        color="success"
                        thickness={22}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: '50%'
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Allowed: {allowedDays}
                      </Typography>
                      <Typography variant="subtitle1">
                        Used: {usedDays}
                      </Typography>
                      <Typography variant="subtitle1">
                        Available: {remainingDays}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">{description}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )
        )}
      </Box>
      <RequestList />
    </Box>
  );
};

export default Leave;
