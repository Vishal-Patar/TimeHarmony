import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { ROLE_PATH } from './path';

export const useGetRoles = () => {
    const getRoles = async () => {
        const { data } = await ssoApiService().get(ROLE_PATH.ROLE_LIST);
        return data
    }

    return useQuery({
        queryKey: ['useGetRoles'],
        queryFn: getRoles
    })
}
