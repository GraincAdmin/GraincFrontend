import React, { useState } from "react";
import '../../static/css/AuthUser/EmailVerificationRequest.css'
import useAxios from "../../axiosAPIClient";
import SignupComplete from "./SignupComplete";
const EmailVerificationRequest = ({email}) => {
    const apiClient = useAxios();

    // Verification Handle
    const [verificationCode, setVerificationCode] = useState(null);
    const [verificationError, setVerificationError] = useState(null);

    const handleVerification = async () => {
        try {
            const response = await apiClient.post('/signup_email_authentication/', {
                verifying_email: email,
                verification_code: verificationCode
            })
            if (response.status === 200) {
                setSignupCompletePopup(true);
                setVerificationError(null);
            }
        } catch(error) {
            if (error.response && error.response.status === 400) {
                setVerificationError(error.response.data.status || '알 수 없는 오류가 발생했습니다. 고객센터에 문의해주세요');
            } else {
                setVerificationError('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }
    }


    // Signup Complete Handle

    const [signupCompletePopup, setSignupCompletePopup] = useState(false);

    return (
        <>
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
                        <div className="email_authentication_subtext_black Pre_KR_Medium" style={{marginTop:'16px', cursor:'pointer'}}>이메일 재전송</div>
                    </div>
                    <div className="email_authentication_error_guideline_frame">
                        <span className="email_authentication_guideline_text Pre_KR_Normal" style={{marginTop: '0px'}}>이메일 수신되지 않는 경우</span>
                        <span className="email_authentication_guideline_text Pre_KR_Normal" style={{marginTop: '16px'}}>· 입력하신 이메일 아이디 주소가 정확한지 확인해 주세요.</span>
                        <span className="email_authentication_guideline_text Pre_KR_Normal">· 스팸 메일함을 확인해주세요.</span>
                        <span className="email_authentication_guideline_text Pre_KR_Normal">· 메일함 용량을 정리해주세요.</span>
                    </div>
                    <div className="email_authentication_button Pre_KR_Medium" onClick={() => handleVerification()}>
                        이메일 인증
                    </div>
                </div>
            </div>
            <SignupComplete style={signupCompletePopup} style_control={setSignupCompletePopup}/>
        </>
    );  
};

export default EmailVerificationRequest