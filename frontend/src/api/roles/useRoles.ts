import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { ROLE_PATH } from "./path";

export const useGetRoles = () => {
  const getRoles = async () => {
    const { data } = await ssoApiService().get(ROLE_PATH.ROLE_LIST);
    return data;
  };

  return useQuery({
    queryKey: ["useGetRoles"],
    queryFn: getRoles,
  });
};

export const useGetRoleById = (Id: string) => {
  const getRoleById = async () => {
    const { data } = await ssoApiService().get(`${ROLE_PATH.ROLE_LIST}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetRoleById", Id],
    queryFn: getRoleById,
    enabled: !!Id,
  });
};

export const useUpdateRoles = () => {
  const queryClient = useQueryClient();
  const updateRoles = async (id: string, request: any) => {
    const { data } = await ssoApiService().patch(
      `${ROLE_PATH.ROLE_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateRoles(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
  });
};
