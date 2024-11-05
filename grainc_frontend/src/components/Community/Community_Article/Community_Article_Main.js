import React, { useState, useEffect, useContext, useRef } from 'react';
import '../../../static/css/Community/Community_Article/Community_Article_Main.css'
import '../../../static/css/Community/Community_Global/Community_Global_Action_Button.css'
import { useParams, Link } from 'react-router-dom';
import useAxios from '../../../axiosAPIClient';
import AuthContext from '../../../context/AuthContext';
import CommunityLike from '../Community_Global/Community_Like';

// bookmark component
import CommunityBookmarkIndicator from '../Community_Global/Bookmark/Community_Bookmark_Indicator';

// Loading
import LoadingCircle from '../../Global/LoadingCircle';
// MoreOption Component
import CommunityContentReport from '../Community_Global/MoreOption/CommunityContentReport';
import CommunityMoreOption from '../Community_Global/MoreOption/CommunityMoreOption';
// Icon
import { ReactComponent as MoreOptionIcon } from '../../../static/assets/GlobalIcon/More_Vertical.svg';
import { ReactComponent as CommentIcon } from '../../../static/assets/Community/Community_Global/Chat_Circle.svg';
import { ReactComponent as ShareIcon } from '../../../static/assets/GlobalIcon/Share_Android.svg';
import { ReactComponent as RightArrowIcon } from '../../../static/assets/GlobalIcon/Chevron_Right_MD.svg';
import ArticleCommentEditor from '../Community_Global/Comment/ArticleCommentEditor';
import ArticleComment from '../Community_Global/Comment/ArticleComment';
import loginRequestStore from '../../Store/LoginRequest';
import MembershipFreeTrial from '../Community_Global/FreeTrial/MembershipFreeTrial';
import SnackBarStore from '../../Store/SnackBarStore';
import MembershipRequest from '../Community_Global/FreeTrial/MembershipRequest';
import SkeletonComment from '../../SellReportsBase/Skeleton_UI/SkeletonComment';

