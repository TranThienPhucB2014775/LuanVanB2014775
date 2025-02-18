import React from "react";
import {Link} from "react-router-dom";
import LoginForm from "./common/login-form";
import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import Illustration from "@/assets/images/auth/ils1.svg";

const login = () => {
    const [isDark] = useDarkMode();
    return (
        <div className="loginwrapper">
            <div className="lg-inner-column">
                <div className="right-column relative">
                    <div className="inner-content h-full flex items-center justify-center bg-white dark:bg-slate-800">
                        <div className="auth-box flex flex-col justify-center shadow-2xl">
                            <div className="text-center 2xl:mb-10 mb-4">
                                <h4 className="font-medium">Sign in</h4>
                                <div className="text-slate-500 text-base">
                                    Sign in to your account to start using Dashcode
                                </div>
                            </div>
                            <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
