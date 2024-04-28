export const checkReadAccess = (sectionId: number) => {
  const user = JSON.parse(localStorage?.getItem("user") ?? "");
  const userPermissions = user?.role?.permissions;

  const permission = userPermissions.find(
    (perm: { id: number }) => perm.id === sectionId
  );
  return permission ? permission.readAccess : false;
};

export const checkWriteAccess = (sectionId: number) => {
  const user = JSON.parse(localStorage?.getItem("user") ?? "");
  const userPermissions = user?.role?.permissions;

  const permission = userPermissions.find(
    (perm: { id: number }) => perm.id === sectionId
  );

  //   check the read access first, if read access is allowed then only allow write
  return permission && checkReadAccess(sectionId)
    ? permission.writeAccess
    : false;
};
