import React from "react";
import '../../static/css/Global/LoginRequest.css'
import { Link, useNavigate } from "react-router-dom";
import loginRequestStore from "../Store/LoginRequest";
function LoginRequest() {
    const navigate = useNavigate();
    // global state
    const { loginRequest,  setLoginRequest, prePageOption, setPrePageOption, loginRequestMembership, setLoginRequestMembership  } = loginRequestStore();

    function loginRequestClose() {
        if (prePageOption) {
            setLoginRequest(false);
            setPrePageOption(false);
            setLoginRequestMembership(false);
            navigate(-1);
        } else {
            setLoginRequestMembership(false)
            setLoginRequest(false);
        }
    }

    return (
        <div className={`login_request_main_frame ${loginRequest ? 'open' : null}`}>
            <div className="login_request_frame">
                <span className="g_font_18 g_text_color_1 Pre_KR_SemiBold" style={{marginTop: '8px'}}>
                    {!loginRequestMembership ? (
                        '알림'
                    ) : (
                        '멤버십 컨텐츠는 로그인이 필요해요'
                    )}
                </span>
                {!loginRequestMembership ? (
                    <span className="g_font_15 g_text_color_2 Pre_KR_Medium">
                        로그인이 필요한 서비스입니다. <br />
                        로그인하시겠습니까?
                    </span>
                ) : (
                    <span className="g_font_15 g_text_color_2 Pre_KR_Medium">
                        로그인 후 더 많은 서비스를 이용해 보세요!
                    </span>   
                )}
                <div className="login_request_decision_frame">
                    <div className="login_decision_button cancel Pre_KR_Medium" onClick={() => loginRequestClose()}>취소</div>
                    <Link className="login_decision_button login Pre_KR_Medium" to={'/login'} onClick={() => setLoginRequest(false)}>로그인</Link>
                </div>
            </div>
        </div>
    )
};

export default LoginRequest