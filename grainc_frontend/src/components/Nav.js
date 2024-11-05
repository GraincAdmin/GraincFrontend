import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../static/css/Nav.css'; // Adjust the path based on the directory structure
import AuthContext from '../context/AuthContext';

// Nav Icon
import { ReactComponent as BookmarkIcon } from '../static/assets/GlobalIcon/Bookmark.svg';
import { ReactComponent as NotificationIcon } from '../static/assets/GlobalIcon/Notification.svg';
import { ReactComponent as SearchIcon } from '../static/assets/GlobalIcon/Search.svg';
import { ReactComponent as CloseIcon } from '../static/assets/GlobalIcon/Close_MD.svg';
import { ReactComponent as MenuOpenIcon } from '../static/assets/GlobalIcon/Hamburger_LG.svg';
import { ReactComponent as CompanyLogo } from '../static/assets/CompanyLogo/NavLogoLight.svg'

//Search Pop Mobile
import MobileSearchPop from './Mobile_Search_Pop';

//Search History
import useSearchHistoryStore from './Store/SearchHistory';

// Notification Pop

import NotificationPOP from './SellReportsBase/NotificationPOP/NotificationPOP';

import { NavContext } from '../context/NavContext';

function Nav({situationalNav}) {
    const location = useLocation();

    // is_authenticated
    const accessToken = localStorage.getItem("authTokenA");
    const { user, userProfileImage } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";
    // logout
    const { logoutUser } = useContext(AuthContext);
    const handleLogout = () => {
        logoutUser();
        // Optionally, redirect user to a different route after logout
    };


    const { respondedNavStyle } = useContext(NavContext)
    const { setRespondedNavStyle } = useContext(NavContext)

    useEffect(() => {
        const body = document.body;
        if (respondedNavStyle) {
            body.style.overflow = 'hidden'
        } else {
            body.style.overflow = ''
        }
    }, [respondedNavStyle]);

    const styleChangeScreenWidth = () => {
        var screenWidth = window.innerWidth;
        if (screenWidth >= 1199) {
            setRespondedNavStyle(false)
        }
    };
    
    window.addEventListener("resize", styleChangeScreenWidth);

    window.addEventListener('scroll', function () {
        var nav_cover_frame = document.getElementById('nav_cover_frame');
        if (nav_cover_frame !== null) {
            if (window.scrollY > 0) {
                nav_cover_frame.classList.add('scrolled');
            } else {
                nav_cover_frame.classList.remove('scrolled');
            }
        }
    });

    // search feature
    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        const searchKw = event.target.elements.kw.value; // Get the search term from the input field
        navigate(`/search?kw=${encodeURIComponent(searchKw)}`); // Programmatically navigate to the /search route with the query parameter
        handelDesktopSearchPopStyle(false)
    };

    //Search History
    const { searchHistory, removeSearchHistory, clearSearchHistory } = useSearchHistoryStore();

    //Search Pop Desktop
    const [desktopSearchPopStyle, setDesktopSearchPopStyle] = useState(false)

    const handelDesktopSearchPopStyle = (boolean) => {
        setDesktopSearchPopStyle(boolean)
    }

    const DesktopSearchPop = useRef(null); // Initialize with null
    const DesktopSearch = useRef(null);

    const handleClickOutsideSearchPop = (event) => {
        let clickInsideDesktopSearchPopup = false;
        
        // Check if DesktopSearchPop.current is not null before accessing .contains
        if (DesktopSearchPop.current.contains(event.target)) {
            clickInsideDesktopSearchPopup = true;
        }
        if (DesktopSearch.current.contains(event.target)) {
            clickInsideDesktopSearchPopup = true;
        }

        if (!clickInsideDesktopSearchPopup) {
            handelDesktopSearchPopStyle(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideSearchPop);
    
        return () => {
            document.removeEventListener('click', handleClickOutsideSearchPop);
        };
    }, []);

    //Mobile Search Nav Control
    const [handelMobileSearch, setHandelMobileSearch] = useState(false);

    useEffect(() => {
        if (handelMobileSearch) {
            document.body.classList.add('overflow_block_1199');
        } else {
            document.body.classList.remove('overflow_block_1199');
        }
    }, [handelMobileSearch]);

    const handelSearchHistoryDelete = (history) => {
        removeSearchHistory(history)
    };

    // Notification Service
    const [notificationCount, setNotificationCount] = useState(0);

    // useEffect(() => {
    //     if (authenticatedUser && authenticatedUser.user_id) {
    //         // Create a WebSocket connection
    //         const ws = new WebSocket(`ws://localhost:8000/ws/notifications/${authenticatedUser.user_id}/`);

    //         // Handle incoming WebSocket messages
    //         ws.onmessage = (event) => {
    //             const data = JSON.parse(event.data);
    //             // Update notification count from WebSocket data
    //             setNotificationCount(data || 0);
    //         };

    //         // Log WebSocket connection status
    //         ws.onopen = () => {
    //             console.log('WebSocket connection established');
    //         };

    //         ws.onclose = () => {
    //             console.log('WebSocket connection closed');
    //             // Optionally, you can try to reconnect or handle disconnection
    //         };

    //         // Cleanup function to close WebSocket connection when the component unmounts or user changes
    //         return () => {
    //             ws.close();
    //         };
    //     }
    // }, [authenticatedUser.user_id]);

    const [notificationPopStyle, setNotificationPopStyle] = useState(false);
    const notificationPopREF  = useRef();
    const notificationPopREFResponded = useRef();
    const notificationButtonRef = useRef();
    const notificationButtonRefResponded = useRef();

    // body style

    useEffect(() => {
        if (notificationPopStyle) {
            document.body.classList.add('overflow_block_1199');
        } else {
            document.body.classList.remove('overflow_block_1199');
        }
    }, [notificationPopStyle]);

    const handleNotificationStyle = () => {
        if (notificationPopStyle) {
            setNotificationPopStyle(false);
        } else {
            setNotificationPopStyle(true);
        }
   };

    const handleClickOutsideNotification = (event) => {
        // If click is inside the popup, do nothing
        if (notificationPopREF.current && notificationPopREF.current.contains(event.target)) {
            return;
        }
        // If click is inside the popup, do nothing
        if (notificationPopREFResponded.current && notificationPopREFResponded.current.contains(event.target)) {
            return;
        }
        // If click is inside the button, do nothing
        if (notificationButtonRef.current && notificationButtonRef.current.contains(event.target)) {
            return;
        }
        // If click is inside the popup, do nothing
        if (notificationButtonRefResponded.current && notificationButtonRefResponded.current.contains(event.target)) {
            return;
        }
        // If click is outside both the popup and button, close the popup
        setNotificationPopStyle(false);
   };


    useEffect(() => {
        document.addEventListener('click', handleClickOutsideNotification);
    
        return () => {
            document.removeEventListener('click', handleClickOutsideNotification);
        };
    })


    return (
        <>
            <div 
                className={`nav_cover_frame ${situationalNav ? 'situational_close' : null}`} 
                id='nav_cover_frame'
            >
                <div className='nav_frame'>
                    <div className='nav_logo_main_href_frame'>
                        <Link className='nav_logo Pre_KR_Medium' to={'/'} onClick={() => setRespondedNavStyle(false)}>
                            <CompanyLogo />
                        </Link>
                        <div className="nav_main_href_frame g_row Pre_KR_SemiBold">
                            <Link className={`main_href_frame ${location.pathname === '/' ? 'selected' : ''}`} to='/'>홈</Link>
                            <Link className={`main_href_frame ${location.pathname.includes('/community') ? 'selected' : ''}`} to='/community?category=국내기업'>커뮤니티</Link>
                            <Link className={`main_href_frame ${location.pathname === ('/subscribing_content') ? 'selected' : ''}`} to='/subscribing_content'>구독</Link>
                            <Link className={`main_href_frame ${location.pathname.includes('/membership') ? 'selected' : ''}`} to='/membership_subscription'>멤버십</Link>
                        </div>
                    </div>
                    <form className='nav_search_bar_frame' onSubmit={handleSearchSubmit}>
                        <input className="nav_search_bar_input Pre_KR_Medium" name="kw" placeholder="검색어를 입력해주세요"
                            onFocus={() => handelDesktopSearchPopStyle(true)}
                            ref={DesktopSearch}></input>
                        <SearchIcon style={{width: '24px', height: '24px', stroke: '#1A1A1B'}}/>
                        <div className={`nav_search_down_popup ${desktopSearchPopStyle ? 'open' : null}`} ref={DesktopSearchPop}>
                            <div className='nav_search_down_popup_section_title_frame Pre_KR_Medium'>
                                <span>검색기록</span>
                                <div 
                                    style={{color:'#bbbbbbb', fontSize:'12px', cursor:'pointer'}}
                                    onClick={() => clearSearchHistory()}>
                                    비우기
                                </div>
                            </div>
                            <div className='nav_search_history_main_frame'>
                                {searchHistory.length !== 0 ? (
                                    searchHistory.map((history, index) => (
                                        <div key={index} className='nav_search_history_frame'>
                                            <Link className='nav_search_history_navigation_button' to={`/search?kw=${history}`} onClick={() => handelDesktopSearchPopStyle(false)}>
                                                <span className="nav_search_history_text Pre_KR_Normal">{ history }</span>
                                            </Link>
                                            <div className="nav_search_history_delete_button" onClick={() => handelSearchHistoryDelete(history)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <mask id="mask0_1456_253" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                                    </mask>
                                                    <g mask="url(#mask0_1456_253)">
                                                    <path d="M6.40141 18.6532L5.34766 17.5995L10.9477 11.9995L5.34766 6.39945L6.40141 5.3457L12.0014 10.9457L17.6014 5.3457L18.6552 6.39945L13.0552 11.9995L18.6552 17.5995L17.6014 18.6532L12.0014 13.0532L6.40141 18.6532Z" fill="#616161"/>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='search_history_none_pc_nav'>검색기록이 없습니다</div>
                                )}
                            </div>
                        </div>
                    </form>
                    {accessToken ? (
                        <div className="nav_logined_frame">
                            <div 
                                className="nav_logined_icon_button" 
                                style={{marginRight:'16px'}} 
                                 ref={notificationButtonRef}
                                onClick={() => handleNotificationStyle()}
                            >
                                <NotificationIcon style={{width: '24px', height: '24px'}}/>
                                {notificationCount !== 0 && (
                                    <div className='notification_count_frame Pre_KR_Normal'>{ notificationCount }</div>
                                )}
                            </div>
                            <Link className="nav_logined_icon_button" style={{marginRight:"24px"}} to={'/bookmark'}>
                                <BookmarkIcon style={{width: '24px', height: '24px'}}/>
                            </Link>
                            <div className="nav_logined_user_info_frame" onclick="user_option_opener()" id="nav_my_button">
                                <div className="nav_logined_user_profile_img">
                                    {userProfileImage && (
                                        <img src={ userProfileImage } alt="User Profile Image"></img>
                                    )}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <mask id="mask0_1027_1611" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1027_1611)">
                                    <path d="M12.0004 15.0388L6.34668 9.38481L7.40043 8.33105L12.0004 12.9311L16.6004 8.33105L17.6542 9.38481L12.0004 15.0388Z" fill="#616161"/>
                                    </g>
                                </svg>
                            </div>
                            <div className="user_menu_popup">
                                <div className="user_menu_option_holder_frame">
                                    <Link className="user_menu_option_frame Pre_KR_Normal" to={`/mypage?current_page=myProfile`}>마이페이지</Link>
                                    <Link className="user_menu_option_frame Pre_KR_Normal" to={'/mypage?current_page=purchasedReports'}>구매리포트</Link>
                                    <Link className="user_menu_option_frame Pre_KR_Normal" to={'/mypage?current_page=communityManagement'}>커뮤니티 작성글</Link>
                                    <a className="user_menu_option_frame Pre_KR_Normal" href="{% url 'ReportMarket:report_upload' %}">리포트 업로드</a>
                                    <div className="user_menu_option_frame Pre_KR_Normal" onClick={() => handleLogout()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <mask id="mask0_1129_6466" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                            <rect width="20" height="20" fill="#D9D9D9"/>
                                            </mask>
                                            <g mask="url(#mask0_1129_6466)">
                                            <path d="M4.42829 17.0846C4.00735 17.0846 3.65104 16.9388 3.35938 16.6471C3.06771 16.3554 2.92188 15.9991 2.92188 15.5782V4.42439C2.92188 4.00344 3.06771 3.64714 3.35938 3.35547C3.65104 3.0638 4.00735 2.91797 4.42829 2.91797H10.0132V4.16795H4.42829C4.36418 4.16795 4.30541 4.19466 4.25198 4.24807C4.19856 4.3015 4.17185 4.36028 4.17185 4.42439V15.5782C4.17185 15.6423 4.19856 15.7011 4.25198 15.7545C4.30541 15.8079 4.36418 15.8346 4.42829 15.8346H10.0132V17.0846H4.42829ZM13.5308 13.5589L12.6655 12.6551L14.6943 10.6263H7.58531V9.3763H14.6943L12.6655 7.34745L13.5308 6.44364L17.0885 10.0013L13.5308 13.5589Z" fill="#747474"/>
                                            </g>
                                        </svg>
                                        로그아웃
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="nav_login_frame">
                            <Link className="nav_login_text Pre_KR_Normal" to={'/login'}>로그인</Link>
                            <Link className="nav_signup_button Pre_KR_Normal" to={'/signup'}>회원가입</Link>
                        </div>
                    )}
                    <div className='responed_option_frame'>
                        <div className="responed_option_icon_frame" onClick={() => handleNotificationStyle()} ref={notificationButtonRefResponded}>
                            <NotificationIcon style={{width: '23px', height: '23px'}}/>
                            {notificationCount !== 0 && (
                                <div className='notification_count_frame Pre_KR_Normal'>{ notificationCount }</div>
                            )}
                        </div>
                        <div className='responed_option_icon_frame' onClick={() => setHandelMobileSearch(true)}>
                            <SearchIcon style={{width: '23px', height: '23px', stroke: '#1A1A1B'}}/>
                        </div>
                        {!respondedNavStyle ? (
                            <div className="responed_option_icon_frame responded_icon_1199" onClick={() => setRespondedNavStyle(true)}>
                                <MenuOpenIcon style={{width: '28px', height: '28px'}}/>
                            </div>
                        ) : (
                            <div className="responed_option_icon_frame responded_icon_1199" onClick={() => setRespondedNavStyle(false)}>
                                <CloseIcon style={{width: '28px', height: '28px', stroke: '#1A1A1B'}}/>
                            </div>
                        )}
                    </div>
                    <NotificationPOP styleControl={notificationPopStyle} handleStyle={setNotificationPopStyle} ref={notificationPopREF}/>
                </div>
            </div>
            <div className={`responded_menu_frame ${respondedNavStyle ? 'menu_open' : null}`} id="responded_menu_frame">
                <div className="responded_menu_main_content_frame">
                    <Link 
                        className="responded_menu_user_information_frame" 
                        to={  user ? `/mypage?current_page=myProfile` : '/login' } 
                        onClick={() => setRespondedNavStyle(false)}
                    >
                        <div className="responded_menu_user_information">
                            <div className="responded_menu_user_profile_img">
                                {user ? (
                                    userProfileImage && (
                                        <img src={userProfileImage}></img>
                                    )
                                ) : (
                                    <img src={require('../static/assets/anonymous.png')}></img>
                                )}
                            </div>
                            <div className="responded_menu_user_username_email_frame">
                                {user && (
                                    <>
                                        <span className="responded_menu_user_username_email_text Pre_KR_Medium">{ authenticatedUser.username }</span>
                                        <span className="responded_menu_user_username_email_text Pre_KR_Normal" style={{fontSize:'14px', color:'#616161'}}>{ authenticatedUser.email }</span>
                                    </>
                                )}
                                {!user && (
                                    <span className="responded_menu_user_username_email_text Pre_KR_Medium">로그인을 해주세요</span>
                                )}
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="mask0_1129_6475" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                            <rect width="32" height="32" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1129_6475)">
                            <path d="M17.731 16.0037L11.5977 9.87036L12.5413 8.92676L19.6182 16.0037L12.5413 23.0806L11.5977 22.137L17.731 16.0037Z" fill="#747474"/>
                            </g>
                        </svg>
                    </Link>
                    <div className="responded_menu_link_frame">
                        <Link className="responded_menu_link Pre_KR_Normal" to={'/'} onClick={() => setRespondedNavStyle(false)}>HOME</Link>
                        <Link className="responded_menu_link Pre_KR_Normal" to={'/community?category=home'} onClick={() => setRespondedNavStyle(false)}>커뮤니티</Link>
                        <Link className="responded_menu_link Pre_KR_Normal" to={'/membership_subscription'} onClick={() => setRespondedNavStyle(false)}>멤버십</Link>
                    </div>
                    {accessToken && (
                        <div className="responded_menu_link_frame">
                            <Link className="responded_menu_link Pre_KR_Normal" to={`/mypage?current_page=myProfile`} onClick={() => setRespondedNavStyle(false)}>마이페이지</Link>
                            <Link className="responded_menu_link Pre_KR_Normal" to={'/subscribing_content'} onClick={() => setRespondedNavStyle(false)}>구독</Link>
                            <Link className="responded_menu_link Pre_KR_Normal" to={'/bookmark'} onClick={() => setRespondedNavStyle(false)}>북마크</Link>
                        </div>
                    )}
                </div>
                <div className="responded_menu_button_container_frame">
                    {accessToken ? (
                        <a className="responded_menu_logout_button Pre_KR_Normal" onClick={() => handleLogout()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <mask id="mask0_1129_6466"style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1129_6466)">
                                <path d="M4.42829 17.0846C4.00735 17.0846 3.65104 16.9388 3.35938 16.6471C3.06771 16.3554 2.92188 15.9991 2.92188 15.5782V4.42439C2.92188 4.00344 3.06771 3.64714 3.35938 3.35547C3.65104 3.0638 4.00735 2.91797 4.42829 2.91797H10.0132V4.16795H4.42829C4.36418 4.16795 4.30541 4.19466 4.25198 4.24807C4.19856 4.3015 4.17185 4.36028 4.17185 4.42439V15.5782C4.17185 15.6423 4.19856 15.7011 4.25198 15.7545C4.30541 15.8079 4.36418 15.8346 4.42829 15.8346H10.0132V17.0846H4.42829ZM13.5308 13.5589L12.6655 12.6551L14.6943 10.6263H7.58531V9.3763H14.6943L12.6655 7.34745L13.5308 6.44364L17.0885 10.0013L13.5308 13.5589Z" fill="#747474"/>
                                </g>
                            </svg>
                            로그아웃
                        </a>
                    ) : (
                        <>
                            <Link className="responded_menu_signup_signin_button Pre_KR_Medium" href="{% url 'AuthUser:signup' %}">회원가입</Link>
                            <Link className="responded_menu_signup_signin_button Pre_KR_Medium" style={{background:'none', border:'solid 1px #0066ff', color:'#0066ff'}} to={'/login'} onClick={() => setRespondedNavStyle(false)}>로그인</Link>
                        </>
                    )}
                </div>
            </div>
            <MobileSearchPop styleToggle={handelMobileSearch} handelStyleToggle={() => setHandelMobileSearch(false)} searchHistory={searchHistory} deleteHistory={handelSearchHistoryDelete} deleteAllHistory={clearSearchHistory}/>
        </>
    );
}

export default Nav;
