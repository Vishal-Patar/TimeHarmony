import { Box } from "@mui/material";
import { AppHeader, AppSidebar } from "../components"
import { Outlet, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const { pathname } = useLocation()

  // const withoutLayoutPath = ['/login', '/register', '/password-reset']

  // if (withoutLayoutPath.includes(pathname)) {
  //   return <Outlet />;
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AppHeader />
        <Box
          component="main"
          sx={{ p: 3 }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DefaultLayout