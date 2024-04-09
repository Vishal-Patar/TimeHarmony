import { useQuery } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { DESIGNATION_PATH } from './path';

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
