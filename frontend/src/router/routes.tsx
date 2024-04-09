const routes = {
    root: () => '/',
    login: () => 'login',
    register: () => 'register',
    passwordReset: () => 'password-reset',
    dashboard: () => '/dashboard',
    attendance: () => '/attendance',
    employee: () => '/employee',
    leave: () => '/leave',
    employeeDesignations: () => '/employee/designation',
    employeeDepartment: () => '/employee/department',
    profileSettings: () => '/profile-settings',
    notifications: () => '/notifications',
    helpSupport: () => '/help-support',
    manage: () => '/manage',
    manageUsers: () => '/manage/users',
    createUser: () => '/manage/users/add',
    editUser: () => '/manage/users/edit/:id',
    manageRoles: () => '/manage/roles',
}

export default routes