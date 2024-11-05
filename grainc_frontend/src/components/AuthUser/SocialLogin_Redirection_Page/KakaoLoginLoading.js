import React, { useContext, useEffect, useState } from "react";
import SocialLoginUsernameRegister from "./SocialLoginUsernameRegister";
import WrongLoginMethod from "../WrongLoginMethod";
import '../../../static/css/AuthUser/SocialLogin_Redirection_Page/SocialLogin_Loading.css'
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import SnackBarStore from "../../Store/SnackBarStore";
function KakaoLoginLoading() {
    const apiClient = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const state = query.get('state');

    const { showSnackBar } = SnackBarStore();

    const { setAuthTokens, authTokens, setUser } = useContext(AuthContext);

    const BASE_URL = 'http://localhost:3000'; // Ensure this is correct
    const KAKAO_CALLBACK_URL = `${BASE_URL}/login/kakao/callback`;
    const rest_api_key = process.env.REACT_APP_SOCIAL_AUTH_KAKAO_REST_API_KEY;


    const handleKakaoCallback = async () => {
        try {
            const response = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${rest_api_key}&redirect_uri=${KAKAO_CALLBACK_URL}&code=${code}`)
            const { access_token } = response.data
            console.log(access_token)
            if (access_token) {
                await handleKakaoLogin(access_token)
            }

        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('카카오 로그인 중 문제가 발생했습니다.', 'error')
            }
        }
    }

    useEffect(() => {
        if (code) {
            handleKakaoCallback();
        }
    }, [code]);

    // Username Register
    const [usernameRequired, setUsernameRequired] = useState(null);

    // Wrong Provider Handle

    const [providerError, setProviderError] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [provider, setProvider] = useState(null);
    
    const handleKakaoLogin = async (access_token) => {
        try {
            const response = await apiClient.post('/login/kakao/callback/', {
                access_token: access_token,
                code: code
            });
            if (response.status === 200) {
                const AuthToken = response.data.AuthToken
                
                setAuthTokens(AuthToken)
                localStorage.setItem("authTokenA", AuthToken.access);
                localStorage.setItem("authTokenR", AuthToken.refresh);
                if (authTokens) {
                    setUser(jwtDecode(authTokens.access))
                }
                setUsernameRequired(response.data.UsernameRequired)
            } 
            console.log(access_token)
        } catch(error) {
            if (error.response.data.status === 'wrong_provider') {
                console.log(1)
                setProviderError(true);
                setUserEmail(error.response.data.userEmail);
                setProvider(error.response.data.provider)
            }
        } 
    }


    useEffect(() => {
        if (usernameRequired === false) {
            navigate('/')
        }
    }, [usernameRequired])


    return (
        !usernameRequired ? (
            <>  
                {providerError && userEmail && provider ? (
                    <WrongLoginMethod open={true} email={userEmail} method={provider}/>
                ) : null}
                <div className="social_login_frame">
                    <div className="container"></div>
                </div>
            </>
        ):(
            <SocialLoginUsernameRegister />
        )
    );
}

export default KakaoLoginLoading;

