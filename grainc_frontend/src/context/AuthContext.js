import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext(); // Context 생성

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => ({
        access: localStorage.getItem("authTokenA") || null,
        refresh: localStorage.getItem("authTokenR") || null,
    }));

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokenA")
            ? jwtDecode(localStorage.getItem("authTokenA"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [userProfileImage, setUserProfileImage] = useState(null);  // Initialize with null or any default image URL

    
    const [loginError, setLoginError] = useState(false);

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login_token/`, {
                email,
                password,
            })
            const data = response.data;
    
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokenA", data.access);
                localStorage.setItem("authTokenR", data.refresh);
                navigate('/');
                getUserProfileImage(jwtDecode(data.access).id);
            } else if (response.status === 401) {
                setLoginError(true);
            } else (
                setLoginError(true)
            )
        } catch(error) {
            setLoginError(true)
        } 
    };

    const getUserProfileImage = async (user_id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_user_profile_image/${user_id}/`);

            const data = response.data;

            if (response.status === 200) {
                const profileImageData = data.profile_image_data;  // Assuming the response structure
                localStorage.setItem("profileImageData", profileImageData);
                setUserProfileImage(`${profileImageData}?timestamp=${Date.now()}`);
            }
        } catch (error) {
            console.log('프로필 이미지 불러오는 중')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setUserProfileImage(null);
        localStorage.removeItem("authTokenA");
        localStorage.removeItem("authTokenR");
        navigate("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        loginError,
        setLoginError,
        logoutUser,
        userProfileImage,
        setUserProfileImage,
        getUserProfileImage
    };

    useEffect(() => {
        if (user) {
            const profileImageData = localStorage.getItem("profileImageData");
            setUserProfileImage(profileImageData);
        }
    }, [authTokens]);

    
    useEffect(() => {
        if (authTokens !== null) {
            try {
                setUser(jwtDecode(authTokens.access));
            } catch(error) {
                // idk why not working
            }
        }
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
