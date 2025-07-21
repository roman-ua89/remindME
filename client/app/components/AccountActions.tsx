import React, { useState } from 'react';
import { ModalWindow } from '@/app/components/ModalWindow';
import { LoginForm } from '@/app/components/LoginForm';
import { RegisterForm } from '@/app/components/RegisterForm';

export const AccountActions = () => {
    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isRegisterModalOpened, setIsRegisterModalOpened] = useState(false);

    const openLoginModal = () => setIsLoginModalOpened(true);
    const closeLoginModal = () => setIsLoginModalOpened(false);

    const openRegisterModal = () => setIsRegisterModalOpened(true);
    const closeRegisterModal = () => setIsRegisterModalOpened(false);

    const isLoggedIn = false;

    const showLoginFormHandler = () => {
        openLoginModal();
    };

    const openLoginFormHandler = () => {
        closeRegisterModal();
        openLoginModal();
    }

    const openRegisterFormHandler = () => {
        closeLoginModal();
        openRegisterModal();
    }

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
            {isLoginModalOpened && (
                <ModalWindow
                    content={<LoginForm goToRegistrationHandler={openRegisterFormHandler} />}
                    title="Login form"
                    onClose={closeLoginModal}
                    onCloseBtnLabel="Close"
                    onAccept={closeLoginModal}
                    onAcceptBtnLabel="Login"
                    isOpen={isLoginModalOpened}
                />
            )}
            {isRegisterModalOpened && (
                <ModalWindow
                    content={<RegisterForm goToLoginHandler={openLoginFormHandler} />}
                    title="Register form"
                    onClose={closeRegisterModal}
                    onCloseBtnLabel="Close"
                    onAccept={closeRegisterModal}
                    onAcceptBtnLabel="Register"
                    isOpen={isRegisterModalOpened}
                />
            )}
        </div>
    );
};
