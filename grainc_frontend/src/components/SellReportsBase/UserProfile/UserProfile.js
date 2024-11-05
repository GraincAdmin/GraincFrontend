import React, { useState, useContext, useEffect, useRef } from "react";
import '../../../static/css/SellReportsBase/UserProfile/UserProfile.css'
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate, useParams  } from 'react-router-dom';

// Icon
import { ReactComponent as PlusWhiteIcon } from '../../../static/assets/GlobalIcon/Add_Plus.svg'
import { ReactComponent as CheckWhiteIcon } from '../../../static/assets/GlobalIcon/Check_White.svg'

// section component
import GlobalCommunityArticle2 from "../../Community/Community_Global/Community_Article2";

// pagination 
import Pagination from "../../Global/Pagination";
import useAxios from "../../../axiosAPIClient";
import SnackBarStore from "../../Store/SnackBarStore";
import SkeletonType3 from "../Skeleton_UI/SkeletonType3";
function UserProfile() {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    // user identification
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";

    // profile user identification
    const { user_id } = useParams();

    // profile paging system
    const [profilePage, setProfilePage] = useState('community');

    function buildProfilePageButton(label, value) {
        return (
            <div 
                className={`
                    user_page_link_button 
                    Pre_KR_Medium 
                    ${profilePage === value ? value === 'membership' ? 'membership_selected' : 'selected' : null}`
                } 
                onClick={() => setProfilePage(value)}>
                {label}
            </div>
        );
    }


    // user profile basic information
    const [userProfile, setUserProfile] = useState(null);
    const [userProfileLoading, setUserProfileLoading] = useState(true); 

    const fetchUserProfileInformation = async () => {
        try {
            setUserProfileLoading(true);
            const response = await apiClient.get(`/get_user_profile/${user_id}/`);
            const data = response.data;
            setUserProfile(data);

            // subscribing status check (api call minimization)
            const userSubscriberList = data.subscribers;
            if (user != null) {
                const userSubscriberSet = new Set(userSubscriberList);
                setSubscribeStatus(userSubscriberSet.has(user.id));
            }
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('유저 데이터를 불러오지 못 했습니다', 'error');
            }
        } finally {
            setUserProfileLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfileInformation();
    }, []);


    // user community article
    const [userArticle, setUserArticle] = useState([]);
    const [userArticleLoading, setUserArticleLoading] = useState(false); 
    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const observerRef = useRef();

    const fetchUserCommunityArticle = async (page) => {
        setUserArticleLoading(true);
        let fetchUrl = `/get_user_article/${user_id}/?page=${page}&type=${profilePage}&device=pc`;
        try {
            const response = await apiClient.get(fetchUrl);
            var data = response.data;
            if (response.status === 200) {
                setUserArticle((preState) => [...preState, ...data.articles]);
                currentPage.current = Number(data.current_page);
                maxPage.current = Number(data.max_page)
            }
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('글을 가져오던 중 문제가 발생했습니다', 'error');
            }
        } finally {
            setUserArticleLoading(false);
        }
    };



    useEffect(() => {
        setUserArticle([]);
        currentPage.current = 1;
        maxPage.current = 1;
        fetchUserCommunityArticle(1);
    }, [profilePage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !userArticleLoading) {
                    fetchUserCommunityArticle(currentPage.current + 1);
                }
            },
            { threshold: 1.0 }
        );
    
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
    
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [userArticleLoading, currentPage.current, maxPage.current]);
    


    // Profile page subscribe feature

    const [subscribeStatus, setSubscribeStatus] = useState(false);

    const handelSubscribe = async () => {
        const originalStatus = subscribeStatus;
        setSubscribeStatus(!subscribeStatus);
        
        try {
            const response = await apiClient.post('/handel_subscribe_profile/', {
                authUser_id: authenticatedUser.user_id,
                user_id: user_id
            });
            if (response.status !== 200) {
                setSubscribeStatus(originalStatus); // Rollback on error
            }
        } catch (error) {
            if (error.response.status !== 401) {
                setSubscribeStatus(originalStatus); // Rollback on error
                showSnackBar('구독중 문제가 발생했습니다', 'error');
            }
        }
    };

    
    return (
        <div className="user_detail_main_cover">
            <div className="g_colum">
                <div className="user_profile_main_information">
                <div className="g_row g_justify_space_between" style={{width: '100%'}}>
                    <div className="g_colum g_justify_center">
                        <div className="user_basic_information">
                            {!userProfileLoading ? (
                                <>
                                    <span className="user_username_text Pre_KR_SemiBold">{ userProfile.username }</span>
                                    <div className="user_introduction_frame Pre_KR_Normal">
                                        { userProfile.introduction ? userProfile.introduction : '소개가 없습니다' }
                                    </div>   
                                </>
                            ) : (
                                <div className="skeleton-list-item" style={{display: 'flex', width: '100px', height: '40px'}} />
                            )}
                        </div>
                    </div>
                    <div className="user_profile_image">
                        {userProfile && (
                            <img className="g_img_radius_50" src={ userProfile.user_profile_image }></img>
                        )}
                    </div>
                </div>
                <div className="g_row g_justify_space_between g_align_center" style={{width: '100%'}}> 
                    {!userProfileLoading ? (
                        <div className="g_row g_gap_16">
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>작성글</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{ userProfile.article_count }개</span>
                            </div>
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>종아요</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{ userProfile.likes_count }개</span>
                            </div>
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>구독자</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{ userProfile.subscribers_count }명</span>
                            </div>
                        </div>
                    ) : (
                        <div className="skeleton-list-item" style={{display: 'flex', width: '40%', height: '30px'}} />
                    )}
                    {authenticatedUser.user_id === Number(user_id) ? (
                        <Link className="user_subscribe_button subscribed_button Pre_KR_Medium" to={'/mypage?current_page=myProfile'}>내 프로필</Link>
                    ) : (
                        <>
                            {!subscribeStatus ? (
                                <div 
                                    className="user_subscribe_button subscribed_button Pre_KR_Medium" 
                                    onClick={() => handelSubscribe()}
                                >
                                    <PlusWhiteIcon style={{width:'20px', height:'24px', stroke: '#0066ff'}}/>
                                    구독
                                </div>
                            ) : (
                                <div 
                                    className="user_subscribe_button unsubscribed_button Pre_KR_Medium" 
                                    onClick={() => handelSubscribe()}
                                >
                                    구독취소
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
                <div className="user_profile_section_divider"></div>
                <div className="user_page_link_button_frame">
                    {buildProfilePageButton('커뮤니티', 'community')}
                    {buildProfilePageButton('멤버십', 'membership')}
                    {buildProfilePageButton('좋아요한 글', 'like')}
                </div>
            </div>
            <div className="user_content_main_frame">
                <GlobalCommunityArticle2 data={userArticle}/>
                {userArticleLoading && (
                    <SkeletonType3 count={2} />
                )}
                <div style={{height: '10px'}} ref={observerRef} />
            </div>
        </div>
    );
};

export default UserProfile