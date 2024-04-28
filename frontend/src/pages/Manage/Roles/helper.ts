import routes from "../../../router/routes";

type RolePermission = {
  id: number;
  section: string;
  readAccess: boolean;
  writeAccess: boolean;
  route: string;
};

export const rolePermissions: RolePermission[] = [
  {
    id: 1,
    section: "Dashboard",
    readAccess: false,
    writeAccess: false,
    route: routes.dashboard(),
  },
  {
    id: 2,
    section: "Attendance",
    readAccess: false,
    writeAccess: false,
    route: routes.attendance(),
  },
  {
    id: 3,
    section: "Attendance List",
    readAccess: false,
    writeAccess: false,
    route: routes.attendance(),
  },
  {
    id: 4,
    section: "Leave View",
    readAccess: false,
    writeAccess: false,
    route: routes.leave(),
  },
  {
    id: 5,
    section: "Leave Requests",
    readAccess: false,
    writeAccess: false,
    route: routes.requestLeave(),
  },
  {
    id: 6,
    section: "Leave Manage",
    readAccess: false,
    writeAccess: false,
    route: routes.manageLeave(),
  },
  {
    id: 7,
    section: "Employees",
    readAccess: false,
    writeAccess: false,
    route: routes.employee(),
  },
  {
    id: 8,
    section: "Designations",
    readAccess: false,
    writeAccess: false,
    route: routes.employeeDesignations(),
  },
  {
    id: 9,
    section: "Department",
    readAccess: false,
    writeAccess: false,
    route: routes.employeeDepartment(),
  },
  {
    id: 10,
    section: "Profile Setting",
    readAccess: false,
    writeAccess: false,
    route: routes.profileSettings(),
  },
  {
    id: 11,
    section: "notification",
    readAccess: false,
    writeAccess: false,
    route: routes.notifications(),
  },
  {
    id: 12,
    section: "Help and Support",
    readAccess: false,
    writeAccess: false,
    route: routes.helpSupport(),
  },
  {
    id: 13,
    section: "User Manage",
    readAccess: false,
    writeAccess: false,
    route: routes.manageUsers(),
  },
  {
    id: 14,
    section: "Roles Manage",
    readAccess: false,
    writeAccess: false,
    route: routes.manageRoles(),
  },
];
