import React from 'react';

type Props = {
    goToRegistrationHandler: () => void;
};

export const LoginForm = ({ goToRegistrationHandler }: Props) => {
    return (
        <form>
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
        </form>
    );
};
