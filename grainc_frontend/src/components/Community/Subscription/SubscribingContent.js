import React, { useContext, useEffect, useRef, useState } from "react";
import '../../../static/css/Community/Subscription/SubscribingContent.css'
import MembershipAd from "../../SellReportsBase/GlobalAd/MembershipAd";
import SituationalNavM from "../../SellReportsBase/Situational_Nav_Mobile/SituationalNavM";
import useAxios from "../../../axiosAPIClient";
import GlobalCommunityArticle from "../Community_Global/Community_Article";
import LoadingCircle from "../../Global/LoadingCircle";
import AuthContext from "../../../context/AuthContext";
import loginRequestStore from "../../Store/LoginRequest";
import SnackBarStore from "../../Store/SnackBarStore";

function SubscribingContent() {
    const apiClient = useAxios();
    const { user } = useContext(AuthContext);
    const { showSnackBar } = SnackBarStore();
    const { setLoginRequest, setPrePageOption } = loginRequestStore();
        // content detail
    const [articles, setArticles] = useState([]);
    const maxPage = useRef(1);
    const currentPage = useRef(1);
    const [isLoading, setIsLoading] = useState(false);

    const observerRef = useRef();

    const getUserSubscribingContents = async (page) => {
        if (!isLoading) {
            try {
                setIsLoading(true);
                const response = await apiClient.get(
                    `/get_user_subscribing_contents/?page=${page}`);
                const data = response.data;
                if (response.status === 200) {
                    setArticles(prevArticles => [...prevArticles, ...data.articles]);
                    currentPage.current = Number(data.current_page);
                    maxPage.current = Number(data.max_page)
                }
            } catch (error) {
                if (error.response.status !== 401) {
                    showSnackBar('구독 콘텐츠를 가져오던 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setIsLoading(false);
            }
        }
    };


    // Initial data fetch
    useEffect(() => {
        if (user !== null) {
            getUserSubscribingContents(1); // Fetch the first page
        } else {
            setLoginRequest(true);
            setPrePageOption(true);
        }
    }, []);

    // IntersectionObserver setup
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !isLoading) {
                    getUserSubscribingContents(currentPage.current + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            if (!isLoading) {
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
    }, [isLoading, currentPage.current, maxPage.current]);

    return (
        <>
            <SituationalNavM page='구독'/>
            <div className="subscribing_content">
                <div className="subscribing_content_section">
                    <div className="subscribing_content_title Pre_KR_SemiBold">구독중인 글</div>
                    <GlobalCommunityArticle data={articles}/>
                    <div ref={observerRef} style={{ height: '10px' }}></div>
                    {isLoading && (
                        <div className="g_row g_justify_center" style={{width: '100%'}}>
                            <LoadingCircle color_option={true} size_option={true}/>
                        </div> 
                    )}
                </div>
                <div className="subscribing_content_ad_section">
                    <MembershipAd />
                </div>
            </div>
        </>
    );
}

export default SubscribingContent;
