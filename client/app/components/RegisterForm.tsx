import React from 'react';

type Props = {
    goToLoginHandler: () => void;
};

export const RegisterForm = ({ goToLoginHandler }: Props) => {
    return (
        <form>
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
        </form>
    );
};
