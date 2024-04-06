import { AxiosInstance } from "axios";

export const ssoHeaderInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        async (request) => {
            // modify the request header
            return request;
        },
        async (error) => {
            return Promise.reject(error);
        }
    );
};