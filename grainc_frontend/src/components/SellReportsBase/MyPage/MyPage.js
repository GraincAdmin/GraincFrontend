import React, { useContext, useEffect, useRef, useState } from "react";

import '../../../static/css/SellReportsBase/MyPage/MyPage.css'
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SnackBarStore from "../../Store/SnackBarStore";
import useAxios from "../../../axiosAPIClient";
import GlobalCommunityArticle2 from "../../Community/Community_Global/Community_Article2";
import SituationalNavM from "../Situational_Nav_Mobile/SituationalNavM";

// Icon
import { ReactComponent as SettingIcon } from '../../../static/assets/GlobalIcon/Settings.svg'
import SkeletonType3 from "../Skeleton_UI/SkeletonType3";


const MyPage = () => {
    // Page Authority Check
    const { user, userProfileImage } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";
    const navigate = useNavigate();

    const handlePageAuthority = () => {
        if (authenticatedUser === 'unAuthenticated') {
            navigate('/login');
        }
    };

    useEffect(() => {
        handlePageAuthority();
    }, [])


    const [myPageCategory, setMyPageCategory] = useState('myArticle');

    function buildMyPageCategoryButton(label, value) {
        return ( 
        <div 
            className={`
                my_page_category_button
                Pre_KR_Medium
                ${myPageCategory === value ? 
                    value === 'membership' ? 
                        'membership_selected' : 
                        'selected' : 
                    null
                }
            `}
            onClick={() => setMyPageCategory(value)}
        >
            {label}
        </div>
        );
    }

    // user information
    const [userDetailInformation, setUserDetailInformation] = useState([]);

    const getUserInformation = async () => {
        try {
            const response = await apiClient.get(`/my_page_get_user_profile/${user.id}/`)
            var data = response.data;
            setUserDetailInformation(data);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('유저 정보를 가져오던 중 문제가 발생했습니다', 'error')
            }
        }
    }



    // article
    const [articleLoading, setArticleLoading] = useState(true);
    const [myPageArticle, setMyPageArticle] = useState([]);
    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const observerRef = useRef();

    const { showSnackBar } = SnackBarStore();
    const apiClient = useAxios();

    const getMyPageArticle = async (page) => {
        setArticleLoading(true);
        try {
            const response = await apiClient.get(`/my_profile_article/?page=${page}&type=${myPageCategory}&device=pc`)
            var data = response.data;
            if (response.status === 200) {
                setMyPageArticle((prevState) => [...prevState, ...data.articles]);
                currentPage.current = Number(data.current_page);
                maxPage.current = data.max_page;
            }
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('글을 불러오던 중 문제가 발생했습니다', 'error');
            }
        } finally {
            setArticleLoading(false);
        }
    }

    useEffect(() => {
        getUserInformation(1);
    }, [])

    useEffect(() => {
        setMyPageArticle([]);
        currentPage.current = 1;
        maxPage.current = 1;
        getMyPageArticle(1);
    }, [myPageCategory]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !articleLoading) {
                    getMyPageArticle(currentPage.current + 1);
                }
            },
            { threshold: 1.0 }
        );
    
        if (observerRef.current) {
            if (!articleLoading) {
                observer.observe(observerRef.current);
            } else {
                observer.unobserve(observerRef.current);
            }
        }
    
        // Clean up the observer on component unmount
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    
    }, [articleLoading, currentPage.current, maxPage.current]);
    



    return (
        <>
            <SituationalNavM page={'내 프로필'} borderOption={true}/>
            <div className="my_page_main_frame">
                <div className="my_page_user_information_frame">
                    <div className="my_page_user_basic_information">
                        <div className="g_row g_align_center g_justify_space_between">
                            <div className="g_row g_align_center user_primary_information">
                                <div className="my_page_user_profile_image">
                                    <img className="g_img_radius_50" src={userProfileImage}/>
                                </div>
                                <div className="g_colum g_gap_4">
                                    <span className="my_page_username Pre_KR_SemiBold">{user.username}</span>
                                    <span className="my_page_email Pre_KR_Normal">{user.email}</span>
                                </div>
                            </div>
                            <Link 
                                className="my_page_navigate_button responded"
                                to={'/my_profile_edit'}
                            >
                                <SettingIcon style={{stroke: '#e1e1e1'}}/>
                            </Link>

                            <Link 
                                className="my_page_navigate_button normal Pre_KR_Medium"
                                to={'/my_profile_edit'}
                            >
                                프로필 설정
                            </Link>
                        </div>
                        <div className="my_page_statistic_frame">
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>작성글</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{userDetailInformation.article_count}개</span>
                            </div>
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>좋아요</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{userDetailInformation.like_count}개</span>
                            </div>
                            <div className="g_colum g_gap_4">
                                <span className="g_font_14 Pre_KR_Normal" style={{color: '#808080'}}>구독자</span>
                                <span className="g_font_18 g_text_color_2 Pre_KR_Normal">{userDetailInformation.subscriber_count}명</span>
                            </div>
                        </div>
                    </div>
                    <div className="my_page_section_divider_responded"></div>
                    <div className="my_page_category_button_frame">
                        {buildMyPageCategoryButton('내 작성글', 'myArticle')}
                        {buildMyPageCategoryButton('내 멤버십 글', 'membership')}
                        {buildMyPageCategoryButton('후원한 글', 'donated')}
                        {buildMyPageCategoryButton('좋아요한 글', 'liked')}
                    </div>
                    <div className="my_page_article_frame">
                        <GlobalCommunityArticle2 data={myPageArticle}/>
                    </div>
                    {articleLoading && (
                        <SkeletonType3 count={2}/>
                    )}
                    <div ref={observerRef} style={{height: '10px'}}/>
                </div>
            </div>
        </>
    );
}

export default MyPage