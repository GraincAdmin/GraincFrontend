import React from "react";
import '../../static/css/AuthUser/SocialLogin.css'; // Adjust the path based on the directory structure
import useAxios from '../../axiosAPIClient'
import { Link } from "react-router-dom";

function SocialLogin({page_type, wrong_login}) {
    // social login
    const apiClient = useAxios();

    const handleSocialLogin = async (provider) => {
        let provider_login_link = '';  // Change const to let

        if (provider === 'google') {
            provider_login_link = '/google_login/';
        } else if (provider === 'naver') {
            provider_login_link = '/naver_login/';
        } else if (provider === 'kakao') {
            provider_login_link = '/kakao_login/'
        }

        try {
            const response = await apiClient.get(provider_login_link);
            if (response.status === 200) {
                const LoginLink = response.data.login_link;
                if (LoginLink) {
                    window.location.href = LoginLink;  // Redirect directly to the Google login URL
                } else {
                    console.error('login link is not provided');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }   

    return (
        <div className='social_login_option_frame'>
            {!wrong_login && (
                <div className='social_login_option_identification'>
                    <div className='social_login_option_identification_frame'></div>
                    <span className='Pre_KR_Normal'>
                        {page_type === 'login' ? (
                            '간편로그인'
                        ) : (
                            '간편 회원가입'
                        )}
                    </span>
                    <div className='social_login_option_identification_frame'></div>
                </div>
            )}
            {wrong_login === 'email' ? (
                <Link className='social_login_button social_login_button_google Pre_KR_Medium' to={'/login'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_1519_110)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3663 12.4616H5.49609V11.0769H10.9923V6.92309H5.49609V5.53847V1.38462V0H12.3663V1.38462H6.87014V5.53847H12.3663V6.92309V11.0769V12.4616Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3663 18.0006H5.49609V16.616H10.9923V12.4621H5.49609V11.0775V6.92368V5.53906H12.3663V6.92368H6.87014V11.0775H12.3663V12.4621V16.616V18.0006Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.49609 12.4621V5.53906H6.87014V11.0775H10.9923V5.53906H12.3663H16.4885H17.8625V12.4621H16.4885V6.92368H12.3663V12.4621H10.9923H6.87014H5.49609Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.366 5.53906L12.4215 12.4619L11.0475 12.4731L6.92554 12.5067L5.55154 12.5179L5.50711 6.9796L1.3851 7.01318L1.42954 12.5515L0.0555432 12.5627L0 5.63981L1.374 5.62862L5.496 5.59503L6.87 5.58384L6.91444 11.1221L11.0364 11.0885L10.992 5.55025L12.366 5.53906Z" fill="#1A1A1B"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9078 12.4615L11.0375 12.4868L11.0325 11.1022L11.0174 6.94842L11.0123 5.5638L16.5084 5.54351L16.4933 1.38968L10.9972 1.40998L10.9922 0.0253799L17.8624 0L17.8674 1.38461L17.8825 5.53842L17.8876 6.92304L12.3914 6.94334L12.4065 11.0972L17.9027 11.0769L17.9078 12.4615Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.53906H6.87023V6.92368V11.0775V12.4621H1.37405V16.616H6.87023V18.0006H0V16.616V12.4621V11.0775H5.49619V6.92368H0V5.53906Z" fill="#1A1A1B"/>
                        <path d="M12.3673 5.53906H6.87109V6.92368H12.3673V5.53906Z" fill="#0066FF"/>
                        <path d="M10.9922 1.38341V6.92188H12.3662V1.38341H10.9922Z" fill="#0066FF"/>
                        <path d="M5.49609 11.0787V16.6172H6.87014V11.0787H5.49609Z" fill="#1A1A1B"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1519_110">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span style={{width: `${page_type === 'signup' ? '107px' : '82px'}`}}>
                        이메일 로그인
                    </span>
                </Link>
            ): null}  
            {!wrong_login || wrong_login === 'google' ? (
                <div className='social_login_button social_login_button_google Pre_KR_Medium' onClick={() => handleSocialLogin('google')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1398 9.70415C18.1398 9.06598 18.0826 8.45236 17.9762 7.86328H9.5V11.3446H14.3435C14.1349 12.4696 13.5008 13.4227 12.5477 14.0609V16.319H15.4562C17.158 14.7522 18.1398 12.445 18.1398 9.70415Z" fill="#4285F4"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.50155 18.4988C11.9315 18.4988 13.9687 17.6929 15.4578 16.3184L12.5492 14.0603C11.7433 14.6003 10.7124 14.9194 9.50155 14.9194C7.15751 14.9194 5.17346 13.3362 4.46574 11.209H1.45898V13.5408C2.93986 16.4821 5.98344 18.4988 9.50155 18.4988Z" fill="#34A853"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46401 11.2107C4.28402 10.6707 4.18175 10.0939 4.18175 9.50072C4.18175 8.90755 4.28402 8.33075 4.46401 7.79076V5.45898H1.45725C0.84772 6.67396 0.5 8.04848 0.5 9.50072C0.5 10.953 0.84772 12.3275 1.45725 13.5425L4.46401 11.2107Z" fill="#FBBC05"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.50155 4.07948C10.8229 4.07948 12.0092 4.53356 12.9419 5.42536L15.5233 2.84405C13.9646 1.3918 11.9274 0.5 9.50155 0.5C5.98344 0.5 2.93986 2.51678 1.45898 5.45808L4.46574 7.78986C5.17346 5.66263 7.15751 4.07948 9.50155 4.07948Z" fill="#EA4335"/>
                    </svg>
                    <span style={{width: `${page_type === 'signup' ? '107px' : '82px'}`}}>
                        {page_type === 'login' ? (
                            '구글 로그인'
                        ) : (
                            '구글로 시작하기'
                        )}
                    </span>
                </div>
            ): null}  
            {!wrong_login || wrong_login === 'naver' ? (
                <div className='social_login_button social_login_button_naver Pre_KR_Medium' onClick={() => handleSocialLogin('naver')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_1508_288)">
                        <path d="M10.8491 8.56267L4.91687 0H0V16H5.15088V7.436L11.0831 16H16V0H10.8491V8.56267Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1508_288">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span style={{width: `${page_type === 'signup' ? '107px' : '82px'}`}}>
                        {page_type === 'login' ? (
                            '네이버 로그인'
                        ) : (
                            '네이버로 시작하기'
                        )}
                    </span>
                </div>
            ) : null}  
            {!wrong_login || wrong_login === 'kakao' ? (
                <div className='social_login_button social_login_button_kakao Pre_KR_Medium' onClick={() => handleSocialLogin('kakao')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_1508_278)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00002 0.599609C4.02917 0.599609 0 3.71257 0 7.55189C0 9.93963 1.5584 12.0446 3.93152 13.2966L2.93303 16.9441C2.84481 17.2664 3.21341 17.5233 3.49646 17.3365L7.87334 14.4478C8.2427 14.4835 8.61808 14.5043 9.00002 14.5043C13.9705 14.5043 17.9999 11.3914 17.9999 7.55189C17.9999 3.71257 13.9705 0.599609 9.00002 0.599609" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1508_278">
                        <rect width="17.9999" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span style={{width: `${page_type === 'signup' ? '107px' : '82px'}`}}>
                        {page_type === 'login' ? (
                            '카카오 로그인'
                        ) : (
                            '카카오로 시작하기'
                        )}
                    </span>
                </div>
            ) : null}  
        </div>
    );
};

export default SocialLogin