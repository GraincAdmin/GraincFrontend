import React, { forwardRef, useContext, useEffect, useRef, useState } from "react";
import useAxios from "../../../axiosAPIClient";
import LoadingCircle from "../../Global/LoadingCircle";
import '../../../static/css/SellReportsBase/NotificationPOP/NotificationPOP.css'
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
// icon

import { ReactComponent as NotificationNoneIcon } from '../../../static/assets/GlobalIcon/Bell_Close.svg'
import { ReactComponent as NotificationActionIcon } from '../../../static/assets/GlobalIcon/More_Horizontal.svg'
import { ReactComponent as NotificationDeleteIcon } from '../../../static/assets/GlobalIcon/Trash_Full.svg'
import { ReactComponent as FilledArrowTop } from '../../../static/assets/GlobalIcon/FilledArrowTop.svg'
import { ReactComponent as CloseIcon } from '../../../static/assets/GlobalIcon/Close_MD.svg'
import SnackBarStore from "../../Store/SnackBarStore";

const NotificationPOP = forwardRef(({ styleControl, handleStyle }, ref) => {

    const { user } = useContext(AuthContext);
    const { showSnackBar } = SnackBarStore();
    const apiClient = useAxios();

    const [loading, setLoading] = useState(true);
    const [notificationCategory, setNotificationCategory] = useState('all');
    const [notifications, setNotifications] = useState([]);
    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const [infiniteLoading, setInfiniteLoading] = useState(false);

    function createNotificationPageButton(label, value) {
        return <div 
            className={`notification_category_button`}
            onClick={() => setNotificationCategory(value)}
        >
            <span className="Pre_KR_Medium">{label}</span>
            {notificationCategory === value &&  (
                <div className="notification_category_selected"></div>
            )}
        </div>
    }

    const fetchNotifications = async (page) => {
        try {
            if (user) {
                const response = await apiClient.get(`/get_notification/?page=${page}&type=${notificationCategory}`);
                const data = response.data;
                if (response.status === 200) {
                    currentPage.current = Number(data.current_page);
                    maxPage.current = Number(data.max_page)
                    setNotifications((preState) => [...preState, ...data.notifications]);
                }   

            }
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('알림을 불러오던 중 문제가 발생했습니다', 'error')
            }
            setLoading(true);
        } finally {
            setLoading(false);
            setInfiniteLoading(false)
        }
    }


    useEffect(() => {
        // Clear notifications and reset pagination when styleControl changes
        if (styleControl) {

          setNotifications([]); // Clear existing notifications
          fetchNotifications(1); // Fetch notifications for the current category and page 1
        }
      
        // Reset notification category to 'community' if styleControl is not active
        if (!styleControl) {
          setNotificationCategory('all'); // Update the notification category
          setNotifications([]); // Clear notifications when category changes
        }
        setLoading(true);
      }, [notificationCategory, styleControl]); // Effect triggers when styleControl or category changes




    const getNotificationLink = (notification) => {
        switch (notification.notification_type) {
            case 'article':
                return `/community_detail/${notification.content_id}`;
            case 'comment':
                return `/community_comments/${notification.content_id}`;
            case 'comment_reply':
                return `/community_comments/${notification.content_id}`;
            case 'inquiry':
                return `/inquiry`;
            case 'announcement':
                return `/announcement/detail/?announcement_id=${notification.content_id}`;
            default:
                return '/';
        }
    };

    // handle notification delete
    const [notificationDeleteStyle, setNotificationDeleteStyle] = useState(false);
    const [deletingNotification, setDeletingNotification] = useState(null);
    const handleNotificationDelete = (notification_id) => {
        setDeletingNotification(notification_id);
        if (notificationDeleteStyle) {
            setNotificationDeleteStyle(false);
        } else {
            setNotificationDeleteStyle(true);
        }
    }

    const fetchDeleteNotification = async () => {
        try {
            const response = await apiClient.post('/notification_delete/', {
                notification_id: deletingNotification
            })
            if (response.status === 200) {
                setNotificationDeleteStyle(false);
                const updatedNotification = notifications.filter(
                    notification => notification.id !== deletingNotification
                );
                setNotifications(updatedNotification);
            }
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('알림을 삭제하던 중 문제가 발생했습니다', 'error')
            }
        }
    }


    // infinite scroll feature
    const observerRef = useRef();

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !loading && !infiniteLoading) {
                    setInfiniteLoading(true);
                    fetchNotifications(currentPage.current + 1);
                }
            }, {
            threshold: 1
        });


        if (observerRef.current) {
            if (!loading && !infiniteLoading) {
                observer.observe(observerRef.current);
            } else {
                observer.unobserve(observerRef.current);
            }
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };

    }, [currentPage.current, maxPage.current, loading, infiniteLoading]);  // Observe only when popup is visible


    return (
        <div className={`notification_pop_main_frame ${styleControl ? 'open' : ''}`} ref={ref}>
            <div className="notification_arrow_icon">
                <FilledArrowTop />
            </div>
            <div className="notification_frame">
                <div className="notification_section_title Pre_KR_SemiBold">
                    <span>알림센터</span>
                    <div className="notification_close_button" onClick={() => handleStyle()}>
                        <CloseIcon style={{stroke: '#1A1A1B'}}/>
                    </div>
                </div>
                <div className="notification_category_selection_frame">
                    {createNotificationPageButton('전체', 'all')}
                    {createNotificationPageButton('내 알림', 'my')}
                    {createNotificationPageButton('서비스', 'service')}
                </div>
                <div className="notification_main_frame">
                    {loading ? (
                        <LoadingCircle color_option={true} size_option={true}/>
                    ) : (
                        <>
                        {notifications.length === 0 ? (
                            <div className="notification_none_frame">
                                <NotificationNoneIcon style={{ width:'30px', height:'30px' }}/>
                                <span className="Pre_KR_Medium">받은 알림이 없습니다</span>
                            </div>
                        ) : (
                            notifications.map((notification, index) => (
                                <div key={index} className="notification_content_frame">
                                    <div className="notification_date_action_frame">
                                        <span>{notification.formatted_create_date}</span>
                                        <div className="notification_action_button_frame" onClick={() => handleNotificationDelete(notification.id)}>
                                            <NotificationActionIcon style={{width: '24px', height: '24px'}}/>
                                        </div>
                                    </div>
                                    <Link className="notification_title Pre_KR_Medium" to={getNotificationLink(notification)} onClick={() => handleStyle(false)}>
                                        {notification.notification_subject}
                                    </Link>
                                    <div className="notification_author_frame">
                                        <div className="notification_author_profile_image">
                                            <img src={notification.author_profile_image}></img>
                                        </div>
                                        <span className="Pre_KR_Normal">{notification.author_username}</span>
                                    </div>
                                </div>
                            ))
                        )}
                        {infiniteLoading && (
                            <LoadingCircle color_option={true}/>
                        )}                 
                        </>
                    )}
                    <div style={{ height: "2px", minHeight:'2px' }} ref={observerRef}></div>
                </div>
                <div className={`notification_delete_frame ${notificationDeleteStyle ? 'open' : null}`}>
                    <div className="notification_delete_button" style={{border: 'solid 1px #eee'}} onClick={() => fetchDeleteNotification()}>
                        <NotificationDeleteIcon style={{width:'20px', height:'20px', stroke: '#1A1A1B'}}/>
                        <span className="Pre_KR_SemiBold">알림 삭제</span>
                    </div>
                    <div className="notification_delete_button" onClick={() => handleNotificationDelete()}>
                        <span className="Pre_KR_SemiBold">취소</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default NotificationPOP