function Community_Article_Main() {
    const apiClient = useAxios();

    const { user, userProfileImage } = useContext(AuthContext);
    const { setLoginRequest, setPrePageOption, setLoginRequestMembership } = loginRequestStore();    
 
    const { article_id } = useParams();

    // article detail
    const [article, setArticle] = useState([]);
    const [freeTrial, setFreeTrial] = useState(false);

    // article recommendation
    const [articleRecommendation, setArticleRecommendation] = useState([]);
    const [lastRecommendationStyle, setLastRecommendationStyle] = useState(null);

    // article main comment 
    const [articleComment, setArticleComment] = useState([]);
    const [articleCommentLoading, setArticleCommentLoading] = useState(false);
    function handleLiveCommentUpdate(comment_id, comment) {
        const new_comment_data = {
            'id': comment_id,
            'comment': comment,
            'formatted_date': '방금 전',
            'author_profile_image': userProfileImage,
            'author_id': user.id,
            'author_username': user.username,
            'comment_likes': []
        }
        setArticleComment(preState => [new_comment_data, ...preState]);
    }

    // Loading state
    const [communityArticleLoading, setCommunityArticleLoading] = useState(true);

    const { showSnackBar } = SnackBarStore();

    const fetchCommunityArticle = async () => {
        setCommunityArticleLoading(true);
        try {
            const response = await apiClient.get(`/community_article/${article_id}/`);
            const article = response.data.article;
            setArticle(article);
            setFreeTrial(response.data.free_trial_request);
            if (article.is_membership && user === null) {
                setLoginRequest(true);
                setPrePageOption(true);
                setLoginRequestMembership(true);
            }
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('커뮤니티 글을 가져오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setCommunityArticleLoading(false);
        }
    };

    const fetchArticleRecommendation = async () => {
        try {
            const response = await apiClient.get(`/article_recommendation/${article_id}/`);
            const data = response.data;
            setArticleRecommendation(data);
            setLastRecommendationStyle(data[data.length - 1])
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('추천글을 불러오던 중 문제가 발생했습니다', 'error')
            }
        }
    };

    // comment_request
    const fetchArticleComments = async () => {
        setArticleCommentLoading(true);
        try {
            if (article_id) {
                const response = await apiClient.get(`/article_comments_main/${article_id}/article/`);
                const comments = response.data.comments;
                setArticleComment(comments);
            } else {
                console.log('waiting for article_id');
            }
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('댓글을 불러오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setArticleCommentLoading(false);
        }
    };

    useEffect(() => {

        fetchCommunityArticle();

        fetchArticleRecommendation();

        fetchArticleComments();

    }, [article_id]); 


    // views update
    useEffect(() => {
        const fetchUpdateArticleViews = async () => {
            try {
                await apiClient.post(`/article_views_update/${article_id}/`)
            } catch(error) {
                console.log(error)
            }
        }
        if (user !== null && article !== null && !communityArticleLoading) {
            const viewsValidationSet = new Set(article.views_validation);
            if (!viewsValidationSet.has(user.id)) {
                fetchUpdateArticleViews();
            }
        }
    }, [article, communityArticleLoading])



    // control mobile navigator
    const [mobileActionButtonStyle, setMobileActionButtonStyle] = useState(false);
    const communityMainContentRef = useRef(null);
    let previousScrollY = window.scrollY;

    const handelMobileActionButtonStyle = () => {
        var currentScrollY = window.scrollY;
        const windowBottom = window.scrollY + window.innerHeight;
        
        if (communityMainContentRef.current) {
            const communityMainContentPosition = communityMainContentRef.current.offsetTop;
            
            if (windowBottom < communityMainContentPosition) {
                if (Math.abs(currentScrollY - previousScrollY) > 20) {
                    if (currentScrollY > previousScrollY) {
                        // Scrolling down
                        setMobileActionButtonStyle(true);
                    } else if (currentScrollY < previousScrollY) {
                        // Scrolling up
                        setMobileActionButtonStyle(false);
                    }
                    previousScrollY = currentScrollY;
                }
            } else {
                setMobileActionButtonStyle(false);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => handelMobileActionButtonStyle();

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handelScrollCommentSection = () => {  
        if (communityMainContentRef.current) {
            const sectionTop = communityMainContentRef.current.offsetTop;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
    };


    //like sharing 
    const [sharedLikeCount, setSharedLikeCount] = useState();
    const [sharedLikeStatus, setSharedLikeStatus] = useState(false);
    useEffect(() => {
        setSharedLikeCount(article.likes_count)
        const likeValidationSet = new Set(article.likes);
        if (user !== null) {
            if (likeValidationSet.has(user.id)) {
                setSharedLikeStatus(true);
            } else {
                setSharedLikeStatus(false);
            }
        }
    }, [article]);
    
    const handelLikeChange = () => {
        const preLikeStatus = sharedLikeStatus;
        if (preLikeStatus) {
            setSharedLikeCount(Number(sharedLikeCount) - 1)
        } else {
            setSharedLikeCount(Number(sharedLikeCount) + 1)
        }

        setSharedLikeStatus(preState => (!preState));
    };


    // Sharing Feature

    const MainArticleURL = () =>{
        var url = '';    // <a>태그에서 호출한 함수인 clip 생성
        var textarea = document.createElement("textarea");  
        //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성
        
        document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
        url = window.document.location.href;  //url에는 현재 주소값을 넣어줌
        textarea.value = url;  // textarea 값에 url를 넣어줌
        textarea.select();  //textarea를 설정
        document.execCommand("copy");   // 복사
        document.body.removeChild(textarea); //textarea 요소를 없애줌
        
        alert("URL이 복사되었습니다.")  // 알림창
    }
    

    // MoreOption Handling

    const [moreOptionStyle, setMoreOptionStyle] = useState(false);
    const moreOptionButton = useRef();
    const handleMoreOptionStyle = () => {
        if (moreOptionStyle) {
            setMoreOptionStyle(false);
        } else {
            setMoreOptionStyle(true);
        }
    }

    const handleClickOutsideMoreOption = (event) => {
        if (moreOptionButton.current) {
            if (!moreOptionButton.current.contains(event.target)) {
                setMoreOptionStyle(false);
            };
        };
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMoreOption);
        return (
            document.addEventListener('click', handleClickOutsideMoreOption)
        )
    })

    // Community Article Reporting Handle
    const [articleReportStyle, setArticleReportStyle] = useState(false);


    // Membership Donation feature 

    const handelDonation = async () => {
        if (user !== null) {
            try {
                const response = await apiClient.post('/article_membership_donation/', {
                    article_id: article_id
                })
                if (response.status === 200) {
                    showSnackBar(response.data.status, 'normal');
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar(error.response.data.status, 'error');
                }
            }
        } else {
            setLoginRequest(true);
        }
    }

    // Membership Request

    const [membershipRequest, setMembershipRequest] = useState(false);



    return (
        <>
            <MembershipRequest toggle={membershipRequest} />
            <MembershipFreeTrial 
                styleToggle={freeTrial} 
                setStyleToggle={setFreeTrial} 
                setMembershipRequest={setMembershipRequest}
                fetchArticle={fetchCommunityArticle}
            />
            <CommunityContentReport toggle={articleReportStyle} setToggle={setArticleReportStyle} type={'article'} reporting_id={article.id}/>
            {!communityArticleLoading ? (
                <>
                    <div className='community_article_main_frame'>
                        <div className='community_article_content_frame'>
                            <div className="community_view_title_frame Pre_KR_Medium">
                                { article.subject }
                            </div>
                            <div className="community_article_author_save_share_frame">
                                <div className="g_row g_align_center g_gap_12">
                                    <div className="community_article_author_profile_im">
                                        <img className='g_img_radius_50' src={ article.author_profile_image ?? require('../../../static/assets/anonymous.png')  } alt='image'></img>
                                    </div>
                                    <Link className='g_colum g_gap_2' to={article.author_id ? `/profile/${ article.author_id }` : null}>
                                        <div className='g_row g_align_center'>
                                            <span className='g_font_16 g_text_color_1 Pre_KR_Medium' style={{lineHeight: 'normal'}}>{ article.author_username  ?? '유저정보 없음'}</span>
                                            <RightArrowIcon />
                                        </div>
                                        <div className='g_row g_gap_8'>
                                            <span className='g_font_14 Pre_KR_Regular' style={{color: '#7C8393'}}>{ article.create_date }</span>
                                            <span className='g_font_14 Pre_KR_Regular' style={{color: '#7C8393'}}>·</span>
                                            <span className='g_font_14 Pre_KR_Regular' style={{color: '#7C8393'}}>조회 { article.views }</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className='community_article_views_more_option_wrap_frame'>
                                    <div className='community_article_main_more_option_button' ref={moreOptionButton} onClick={() => handleMoreOptionStyle()}>
                                        <MoreOptionIcon style={{width:'22px', height: '22px'}}/>
                                        <CommunityMoreOption style={moreOptionStyle} report_style={setArticleReportStyle} author_id={article.author_id} article_id={article.id}/>
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="community_article_detail_frame Pre_KR_Regular" 
                                style={{padding:"24px 0px 16px 0px"}}
                                dangerouslySetInnerHTML={{ __html: article.main_content }}
                            >
                            </div>
                            {article.hashtags && article.hashtags.length > 0 && (
                                <div className='community_article_hashtag'>
                                    {article.hashtags.map(tag => (
                                        <Link 
                                            key={tag} 
                                            className='g_font_14 g_text_color_2'
                                            to={`/search?kw=${tag}`}
                                        >
                                            # {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <div className="community_user_interaction_button_frame main_article_content_interaction" ref={communityMainContentRef}>
                                <div className='community_article_action_button_warp_main_frame'>
                                    <div className="community_article_like_comment_main_frame">
                                        <CommunityLike article_id={ article.id } article_like_count={ sharedLikeCount } article_like_status={sharedLikeStatus}  handelSharedLike={handelLikeChange}/>
                                    </div>
                                    <div className="community_article_like_comment_main_frame" style={{marginLeft: '12px'}}>
                                        <CommentIcon style={{width:'24px', height:'24px', stroke: '#1A1A1B'}}/>
                                        <span className="Pre_KR_Normal" style={{fontSize:'14px'}}>{ article.comments_count }</span>
                                    </div>
                                </div>
                                <div className="community_article_action_button_warp_main_frame">
                                    <CommunityBookmarkIndicator article_id={article.id} />
                                    <div className="g_article_g_button_frame straight" onClick={() => MainArticleURL()}>
                                        <ShareIcon className="g_article_g_button_icon"/>
                                    </div>
                                </div>
                            </div>
                            {/* <ArticleComment selectedArticle={article.id} /> */}
                            <ArticleCommentEditor 
                                type={'comment'} 
                                contentId={article.id}
                                setCommentData={handleLiveCommentUpdate}
                            />
                            <div className='community_article_comment_section'>
                                <div className='g_row g_gap_4' style={{marginTop: '8px'}}>
                                    <span className='g_font_16 Pre_KR_SemiBold' style={{color: '#0066ff'}}>{article.comments}개의</span>
                                    <span className='g_font_16 g_text_color_1 Pre_KR_SemiBold'>댓글</span>
                                </div>
                                {articleCommentLoading ? (
                                    <SkeletonComment count={2}/>
                                ) : (
                                    <ArticleComment commentData={articleComment} setCommentData={setArticleComment}/>
                                )}
                            </div>
                            {article.comments > 2 && (
                                <Link className='comments_see_more' to={`/community_comments/${article.id}`}>
                                    댓글 더보기
                                    <RightArrowIcon />
                                </Link>
                            )} 
                        </div>
                        <div className='community_article_sub_content_frame'>
                            <div className='article_author_detail_frame'>
                                <div className='g_row g_align_center g_gap_16'>
                                    <div className='article_author_detail_profile_image'>
                                        <img src={article.author_profile_image ?? require('../../../static/assets/anonymous.png')}></img>
                                    </div>
                                    <div className='g_colum g_gap_8'>
                                        <span className='article_author_username Pre_KR_SemiBold'>{article.author_username ?? '유저정보 없음'}</span>
                                        <div className='article_author_detail_activity_information'>
                                            <span className='article_author_detail_activity Pre_KR_Normal'>
                                                작성글 {article.author_article_count ?? '0'}개 · 구독자 {article.author_subscriber_count ?? '0'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='article_author_description Pre_KR_Normal'>
                                    {article.author_introduction ?? '자기소개가 없습니다'}
                                </div>
                                {article.is_membership && (
                                    <div className='article_author_donation_cover_frame'>
                                        <div 
                                            className='article_donation_button'
                                            onClick={() => handelDonation()}
                                        >
                                            후원하기
                                        </div>
                                        <span className='article_donation_notice Pre_KR_Normal'>
                                            * 후원은 비용이 발생하지 않아요
                                        </span>
                                    </div>
                                )}
                            </div>
                            {articleRecommendation.length !== 0 && (
                                <div className="main_content_community_article_recommendation_main_frame">
                                    <div className="main_content_community_article_recommendation_title_frame Pre_KR_SemiBold">다른 커뮤니티 글</div>
                                    {articleRecommendation.map(article => (
                                        <Link className="community_article_recommendation_frame" 
                                            key={article.id} 
                                            style={article === lastRecommendationStyle ? { borderBottom: "0px" } : {}}
                                            to={`/community_detail/${article.id}`}>
                                            <div className='community_article_recommendation_information_frame'>
                                                <div className='community_article_recommendation_subject Pre_KR_SemiBold'>{article.subject}</div>
                                                <div className='community_article_recommendation_additional_information_frame Pre_KR_Normal'>
                                                    <span>{article.create_date}</span>
                                                    <span>조회 {article.views}</span>
                                                    <span>댓글 {article.comments}</span>
                                                </div>
                                            </div>
                                            <div className='community_article_recommendation_preview_image'>
                                                <img src={article.community_image}></img>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <LoadingCircle color_option={true} size_option={true}/>
            )}
            {/* <div className={`community_main_action_buttons_mobile_frame ${mobileActionButtonStyle ? 'open' : null}`}>
                <div className="community_main_action_buttons_cover_mobile_frame" style={{gap:'12px'}}>
                    <CommunityLike article_id={ article.id } article_like_count={ sharedLikeCount } article_like_status={sharedLikeStatus}  handelSharedLike={handelLikeChange}/>
                    <div className="g_article_g_button_frame straight" onClick={() => handelScrollCommentSection()}>
                        <CommentIcon className="g_article_g_button_icon" style={{stroke: '#1A1A1B'}}/>
                        <span className='g_article_action_button_text Pre_KR_Normal'>{ article.comments }</span>
                    </div>
                </div>
                <div className="community_main_action_buttons_cover_mobile_frame bookmark_and_share">
                        <CommunityBookmarkIndicator article_id={article.id} />
                        <div className="g_article_g_button_frame straight" onClick={() => MainArticleURL()}>
                        <ShareIcon className="g_article_g_button_icon"/>
                    </div>
                </div>
            </div> */}
        </>
    )   


}

export default Community_Article_Main