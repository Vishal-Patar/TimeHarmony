import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { ROLE_PATH } from "./path";
import { enqueueSnackbar } from "notistack";

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
    if (!id) {
      throw new Error("Role ID is required.");
    }

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
      enqueueSnackbar("Updated Successfully", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const createRole = async (request: any) => {
    const { data } = await ssoApiService().post(ROLE_PATH.ROLE_CREATE, request);

    return data;
  };
  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useCreateRole"] });
      enqueueSnackbar("Created Successfully", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  const deleteRole = async (id: string) => {
    if (!id) {
      throw new Error("Role ID is required.");
    }

    const { data } = await ssoApiService().delete(
      `${ROLE_PATH.ROLE_LIST}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => deleteRole(request?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};
