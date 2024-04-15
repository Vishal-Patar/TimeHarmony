import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { LEAVE_PATH } from './path';

export const useGetLeaveTypes = () => {
    const getLeaveTypes = async () => {
        const { data } = await ssoApiService().get(LEAVE_PATH.LEAVE_TYPE_LIST);
        return data
    }

    return useQuery({
        queryKey: ['useGetLeaveTypes'],
        queryFn: getLeaveTypes
    })
}
