import React, { useState } from "react";
import '../../../static/css/AuthUser/SocialLogin_Redirection_Page/SocialLoginUsernameRegister.css'
import useAxios from "../../../axiosAPIClient";
import LoadingCircle from "../../Global/LoadingCircle";
import SignupComplete from "../SignupComplete";
import SnackBarStore from "../../Store/SnackBarStore";

function SocialLoginUsernameRegister() {
    const apiClient = useAxios();
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { showSnackBar } = SnackBarStore();

    const [signupCompletePopup, setSignupCompletePopup] = useState(false);
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(null);
    }
    const [usernameError, setUsernameError] = useState(null);


    const handleUsernameRegister = async () => {
        try {
            setLoading(true);
            if (!usernameError) {
                const response = await apiClient.post('/username_register/', {
                    username: username
                })

                if (response.status === 200) {
                    setSignupCompletePopup(true);
                }
            }
        } catch(error) {
            showSnackBar('유저 이름을 등록 중 문제가 발생했습니다', 'error');
        } finally {
            setLoading(false);
        }
    }


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
                showSnackBar('유저 이름을 조회 중 문제가 발생했습니다', 'error')
            }
        } else {
            setUsernameError('프로필이름을 입력해주세요')
        }
    };


    return (
        <>
            <SignupComplete style={signupCompletePopup} style_control={setSignupCompletePopup}/>
            <div className="username_register_main_frame">
                <div className="username_register_frame">
                    <div className="username_register_title_frame Pre_KR_Normal">프로필이름 등록</div>
                    <div className="username_register_input_frame">
                        <span className="username_register_input_title Pre_KR_Normal">프로필이름</span>
                        <input className="username_register_input Pre_KR_Normal"
                            placeholder="프로필 이름을 입력해주세요"
                            value={username}
                            onChange={(e) => handleUsernameChange(e)}
                            onBlur={() => userUsernameCheck()}>
                        </input>
                    </div>
                    {usernameError && (
                        <span className="Pre_KR_Normal" style={{color:'#ff0000', fontSize:'12px', marginTop:'8px'}}>{usernameError}</span>
                    )}
                    <div className="username_register_guideline_frame">
                        <span className="username_register_guideline_text Pre_KR_Normal" style={{marginTop: '0px'}}>
                            커뮤니티 및 리포트 마켓의 원활한 이용을 위해 한번 등록한 프로필 이름은 <span style={{color:'#ff0000'}}>변경이 불가능합니다.</span> 신중히 입력해 주세요.
                        </span>
                    </div>
                    <div className="username_register_button Pre_KR_Medium" onClick={() => handleUsernameRegister()}>
                        {!loading ? (
                            '프로필이름 등록'
                        ) : (
                            <LoadingCircle />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocialLoginUsernameRegister