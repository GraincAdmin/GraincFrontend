import React, { useContext, useEffect, useState } from "react";
import SocialLoginUsernameRegister from "./SocialLoginUsernameRegister";
import '../../../static/css/AuthUser/SocialLogin_Redirection_Page/SocialLogin_Loading.css'
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import WrongLoginMethod from "../WrongLoginMethod";
function GoogleLoginLoading() {
    const apiClient = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    // Function to handle Google OAuth callback
    const handleGoogleCallback = async () => {
        const client_id = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_CLIENT_ID;
        const client_secret = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_SECRET;
        const BASE_URL = 'http://localhost:3000'; // Ensure this is correct
        const GOOGLE_CALLBACK_URL = `${BASE_URL}/login/google/callback`;

        try {
            // Send request to Google's OAuth token endpoint
            const response = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
                code: code,
                client_id: client_id,
                client_secret: client_secret,
                redirect_uri: GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code'
            }));

            // Extract tokens from the response
            const { access_token, id_token } = response.data;
            if (access_token && id_token) {
                await handleGoogleLogin(access_token, id_token);
            } else {
                console.error('Access token or ID token is not provided');
            }
        } catch (error) {
            console.error('Error during Google callback:', error);
        }
    };

    const { setAuthTokens, authTokens, setUser } = useContext(AuthContext);

    // Wrong Provider Handle

    const [providerError, setProviderError] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [provider, setProvider] = useState(null);

    // Username Register
    const [usernameRequired, setUsernameRequired] = useState(null);
    // Function to handle login with the obtained tokens
    const handleGoogleLogin = async (access_token, id_token) => {
        try {
            const response = await apiClient.post('/login/google/callback/', {
                access_token: access_token,
            });

            // Extract the response data
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
        } catch (error) {
            if (error.response.data.status === 'wrong_provider') {
                console.log(1)
                setProviderError(true);
                setUserEmail(error.response.data.userEmail);
                setProvider(error.response.data.provider)
            }
        }
    };

    useEffect(() => {
        if (usernameRequired === false) {
            navigate('/')
        }
    }, [usernameRequired])

    // Call the Google callback function when the component mounts and code is present
    useEffect(() => {
        if (code) {
            handleGoogleCallback();
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
