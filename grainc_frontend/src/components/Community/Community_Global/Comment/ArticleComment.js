import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../../../static/css/Community/Community_Global/Comment/ArticleComment.css'
// icon
import {ReactComponent as MoreHorizontal} from '../../../../static/assets/GlobalIcon/More_Horizontal.svg'
import CommunityCommentMoreOption from "../MoreOption/CommunityCommentMoreOption";
import CommunityCommentsLike from "./Community_Comments_Like";
import CommunityCommentsReply from "./Community_Comments_Reply";
import CommunityCommentModificationEditor from "./CommunityCommentModificationEditor";

const ArticleComment = ({commentData, setCommentData}) => {


    // comment reply display 

    const [commentReplyStyle, setCommentReplyStyle] = useState({});

    const handleCommentReplyStyle = (comment_id) => {
        setCommentModification({[comment_id]: false});
        setCommentReplyStyle((prevState) => ({
            [comment_id]: !prevState[comment_id] // Toggle the specific article's dropdown
        }));
    };
        
    // more option style
    const [moreOptionStyle, setMoreOptionStyle] = useState({});
    
    const handleMoreOptionStyle = (comment_id) => {
        setMoreOptionStyle((prevState) => ({
            [comment_id]: !prevState[comment_id] 
        }));
    }
    

    const [commentModification, setCommentModification] = useState({});

    const handleCommentModification = (comment_id) => {
        setCommentModification((prevState) => ({
            [comment_id]: !prevState[comment_id] 
        }));
    }


    const lastComment = commentData[commentData.length - 1];


    return (
        commentData.length !== 0 && (
            commentData.map((comment, index) => (
                <>
                    <div 
                        key={index} 
                        className={`
                            community_article_comment_frame 
                            ${lastComment === comment ? 'border_remove' : null}
                        `}
                    >
                        <div className="g_row g_gap_12" style={{width: '100%'}}>
                            <div className="community_article_comment_user_profile_img">
                                <img className="g_img_radius_50" src={comment.author_profile_image} alt="User Profile Image"></img>
                            </div>
                            <div className="g_colum" style={{width: '100%'}}>
                                <div className="g_row g_justify_space_between g_align_center">
                                    <div className="g_row g_gap_8">
                                        <Link className="g_font_15 g_text_color_1 Pre_KR_Medium" to={`/profile/${comment.author_id}`}>{ comment.author_username }</Link>
                                        <span className="g_font_12 g_text_color_2 Pre_KR_Normal">
                                                { comment.formatted_date }
                                        </span>
                                    </div>
                                    <div 
                                        className="community_comment_more_option_button"
                                        onClick={() => handleMoreOptionStyle(comment.id)}
                                    >
                                        <MoreHorizontal style={{width: '24px', height: '24px'}}/>
                                        <CommunityCommentMoreOption 
                                            toggle={moreOptionStyle[comment.id] ? true : false}
                                            setToggle={setMoreOptionStyle}
                                            type={'comment'}
                                            comment_id={comment.id}
                                            comment_data={commentData}
                                            set_comment_data={setCommentData}
                                            // modification
                                            comment_modification_toggle={handleCommentModification}
                                        />
                                    </div>
                                </div>
                                <div className="community_article_comment_comment_frame Pre_KR_Normal">
                                    { comment.comment }
                                </div>
                                <div className="g_row g_justify_space_between g_align_center    ">
                                    <div className="community_article_reply Pre_KR_Medium" 
                                        onClick={() => handleCommentReplyStyle(comment.id)}
                                    >
                                        답글 <span style={{color: '#0066ff'}}>{comment.reply_count}</span>
                                    </div>
                                    <CommunityCommentsLike comment_id={comment.id} likeData={comment.comment_likes}/>
                                </div>
                                {commentModification[comment.id] && (
                                    <div style={{marginTop: '24px'}}>
                                        <CommunityCommentModificationEditor 
                                            comment_type='comment'
                                            comment_value={comment}
                                            set_comment_value={setCommentData}
                                            comment_modification_toggle={handleCommentModification}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {commentReplyStyle[comment.id] && 
                        !commentModification[comment.id] && (
                            <CommunityCommentsReply 
                                comment_id={comment.id} 
                            />   
                        )}
                    </div>
                </>                     
            ))
        )
    );
}

export default ArticleComment