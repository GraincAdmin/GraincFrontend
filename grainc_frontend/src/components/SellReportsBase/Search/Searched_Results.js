import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../../../static/css/SellReportsBase/Search/Searched_Results.css'
import useAxios from "../../../axiosAPIClient";
import NoContent from "../../Global/NoContent";
import SkeletonType2 from "../Skeleton_UI/SkeletonType2";
//Paginator
import Pagination from "../../Global/Pagination";
// Article
import GlobalCommunityArticle from "../../Community/Community_Global/Community_Article";

//Make a search history
import useSearchHistoryStore from "../../Store/SearchHistory";
import SituationalNavSearchM from "../Situational_Nav_Mobile/SituationalNavSearchM";
import OrderByButton from "../../Community/Community_Global/Filters/OrderByButton";
import SubCategoryButton from "../../Community/Community_Global/Filters/SubCategoryButton";
import SnackBarStore from "../../Store/SnackBarStore";



function SearchedResults() {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    //get search keyword
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchKw = queryParams.get('kw');


    // Create Search History
    const { searchHistory, addSearchHistory } = useSearchHistoryStore();
    useEffect(() => {
        const handleUpdate = () => {
            if (searchKw !== '' && !searchHistory.includes(searchKw)) {
                addSearchHistory(searchKw);
            }
        };

        handleUpdate();
    }, [searchKw]);
    

    // Article
    const [searchedArticle, setSearchedArticle] = useState([]);
    const [articleLoading, setArticleLoading] = useState(true);

    const [contentType, setContentType] = useState('all')

    const [subCategory, setSubCategory] = useState('전체');
    const handelSubCategoryChange = (sub_category) => {
        setSearchedArticle([]);
        currentPage.current = 1;
        setSubCategory(sub_category)
    }

    const [orderBy, setOrderBy] = useState('최신순');
    const handelOrderByChange = (order_by) => {
        // Turn to page1
        setSearchedArticle([]);
        currentPage.current = 1;
        setOrderBy(order_by)
    }

    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const observerRef = useRef();
    const [resultsCount, setResultsCount] = useState(0);




    function buildContentTypeButton(label, type) {
        return  <div 
            className={`
                search_results_content_type_button 
                ${contentType === type ? type === 'membership' ? 'selected_membership' : 'selected' : null} 
                Pre_KR_Medium
            `}
            onClick={() => setContentType(type)}
        >
            {label}
        </div>
    }

    const fetchSearchedArticle = async (page) => {
        setArticleLoading(true);
        let fetchUrl;
        if (searchKw !== 0) {
            try {
                fetchUrl = `/article_search/?page=${page}&kw=${searchKw}&content_type=${contentType}&order_by=${orderBy}&sub_category=${subCategory}`
                const response = await apiClient.get(fetchUrl);
                const data = response.data
                if (response.status === 200) {
                    setSearchedArticle((preState) => [...preState, ...data.articles]);
                    maxPage.current = Number(data.max_page);
                    currentPage.current = Number(data.current_page);
                    setResultsCount(data.results_count);
                }
            } catch (error) {
                if (error.response.status !== 401) {
                    showSnackBar('검색 결과를 가져오던 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setArticleLoading(false);
            }
        };
    };

    useEffect(() => {
        setSearchedArticle([]);
        currentPage.current = 1;
        fetchSearchedArticle(1);
    }, [searchKw, contentType]);

    
    useEffect(() => {
        
        const observer = new IntersectionObserver (
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !articleLoading) {
                    fetchSearchedArticle(currentPage.current + 1);
                }
            }, 
            {threshold: 1}
        );

        if (observerRef.current) {
            if (!articleLoading) {
                observer.observe(observerRef.current);
            } else {
                observer.unobserve(observerRef.current)
            }
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };

    }, [articleLoading, currentPage.current, maxPage.current]);


    return (
        <>
            <SituationalNavSearchM />
            <div className="searched_results_main_frame">
                <div className="searched_keyword_section Pre_KR_Normal">
                    <span className="Pre_KR_SemiBold">{searchKw}</span>
                    <span>검색결과</span>
                    <span style={{color: '#0066FF'}}>{resultsCount}건</span>
                </div>
                <div className="searched_results_content_filter">
                    <div className="searched_results_content_type_filter">
                        {buildContentTypeButton('전체', 'all')}
                        {buildContentTypeButton('커뮤니티', 'community')}
                        {buildContentTypeButton('멤버십', 'membership')}
                    </div>
                    <div className='search_results_core_filter_frame'>
                        <div className="searched_results_count_responded">
                            <span className='g_font_15 g_text_color_2 Pre_KR_Normal'>{resultsCount} 건</span>
                        </div>
                        <div className="g_row g_gap_4">
                            <OrderByButton orderBy={orderBy} setOrderBy={handelOrderByChange}/>
                            <SubCategoryButton subCategory={subCategory} setSubCategory={handelSubCategoryChange}/>
                        </div>
                    </div>
                </div>
                {searchedArticle.length !== 0 ? (
                    <>
                        <GlobalCommunityArticle data={searchedArticle}/>
                    </>
                ) : (
                    !articleLoading && (
                        <NoContent page={'community'}/>
                    )
                )}
                {articleLoading && (
                    <SkeletonType2 count={2} />
                )}
                <div style={{height: '10px'}} ref={observerRef} />
            </div>
        </>
    );
};

export default SearchedResults