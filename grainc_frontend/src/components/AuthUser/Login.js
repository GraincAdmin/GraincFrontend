import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/AuthUser/Login.css'; // Adjust the path based on the directory structure
import AuthContext from "../../context/AuthContext";
import LoadingCircle from '../Global/LoadingCircle';
import SocialLogin from './SocialLogin';
function Login() {
    const { loginUser, loginError, setLoginError } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email.length > 0) {
            setLoginError(false)
            loginUser(email, password);
            setLoading(true);
        }
    };

    const [loading, setLoading] = useState(false);

    return (
        <form className="login_cover_frame" id="login_form" onSubmit={handleSubmit}>
            <div className="sellreports_login_frame">
                <div className="login_title Pre_KR_Normal">로그인</div>
                <div className="login_input_frame">
                    <span className="login_input_title_text Pre_KR_Normal">이메일</span>
                    <input className="login_input Pre_KR_Normal" type="email" id='email' placeholder="이메일을 입력해주세요" />
                </div>
                <div className="login_input_frame">
                    <span className="login_input_title_text Pre_KR_Normal">비밀번호</span>
                    <input className="login_input Pre_KR_Normal" type="password" id='password' placeholder="비밀번호를 입력해주세요" />
                </div>
                {loginError ? (
                    <span className="login_error Pre_KR_Normal" id="login_error">잘못된 이메일또는 비밀번호입니다</span>
                ) : null}
                <button className="login_button Pre_KR_Medium" type='submit' id="login_button" >
                    {loading && !loginError ? (
                        <LoadingCircle />
                    ) : (
                        '로그인'
                    )}
                </button>
                <Link className="login_agreement_text Pre_KR_Normal" to={'/password_reset'}>비밀번호 찾기</Link>
                <SocialLogin page_type={'login'}/>
                <span className="user_signup_link Pre_KR_Normal">셀리포트 회원이 아니신가요? <Link style={{color:"#0066ff", marginLeft:"4px", textDecoration:"none"}} to={'/signup'}>회원가입</Link></span>
            </div>
        </form>
    );
};

export default Login;
