import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../axiosAPIClient';
import { ReactComponent as MembershipIcon } from '../../static/assets/GlobalIcon/MembershipContentIcon.svg';
import '../../static/css/SellReportsBase/Home.css'; // Adjust the path based on the directory structure
import MembershipAd from './GlobalAd/MembershipAd';
import CategoryNav from '../CategoryNav';
import SnackBarStore from '../Store/SnackBarStore';
import GlobalCommunityArticle from '../Community/Community_Global/Community_Article'
import SkeletonType2 from './Skeleton_UI/SkeletonType2';
function Home() {


    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const [mostLikedArticles, setMostLikedArticles] = useState([]);
    const [latestArticle, setLatestArticle] = useState([]);

    const [mostLikedArticleLoading, setMostLikedArticlesLoading] = useState(true);
    const [latestArticleLoading, setLatestArticleLoading] = useState(true);

    const fetchHomeArticleContent = async () => {
        setMostLikedArticlesLoading(true);
        try {
            const response = await apiClient.get('/article_home_most_like/');
            const data = response.data;
            setMostLikedArticles(data);
            setMostLikedArticlesLoading(false);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('콘텐츠를 가져오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setMostLikedArticlesLoading(false);
        }
    }

    const fetchLatestArticle = async () => {
        setLatestArticleLoading(true);
        try {
            const response = await apiClient.get(`/article_home_latest/?category=${articleCategory}`)
            const data = response.data;
            setLatestArticle(data);
            setLatestArticleLoading(false);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('콘텐츠를 가져오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setLatestArticleLoading(false);
        }
    }

    useEffect(() => {
        fetchHomeArticleContent();
        fetchLatestArticle();
    }, []);

    function buildArticleSubView(article) {
        return <Link className='article_sub_view_main_frame'
        style={{
            backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                url(${article.community_image})
            `,
            backgroundSize: 'cover', // Ensure the background image covers the entire div
            backgroundPosition: 'center', // Center the background image
        }}>
            <MembershipIcon style={{width: '24px', height: '24px'}}/>
            <div className='article_sub_view_detail_frame'>
                <div className='article_sub_view_subject Pre_KR_SemiBold'>{article.subject}</div>
                <div className='article_sub_view_author_information_frame'>
                    <div className='article_sub_view_author_profile_image'>
                        <img src={article.author_profile_image}></img>
                    </div>
                    <span className='article_sub_view_author_username Pre_KR_Regular'>
                        {article.author_username}
                    </span>
                </div>
            </div>
        </Link>
    }

    function buildArticleSubViewSkeleton(count) {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div key={i} className="article_sub_view_main_frame skeleton-list-item">

                </div>
            );
        }
        return ui;
    }

    // home popular article category 

    const [articleCategory, setArticleCategory] = useState('국내기업');

    const category = [
        '국내기업',
        '해외기업',
        '부동산',
        '투자전략',
        '암호화페',
        '산업',
        '시장',
        '경제',
        '채권',
        '파생',
    ]

    function buildArticleCategoryButtons() {
        const buttons = []
        category.forEach(category => {
            buttons.push(
                <div 
                    className={`
                        home_popular_content_category_button
                        ${articleCategory === category ? 'selected' : null}
                    `}
                    onClick={() => setArticleCategory(category)}

                >
                    <span className='Pre_KR_Regular'>{category}</span>
                </div>
            )
        })

        return buttons
    }

    useEffect(() => {
        fetchLatestArticle();
    }, [articleCategory])


    return (
        <>
            <CategoryNav />
            <div className='home_main_section'>
                <div className='home_main_content_frame'>
                    <div className='home_sub_article_view_frame'>
                        {!mostLikedArticleLoading ? (
                            mostLikedArticles.map(article => {
                                return buildArticleSubView(article)
                            })
                        ) : (
                            buildArticleSubViewSkeleton(4)
                        )}
                    </div>
                    <div 
                        className='home_section_title_frame Pre_KR_SemiBold'
                        style={{paddingLeft: '4px', boxSizing: 'border-box'}}
                    >
                            카테고리별 인기 컨텐츠
                    </div>
                    <div className='home_popular_article_category_selection_button_frame'>
                        {buildArticleCategoryButtons()}
                    </div>
                    <div className='home_content_section' style={{marginTop: '24px'}}>
                        {!latestArticleLoading ? (
                            <GlobalCommunityArticle data={latestArticle}/>
                        ) : (
                            <SkeletonType2 count={4}/>
                        )}
                    </div>
                </div>
                <div className='home_ad_content_frame'>
                    <MembershipAd />
                </div>
            </div>
        </>
    );
};

export default Home