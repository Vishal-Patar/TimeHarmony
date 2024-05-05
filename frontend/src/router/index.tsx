import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Attendance,
  AttendanceManage,
  Dashboard,
  Department,
  DepartmentEdit,
  Designation,
  DesignationEdit,
  EditLeave,
  EditUser,
  Employee,
  EmployeeEdit,
  HelpSupport,
  Leave,
  LeaveApply,
  LeaveManage,
  LeaveRequests,
  Login,
  ManageRoles,
  ManageRolesEdit,
  ManageUsers,
  Notifications,
  PasswordReset,
  ProfileSettings,
  Register,
} from "../pages";
import routes from "./routes";
import DefaultLayout from "../layout/DefaultLayout";
import Landing from "../pages/Landing";


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
        path: routes.attendanceManage(),
        element: <AttendanceManage />,
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
        path: routes.editLeave(),
        element: <EditLeave />,
      },
      {
        path: routes.viewLeave(),
        element: <EditLeave />,
      },
      {
        path: routes.createLeave(),
        element: <EditLeave />,
      },
      {
        path: routes.requestLeave(),
        element: <LeaveRequests />,
      },
      {
        path: routes.applyLeave(),
        element: <LeaveApply />,
      },
      {
        path: routes.employee(),
        element: <Employee />,
      },
      {
        path: routes.employeeEdit(),
        element: <EmployeeEdit />,
      },
      {
        path: routes.employeeView(),
        element: <EmployeeEdit />,
      },
      {
        path: routes.employeeDesignations(),
        element: <Designation />,
      },
      {
        path: routes.employeeDesignationsAdd(),
        element: <DesignationEdit />,
      },
      {
        path: routes.employeeDesignationsEdit(),
        element: <DesignationEdit />,
      },
      {
        path: routes.employeeDesignationsView(),
        element: <DesignationEdit />,
      },
      {
        path: routes.employeeDepartment(),
        element: <Department />,
      },
      {
        path: routes.employeeDepartmentEdit(),
        element: <DepartmentEdit />,
      },
      {
        path: routes.employeeDepartmentView(),
        element: <DepartmentEdit />,
      },
      {
        path: routes.employeeDepartmentAdd(),
        element: <DepartmentEdit />,
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
        path: routes.manageRolesEdit(),
        element: <ManageRolesEdit />,
      },
      {
        path: routes.manageRolesView(),
        element: <ManageRolesEdit />,
      },
      {
        path: routes.manageRolesEdit(),
        element: <ManageRolesEdit />,
      },
      {
        path: routes.manageUsers(),
        element: <ManageUsers />,
      },
      {
        path: routes.createUser(),
        element: <EditUser />,
      },
      {
        path: routes.editUser(),
        element: <EditUser />,
      },
      {
        path: routes.viewUser(),
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
