import { useTheme } from '../../theme';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import routes from '../../router/routes';

export const MenuItems = () => {
    const theme = useTheme()
    return (
        [
            {
                name: 'dashboard',
                label: 'Dashboard',
                targetLink: routes.dashboard(),
                icon: (
                    <DashboardCustomizeOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                )
            },
            {
                name: 'attendance',
                label: 'Attendance',
                targetLink: routes.attendance(),
                icon: (
                    <EventOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                )
            },
            {
                name: 'leave',
                label: 'Leave',
                targetLink: routes.leave(),
                activeBasePath: routes.leave(),
                icon: (
                    <EventBusyOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                ),
                submenu: [
                    {
                        name: 'view',
                        label: 'View',
                        targetLink: routes.leave(),
                        icon: (
                            <PersonSearchOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                    {
                        name: 'requests',
                        label: 'Requests',
                        targetLink: routes.requestLeave(),
                        icon: (
                            <AssignmentIndOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                    {
                        name: 'manage',
                        label: 'Manage',
                        targetLink: routes.manageLeave(),
                        icon: (
                            <WorkOutlineOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                ]
            },
            {
                name: 'organization',
                label: 'Organization',
                targetLink: routes.employee(),
                activeBasePath: routes.employee(),
                icon: (
                    <BusinessOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                ),
                submenu: [
                    {
                        name: 'employee',
                        label: 'Employees',
                        targetLink: routes.employee(),
                        icon: (
                            <PersonSearchOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                    {
                        name: 'designation',
                        label: 'Designations',
                        targetLink: routes.employeeDesignations(),
                        icon: (
                            <AssignmentIndOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                    {
                        name: 'department',
                        label: 'Department',
                        targetLink: routes.employeeDepartment(),
                        icon: (
                            <WorkOutlineOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                ]
            },
            {
                name: 'profile-settings',
                label: 'Profile and Settings',
                targetLink: routes.profileSettings(),
                icon: (
                    <ManageAccountsOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                )
            },
            {
                name: 'notifications',
                label: 'Notifications',
                targetLink: routes.notifications(),
                icon: (
                    <NotificationsActiveOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                )
            },
            {
                name: 'help-support',
                label: 'Help and Support',
                targetLink: routes.helpSupport(),
                icon: (
                    <HelpOutlineOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                )
            },
            {
                name: 'manage',
                label: 'Manage',
                targetLink: routes.manageUsers(),
                activeBasePath: routes.manage(),
                icon: (
                    <SettingsOutlinedIcon
                        style={{
                            color: theme.customColor.sidebar.icon
                        }}
                    />
                ),
                submenu: [
                    {
                        name: 'users',
                        label: 'Users',
                        targetLink: routes.manageUsers(),
                        icon: (
                            <GroupOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                    {
                        name: 'roles',
                        label: 'Roles',
                        targetLink: routes.manageRoles(),
                        icon: (
                            <AssignmentIndOutlinedIcon
                                style={{
                                    color: theme.customColor.sidebar.subIcon,
                                    fontSize: '20px'
                                }}
                            />
                        ),
                    },
                ]
            },
        ]
    )
}