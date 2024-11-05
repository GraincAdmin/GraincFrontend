import React from "react";
import SocialLogin from "./SocialLogin";
import '../../static/css/AuthUser/WrongLoginMethod.css'
function WrongLoginMethod({open ,email, method}) {
    return (
        <div className={`wrong_login_method_main_frame ${open ? 'open' : null}`}>
            <div className="wrong_login_method_frame">
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <rect width="52" height="52" rx="26" fill="#FF0000" fill-opacity="0.05"/>
                    <mask id="mask0_1519_6" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="10" y="10" width="32" height="32">
                    <rect x="10" y="10" width="32" height="32" rx="1" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_1519_6)">
                    <path d="M19.2398 34.6275C18.8493 35.0181 18.2161 35.0181 17.8256 34.6275L17.3731 34.1751C16.9826 33.7846 16.9826 33.1514 17.3731 32.7609L23.4256 26.7084C23.8161 26.3179 23.8161 25.6847 23.4256 25.2942L17.3731 19.2417C16.9826 18.8512 16.9826 18.2181 17.3731 17.8275L17.8256 17.3751C18.2161 16.9846 18.8493 16.9846 19.2398 17.3751L25.2922 23.4275C25.6828 23.8181 26.3159 23.8181 26.7065 23.4275L32.7589 17.3751C33.1494 16.9846 33.7826 16.9846 34.1731 17.3751L34.6256 17.8275C35.0161 18.2181 35.0161 18.8512 34.6256 19.2417L28.5731 25.2942C28.1826 25.6847 28.1826 26.3179 28.5731 26.7084L34.6256 32.7609C35.0161 33.1514 35.0161 33.7846 34.6256 34.1751L34.1731 34.6275C33.7826 35.0181 33.1494 35.0181 32.7589 34.6275L26.7065 28.5751C26.3159 28.1846 25.6828 28.1846 25.2922 28.5751L19.2398 34.6275Z" fill="#FF0000"/>
                    </g>
                </svg>
                <span className="wrong_login_method_main_text Pre_KR_SemiBold">다른 로그인 방식</span>
                <span className="wrong_login_method_sub_text Pre_KR_Medium">
                    {email} 은 <br/>
                    {method === 'email' && (
                        '이메일'
                    )}
                    {method === 'google' && (
                        '구글'
                    )}
                    {method === 'naver' && (
                        '네이버'
                    )}
                    {method === 'kakao' && (
                        '카카오'
                    )}
                    로 연동되어 있습니다
                </span>
                <SocialLogin page_type={'login'} wrong_login={method}/>
            </div>
        </div>
    );
};

export default WrongLoginMethod