import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { DEPARTMENT_PATH } from './path';

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
