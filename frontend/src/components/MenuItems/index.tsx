import { useTheme } from "../../theme";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import routes from "../../router/routes";
import { checkReadAccess } from "../../helper/permission";

interface ListItem {
  name: string;
  label: string;
  sectionId: number;
  targetLink: string;
  icon: React.ReactNode;
  submenu?: ListItem[];
  activeBasePath?: string;
}

export const MenuItems = () => {
  const theme = useTheme();
  const list = [
    {
      name: "dashboard",
      label: "Dashboard",
      sectionId: 1,
      targetLink: routes.dashboard(),
      icon: (
        <DashboardCustomizeOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
    },
    {
      name: "attendance",
      label: "Attendance",
      sectionId: 2,
      targetLink: routes.attendance(),
      icon: (
        <EventOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
    },
    {
      name: "leave",
      label: "Leave",
      sectionId: 4,
      targetLink: routes.leave(),
      activeBasePath: routes.leave(),
      icon: (
        <EventBusyOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
      submenu: [
        {
          name: "view",
          label: "View",
          sectionId: 4,
          targetLink: routes.leave(),
          icon: (
            <PersonSearchOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
        {
          name: "requests",
          label: "Requests",
          sectionId: 5,
          targetLink: routes.requestLeave(),
          icon: (
            <AssignmentIndOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
        {
          name: "manage",
          label: "Manage",
          sectionId: 6,
          targetLink: routes.manageLeave(),
          icon: (
            <WorkOutlineOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
      ],
    },
    {
      name: "organization",
      label: "Organization",
      sectionId: 7,
      targetLink: routes.employee(),
      activeBasePath: routes.employee(),
      icon: (
        <BusinessOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
      submenu: [
        {
          name: "employee",
          label: "Employees",
          sectionId: 7,
          targetLink: routes.employee(),
          icon: (
            <PersonSearchOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
        {
          name: "designation",
          label: "Designations",
          sectionId: 8,
          targetLink: routes.employeeDesignations(),
          icon: (
            <AssignmentIndOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
        {
          name: "department",
          label: "Department",
          sectionId: 9,
          targetLink: routes.employeeDepartment(),
          icon: (
            <WorkOutlineOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
      ],
    },
    {
      name: "profile-settings",
      label: "Profile and Settings",
      sectionId: 10,
      targetLink: routes.profileSettings(),
      icon: (
        <ManageAccountsOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
    },
    {
      name: "notifications",
      label: "Notifications",
      sectionId: 11,
      targetLink: routes.notifications(),
      icon: (
        <NotificationsActiveOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
    },
    {
      name: "help-support",
      label: "Help and Support",
      sectionId: 12,
      targetLink: routes.helpSupport(),
      icon: (
        <HelpOutlineOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
    },
    {
      name: "manage",
      label: "Manage",
      sectionId: 13,
      targetLink: routes.manageUsers(),
      activeBasePath: routes.manage(),
      icon: (
        <SettingsOutlinedIcon
          style={{
            color: theme.customColor.sidebar.icon,
          }}
        />
      ),
      submenu: [
        {
          name: "users",
          label: "Users",
          sectionId: 13,
          targetLink: routes.manageUsers(),
          icon: (
            <GroupOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
        {
          name: "roles",
          label: "Roles",
          sectionId: 14,
          targetLink: routes.manageRoles(),
          icon: (
            <AssignmentIndOutlinedIcon
              style={{
                color: theme.customColor.sidebar.subIcon,
                fontSize: "20px",
              }}
            />
          ),
        },
      ],
    },
  ];

  const filterList = (list: ListItem[]): ListItem[] => {
    return list.reduce((filtered: ListItem[], item) => {
      if (checkReadAccess(item.sectionId)) {
        const newItem = { ...item };
        if (newItem.submenu) {
          // Check if submenu is defined before filtering it
          newItem.submenu = filterList(newItem.submenu);
        }
        filtered.push(newItem);
      }
      return filtered;
    }, []);
  };

  const filteredList = filterList(list);

  return filteredList;
  // return list;
};
