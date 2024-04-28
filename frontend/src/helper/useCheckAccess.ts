import { checkReadAccess, checkWriteAccess } from "./permission";

const useCheckAccess = (sectionId: number) => {
  const hasReadAccess = checkReadAccess(sectionId);
  const hasWriteAccess = checkWriteAccess(sectionId);

  return { hasReadAccess, hasWriteAccess };
};

export default useCheckAccess;
