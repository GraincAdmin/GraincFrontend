import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./context/AuthContext";
import SnackBarStore from "./components/Store/SnackBarStore";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
    const { showSnackBar } = SnackBarStore();
    const { authTokens, setAuthTokens, setUser, logoutUser, user } = useContext(AuthContext);
    const [axiosInstance, setAxiosInstance] = useState(() => {
        const headers = {};
    
        // Only set the Authorization header if the access token exists
        if (authTokens && authTokens.access) {
            headers['Authorization'] = `Bearer ${authTokens.access}`;
        }
    
        return axios.create({
            baseURL,
            headers,
        });
    });
    


    useEffect(() => {
        if (axiosInstance) {
            const interceptor = axiosInstance.interceptors.response.use(
                response => response,
                async error => {
                    const originalRequest = error.config;

                    if (error.response.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        
                        try {
                            const storedAccessToken = localStorage.getItem('authTokenA');
                            const storedRefreshToken = localStorage.getItem('authTokenR');
                            if (!storedAccessToken || !storedRefreshToken) {
                                throw new Error('No refresh token available');
                            }

                            const response = await axios.post(
                                `${baseURL}/token/refresh/`,
                                { refresh: storedRefreshToken },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            );

                            if (response.status === 200) {
                                const newAccessAuthTokens = response.data;

                                const updatedAuthTokens = {
                                    access: newAccessAuthTokens.access,
                                    refresh: storedRefreshToken.refresh  // 기존 refresh 토큰 사용
                                };

                                setAuthTokens(updatedAuthTokens);
                                setUser(jwtDecode(updatedAuthTokens.access));

                                localStorage.setItem("authTokenA", updatedAuthTokens.access);

                                originalRequest.headers['Authorization'] = `Bearer ${updatedAuthTokens.access}`;
                                return axiosInstance(originalRequest);
                            } else {
                                showSnackBar('보안을위해 다시 로그인 해주시길 바랍니다', 'normal');
                                logoutUser();
                            }
                        } catch (refreshError) {
                            showSnackBar('보안을 위해 재 로그인을 해주세요', 'normal');
                            logoutUser();
                        } finally {
                            originalRequest._retry = false;
                        }
                    }

                    return Promise.reject(error);
                }
            );
            

            return () => {
                axiosInstance.interceptors.response.eject(interceptor);
            };
        }
    }, [authTokens, setAuthTokens, axiosInstance]);

    return axiosInstance;
};

export default useAxios;
