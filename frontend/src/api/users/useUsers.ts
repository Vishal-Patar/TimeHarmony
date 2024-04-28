import { useMutation, useQuery } from "@tanstack/react-query";
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
    onError: (error) => {
      enqueueSnackbar(error?.message ?? "Error", {
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
        onError: (error) => {
      enqueueSnackbar(error?.message ?? "Error", {
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
