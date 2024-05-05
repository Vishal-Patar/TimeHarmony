import { Box, Card, CircularProgress } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCheckIn, useCheckOut, useIsCheckin } from '../../api/attendance/useAttendance';
import theme from '../../theme';

const Attendance = () => {
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");

  const { data: { isCheckIn , attendance} = {}, isFetching } = useIsCheckin(employee?._id);
  const { mutateAsync: mutateCheckIn, isPending: isCheckinPending } = useCheckIn();
  const { mutateAsync: mutateCheckOut, isPending: isCheckoutPending } = useCheckOut();

  const handleClick = async () => {
    const id = employee?._id;
    if (isCheckIn) {
      await mutateCheckOut({
        id,
      });
    } else {
      await mutateCheckIn({
        id,
      });
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      {
        isFetching ? 'Loading...' : (
          <Card
            sx={{
              backgroundColor: isCheckIn ? theme.palette.secondary.main : theme.palette.success.main,
              width: 200,
              height: 250,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: theme.palette.background.paper,
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleClick()}
          >
            {
              isCheckIn ? (
                <Box>
                  {
                    isCheckoutPending ? <CircularProgress /> : <LogoutIcon sx={{ fontSize: 150 }} />
                  }
                  <p>{attendance?.checkIn}</p>
                  <p>Check Out</p>
                </Box>
              ) : (
                <Box>
                  {
                    isCheckinPending ? <CircularProgress /> : <LoginIcon sx={{ fontSize: 150 }} />
                  }
                  <p>Check In</p>
                </Box>
              )
            }
          </Card>
        )
      }
    </Box>
  )
}

export default Attendance