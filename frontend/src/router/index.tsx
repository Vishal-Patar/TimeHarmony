import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AddUser,
  Attendance,
  Dashboard,
  EditUser,
  Employee,
  HelpSupport,
  Leave,
  Login,
  ManageRoles,
  ManageUsers,
  Notifications,
  PasswordReset,
  ProfileSettings,
  Register,
  ReportsAnalytics,
} from "../pages";
import routes from "./routes";
import Roles from "../pages/Organization/Roles";
import Department from "../pages/Organization/Department";
import DefaultLayout from "../layout/DefaultLayout";
import Landing from "../pages/Landing";
import Functions from "../pages/Organization/Functions";
import Category from "../pages/Organization/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: routes.login(),
    element: <Login />,
  },
  {
    path: routes.register(),
    element: <Register />,
  },
  {
    path: routes.passwordReset(),
    element: <PasswordReset />,
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: routes.dashboard(),
        element: <Dashboard />,
      },
      {
        path: routes.attendance(),
        element: <Attendance />,
      },
      {
        path: routes.leave(),
        element: <Leave />,
      },
      {
        path: routes.employee(),
        element: <Employee />,
      },
      {
        path: routes.employeeRoles(),
        element: <Roles />,
      },
      {
        path: routes.employeeDepartment(),
        element: <Department />,
      },
      {
        path: routes.employeeFunction(),
        element: <Functions />,
      },
      {
        path: routes.employeeCategory(),
        element: <Category />,
      },
      {
        path: routes.employeeCategory(),
        element: <Category />,
      },
      {
        path: routes.reportsAnalytics(),
        element: <ReportsAnalytics />,
      },
      {
        path: routes.profileSettings(),
        element: <ProfileSettings />,
      },
      {
        path: routes.notifications(),
        element: <Notifications />,
      },
      {
        path: routes.helpSupport(),
        element: <HelpSupport />,
      },
      {
        path: routes.manageRoles(),
        element: <ManageRoles />,
      },
      {
        path: routes.manageUsers(),
        element: <ManageUsers />,
      },
      {
        path: routes.createUser(),
        element: <AddUser />,
      },
      {
        path: routes.editUser(),
        element: <EditUser />,
      },
      {
        path: "*",
        element: (
          <Navigate
            to={{
              pathname: routes.login(),
            }}
          />
        ),
      },
    ],
  },
]);
