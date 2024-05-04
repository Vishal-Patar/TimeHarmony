import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { DESIGNATION_PATH } from './path';
import { enqueueSnackbar } from 'notistack';

export const useGetDesignations = () => {
  const getDesignations = async () => {
    const { data } = await ssoApiService().get(DESIGNATION_PATH.DESIGNATION_LIST);
    return data
  }

  return useQuery({
    queryKey: ['useGetDesignations'],
    queryFn: getDesignations
  })
}

export const useGetDesignationById = (Id: string) => {
  const getDesignationById = async () => {
    const { data } = await ssoApiService().get(`${DESIGNATION_PATH.DESIGNATION_LIST}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetDesignationById", Id],
    queryFn: getDesignationById,
    enabled: !!Id
  });
};

export const useUpdateDesignation = () => {
  const queryClient = useQueryClient();
  const updateDepartment = async (id: string, request: any) => {
    if (!id) {
      throw new Error("Designation ID is required.");
    }

    const { data } = await ssoApiService().patch(
      `${DESIGNATION_PATH.DESIGNATION_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateDepartment(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetDesignations"] });
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

export const useCreateDesignation = () => {
  const queryClient = useQueryClient();
  const createDesignation = async (request: any) => {
    const { data } = await ssoApiService().post(DESIGNATION_PATH.DESIGNATION_LIST, request);

    return data;
  };
  return useMutation({
    mutationFn: createDesignation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useCreateDesignation"] });
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

export const useDeleteDesignation = () => {
  const queryClient = useQueryClient();
  const deleteDesignation = async (id: string) => {
    if (!id) {
      throw new Error("Designation ID is required.");
    }

    const { data } = await ssoApiService().delete(
      `${DESIGNATION_PATH.DESIGNATION_LIST}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => deleteDesignation(request?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetDesignations"] });
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
