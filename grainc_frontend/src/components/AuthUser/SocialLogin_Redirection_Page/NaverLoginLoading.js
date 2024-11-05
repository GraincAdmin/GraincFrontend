import React, { useContext, useEffect, useState } from "react";
import WrongLoginMethod from "../WrongLoginMethod";
import SocialLoginUsernameRegister from "./SocialLoginUsernameRegister";
import '../../../static/css/AuthUser/SocialLogin_Redirection_Page/SocialLogin_Loading.css'
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";
import AuthContext from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
function GoogleLoginLoading() {
    const apiClient = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const state = query.get('state');

    const client_id = process.env.REACT_APP_SOCIAL_AUTH_NAVER_CLIENT_ID
    const client_secret = process.env.REACT_APP_SOCIAL_AUTH_NAVER_SECRET
    const { setAuthTokens, setUser, authTokens } = useContext(AuthContext);

    // Username Register
    const [usernameRequired, setUsernameRequired] = useState(null);


    // Wrong Provider Handle

    const [providerError, setProviderError] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [provider, setProvider] = useState(null);


    const handleNaverCallback = async () => {
        try {
            if(code, state) {
                const response = await apiClient.post(`/login/naver/callback/`, {
                    code: code,
                    state: state
                })
                if (response.status === 200) {
                    const AuthToken = response.data.AuthToken

                    setAuthTokens(AuthToken)
                    localStorage.setItem("authTokenA", AuthToken.access);
                    localStorage.setItem("authTokenR", AuthToken.refresh);
                    if (authTokens) {
                        setUser(jwtDecode(authTokens.access))
                    }
                    setUsernameRequired(response.data.UsernameRequired);
                }
            }
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

    useEffect(() => {
        if (code && client_id && client_secret && state) {
            handleNaverCallback();
        }
    }, [code]);

    

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

export default GoogleLoginLoading;
