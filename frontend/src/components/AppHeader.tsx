import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { GridMenuIcon } from "@mui/x-data-grid";
import { openDrawer } from "../features/drawer/drawerSlice";
import { useDispatch } from "react-redux";

const AppHeader = () => {
  const theme = useTheme();
  const user = JSON.parse(localStorage?.getItem("user") ?? "");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logout the user
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("employee");
    sessionStorage.removeItem("employee");
    navigate(routes.login());
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.customColor.header.background,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            dispatch(openDrawer())
          }}
          sx={{
            display: ['block', 'none']
          }}
        >
          <GridMenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Time Harmony
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar>{user?.username?.[0]}</Avatar>
          </IconButton>
          <Menu
            id="profile-positioned-menu"
            aria-labelledby="profile-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(routes.profileSettings());
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
