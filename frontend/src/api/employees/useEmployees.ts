import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { EMPLOYEE_PATH } from './path';

export const useGetEmployees = () => {
    const getEmployees = async () => {
        const { data } = await ssoApiService().get(EMPLOYEE_PATH.EMPLOYEE_LIST);
        return data
    }

    return useQuery({
        queryKey: ['useGetEmployees'],
        queryFn: getEmployees
    })
}
