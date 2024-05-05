import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ssoApiService } from "../services/ssoApiService";
import { ATTENDANCE_PATH } from "./path";
import { enqueueSnackbar } from "notistack";

export const useIsCheckin = (Id: string) => {
    const isCheckIn = async () => {
        const { data } = await ssoApiService().get(`${ATTENDANCE_PATH.ATTENDANCE_IS_CHECKIN}/${Id}`);
        return data;
    };

    return useQuery({
        queryKey: ["useIsCheckin"],
        queryFn: isCheckIn,
        enabled: !!Id
    });
};

export const useGetAttendance = (Id: string) => {
    const getAttendance = async () => {
        const { data } = await ssoApiService().get(`${ATTENDANCE_PATH.ATTENDANCE_LIST}/${Id}`);
        return data;
    };

    return useQuery({
        queryKey: ["useGetAttendance"],
        queryFn: getAttendance,
        enabled: !!Id
    });
};

export const useGetAllAttendance = () => {
    const getAllAttendance = async () => {
        const { data } = await ssoApiService().get(ATTENDANCE_PATH.ATTENDANCE_LIST);
        return data
    }

    return useQuery({
        queryKey: ['useGetAllAttendance'],
        queryFn: getAllAttendance
    })
}


export const useCheckIn = () => {
    const queryClient = useQueryClient();
    const checkIn = async (id: string) => {
        if (!id) {
            throw new Error("Employee ID is required.");
        }

        const { data } = await ssoApiService().post(
            `${ATTENDANCE_PATH.ATTENDANCE_CHECKIN}/${id}`
        );

        return data;
    };
    return useMutation({
        mutationFn: (request: any) => checkIn(request?.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["useIsCheckin"] });
            queryClient.invalidateQueries({ queryKey: ["useGetAttendance"] });
            queryClient.invalidateQueries({ queryKey: ["useGetAttendance"] });
            enqueueSnackbar("Check In Successfully", {
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

export const useCheckOut = () => {
    const queryClient = useQueryClient();
    const checkout = async (id: string) => {
        if (!id) {
            throw new Error("Employee ID is required.");
        }

        const { data } = await ssoApiService().post(
            `${ATTENDANCE_PATH.ATTENDANCE_CHECKOUT}/${id}`
        );

        return data;
    };
    return useMutation({
        mutationFn: (request: any) => checkout(request?.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["useIsCheckin"] });
            queryClient.invalidateQueries({ queryKey: ["useGetAttendance"] });
            queryClient.invalidateQueries({ queryKey: ["useGetAttendance"] });
            enqueueSnackbar("Check Out Successfully", {
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
