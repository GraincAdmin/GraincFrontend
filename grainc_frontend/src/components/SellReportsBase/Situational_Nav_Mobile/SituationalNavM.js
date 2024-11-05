import React, { useContext } from "react";
import {useNavigate } from 'react-router-dom';
import '../../../static/css/SellReportsBase/Situational_Nav_Mobile/SituationalNavM.css'
import { NavContext } from "../../../context/NavContext";


// icon 
import { ReactComponent as PreviousIcon } from '../../../static/assets/GlobalIcon/SituationalNavPrevious.svg'
import { ReactComponent as MenuBarIcon } from '../../../static/assets/GlobalIcon/Hamburger_LG.svg'
import { ReactComponent as CloseIcon } from '../../../static/assets/GlobalIcon/Close_MD.svg'

const SituationalNavM = ({ page, borderOption, myPage, myPageCurrentPath, myPagePathSetting }) => {

    const { respondedNavStyle } = useContext(NavContext)
    const { setRespondedNavStyle } = useContext(NavContext)

    const navigate = useNavigate();
    
    const handelSituationalNavPrevious = () => {
        if (myPage) {
            if (!myPageCurrentPath) {
                navigate(-1);
            } else {
                myPagePathSetting(null);
            }
        } else {
            navigate(-1);
        }
    };

    

    return (
        <div className="situational_nav_cover_frame" style={{borderBottom:`${borderOption ? '0px' : null}`}}>
            <div className="situational_nav_main_frame">
                <div className="situational_nav_button_frame" onClick={() => handelSituationalNavPrevious()}>
                    <PreviousIcon style={{ width:'24px', height: '24px' }}/>
                </div>
                <span className="situational_nav_title_frame Pre_KR_Medium">
                    {!myPage ? (
                        `${page}`
                    ) : (
                        !myPageCurrentPath ? (
                            '마이페이지'
                        ) : (
                            <>
                                {myPageCurrentPath === 'myProfile' && (
                                    '내 프로필'
                                )}
                                {myPageCurrentPath === 'communityManagement' && (
                                    '커뮤니티 작성글'
                                )}
                                {myPageCurrentPath === 'purchasedReports' && (
                                    '구매 리포트'
                                )}
                            </>
                        )
                    )}
                </span>
                <div className="situational_nav_button_frame size1199">
                    {!myPage && (
                        respondedNavStyle ? (
                            <div className="sellreport_responed_option_icon_frame" onClick={() => setRespondedNavStyle(false)}>
                                <CloseIcon style={{stroke: '#1A1A1B'}}/>
                            </div>
                        ) : (
                            <div className="sellreport_responed_option_icon_frame" onClick={() => setRespondedNavStyle(true)}>
                                <MenuBarIcon />
                            </div>
                        )
                    )}
                </div>
                <div className="situational_nav_button_frame size768"></div>
            </div>
        </div>
    );
};

export default SituationalNavM