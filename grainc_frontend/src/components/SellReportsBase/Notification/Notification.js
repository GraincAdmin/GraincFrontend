import React, { useContext, useEffect, useState } from "react";
import '../../../static/css/SellReportsBase/Notification/Notification.css'
import AuthContext from "../../../context/AuthContext";
import SituationalNavM from "../Situational_Nav_Mobile/SituationalNavM";
import useAxios from "../../../axiosAPIClient";
import Pagination from "../../Global/Pagination";
import { Link, useNavigate } from "react-router-dom";
function Notification() {
    const apiClient = useAxios();
    //user 
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user.user_id : "unAuthenticated";
    const navigate = useNavigate();
    function authentication_check() {
        if (authenticatedUser === "unAuthenticated") {
            navigate('/login');
        } 
    }
    useEffect(() => {
        authentication_check();
    }, []);

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchNotifications = async () => {
        try {
            const response = await apiClient.get(`/get_notification/?page=${currentPage}`);
            const data = response.data;
            setNotifications(data.notifications)
            console.log(data)
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [currentPage]);

    // Notification Delete

    const [notificationDeletePopStyle, setNotificationDeletePopStyle] = useState(false);
    const [deletingNotification, setDeletingNotification] = useState(null);
    
    const handleNotificationDelete = (notification_id) => {
        if (notificationDeletePopStyle) {
            setNotificationDeletePopStyle(false);
        } else {
            setNotificationDeletePopStyle(true);
        }
        setDeletingNotification(notification_id);
    }

    const fetchDeleteNotification = async () => {
        try {
            const response = await apiClient.post('/notification_delete/', {
                notification_id: deletingNotification
            })
            if (response.status === 200) {
                fetchNotifications();
                setNotificationDeletePopStyle(false);
            }
        } catch(error) {
            console.log(error)
        }
    }

    
    // Additional Handle

    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    const getNotificationLink = (notification) => {
        switch (notification.notification_type) {
            case 'community':
                return `/community_detail/${notification.article_id}`;
            case 'report':
                return `/report_detail/${notification.report_id}`;
            case 'report_sales':
                return `/mypage`;
            case 'announcement':
                return `/announcement/detail/?announcement_id=${notification.announcement_id}`;
            default:
                return '/';
        }
    };
    
    return (
        <>
            <SituationalNavM page={'알림'}/>
            <div className={`notification_delete_popup ${notificationDeletePopStyle ? 'open' : null}`}>
                <div className="notification_popup_button_frame">
                    <div className="notification_popup_button Pre_KR_Normal" style={{color:'#ff0000'}} onClick={() => fetchDeleteNotification()}>삭제하기</div>
                    <div className="notification_popup_button Pre_KR_Normal" onClick={() => handleNotificationDelete(null)}>취소</div>
                </div>
            </div>
            <div className="notification_main_cover_main_R">
                <div className="notification_main_cover">
                    <div className="notification_section_title_text Pre_KR_Normal">알림</div>
                    <div className="notification_cover_frame">
                        {notifications.length !== 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index} className="notification_frame notification_frame_{{ notification.pk }}">
                                        <Link
                                            className="notification_information_frame"
                                            to={getNotificationLink(notification)}
                                        >
                                        <div className="notification_main_information_frame">
                                            <div className="notification_user_information_frame">
                                                <div className="notification_user_profile_image">
                                                    <img src="{{ notification.notification_create_user.profile_image.url }}"></img>
                                                </div>
                                                <span className="notification_username Pre_KR_Normal">{ notification.author_username }</span>
                                            </div>
                                            <span className="notification_section_divider_text Pre_KR_Normal">|</span>
                                            <span className="notification_date Pre_KR_Normal">{ notification.formatted_create_date }</span>
                                        </div>
                                        <div className="notification_content_frame Pre_KR_Normal">
                                            {notification.notification_type === 'community' && (
                                                `'${notification.article_subject}' 새로운 커뮤니티 글을 업로드 했어요`
                                            )}
                                            {notification.notification_type === 'report' && (
                                                `‘${ notification.report_subject }' 새로운 리포트를 업로드 했어요`
                                            )}
                                            {notification.notification_type === 'report_sales' && (
                                                `리포트 판매알림 ‘${ notification.sold_report_subject }'`
                                            )}
                                            {notification.notification_type === 'announcement' && (
                                                `새로운 공지 ‘${ notification.announcement_subject }'`
                                            )}
                                        </div>
                                    </Link>
                                    <div className="notification_action_button" onClick={() => handleNotificationDelete(notification.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <mask id="mask0_1266_901" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9"/>
                                            </mask>
                                            <g mask="url(#mask0_1266_901)">
                                            <path d="M12 19.269C11.5875 19.269 11.2344 19.1221 10.9408 18.8282C10.6469 18.5346 10.5 18.1815 10.5 17.769C10.5 17.3565 10.6469 17.0033 10.9408 16.7095C11.2344 16.4158 11.5875 16.269 12 16.269C12.4125 16.269 12.7656 16.4158 13.0592 16.7095C13.3531 17.0033 13.5 17.3565 13.5 17.769C13.5 18.1815 13.3531 18.5346 13.0592 18.8282C12.7656 19.1221 12.4125 19.269 12 19.269ZM12 13.4997C11.5875 13.4997 11.2344 13.3528 10.9408 13.059C10.6469 12.7653 10.5 12.4122 10.5 11.9997C10.5 11.5872 10.6469 11.2341 10.9408 10.9405C11.2344 10.6466 11.5875 10.4997 12 10.4997C12.4125 10.4997 12.7656 10.6466 13.0592 10.9405C13.3531 11.2341 13.5 11.5872 13.5 11.9997C13.5 12.4122 13.3531 12.7653 13.0592 13.059C12.7656 13.3528 12.4125 13.4997 12 13.4997ZM12 7.73047C11.5875 7.73047 11.2344 7.58364 10.9408 7.28997C10.6469 6.99614 10.5 6.64297 10.5 6.23047C10.5 5.81797 10.6469 5.46489 10.9408 5.17122C11.2344 4.87739 11.5875 4.73047 12 4.73047C12.4125 4.73047 12.7656 4.87739 13.0592 5.17122C13.3531 5.46489 13.5 5.81797 13.5 6.23047C13.5 6.64297 13.3531 6.99614 13.0592 7.28997C12.7656 7.58364 12.4125 7.73047 12 7.73047Z" fill="#1A1A1B"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="user_notification_none_frame Pre_KR_Normal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="73" viewBox="0 0 72 73" fill="none">
                                    <mask id="mask0_1266_832" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="73">
                                    <rect y="0.5" width="72" height="72" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1266_832)">
                                    <path d="M12 57.5V51.5H18V30.5C18 26.35 19.25 22.6625 21.75 19.4375C24.25 16.2125 27.5 14.1 31.5 13.1V11C31.5 9.75 31.9375 8.6875 32.8125 7.8125C33.6875 6.9375 34.75 6.5 36 6.5C37.25 6.5 38.3125 6.9375 39.1875 7.8125C40.0625 8.6875 40.5 9.75 40.5 11V13.1C44.5 14.1 47.75 16.2125 50.25 19.4375C52.75 22.6625 54 26.35 54 30.5V51.5H60V57.5H12ZM36 66.5C34.35 66.5 32.9375 65.9125 31.7625 64.7375C30.5875 63.5625 30 62.15 30 60.5H42C42 62.15 41.4125 63.5625 40.2375 64.7375C39.0625 65.9125 37.65 66.5 36 66.5Z" fill="#E1E1E1"/>
                                    </g>
                                </svg>
                                최근받은 알림이 없습니다
                            </div>
                        )}
                    </div>
                    {notifications.length !== 0 && (
                        <Pagination page={currentPage} max_page={maxPage} handelPage={handlePageChange}/>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notification