import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { USER_PATH } from './path'

export const useGetUsers = () => {
    const getUsers = async () => {
        const { data } = await ssoApiService().get(USER_PATH.USER_LIST);
        return data
    }

    return useQuery({
        queryKey: ['useGetUsers'],
        queryFn: getUsers
    })
}
