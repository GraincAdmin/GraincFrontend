import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/AuthUser/Signup.css'; // Adjust the path based on the directory structure
import '../../static/css/AuthUser/SocialLogin.css'; // Adjust the path based on the directory structure
import useAxios from '../../axiosAPIClient';
import SocialLogin from './SocialLogin';
// Email Verification Request
import EmailVerificationRequest from './EmailVerificationRequest';
import LoadingCircle from '../Global/LoadingCircle'
import SnackBarStore from '../Store/SnackBarStore';

function Signup() {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();

    // signup option

    const [signupOptionEmail, setSignupOptionEmail] = useState(false);

    // user signup information handel
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);


    // user signup error check
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [password1Error, setPassword1Error] = useState();
    const [password2Error, setPassword2Error] = useState();


    // user email validation check
    const fetchEmailCheck = async () => {
  
        if (email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                console.log(1)
                setEmailError("유효한 이메일을 입력해주세요.");
            } else {
                try {
                    const response = await apiClient.post('/signup_email_check/', {
                        email: email
                    });
                    const validation = response.data.email_error;
                    if (validation === true) {
                        setEmailError('사용된 이메일입니다.')
                    } else {
                        setEmailError(false)
                    }
                } catch(error) {
                    if (error.response.status !== 401) {
                        showSnackBar('이메일을 확인 중 문제가 발생했습니다', 'error')
                    }
                }
            }
        } else {
            setEmailError('이메일을 입력해주세요')
        }
    }

    // user username validation check
    const userUsernameCheck = async () => {
        if (username) {
            try {
                const response = await apiClient.post('/signup_username_check/', {
                    username: username
                });
                const validation = response.data.username_error;
                if (validation === true) {
                    setUsernameError('사용된 프로필 이름입니다')
                } else {
                    setUsernameError(false);
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('프로필 이름을 조회 중 문제가 발생했습니다', 'error')
                }
            }
        } else {
            setUsernameError('프로필이름을 입력해주세요')
        }
    };

    // password check 
    const passwordPatternCheck = () => {
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/;

        if (!passwordRegex.test(password1)) {
            setPassword1Error('비밀번호는 대문자, 소문자, 숫자 및 특수문자(!@#$%&*)를 포함하여 8자 이상이어야 합니다.')
        } else {
            setPassword1Error(false)
        }
    }

    const passwordValidityCheck = () => {
        if (password1 !== password2) {
            setPassword2Error('비밀번호가 일치하지 않습니다.')
        } else (
            setPassword2Error(false)
        )
    }

    // handel signup terms and agreement 

    const [agreement, setAgreement] = useState(null);
    const [agreementError, setAgreementError] = useState(null);

    const handelUserAgreement = (e) => {
        setAgreement(e.target.checked);
        if (agreementError === false) {
            setAgreementError(true);
        } else {
            setAgreementError(false);
        }
    };

    const [signupProcess, setSignupProcess] = useState(false);
    const [emailVerification, setEmailVerificationPage] = useState(false)

    const handelSignup = async () => {
        if (signupOptionEmail) {
            fetchEmailCheck();
            userUsernameCheck();
            passwordPatternCheck();
            passwordValidityCheck();

            if (!agreement) {
                setAgreementError(true)
            }

            if (!emailError && !usernameError && !password1Error && !password2Error && agreement) {
                try {
                    setSignupProcess(true)
                    const response = await apiClient.post('/signup/', {
                        email: email,
                        username: username,
                        password1: password1,
                        password2: password2
                    });
                    const signup_status = response.data.status
                    if (signup_status === 'account_created') {
                        setEmailVerificationPage(true)
                    } else if (signup_status === 'signup_error') {
                        setEmailVerificationPage(false)
                    }
                } catch(error) {
                    setSignupProcess(false)
                    if (error.response.status !== 401) {
                        showSnackBar('회원가입 중 문제가 발생했습니다', 'error')
                    }
                }
            }
        } else {
            setSignupOptionEmail(true);
        }
    };



    return (
        <>
            {emailVerification ? (
                <EmailVerificationRequest email={email} />
            ) : (
                <div className="signup_cover_frame" id="signup_cover_frame">
                    <div className="sellreports_signup_frame">
                        <div className="signup_title Pre_KR_Normal">회원가입</div>
                        {signupOptionEmail && (
                            <>
                            
                                <div className="signup_input_frame" id="username_field" style={{paddingTop: '32px'}}>
                                    <span className="signup_input_title_text Pre_KR_Normal">프로필이름</span>
                                    <input className="signup_input Pre_KR_Normal" 
                                        name="username" 
                                        placeholder="프로필 이름은 변경이 불가합니다"
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => userUsernameCheck()}
                                    />
                                    {usernameError && (
                                        <span className="signup_error Pre_KR_Normal">{ usernameError }</span>
                                    )}
                                </div>
                                <div className="signup_input_frame" id="email_field">
                                    <span className="signup_input_title_text Pre_KR_Normal">이메일</span>
                                    <input className="signup_input Pre_KR_Normal" 
                                        type="email" 
                                        name="email"
                                        placeholder="이메일을 입력해주세요"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => fetchEmailCheck()}
                                    />
                                    {emailError && (
                                        <span className="signup_error Pre_KR_Normal">{ emailError }</span>
                                    )}
                                </div>
                                <div className="signup_input_frame" id="password_field">
                                    <span className="signup_input_title_text Pre_KR_Normal">비밀번호</span>
                                    <input className="signup_input Pre_KR_Normal" 
                                        type="password" 
                                        name="password1" 
                                        placeholder="8자이상 대문자 특수문자 포함" 
                                        onChange={(e) => setPassword1(e.target.value)}
                                        onBlur={() => passwordPatternCheck()}
                                    />
                                    {password1Error && (
                                        <span className="signup_error Pre_KR_Normal">{ password1Error }</span>
                                    )}
                                </div>
                                <div className="signup_input_frame" id="password_check_field">
                                    <span className="signup_input_title_text Pre_KR_Normal">비밀번호 확인</span>
                                    <input className="signup_input Pre_KR_Normal" 
                                        type="password" 
                                        name="password2" 
                                        placeholder="비밀번호 확인" 
                                        onChange={(e) => setPassword2(e.target.value)}
                                        onBlur={() => passwordValidityCheck()}
                                    />
                                    {password2Error && (
                                        <span className="signup_error Pre_KR_Normal">{ password2Error }</span>
                                    )}
                                </div>
                                <div className="signup_agreement_frame" id="signup_agreement_field">
                                    <input className="signup_agreement" type="checkbox" onChange={handelUserAgreement}></input>
                                    <span className="signup_agreement_text Pre_KR_Normal" style={{whiteSpace:"pre-wrap"}}>
                                        <a style={{color:"#0066ff", marginLeft:"4px", textDecoration:"none"}} href="">이용약관</a >
                                        및 <a style={{color:"#0066ff", marginRight:"0.5px", textDecoration:"none"}} href="">
                                            개인정보 처리방침</a>
                                            에 동의 합니다{'\n'}
                                            {agreementError && (
                                                <span className="signup_error Pre_KR_Normal" style={{marginTop:"4px"}}>동의하시지 않으면 서비스 이용에 제한이 있습니다</span>
                                            )}
                                    </span>
                                </div>
                            </>
                        )}
                        {!signupProcess ? (
                            <div className="signup_button Pre_KR_Medium" id="signup_button" onClick={() => handelSignup()}>
                                {signupOptionEmail ? (
                                    '회원가입'
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <g clip-path="url(#clip0_1510_4)" fill='#fff'>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3663 12.4616H5.49609V11.0769H10.9923V6.92309H5.49609V5.53847V1.38462V0H12.3663V1.38462H6.87014V5.53847H12.3663V6.92309V11.0769V12.4616Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3663 18.0006H5.49609V16.616H10.9923V12.4621H5.49609V11.0775V6.92368V5.53906H12.3663V6.92368H6.87014V11.0775H12.3663V12.4621V16.616V18.0006Z" fill="fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.49609 12.4621V5.53906H6.87014V11.0775H10.9923V5.53906H12.3663H16.4885H17.8625V12.4621H16.4885V6.92368H12.3663V12.4621H10.9923H6.87014H5.49609Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.366 5.53906L12.4215 12.4619L11.0475 12.4731L6.92554 12.5067L5.55154 12.5179L5.50711 6.9796L1.3851 7.01318L1.42954 12.5515L0.0555432 12.5627L0 5.63981L1.374 5.62862L5.496 5.59503L6.87 5.58384L6.91444 11.1221L11.0364 11.0885L10.992 5.55025L12.366 5.53906Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9078 12.4615L11.0375 12.4868L11.0325 11.1022L11.0174 6.94842L11.0123 5.5638L16.5084 5.54351L16.4933 1.38968L10.9972 1.40998L10.9922 0.0253799L17.8624 0L17.8674 1.38461L17.8825 5.53842L17.8876 6.92304L12.3914 6.94334L12.4065 11.0972L17.9027 11.0769L17.9078 12.4615Z" fill="#fff"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.53906H6.87023V6.92368V11.0775V12.4621H1.37405V16.616H6.87023V18.0006H0V16.616V12.4621V11.0775H5.49619V6.92368H0V5.53906Z" fill="#fff"/>
                                            <path d="M12.3673 5.53906H6.87109V6.92368H12.3673V5.53906Z" fill="#fff"/>
                                            <path d="M10.9922 1.38536V6.92383H12.3662V1.38536H10.9922Z" fill="#fff"/>
                                            <path d="M5.49609 11.0768V16.6152H6.87014V11.0768H5.49609Z" fill="#fff"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_1510_4">
                                            <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                        <span style={{marginLeft: '16px'}}>이메일로 시작하기</span>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="signup_button Pre_KR_Medium" id="signup_button_loading">
                                <LoadingCircle />
                            </div>
                        )}
                        <SocialLogin page_type={'signup'}/>
                        <span className="user_signin_link Pre_KR_Normal">이미 셀리포트 회원이신가요? <Link style={{color:"#0066ff", marginLeft:"4px", textDecoration:"none"}} to={'/login'}> 로그인</Link></span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup