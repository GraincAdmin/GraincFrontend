import React, { useContext, useEffect, useState } from "react";
import '../static/css/Mobile_Nav.css'
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Icon
import { ReactComponent as HomeIcon } from '../static/assets/GlobalIcon/House_01.svg'
import { ReactComponent as FlagIcon } from '../static/assets/GlobalIcon/Flag.svg'
import { ReactComponent as BookmarkIcon } from '../static/assets/GlobalIcon/Bookmark.svg'


function MobileNav({situationalClose}) {
    const { userProfileImage, user } = useContext(AuthContext);
    const [fastActionStyle, setFastActionStyle] = useState(false);

    const handleFastActionStyle = () => {
        if (fastActionStyle) {
            setFastActionStyle(false);
        } else {
            setFastActionStyle(true);
        }
    }

    // handle Fast Action Click outside
    const handleClickOutsideFastAction = (event) => {
        let click_outside_fast_action = false;

        const fast_action_button = document.getElementById('fast_action_button');

        if (fast_action_button.contains(event.target)) {
            click_outside_fast_action = true
        }

        if (!click_outside_fast_action) {
            setFastActionStyle(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideFastAction)
        return (
            document.addEventListener('click', handleClickOutsideFastAction)
        )
    }, []);

    // Icon style update
    const location = useLocation();

    return (
        <div className={`mobile_navigation_main_frame ${situationalClose ? 'close' : null}`}>
            <Link className="mobile_navigation_button_frame Pre_KR_Normal" to={`/`}>
                <HomeIcon />
                홈
            </Link>
            <Link className="mobile_navigation_button_frame Pre_KR_Normal" to={`/subscribing_content`}>
                <FlagIcon />
                구독
            </Link>
            <div className="mobile_navigation_button_frame Pre_KR_Normal" id="fast_action_button" onClick={() => handleFastActionStyle()}>
                <div className="mobile_navigation_fast_action_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <mask id="mask0_1475_154" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                        <rect width="40" height="40" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1475_154)">
                        <path d="M19.1667 20.8333H10V19.1667H19.1667V10H20.8333V19.1667H30V20.8333H20.8333V30H19.1667V20.8333Z" fill="white"/>
                        </g>
                    </svg>
                    {/* fast action options */}
                    <div className={`mobile_navigation_fast_action_section ${fastActionStyle ? 'open' : null}`}>
                        <Link className="fast_action_button_main_frame" to={'/community_article_upload/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <mask id="mask0_1475_117" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                                <rect x="0.599609" y="0.5" width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1475_117)">
                                <path d="M12.5996 22.3076C11.4381 21.2831 10.1304 20.4885 8.67661 19.9239C7.22278 19.3592 5.69711 19.0512 4.09961 18.9999V8.82687C5.70611 8.8717 7.24103 9.20628 8.70436 9.83062C10.1679 10.455 11.4663 11.2909 12.5996 12.3384C13.7329 11.2909 15.0314 10.455 16.4949 9.83062C17.9582 9.20628 19.4931 8.8717 21.0996 8.82687V18.9999C19.4919 19.0512 17.9637 19.3592 16.5149 19.9239C15.0662 20.4885 13.7611 21.2831 12.5996 22.3076ZM12.5996 20.3806C13.6496 19.6038 14.7663 18.9806 15.9496 18.5111C17.1329 18.0416 18.3496 17.7315 19.5996 17.5806V10.4884C18.3381 10.705 17.1166 11.1345 15.9351 11.7769C14.7538 12.419 13.6419 13.2613 12.5996 14.3036C11.5573 13.2613 10.4454 12.419 9.26411 11.7769C8.08261 11.1345 6.86111 10.705 5.59961 10.4884V17.5806C6.84961 17.7315 8.06628 18.0416 9.24961 18.5111C10.4329 18.9806 11.5496 19.6038 12.5996 20.3806ZM12.5996 9.28837C11.6054 9.28837 10.7544 8.93437 10.0464 8.22637C9.33836 7.51837 8.98436 6.6672 8.98436 5.67287C8.98436 4.6787 9.33836 3.82762 10.0464 3.11962C10.7544 2.41162 11.6054 2.05762 12.5996 2.05762C13.5938 2.05762 14.4449 2.41162 15.1529 3.11962C15.8609 3.82762 16.2149 4.6787 16.2149 5.67287C16.2149 6.6672 15.8609 7.51837 15.1529 8.22637C14.4449 8.93437 13.5938 9.28837 12.5996 9.28837ZM12.5999 7.78837C13.1817 7.78837 13.6797 7.5812 14.0939 7.16687C14.508 6.75253 14.7151 6.25445 14.7151 5.67262C14.7151 5.09078 14.5079 4.59278 14.0936 4.17862C13.6793 3.76462 13.1812 3.55762 12.5994 3.55762C12.0175 3.55762 11.5195 3.76478 11.1054 4.17912C10.6912 4.59345 10.4841 5.09153 10.4841 5.67337C10.4841 6.2552 10.6913 6.75312 11.1056 7.16712C11.5199 7.58128 12.018 7.78837 12.5999 7.78837Z" fill="#616161"/>
                                </g>
                            </svg>
                            <div className="fact_action_button_description_frame">
                                <span className="Pre_KR_Normal"><span className="Pre_KR_Medium">커뮤니티</span>에글 쓰기</span>
                                <span className="Pre_KR_light" style={{color:'#616161', fontSize:'12px'}}>국내기업, 부동산, 기타</span>
                            </div>
                        </Link>
                        <Link className="fast_action_button_main_frame" to={'/report_upload/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <mask id="mask0_1475_130" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                                <rect x="0.799805" y="0.5" width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1475_130)">
                                <path d="M9.0498 12.25V10.75H16.5498V12.25H9.0498ZM9.0498 8.25V6.75H16.5498V8.25H9.0498ZM6.7998 14.75H14.2998C14.7446 14.75 15.1561 14.8462 15.5343 15.0385C15.9126 15.2308 16.2338 15.5026 16.4978 15.8538L18.7998 18.854V4.80775C18.7998 4.71792 18.771 4.64417 18.7133 4.5865C18.6556 4.52883 18.5819 4.5 18.4921 4.5H7.10755C7.01772 4.5 6.94397 4.52883 6.8863 4.5865C6.82864 4.64417 6.7998 4.71792 6.7998 4.80775V14.75ZM7.10755 20.5H18.1671L15.3171 16.7712C15.1914 16.6057 15.0417 16.4775 14.8681 16.3865C14.6944 16.2955 14.505 16.25 14.2998 16.25H6.7998V20.1923C6.7998 20.2821 6.82864 20.3558 6.8863 20.4135C6.94397 20.4712 7.01772 20.5 7.10755 20.5ZM18.4921 22H7.10755C6.60239 22 6.1748 21.825 5.8248 21.475C5.4748 21.125 5.2998 20.6974 5.2998 20.1923V4.80775C5.2998 4.30258 5.4748 3.875 5.8248 3.525C6.1748 3.175 6.60239 3 7.10755 3H18.4921C18.9972 3 19.4248 3.175 19.7748 3.525C20.1248 3.875 20.2998 4.30258 20.2998 4.80775V20.1923C20.2998 20.6974 20.1248 21.125 19.7748 21.475C19.4248 21.825 18.9972 22 18.4921 22Z" fill="#616161"/>
                                </g>
                            </svg>
                            <div className="fact_action_button_description_frame">
                                <span className="Pre_KR_Normal"><span className="Pre_KR_Medium">리포트</span>판매하기</span>
                                <span className="Pre_KR_light" style={{color:'#616161', fontSize:'12px'}}>판매로 수익 창출</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Link className="mobile_navigation_button_frame Pre_KR_Normal" to={'/bookmark'}>
                <BookmarkIcon />
                북마크
            </Link>
            <Link 
                className="mobile_navigation_button_frame Pre_KR_Normal" 
                to={ user ? '/mypage?current_page=myProfile' : '/login'}
            >
                <div className="mobile_navigation_profile_image">
                    {user ? (
                        <img src={ userProfileImage }></img>
                    ) : (
                        <img src={require('../static/assets/anonymous.png')}></img>
                    )}
                </div>
                내 프로필
            </Link>
        </div>
    );
};

export default MobileNav
