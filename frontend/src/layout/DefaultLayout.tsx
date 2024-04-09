import { Box } from "@mui/material";
import { AppHeader, AppSidebar } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage?.getItem("accessToken");

  useEffect(() => {
    if (accessToken && accessToken !== undefined && accessToken !== 'undefined' ) {
      setLoading(false);
    } else {
      navigate(routes.login());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex" }}>
          <AppSidebar />
          <Box sx={{ flexGrow: 1 }}>
            <AppHeader />
            <Box component="main" sx={{ p: 3 }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DefaultLayout;
