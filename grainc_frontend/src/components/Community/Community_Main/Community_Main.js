import React, { useState, useEffect, useRef } from 'react';
import '../../../static/css/Community/Community_Main/Community_Main.css'
import { Link, useLocation  } from 'react-router-dom';
import NoContent from '../../Global/NoContent'

// Community Main Icon

//Community_Article_Global_Components
import GlobalCommunityArticle from '../Community_Global/Community_Article';
import SkeletonType2 from '../../SellReportsBase/Skeleton_UI/SkeletonType2';


// pagination
import useAxios from '../../../axiosAPIClient';
import OrderByButton from '../Community_Global/Filters/OrderByButton';
import SubCategoryButton from '../Community_Global/Filters/SubCategoryButton';
import SnackBarStore from '../../Store/SnackBarStore';
function CommunityMain() {
    const apiClient = useAxios();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const communityCategory = queryParams.get('category');
    const currentPage = useRef(1);
    const maxPage = useRef(1);

    const { showSnackBar } = SnackBarStore();

    const [contentType, setContentType] = useState('all');

    function buildContentTypeButton(label, value) {
        return <div className={`
            content_type_button Pre_KR_Medium
            ${contentType === value ? value === 'membership' ? 'selected_membership' : 'selected' : ''}`}
            onClick={() => setContentType(value)}
            >
            {label}
        </div>
    }

    const [subCategory, setSubCategory] = useState('전체');
    const handelSubCategoryChange = (sub_category) => {
        setFilteredArticles([]);
        currentPage.current = 1;
        setSubCategory(sub_category)
    }

    const [orderBy, setOrderBy] = useState('최신순');
    const handelOrderByChange = (order_by) => {
        setFilteredArticles([]);
        currentPage.current = 1;
        setOrderBy(order_by)
    }


    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filteredArticlesLoading, setFilteredArticlesLoading] = useState(true);


    const fetchFilteredArticles = async (page) => {
        setFilteredArticlesLoading(true);
        try {
            const response = await apiClient.get(`/main_community_article/`, {
                params: {
                    page: page,
                    content_type: contentType,
                    category: communityCategory,
                    sub_category: subCategory,
                    order_by: orderBy
                }
            });            
            var data = response.data;

            setFilteredArticles((preState) => [...preState, ...data.articles]);
            currentPage.current = Number(data.current_page);
            maxPage.current = Number(data.max_page);
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('커뮤니티글을 가져오는 중 에러가 발행했습니다', 'error')
            }
        } finally {
            setFilteredArticlesLoading(false);
        }
    };

    useEffect(() => {
        setFilteredArticles([]);
        currentPage.current = 1;
        fetchFilteredArticles(1);
    }, [communityCategory, orderBy, subCategory, contentType]);


    const observerRef = useRef();

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !filteredArticlesLoading) {
                    fetchFilteredArticles(currentPage.current + 1);
                }
            },
            {threshold: 1}
        );

        if (observerRef.current) {
            if (!filteredArticlesLoading) {
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

    }, [filteredArticlesLoading, currentPage.current, maxPage.current]);


    return (
        <div style={{ display: 'flex', flexDirection:'column' }}>
            <div className='community_main_content_indicator_frame_pc g_align_center g_justify_space_between'>
                <span className='community_main_content_indicator Pre_KR_SemiBold'>{communityCategory}</span>
                <Link className='community_main_content_new_article_button' to={`/community_article_upload/${'new'}`}>
                    <span className='Pre_KR_SemiBold'>글 작성하기</span>
                </Link>
            </div>
            <div className="community_main_content_filter_frame">
                <div className='g_row g_gap_24'>
                    {buildContentTypeButton('전체', 'all')}
                    {buildContentTypeButton('커뮤니티', 'community')}
                    {buildContentTypeButton('멤버십', 'membership')}
                </div>
                <div className='g_row g_gap_4'>
                    <OrderByButton orderBy={orderBy} setOrderBy={handelOrderByChange}/>
                    <SubCategoryButton subCategory={subCategory} setSubCategory={handelSubCategoryChange}/>
                </div>
            </div>
            {filteredArticles.length !== 0 ? (
                <GlobalCommunityArticle data={filteredArticles} />
            ) : (
                !filteredArticlesLoading && (
                    <NoContent page={'community'}/>
                )
            )}
            {filteredArticlesLoading && (
                <div style={{marginTop: '24px'}}>
                    <SkeletonType2 count={2} />
                </div>
            )}
            <div style={{height: '10px'}} ref={observerRef}></div>
        </div>
    );
};

export default CommunityMain;