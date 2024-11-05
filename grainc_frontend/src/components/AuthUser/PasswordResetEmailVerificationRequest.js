import React, { useState } from "react";
import '../../static/css/AuthUser/EmailVerificationRequest.css'
import useAxios from "../../axiosAPIClient";
import PasswordResetFinal from "./PasswordResetFinal";
import LoadingCircle from "../Global/LoadingCircle";
function PasswordResetEmailVerificationRequest({ email }) {

    const apiClient = useAxios();

    // Verification Handle
    const [verificationCode, setVerificationCode] = useState(null);
    const [verificationError, setVerificationError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerification = async () => {
        try {
            setLoading(true);
            const response = await apiClient.post('/password_reset_authentication/', {
                type: 'verification',
                email: email,
                verification_code: verificationCode
            })
            if (response.status == 200) {
                setPasswordResetPage(true);
                setLoading(false);
            }
        } catch(error) {
            setLoading(false);
            setEmailResend(false);
            setVerificationError(error.response.data.message);
        }
    }

    const [emailResend, setEmailResend] = useState(false);
    const handleEmailResend = async () => {
        try {
            const response = await apiClient.post('/password_reset_request/', {
                email: email
            });    

            if (response.status === 200) {
                setEmailResend(true);
                setVerificationError(null);
            }
        } catch(error) {
            setEmailResend(false);
            setVerificationError('이메일 재전송에 실패했습니다.');
        }
    }
    
    // Password Reset

    const [passwordResetPage, setPasswordResetPage] = useState(false);


    return (
        <>
            {!passwordResetPage ? (
                <div className="email_authentication_request_cover_frame">
                    <div className="sellreports_email_authentication_request_frame">
                        <div className="email_authentication_request_title Pre_KR_Normal">이메일 인증 코드를 입력하세요.</div>
                        <span className="email_authentication_request_main_text Pre_KR_Normal" style={{marginTop:'24px'}}>
                            <span className="Pre_KR_Medium" style={{color:'#000'}}>{email}</span> 으로 회원가입 이메일 인증코드를 전달했습니다. <br/> 1시간 이내에 이메일에 있는 인증코드를 입력해 주세요.
                        </span>
                        <div className="email_authentication_input_frame" style={{paddingTop: '24px'}}>
                            <span className="email_authentication_subtext_black Pre_KR_Normal">인증코드</span>
                            <input className="email_authentication_input Pre_KR_Normal" 
                                placeholder="인증코드 6자리를 입력해주세요."
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            {verificationError && (
                                <span style={{color:'#ff0000', fontSize:'14px'}}>{verificationError}</span>
                            )}
                            {emailResend && (
                                <span style={{color:'#0066FF', fontSize:'14px'}}>이메일이 재전송 되었습니다</span>
                            )}
                            <div 
                                className="email_authentication_subtext_black Pre_KR_Medium" 
                                style={{marginTop:'16px', cursor:'pointer'}}
                                onClick={() => handleEmailResend()}>
                                이메일 재전송
                            </div>
                        </div>
                        <div className="email_authentication_error_guideline_frame">
                            <span className="email_authentication_guideline_text Pre_KR_Normal" style={{marginTop: '0px'}}>이메일 수신되지 않는 경우</span>
                            <span className="email_authentication_guideline_text Pre_KR_Normal" style={{marginTop: '16px'}}>· 입력하신 이메일 아이디 주소가 정확한지 확인해 주세요.</span>
                            <span className="email_authentication_guideline_text Pre_KR_Normal">· 스팸 메일함을 확인해주세요.</span>
                            <span className="email_authentication_guideline_text Pre_KR_Normal">· 메일함 용량을 정리해주세요.</span>
                        </div>
                        <div className="email_authentication_button Pre_KR_Medium" onClick={() => handleVerification()}>
                            {!loading ? (
                                '이메일 인증'
                            ) : (
                                <LoadingCircle />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <PasswordResetFinal email={email} verification_code={verificationCode}/>
            )}
        </>
    )
}

export default PasswordResetEmailVerificationRequest
