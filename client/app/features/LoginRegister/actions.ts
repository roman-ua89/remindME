import { ILogin } from '@/app/features/LoginRegister/types';
import { LoginFormSchema } from '@/app/features/LoginRegister/lib/zod-login-schema';


export const login = ({email, password}: ILogin) => {
    const validatedFields = LoginFormSchema.safeParse({
        email,
        password,
    })

    console.log('validatedFields', validatedFields);
}