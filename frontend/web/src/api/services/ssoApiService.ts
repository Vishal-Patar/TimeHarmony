import axios, { AxiosRequestConfig } from 'axios'
import { config } from './config'
import { ssoHeaderInterceptor } from '../interceptors/ssoHeader'

export const ssoApiService = () => {
    const params: AxiosRequestConfig = {
        baseURL: config.ssoBaseUrl
    }

    const instance = axios.create(params)
    
    ssoHeaderInterceptor(instance)

    return instance
}
