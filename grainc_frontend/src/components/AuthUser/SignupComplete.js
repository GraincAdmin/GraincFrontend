import React, { useContext } from "react";
import '../../static/css/AuthUser/SignupComplete.css'
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function SignupComplete({style, style_control}) {
    const navigate = useNavigate();
    const { logoutUser } = useContext(AuthContext);

    const continueLogin = () => {
        logoutUser();
        style_control(false);
        navigate('/login');
    }
    return (
        <div className={`signup_complete_main_frame ${style ? 'open' : null}`}>
            <div className="signup_complete_frame">
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <rect width="52" height="52" rx="26" fill="#0066FF" fill-opacity="0.05"/>
                    <mask id="mask0_1507_125" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="10" y="10" width="32" height="32">
                    <rect x="10" y="10" width="32" height="32" rx="1.5" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_1507_125)">
                    <path d="M23.7974 32.9395C23.2116 33.5253 22.2618 33.5253 21.6761 32.9395L16.0867 27.3501C15.562 26.8255 15.562 25.9748 16.0867 25.4501V25.4501C16.6114 24.9255 17.462 24.9255 17.9867 25.4501L21.6761 29.1395C22.2618 29.7253 23.2116 29.7253 23.7974 29.1395L34.0201 18.9168C34.5447 18.3921 35.3954 18.3921 35.9201 18.9168V18.9168C36.4447 19.4415 36.4447 20.2921 35.9201 20.8168L23.7974 32.9395Z" fill="#0066FF"/>
                    </g>
                </svg>
                <span className="signup_complete_main_text Pre_KR_SemiBold">회원가입 완료</span>
                <span className="signup_complete_sub_text Pre_KR_Medium">
                    지금 바로 커뮤니티에서 <br/>
                    소통해보세요
                </span>
                <div 
                    className="email_authentication_button Pre_KR_Medium" 
                    style={{marginTop: '24px'}}
                    onClick={() => continueLogin()}>
                    로그인
                </div>
            </div>
        </div>
    );
};

export default SignupComplete