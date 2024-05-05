import { Box } from "@mui/material";
import { AppHeader, AppSidebar, Footer } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { useGetUserById } from "../api/users/useUsers";
import { handleLogout } from "../helper/handleLogout";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage?.getItem("accessToken");
  const user = JSON.parse(localStorage?.getItem("user") ?? "");
  const { data, isFetching } = useGetUserById(user?._id);

  useEffect(() => {
    if (
      accessToken &&
      accessToken !== undefined &&
      accessToken !== "undefined"
    ) {
      if (!isFetching && data) {
        if (data?.status) {
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          // Logout the user
          handleLogout()
          navigate(routes.login());
        }
      }
      setLoading(false);
    } else {
      navigate(routes.login());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, data]);

  return (
    <>
      {loading || isFetching ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex" }}>
          <AppSidebar />
          <Box sx={{ flexGrow: 1, width: '90%' }}>
            <AppHeader />
            <Box component="main" sx={{ p: 3, pb: 5 }}>
              <Outlet />
            </Box>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
};

export default DefaultLayout;
