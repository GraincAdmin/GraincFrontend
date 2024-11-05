import React, { useContext, useEffect, useRef, useState } from "react";
import '../../../static/css/SellReportsBase/MyPage/MyProfileEdit.css'
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../axiosAPIClient";
import LoadingCircle from "../../Global/LoadingCircle";
// icon
import { ReactComponent as ProfileEditIcon } from '../../../static/assets/MyPage/Edit_Pencil_02.svg'
import { jwtDecode } from "jwt-decode";
import SnackBarStore from "../../Store/SnackBarStore";
import SituationalNavM from "../Situational_Nav_Mobile/SituationalNavM";
import imageCompression from 'browser-image-compression';

const MyProfileEdit = () => {
    const apiClient = useAxios();
    const { user, setUser, setAuthTokens ,setUserProfileImage, userProfileImage } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";

    const { showSnackBar } = SnackBarStore();

    const [newProfileImage, setNewProfileImage] = useState(null);

    const handleProfileImgChange = () => {
        const user_profile_image_input = document.getElementById('user_profile_change');
        user_profile_image_input.click();
    }

    const updateNewProfileImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfileImage(file);
            fetchNewProfileImage(event);
        }
    };

    const fetchNewProfileImage = async (event) => {
        const profile_img_file = event.target.files[0];
        if (profile_img_file) {
            const options = {
                maxSizeMB: 3, // Maximum size in MB
                maxWidthOrHeight: 1024, // Maximum width or height
                useWebWorker: true, // Use web worker for better performance
            };
            const compressedImage = await imageCompression(profile_img_file, options)
            try {
                const formData = new FormData();
                formData.append('profile_image', compressedImage);
                const response = await apiClient.post('/post_new_profile/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    showSnackBar('프로필 이미지 변경완료 (반영까지 시간이 걸릴 수 있습니다)', 'normal')
                    const storedImageUrl = localStorage.getItem('profileImageData')
                    const newImageUrl = `${storedImageUrl}?timestamp=${Date.now()}`
                    localStorage.setItem("profileImageData", newImageUrl);
                    setUserProfileImage(newImageUrl);
                }
            } catch (error) {
                if (error.response.status !== 401) {
                    showSnackBar('프로필 이미지를 업로드 하던 중 문제가 발생했습니다', 'error')
                }
            }
        }
    };

    // User description change

    const [newIntroduction, setNewIntroduction] = useState();
    const [originalIntroduction, setOriginalIntroduction] = useState();

    const [newUsername, setNewUsername] = useState(authenticatedUser.username);
    const [originalUsername] = useState(authenticatedUser.username);

    const [newDonationMessage, setNewDonationMessage] = useState();
    const [originalDonationMessage, setOriginalDonationMessage] = useState();

    const updateProfileData = (e, type) => {
        const newValue = e.target.value; // Store the new input value
        
        // Update the state with the new value
        if (type === 'username') {
            setNewUsername(newValue);
        } else if (type === 'introduction') {
            setNewIntroduction(newValue);
        } else if (type === 'donation') {
            setNewDonationMessage(newValue);
        }

        // Use the newValue directly for comparison
        setMyProfileSave(
            newValue !== (type === 'username' ? originalUsername :
                          type === 'introduction' ? originalIntroduction :
                          originalDonationMessage)
        );
    };

    const [introductionLoading, setIntroductionLoading] = useState(false);


    const fetchNewIntroduction = async () => {
        setIntroductionLoading(true);
        try {
            const response = await apiClient.post('/post_updated_profile/', {
                newIntroduction: newIntroduction,
                newUsername: newUsername,
                newDonationMessage: newDonationMessage
            })
            const data = response.data;
            if (response.status === 200) {
                setUser(jwtDecode(data.access));
                setAuthTokens(data);
                localStorage.setItem("authTokens", JSON.stringify(data));
                setMyProfileSave(false);
                showSnackBar('회원정보 변경 완료', 'normal')
            }
        } catch(error) {
            if (error.response.status !== 401) {
                if (error.response.status === 404) {
                    showSnackBar('회원정보 변경 중 문제가 발생했습니다', 'error')
                } else if (error.response.status === 409) {
                    showSnackBar('이미 사용 중인 닉네임입니다', 'error')
                }
            }
        } finally {
            setIntroductionLoading(false);
        }
    }

    // Save Button Activate

    const [myProfileSave, setMyProfileSave] = useState(false);


    // Get User My Profile Information


    const fetchUserProfileInformation = async () => {
        try {
            const response = await apiClient.get('/my_page_profile_data/');
            const data = response.data;
            setNewIntroduction(data.introduction)
            setOriginalIntroduction(data.introduction);

            setNewDonationMessage(data.donation_message);
            setOriginalDonationMessage(data.donation_message);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchUserProfileInformation();
    }, []);


    // Password Change 

    // style 

    const [passwordChangeStyle, setPasswordChangeStyle] = useState(false);

    const [currentPasswordInputActivate, setCurrentPasswordInputActivate] = useState(false);
    const handleCurrentPasswordInput = () => {
        setCurrentPasswordInputActivate(true);
        currentPasswordInput.current.focus(); 
    }
    const currentPasswordInput = useRef(null);

    const [newPasswordInputActivate, setNewPasswordInputActivate] = useState(false);
    const handleNewPasswordInput = () => {
        setNewPasswordInputActivate(true);
        newPasswordInput.current.focus(); 
    }
    const newPasswordInput = useRef(null);

    
    const [passwordCheckInputActivate, setPasswordCheckInputActivate] = useState(false);
    const handlePasswordCheckInput = () => {
        setPasswordCheckInputActivate(true);
        passwordCheckInput.current.focus(); 
    }
    const passwordCheckInput = useRef(null);

    // function part

    const [currentPassword, setCurrentPassword] = useState(null);
    const [currentPasswordError, setCurrentPasswordError] = useState(null);

    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);

    const [checkPassword, setCheckPassword] = useState(null);
    const [checkPasswordError, setCheckPasswordError] = useState(null);

    const passwordPatternCheck = () => {
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setNewPasswordError('비밀번호는 대문자, 소문자, 숫자 및 특수문자(!@#$%&*)를 포함하여 8자 이상이어야 합니다.')
        } else {
            setNewPasswordError(false)
        }
    }

    const passwordValidityCheck = () => {
        if (newPassword !== checkPassword) {
            setCheckPasswordError('비밀번호가 일치하지 않습니다.')
        } else (
            setCheckPasswordError(false)
        )
    }

    const [passwordChangeStatus, setPasswordChangeStatus] = useState(false);
    const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

    const handlePasswordChange = async () => {
        passwordPatternCheck();
        setNewPassword();
        if (!newPasswordError && !checkPasswordError) {
            setPasswordChangeStatus(false);
            setCurrentPasswordError(false);
            setPasswordChangeLoading(true);
            try {
                const response = await apiClient.post('/password_change/', {
                    current_password: currentPassword,
                    new_password: newPassword
                })
                if (response.status === 200) {
                    setPasswordChangeStatus(response.data.status)
                    setCurrentPassword(null);
                    setNewPassword(null);
                    setCheckPassword(null);
                    setPasswordChangeStyle(false)
                }
            } catch(error) {
                console.log(error)
                if (error.response.status === 400) {
                    setCurrentPasswordError(error.response.data.status)
                }
            } finally {
                setPasswordChangeLoading(false);
            }
        }
    }

    return (
        <>
            <SituationalNavM page={'프로필 수정'} borderOption={true}/>
            <div className="my_page_edit_main_frame">
                <div className="my_page_page_indicator Pre_KR_Medium">회원정보</div>
                <div className="my_page_user_information_profile_information_frame">
                    <div className="my_page_user_information_profile_image_change_button_cover">
                        <div className="my_page_user_information_profile_image">
                            {userProfileImage && (
                                <img className="g_img_radius_50" src={ userProfileImage } alt="User Profile Image"></img>
                            )}
                        </div>
                        <form className="my_page_user_information_profile_image_change_button" enctype="multipart/form-data" method="post" onClick={() => handleProfileImgChange()}>
                            <ProfileEditIcon />
                            <input type="file" accept="image/jpeg, image/png, image/jpg" style={{display:'none'}} id="user_profile_change" onChange={(e) => updateNewProfileImage(e)}></input>
                        </form>
                    </div>
                </div>
                <div className="my_page_user_information_input_frame">
                    <span className="my_page_user_information_input_title_text Pre_KR_Normal">닉네임</span>
                    <input 
                        className="my_page_user_information_input Pre_KR_Normal" 
                        value={ newUsername }
                        onChange={(e) => updateProfileData(e, 'username')}
                    >
                    </input>
                </div>
                <div className="my_page_user_information_input_frame" style={{background: '#eee'}}>
                    <span className="my_page_user_information_input_title_text Pre_KR_Normal">이메일</span>
                    <input className="my_page_user_information_input Pre_KR_Normal" value={ authenticatedUser.email } disabled></input>
                </div>
                <div className="my_page_user_information_input_frame">
                    <span className="my_page_user_information_input_title_text Pre_KR_Normal">자기소개</span>
                    <textarea className="my_page_user_information_input Pre_KR_Normal" 
                        name="user_introduction" 
                        placeholder="자기소개글을 입력해주세요"
                        value={ newIntroduction }
                        onChange={(e) => updateProfileData(e, 'introduction')} 
                        style={{height:'100px'}}>
                    </textarea>           
                </div>
                {authenticatedUser.is_membership && (
                    <div className="my_page_user_information_input_frame">
                        <span className="my_page_user_information_input_title_text Pre_KR_Normal">후원 메시지</span>
                        <textarea className="my_page_user_information_input Pre_KR_Normal" 
                            name="user_introduction" 
                            placeholder="후원자를 위해 후원 메시지를 남겨보세요"
                            value={ newDonationMessage }
                            onChange={(e) => updateProfileData(e, 'donation')} 
                            style={{height:'100px'}}>
                        </textarea>           
                    </div>
                )}
                <div className={`my_page_user_information_change_button Pre_KR_Medium ${myProfileSave ? 'activate' : null}`} onClick={() => fetchNewIntroduction()}>
                    {introductionLoading ? (
                        <LoadingCircle />
                    ) : (
                        '저장하기'
                    )}
                </div>
                {passwordChangeStyle && (
                    <div className="my_page_user_information_pw_change_section">
                        <span className="my_page_user_information_pw_change_section_title Pre_KR_SemiBold">비밀번호 변경</span>
                        <div className={`my_page_user_information_input_frame ${currentPasswordInputActivate ? null : 'cover'}`}onClick={() => handleCurrentPasswordInput()}>
                            <span className={`my_page_user_information_input_title_text Pre_KR_Normal ${currentPasswordInputActivate ? null :'cover'} `}>현재 비밀번호</span>
                            <input
                                className={`my_page_user_information_input Pre_KR_Normal ${currentPasswordInputActivate ? null : 'cover'}`}
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                ref={currentPasswordInput}
                            />                    
                        </div>
                        {currentPasswordError && (
                            <span className="my_page_password_change_error Pre_KR_Normal">비밀번호가 일치하지 않습니다</span>
                        )}
                        <div className={`my_page_user_information_input_frame ${newPasswordInputActivate ? null : 'cover'}`} onClick={() => handleNewPasswordInput()}>
                            <span className={`my_page_user_information_input_title_text ${newPasswordInputActivate ? null : 'cover'}`}>새 비밀번호</span>
                            <input 
                                className={`my_page_user_information_input Pre_KR_Normal ${newPasswordInputActivate ? null : 'cover'}`}
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onBlur={() => passwordPatternCheck()}
                                ref={newPasswordInput}>
                            </input>
                        </div>
                        {newPasswordError && (
                            <span className="my_page_password_change_error Pre_KR_Normal">{newPasswordError}</span>
                        )}
                        <div className={`my_page_user_information_input_frame ${passwordCheckInputActivate ? null : 'cover'}`} onClick={() => handlePasswordCheckInput()}>
                            <span className={`my_page_user_information_input_title_text ${passwordCheckInputActivate ? null : 'cover'}`}>새 비밀번호 확인</span>
                            <input 
                                className={`my_page_user_information_input Pre_KR_Normal ${passwordCheckInputActivate ? null : 'cover'}`}
                                type="password"
                                value={checkPassword}
                                onChange={(e) => setCheckPassword(e.target.value)}
                                onBlur={() => passwordValidityCheck()}
                                ref={passwordCheckInput}>
                            </input>
                        </div>
                        {checkPasswordError && (
                            <span className="my_page_password_change_error Pre_KR_Normal">{checkPasswordError}</span>
                        )}
                    </div>
                )}


                <div 
                    className={`my_page_user_information_change_button Pre_KR_Medium ${passwordChangeStyle ? 'password_change' : null}`} 
                    onClick={passwordChangeStyle ? () => handlePasswordChange() : () => setPasswordChangeStyle(true)}
                >
                    {passwordChangeLoading ? (
                        <LoadingCircle />
                    ) : (
                        '비밀번호 변경'
                    )}
                </div>
                {passwordChangeStatus && (
                    <span className="my_page_password_change_status Pre_KR_Normal">{passwordChangeStatus}</span>
                )}
            </div>
        </>
    )
};

export default MyProfileEdit;