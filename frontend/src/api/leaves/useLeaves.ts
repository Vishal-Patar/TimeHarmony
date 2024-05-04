import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { LEAVE_PATH } from "./path";
import { enqueueSnackbar } from "notistack";

export const useGetLeaveTypes = () => {
  const getLeaveTypes = async () => {
    const { data } = await ssoApiService().get(LEAVE_PATH.LEAVE_TYPE_LIST);
    return data;
  };

  return useQuery({
    queryKey: ["useGetLeaveTypes"],
    queryFn: getLeaveTypes,
  });
};

export const useGetMyLeave = (employeeId: string) => {

  const getMyLeave = async () => {
    if (!employeeId) return;
    const { data } = await ssoApiService().get(
      LEAVE_PATH.EMPLOYEE_LEAVE + "/" + employeeId
    );
    return data;
  };

  return useQuery({
    queryKey: ["useGetMyLeave"],
    queryFn: getMyLeave,
  });
};

export const useCreateLeaveType = () => {
  const queryClient = useQueryClient();
  const createLeaveType = async (request: any) => {
    const { data } = await ssoApiService().post(LEAVE_PATH.LEAVE_TYPE_LIST, request);

    return data;
  };
  return useMutation({
    mutationFn: createLeaveType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useCreateLeaveType"] });
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

export const useGetLeaveTypeById = (Id: string) => {
  const getLeaveTypeById = async () => {
    const { data } = await ssoApiService().get(`${LEAVE_PATH.LEAVE_TYPE_LIST}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetLeaveTypeById", Id],
    queryFn: getLeaveTypeById,
    enabled: !!Id
  });
};

export const useUpdateLeaveType = () => {
  const queryClient = useQueryClient();
  const updateLeaveType = async (id: string, request: any) => {
    if (!id) {
      throw new Error("Leave Type ID is required.");
    }

    const { data } = await ssoApiService().patch(
      `${LEAVE_PATH.LEAVE_TYPE_LIST}/${id}`,
      request
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => updateLeaveType(request?.id, request?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetLeaveTypes"] });
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

export const useDeleteLeaveType = () => {
  const queryClient = useQueryClient();
  const deleteLeaveType = async (id: string) => {
    if (!id) {
      throw new Error("LeaveType ID is required.");
    }

    const { data } = await ssoApiService().delete(
      `${LEAVE_PATH.LEAVE_TYPE_LIST}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: (request: any) => deleteLeaveType(request?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetLeaveTypes"] });
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

export const useApplyLeave = () => {
  // const queryClient = useQueryClient();
  const applyLeave = async (request: any) => {
    const { data } = await ssoApiService().post(LEAVE_PATH.LEAVE_APPLY, request);

    return data;
  };
  return useMutation({
    mutationFn: applyLeave,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["useCreateLeaveType"] });
      enqueueSnackbar("Applied Successfully", {
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

export const useGetLeaveRequests = (Id: string) => {
  const getLeaveRequests = async () => {
    const { data } = await ssoApiService().get(`${LEAVE_PATH.LEAVE_REQUEST}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetLeaveRequests"],
    queryFn: getLeaveRequests,
    enabled: !!Id
  });
};

export const useGetAppliedRequests = (Id: string) => {
  const getAppliedRequests = async () => {
    const { data } = await ssoApiService().get(`${LEAVE_PATH.LEAVE_APPLIED}/${Id}`);
    return data;
  };

  return useQuery({
    queryKey: ["useGetAppliedRequests"],
    queryFn: getAppliedRequests,
    enabled: !!Id
  });
};

export const useRejectLeave = () => {
  const queryClient = useQueryClient();
  const rejectLeave = async (id: string) => {
    if (!id) {
      throw new Error("Leave ID is required.");
    }

    const { data } = await ssoApiService().post(
      `${LEAVE_PATH.LEAVE_REJECT}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: rejectLeave,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetLeaveRequests"] });
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

export const useApproveLeave = () => {
  const queryClient = useQueryClient();
  const approveLeave = async (id: string) => {
    if (!id) {
      throw new Error("Leave ID is required.");
    }

    const { data } = await ssoApiService().post(
      `${LEAVE_PATH.LEAVE_APPROVE}/${id}`
    );

    return data;
  };
  return useMutation({
    mutationFn: approveLeave,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["useGetLeaveRequests"] });
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
