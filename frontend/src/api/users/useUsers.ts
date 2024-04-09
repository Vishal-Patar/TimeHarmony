import { useMutation, useQuery } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { USER_PATH } from "./path";

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
      localStorage.setItem("accessToken", data?.accessToken);
      console.log("user created successfully", data);
    },
    onError: (error, variables, context) => {
      console.log(error, variables, context);
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
      data?.accessToken &&
        localStorage.setItem("accessToken", data?.accessToken);
    },
  });
};
