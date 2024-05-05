import { Box, Card, CircularProgress } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCheckIn, useCheckOut, useIsCheckin } from '../../api/attendance/useAttendance';
import theme from '../../theme';
import dayjs from 'dayjs';
import useCheckAccess from '../../helper/useCheckAccess';
import UnauthorizedAccessCard from '../../common/UnauthorizedAccessCard';
import MyAttendance from './MyAttendance';

const SECTION_ID = 2;
const Attendance = () => {
  const employee = JSON.parse(localStorage?.getItem("employee") ?? "");
  const { hasReadAccess } = useCheckAccess(SECTION_ID);
  const { data: { isCheckIn, attendance } = {}, isFetching } = useIsCheckin(employee?._id);
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

  if (!hasReadAccess) return <UnauthorizedAccessCard />;

  return (
    <Box sx={{
      display: 'flex',
      gap: 3,
      flexDirection: 'column'
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
              cursor: 'pointer',
              padding: 2,
              alignSelf:'center'
            }}
            onClick={() => handleClick()}
          >
            {
              isCheckIn ? (
                <Box>
                  {
                    isCheckoutPending ? <CircularProgress /> : <LogoutIcon sx={{ fontSize: 150 }} />
                  }
                  <p>{dayjs(attendance?.checkIn)?.format('DD-MM-YYYY HH:mm:ss')}</p>
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
      <MyAttendance />
    </Box>

  )
}

export default Attendance