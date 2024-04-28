type RolePermission = {
  id: number;
  section: string;
  readAccess: boolean;
  writeAccess: boolean;
};

export const rolePermissions: RolePermission[] = [
  {
    id: 1,
    section: "Dashboard",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 2,
    section: "Attendance",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 3,
    section: "Attendance List",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 4,
    section: "Leave View",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 5,
    section: "Leave Requests",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 6,
    section: "Leave Manage",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 7,
    section: "Employees",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 8,
    section: "Designations",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 9,
    section: "Department",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 10,
    section: "Profile Setting",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 11,
    section: "notification",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 12,
    section: "Help and Support",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 13,
    section: "User Manage",
    readAccess: false,
    writeAccess: false,
  },
  {
    id: 14,
    section: "Roles Manage",
    readAccess: false,
    writeAccess: false,
  },
];
