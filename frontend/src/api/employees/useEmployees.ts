import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { EMPLOYEE_PATH } from "./path";
import { enqueueSnackbar } from "notistack";

interface GetByUserID {
  userId: string;
}

export const useGetEmployees = () => {
  const getEmployees = async () => {
    const { data } = await ssoApiService().get(EMPLOYEE_PATH.EMPLOYEE_LIST);
    return data;
  };

  return useQuery({
    queryKey: ["useGetEmployees"],
    queryFn: getEmployees,
  });
};

export const useGetEmployeeByUserId = ({ userId }: GetByUserID) => {
  const getEmployeeByUserId = async () => {
    const { data } = await ssoApiService().get(
      EMPLOYEE_PATH.EMPLOYEE_BY_USER + "/" + userId
    );
    return data;
  };

  return useQuery({
    queryKey: ["useGetEmployeeByUserId"],
    queryFn: getEmployeeByUserId,
  });
};

export const useGetEmployeeById = (Id: string) => {
  const getEmployeeById = async () => {
    const { data } = await ssoApiService().get(
      EMPLOYEE_PATH.EMPLOYEE_LIST + "/" + Id
    );
    return data;
  };

  return useQuery({
    queryKey: ["useGetEmployeeById"],
    queryFn: getEmployeeById,
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const updateEmployee = async (id: string, request: any) => {
    const { data } = await ssoApiService().patch(
      `${EMPLOYEE_PATH.EMPLOYEE_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateEmployee(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetEmployees"] });
      enqueueSnackbar(data?.message ?? "Updated Successfully", {
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
