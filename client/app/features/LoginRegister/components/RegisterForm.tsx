import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setIsLoginFormVisible, setIsRegisterFormVisible } from '@/store/features/global/globalSlice';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();

    const goToLoginHandler = () => {
        dispatch(setIsRegisterFormVisible(false));
        dispatch(setIsLoginFormVisible(true));
    }

    const onCloseHandler = () => {
        dispatch(setIsRegisterFormVisible(false));
    }

    const onRegisterHandler = () => {
        console.log('register!!');
    }

    return (
        <form className="block">
            <div className="py-3 px-4">
                <div className="form-line">
                    <label htmlFor="register-e-mail" className="form-label">
                        E-mail
                    </label>
                    <input id="register-e-mail" type="email" className="input-style min-w-70" />
                </div>
                <div className="form-line">
                    <label htmlFor="register-password" className="form-label">
                        Password
                    </label>
                    <input id="register-password" type="password" className="input-style min-w-70" />
                </div>
                <div className="form-line">
                    <label htmlFor="register-repeat-password" className="form-label">
                        Repeat password
                    </label>
                    <input id="register-repeat-password" type="password" className="input-style min-w-70" />
                </div>
                <div>
                    Already registered?&nbsp;
                    <a href="#" className="text-blue-400 hover:text-blue-500" onClick={goToLoginHandler}>
                        Login
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
                    onClick={onRegisterHandler}
                    type="button"
                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Register
                </button>
            </div>
        </form>
    );
};
