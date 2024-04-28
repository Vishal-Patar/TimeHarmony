import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { USER_PATH } from "./path";
import { enqueueSnackbar } from "notistack";

export const useGetUsers = () => {
  const getUsers = async () => {
    const { data } = await ssoApiService().get(USER_PATH.USER_LIST);
    return data;
  };

  return useQuery({
    queryKey: ["useGetUsers"],
    queryFn: getUsers,
  });
};

export const useRegisterUser = () => {
  const registerUser = async (request: any) => {
    const { data } = await ssoApiService().post(
      USER_PATH.REGISTER_USER,
      request
    );

    return data;
  };

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.accessToken) {
        updateLocalStorage(data);
      }
      enqueueSnackbar(data?.message ?? "Successful", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};

export const useLoginUser = () => {
  const loginUser = async (request: any) => {
    const { data } = await ssoApiService().post(USER_PATH.LOGIN_USER, request);
    return data;
  };

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.accessToken) {
        updateLocalStorage(data);
      }
      enqueueSnackbar(data?.message ?? "Successful", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};

export const useGetUserById = (Id: string) => {
  const getUserById = async () => {
    const { data } = await ssoApiService().get(USER_PATH.USER_LIST + "/" + Id);
    return data;
  };

  return useQuery({
    queryKey: ["useGetUserById"],
    queryFn: getUserById,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUser = async (id: string, request: any) => {
    const { data } = await ssoApiService().patch(
      `${USER_PATH.USER_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateUser(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetUsers"] });
      enqueueSnackbar(data?.message ?? "Updated Successfully", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message ?? "Error", {
        variant: "error",
      });
    },
  });
};

const updateLocalStorage = (data: any) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("employee", JSON.stringify(data.employee));
};
