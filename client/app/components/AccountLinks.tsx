import React from 'react';
import { ModalWindow } from '@/app/components/ModalWindow';
import { LoginForm, RegisterForm } from '@/app/features/LoginRegister';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLoginFormVisible } from '@/store/features/global/globalSlice';

export const AccountLinks = () => {
    const isLoginFormVisible = useAppSelector((state) => state.globalState.isLoginFormVisible);
    const isRegisterFormVisible = useAppSelector((state) => state.globalState.isRegisterFormVisible);
    const isLoggedIn = useAppSelector((state) => state.globalState.isLoggedIn);
    const dispatch = useAppDispatch();

    const showLoginFormHandler = () => {
        dispatch(setIsLoginFormVisible(true));
    };

    return (
        <div className="absolute top-0 right-0">
            <ul className="flex gap-4 pt-1">
                {isLoggedIn ? (
                    <>
                        <li>
                            <a href="#" className="account-links">
                                Logout
                            </a>
                        </li>
                        <li>
                            <a href="#" className="account-links">
                                Account
                            </a>
                        </li>
                    </>
                ) : (
                    <li>
                        <a href="#" className="account-links" onClick={showLoginFormHandler}>
                            Login / Register
                        </a>
                    </li>
                )}
            </ul>
            {isLoginFormVisible && (
                <ModalWindow
                    content={<LoginForm />}
                    title="Login form"
                    isOpen={isLoginFormVisible}
                />
            )}
            {isRegisterFormVisible && (
                <ModalWindow
                    content={<RegisterForm />}
                    title="Register form"
                    isOpen={isRegisterFormVisible}
                />
            )}
        </div>
    );
};
