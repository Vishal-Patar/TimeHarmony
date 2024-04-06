import { useMutation } from '@tanstack/react-query'
import { ssoApiService } from '../services/ssoApiService'
import { USER_PATH } from './path'

export const useRegisterUser = () => {
    const registerUser = async (request: any) => {
        const { data } = await ssoApiService().post(
            USER_PATH.REGISTER_USER,
            request
        )

        return data
    }

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log("user created successfully", data);
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
    })
}
