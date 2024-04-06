import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import { useTheme } from '../theme';

const AppHeader = () => {
    const theme = useTheme();
    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: theme.customColor.header.background
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Time Harmony
                </Typography>
                <Avatar alt="User Avatar" />
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader