import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { DEPARTMENT_PATH } from './path';
import { enqueueSnackbar } from 'notistack';

export const useGetDepartments = () => {
  const getDepartments = async () => {
    const { data } = await ssoApiService().get(DEPARTMENT_PATH.DEPARTMENT_LIST);
    return data
  }

  return useQuery({
    queryKey: ['useGetDepartments'],
    queryFn: getDepartments
  })
}

export const useGetDepartmentById = (Id: string) => {
  const getDepartmentById = async () => {
    const { data } = await ssoApiService().get(`${DEPARTMENT_PATH.DEPARTMENT_LIST}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetDepartmentById", Id],
    queryFn: getDepartmentById,
    enabled: !!Id
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  const updateDepartment = async (id: string, request: any) => {
    if (!id) {
      throw new Error("Department ID is required.");
    }

    const { data } = await ssoApiService().patch(
      `${DEPARTMENT_PATH.DEPARTMENT_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateDepartment(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetDepartments"] });
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

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  const createDepartment = async (request: any) => {
    const { data } = await ssoApiService().post(DEPARTMENT_PATH.DEPARTMENT_LIST, request);

    return data;
  };
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useCreateDepartment"] });
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

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const deleteDepartment = async (id: string) => {
    if (!id) {
      throw new Error("Department ID is required.");
    }

    const { data } = await ssoApiService().delete(
      `${DEPARTMENT_PATH.DEPARTMENT_LIST}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => deleteDepartment(request?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetDepartments"] });
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
