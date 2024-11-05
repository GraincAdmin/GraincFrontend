import React, { useState } from "react";
import '../../static/css/AuthUser/PasswordReset.css'
import WrongLoginMethod from "./WrongLoginMethod";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../axiosAPIClient";
import LoadingCircle from "../Global/LoadingCircle";
import PasswordResetEmailVerificationRequest from "./PasswordResetEmailVerificationRequest";
function PasswordReset() {
    const apiClient = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userEmail, setUserEmail] = useState(null);


    const [wrongLoginProvider, setWrongLoginProvider] = useState(false);
    const [provider, setProvider] = useState(null);
    
    const fetchUserPasswordReset = async () => {
        try {
            setLoading(true);
            const response = await apiClient.post('/password_reset_request/', {
                email: userEmail
            });    
            if (response.status === 200) {
                setLoading(false);
                setEmailError(false);
                setEmailVerificationPage(true);
            } else if (response.status === 403) {
                setLoading(false);
                setEmailError(true);  // Handle user not found
            } else {
                // Handle other status codes if needed
                setLoading(false);
                setEmailError(true);  // Set an appropriate error state or message
            }
        } catch (error) {
            console.log(error.response)
            setLoading(false);
            setEmailError(true); 
            if (error.response.data.status === 'wrong_provider') {
                setWrongLoginProvider(true);
                setProvider(error.response.data.provider);
            }
        }
    }

    // Email Verification Set

    const [emailVerificationPage, setEmailVerificationPage] = useState(false);

    return (
        <>  
            {!emailVerificationPage ? (
                <>
                    <WrongLoginMethod open={wrongLoginProvider} email={userEmail} method={provider}/>
                    <div className="password_reset_cover_frame">
                        <div className="sellreports_password_reset_frame">
                            <div className="password_reset_title Pre_KR_Normal">비밀번호 찾기</div>
                            <div className="password_reset_input_frame">
                                <span className="password_reset_input_title_text Pre_KR_Normal">이메일</span>
                                <input 
                                    className="password_reset_input email_input Pre_KR_Normal" 
                                    type="email" 
                                    name="email" 
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="가입시 사용한 이메일을 입력해주세요" /> 
                                {emailError && (
                                    <span className="password_reset_email_error Pre_KR_Normal">이메일을 사용한 사용자를 찾을 수 없습니다</span>
                                )}
                            </div>
                            <div className="password_reset_button Pre_KR_Medium" onClick={() => fetchUserPasswordReset()}>
                                {loading ? (
                                    <LoadingCircle />
                                ) : (
                                '비밀번호 찾기'
                                )}
                            </div>
                            <span className="user_password_reset_link Pre_KR_Normal">셀리포트 회원이 아니신가요? <Link style={{color:'#0066FF', marginLeft:'4px', textDecoration:'none'}} to={'/signup'}>회원가입</Link></span>
                        </div>
                    </div>
                </>
            ) : (
                <PasswordResetEmailVerificationRequest email={userEmail} />
            )}
        </>
    );
};

export default PasswordReset