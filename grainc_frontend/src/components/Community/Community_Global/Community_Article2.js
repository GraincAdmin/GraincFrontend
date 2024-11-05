import React from "react";
import { Link } from 'react-router-dom';
import '../../../static/css/Community/Community_Global/Community_Article.css'
import { ReactComponent as MembershipContentIcon } from '../../../static/assets/GlobalIcon/MembershipContentIcon.svg';

const GlobalCommunityArticle2 = ({data}) => {

    const lastArticle = data[data.length - 1];


    return (
        <div className='g_article_section'>
            {data.map((article, index) => (
                <Link 
                    key={index} 
                    to={`/community_detail/${article.id}/?category=${article.category}`}
                    className="g_article_main_frame" 
                    style={{ 
                        padding: '24px',
                        borderBottom: `${article == lastArticle ? "0px" : null}`
                    }}
                >
                    <div className="g_article_author_action_frame">
                        <div className="g_article_author_article_detail_information_content_frame">
                            <span className="g_article_category Pre_KR_Medium">{article.category}</span>
                            <span className="g_article_sub_category Pre_KR_Normal">{article.sub_category}</span>
                            <span className="g_article_create_date Pre_KR_Normal">{article.article_create_date}</span>
                        </div>
                        {article.is_membership ? <MembershipContentIcon style={{width: '20px'}}/> : ''}                        
                    </div>
                    <div className="g_article_subject_content_main_frame" style={{paddingLeft: '0px'}}>
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
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GlobalCommunityArticle2