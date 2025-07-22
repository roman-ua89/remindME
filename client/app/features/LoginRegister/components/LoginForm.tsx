import React, { useActionState } from 'react';
import { login } from '@/app/features/LoginRegister/actions';
import { useAppDispatch } from '@/store/hooks';
import { setIsLoginFormVisible, setIsRegisterFormVisible } from '@/store/features/global/globalSlice';

export const LoginForm = () => {
    // const [loginState, loginAction, isPending] = useActionState(login, undefined);
    const dispatch = useAppDispatch();

    const goToRegistrationHandler = () => {
        dispatch(setIsLoginFormVisible(false));
        dispatch(setIsRegisterFormVisible(true));
    }

    const onCloseHandler = () => {
        dispatch(setIsLoginFormVisible(false));
    }

    const onLoginHandler = () => {
        console.log('do login');
    }

    return (
        <form className="block">
            <div className="py-3 px-4">
                <div className="form-line">
                    <label htmlFor="login-e-mail" className="form-label">
                        E-mail
                    </label>
                    <input id="login-e-mail" type="email" className="input-style min-w-70" />
                </div>
                <div className="form-line">
                    <label htmlFor="login-password" className="form-label">
                        Username
                    </label>
                    <input id="login-password" type="text" className="input-style min-w-70" />
                </div>
                <div>
                    Do not have account?&nbsp;
                    <a href="#" className="text-blue-400 hover:text-blue-500" onClick={goToRegistrationHandler}>
                        Register
                    </a>
                </div>
            </div>
            <div className="border-t-1 border-gray-100 bg-gray-50 p-3 flex flex-row-reverse gap-3">
                <button
                    onClick={onCloseHandler}
                    type="button"
                    className="cursor-pointer inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto"
                >
                    Close
                </button>
                <button
                    onClick={onLoginHandler}
                    type="button"
                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Login
                </button>
            </div>
        </form>
    );
};
