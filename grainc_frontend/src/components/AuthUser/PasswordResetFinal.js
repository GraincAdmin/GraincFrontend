import React, { useState } from "react";
import '../../static/css/AuthUser/PasswordResetFinal.css'
import { Link, useNavigate } from "react-router-dom";
import LoadingCircle from "../Global/LoadingCircle";
import useAxios from "../../axiosAPIClient";
import SnackBarStore from "../Store/SnackBarStore";
function PasswordResetFinal({email, verification_code}) {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(false);

    const { showSnackBar } = SnackBarStore();

    // Password change

    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);

    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const passwordValidityCheck = () => {
        if (password1 !== password2) {
            setPasswordError(true);
            setErrorMessage('비밀번호가 일치하지 않습니다.')
        } else {
            setPasswordError(false);
            setErrorMessage(null);
        }
    }

    const passwordPatternCheck = () => {
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/;

        if (!passwordRegex.test(password1)) {
            setPasswordError(true);
            setErrorMessage('비밀번호는 대문자, 소문자, 숫자 및 특수문자(!@#$%&*)를 포함하여 8자 이상이어야 합니다.');
        } else {
            setPasswordError(false);
            setErrorMessage(null);
        }
    }

    const fetchNewPassword = async () => {
        if (!passwordError) {
            try {
                const response = await apiClient.post(`/password_reset_authentication/`, {
                    type: 'password_change',
                    email: email,
                    verification_code: verification_code,
                    password: password1
                })
                setLoading(true);
                if (response.status === 200) {
                    setPasswordChanged(true);
                }
            } catch(error) {
                showSnackBar('비밀번호를 변경하던 중 문제가 발생했습니다.', 'error');
            }
        }
    }

    // Password Change Complete

    const [passwordChanged, setPasswordChanged] = useState(false);

    return (
        <>
            <form className="password_reset_cover_frame">
                <div className="sellreports_password_reset_frame">
                    <div className="password_reset_title Pre_KR_Normal">비밀번호 재설정</div>
                    <div className="password_reset_input_frame" id="password_field">
                        <span className="password_reset_input_title_text Pre_KR_Normal">비밀번호</span>
                        <input 
                            className="password_reset_input Pre_KR_Normal" 
                            type="password"
                            onChange={(e) => setPassword1(e.target.value)}
                            onBlur={() => passwordPatternCheck()}
                            placeholder="8자이상 대문자 특수문자 포함" /> 
                    </div>
                    <div className="password_reset_input_frame" id="password_check_field">
                        <span className="password_reset_input_title_text Pre_KR_Normal">비밀번호 확인</span>
                        <input 
                            className="password_reset_input Pre_KR_Normal" 
                            type="password" 
                            onChange={(e) => setPassword2(e.target.value)}
                            onBlur={() => passwordValidityCheck()}
                            placeholder="비밀번호 확인" /> 
                        {passwordError ? (
                            <span className="password_reset_error Pre_KR_Normal">{errorMessage}</span>
                        ) : null}
                    </div>
                    <div className="password_reset_button Pre_KR_Medium" id="password_reset_button" onClick={() => fetchNewPassword()}>
                        {!loading ? (
                            '비밀번호 재설정'
                        ) : (
                            <LoadingCircle />
                        )}
                    </div>
                </div>
            </form>
            <div className={`password_change_complete_main_frame ${passwordChanged ? 'open' : null}`}>
                <div className="password_change_complete_frame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <rect width="52" height="52" rx="26" fill="#0066FF" fill-opacity="0.05"/>
                        <mask id="mask0_1507_125" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="10" y="10" width="32" height="32">
                        <rect x="10" y="10" width="32" height="32" rx="1.5" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1507_125)">
                        <path d="M23.7974 32.9395C23.2116 33.5253 22.2618 33.5253 21.6761 32.9395L16.0867 27.3501C15.562 26.8255 15.562 25.9748 16.0867 25.4501V25.4501C16.6114 24.9255 17.462 24.9255 17.9867 25.4501L21.6761 29.1395C22.2618 29.7253 23.2116 29.7253 23.7974 29.1395L34.0201 18.9168C34.5447 18.3921 35.3954 18.3921 35.9201 18.9168V18.9168C36.4447 19.4415 36.4447 20.2921 35.9201 20.8168L23.7974 32.9395Z" fill="#0066FF"/>
                        </g>
                    </svg>
                    <span className="password_change_complete_main_text Pre_KR_SemiBold">비밀번호 변경완료</span>
                    <span className="password_change_complete_sub_text Pre_KR_Medium">
                        로그인 후 커뮤니티에서 <br/>
                        소통해보세요
                    </span>
                    <Link 
                        className="email_authentication_button Pre_KR_Medium" 
                        style={{marginTop: '24px'}}
                        to={'/login'}>
                        로그인
                    </Link>
                </div>
            </div>
        </>
    );
};


export default PasswordResetFinal