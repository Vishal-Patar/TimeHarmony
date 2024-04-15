import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AddUser,
  Attendance,
  Dashboard,
  EditUser,
  Employee,
  HelpSupport,
  Leave,
  LeaveManage,
  LeaveRequests,
  Login,
  ManageRoles,
  ManageUsers,
  Notifications,
  PasswordReset,
  ProfileSettings,
  Register,
} from "../pages";
import routes from "./routes";
import Department from "../pages/Organization/Department";
import DefaultLayout from "../layout/DefaultLayout";
import Landing from "../pages/Landing";

import Designation from "../pages/Organization/Designation";

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
        path: routes.manageLeave(),
        element: <LeaveManage />,
      },
      {
        path: routes.requestLeave(),
        element: <LeaveRequests />,
      },
      {
        path: routes.employee(),
        element: <Employee />,
      },
      {
        path: routes.employeeDesignations(),
        element: <Designation />,
      },
      {
        path: routes.employeeDepartment(),
        element: <Department />,
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
