import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ssoApiService } from '../services/ssoApiService'

export const useGetUsers = () => {
    const getUsers = async () => {
        const { data } = await ssoApiService().get('');
        return data
    }

    return useQuery({
        queryKey: ['useGetUsers'],
        queryFn: getUsers
    })
}
