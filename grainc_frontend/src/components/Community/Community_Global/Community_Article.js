import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../static/css/Community/Community_Global/Community_Article.css'
import '../../../static/css/Community/Community_Global/Community_Global_Action_Button.css'

// Bookmark
import CommunityBookmark from './Bookmark/Community_Bookmark';
import CommunityBookmarkIndicator from './Bookmark/Community_Bookmark_Indicator';
// SVG Icon
import { ReactComponent as ChatCircleIcon } from '../../../static/assets/Community/Community_Global/Chat_Circle.svg';
import { ReactComponent as LikeIcon } from '../../../static/assets/Community/Community_Global/Heart_01.svg';
import { ReactComponent as MembershipContentIcon } from '../../../static/assets/GlobalIcon/MembershipContentIcon.svg';

const GlobalCommunityArticle = ({data}) => {


    // bookmark Section Control
    const [bookmarkStyle, setBookmarkStyle] = useState(false);
    const [bookmarkArticleID, setBookmarkArticleID] = useState(null);

    const handleBookmarkPop = (article_id) => {
        setBookmarkArticleID(article_id);
        setBookmarkStyle(true);
    }


    const lastArticle = data[data.length - 1];


    return (
        <div className='g_article_section'>
            {data.map((article, index) => (
                <div 
                    key={index} 
                    className="g_article_main_frame" 
                    style={{ 
                        borderBottom: `${article == lastArticle ? "0px" : null}`
                    }}
                >
                    <div className="g_article_author_action_frame">
                        {article.author_id ? (
                            <Link className="g_article_author_information_frame" to={`/profile/${article.author_id}`}>
                                <div className="g_article_author_profile_image_frame">
                                    <img src={article.author_profile_image}></img>
                                </div>
                                <div className='g_colum g_gap_2'>
                                    <div className="g_article_author_article_detail_information_content_frame">
                                        <span className="g_article_category Pre_KR_Medium">{article.category}</span>
                                        <span className="g_article_sub_category Pre_KR_Normal">{article.sub_category}</span>
                                    </div>
                                    <div className="g_article_author_article_detail_information_content_frame">
                                        <span className="g_article_author_username Pre_KR_Medium">{article.author_username}</span>
                                        <span className="g_article_create_date Pre_KR_Medium">·</span>
                                        <span className="g_article_create_date Pre_KR_Normal">{article.create_date}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="g_article_author_information_frame">
                                <div className="g_article_author_profile_image_frame">
                                    <img src={require('../../../static/assets/anonymous.png')}></img>
                                </div>
                                <div className='g_colum g_gap_2'>
                                    <div className="g_article_author_article_detail_information_content_frame">
                                        <span className="g_article_category Pre_KR_Medium">{article.category}</span>
                                        <span className="g_article_sub_category Pre_KR_Normal">{article.sub_category}</span>
                                    </div>
                                    <div className="g_article_author_article_detail_information_content_frame">
                                        <span className="g_article_author_username Pre_KR_Medium">유저정보 없음</span>
                                        <span className="g_article_create_date Pre_KR_Medium">·</span>
                                        <span className="g_article_create_date Pre_KR_Normal">{article.create_date}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {article.is_membership ? <MembershipContentIcon style={{width: '20px'}}/> : ''}                        
                    </div>
                    <Link className="g_article_subject_content_main_frame" to={`/community_detail/${article.id}/?category=${article.category}`}>
                        <div className="g_article_subject_content_frame">
                            <div className="g_article_subject Pre_KR_Medium">{article.subject}</div>
                            <div className="g_article_content Pre_KR_Normal">
                                { article.description }
                            </div>
                        </div>
                        {article.community_image && article.community_image.length > 0 && (
                            <div className="g_article_image_frame">
                                <img src={article.community_image} alt="Article Image" />
                            </div>
                        )}
                    </Link>
                    <div className="g_article_action_button_container">
                        <div className="g_row g_align_center g_gap_16">
                            <div className='g_row g_gap_8 g_align_center'>
                                <LikeIcon style={{width: '24px', height: '24px', stroke: '#616161'}}/>
                                <span className='g_font_14 g_text_color_2 Pre_KR_Normal'>{article.likes_count}</span>
                            </div>
                            <Link className="g_row g_gap_8 g_align_center" to={`/community_comments/${article.id}/?category=${article.category}`}>
                                <ChatCircleIcon style={{width: '23px', height: '23px', stroke: '#616161'}}/>
                                <span className="g_font_14 g_text_color_2 Pre_KR_Normal">{ article.comments }</span>
                            </Link>
                        </div>
                        <CommunityBookmarkIndicator  article_id={article.id} is_bookmarked={article.is_bookmarked}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GlobalCommunityArticle