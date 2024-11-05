import React, { useState, useContext, useEffect, useRef } from "react";
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import CommentLoginRequest from "../Comment_Login_Request";
import CommunityCommentMoreOption from "../MoreOption/CommunityCommentMoreOption";
import '../../../../static/css/Community/Community_Global/Comment/ArticleComment.css'
import SkeletonComment from "../../../SellReportsBase/Skeleton_UI/SkeletonComment";
// icon
import {ReactComponent as SubViewIcon} from '../../../../static/assets/GlobalIcon/Arrow_Sub_Down_Right.svg'
import {ReactComponent as MoreHorizontal} from '../../../../static/assets/GlobalIcon/More_Horizontal.svg'
import CommunityCommentModificationEditor from "./CommunityCommentModificationEditor";
import ArticleCommentEditor from "./ArticleCommentEditor";
import SnackBarStore from "../../../Store/SnackBarStore";
import Pagination from "../../../Global/Pagination";

const CommunityCommentsReply = ({ comment_id }) => {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const { user, userProfileImage } = useContext(AuthContext);

    // User Restriction


    const [articleCommentReply, setArticleCommentReply] = useState([])

    function handleLiveReplyUpdate(reply_id, reply) {
        const new_reply_data = {
            'author_profile_image': userProfileImage,
            'author_username': user.username,
            'author_id': user.id,
            'id': reply_id,
            'reply': reply,
        }

        setArticleCommentReply(preState => [new_reply_data, ...preState])
    }

    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const [replyLoading, setReplyLoading] = useState(true);

    function handlePageChange(page) {
        currentPage.current = page;
    }

    const fetchCommentReply = async () => {
        setReplyLoading(true);
        try {
            const response = await apiClient.get(`/article_comment_reply_view/${comment_id}/?page=${currentPage.current}`);
            const data = response.data;
            if (response.status === 200) {
                setArticleCommentReply(data.reply);
                console.log(data)
                currentPage.current = Number(data.current_page);
                maxPage.current = Number(data.max_page);
            }
        }catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('답글을 불러오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setReplyLoading(false);
        }
    };

    useEffect(() => {
        fetchCommentReply();
    }, [comment_id, currentPage.current])





    // comment_reply more option control

    const [moreOptionStyle, setMoreOptionStyle] = useState({});

    const handleMoreOptionStyle = (comment_id) => {
        setMoreOptionStyle((prevState) => ({
            [comment_id]: !prevState[comment_id] 
        }));
    }

    // modification style

    const [replyModification, setReplyModification] = useState({});

    const handleReplyModification = (reply_id) => {
        setReplyModification((prevState) => ({
            [reply_id]: !prevState[reply_id] 
        }));
    }


    return (
        <>  
            <div className={`community_article_comment_reply_main_frame`}>
                {user ? (
                    <ArticleCommentEditor type={'reply'} contentId={comment_id} setCommentData={handleLiveReplyUpdate}/>
                ) : (
                    <CommentLoginRequest />
                )}
            </div>
            {!replyLoading ? (
                articleCommentReply.map((reply, index) => (
                    <>
                        <div className="community_comment_reply_frame">
                            <div key={index} className="g_row g_gap_12" style={{width: '100%'}}>
                                <div className="g_row g_gap_4">
                                    <SubViewIcon />
                                    <div className="community_article_comment_user_profile_img">
                                        <img className="g_img_radius_50" src={ reply.author_profile_image } alt="User Profile Image"></img>
                                    </div>
                                </div>
                                <div className="g_colum g_justify_space_between" style={{width: '100%'}}>
                                    <div className="g_row g_justify_space_between g_align_center">
                                        <div className="g_row g_gap_8">
                                            <Link className="g_font_15 g_text_color_1 Pre_KR_Medium" to={`/profile/${reply.author_id}`} >{ reply.author_username }</Link>
                                            <span className="g_font_12 g_text_color_2 Pre_KR_Normal">
                                                { reply.formatted_date }
                                            </span>
                                        </div>
                                        <div 
                                            className="community_comment_more_option_button"
                                            onClick={() => handleMoreOptionStyle(reply.id)}
                                        >
                                            <MoreHorizontal style={{width: '24px', height: '24px'}}/>
                                            <CommunityCommentMoreOption
                                                toggle={moreOptionStyle[reply.id] ? true : false}
                                                setToggle={setMoreOptionStyle}
                                                type={'comment_reply'}
                                                comment_id={reply.id}
                                                comment_data={articleCommentReply}
                                                set_comment_data={setArticleCommentReply}

                                                // reply modification
                                                comment_modification_toggle={handleReplyModification}
                                            />
                                        </div>
                                    </div>
                                    <div className="community_article_comment_comment_frame Pre_KR_Normal">
                                        { reply.reply }
                                    </div>
                                </div>
                            </div>
                            <div className="community_reply_modifier_frame">
                                {replyModification[reply.id] && (
                                    <CommunityCommentModificationEditor 
                                        comment_type={'reply'}
                                        comment_value={reply}
                                        set_comment_value={setArticleCommentReply}

                                        // reply modification
                                        comment_modification_toggle={handleReplyModification}
                                    />
                                )}
                            </div>
                        </div> 
                    </>
                ))
            ) : (
                <SkeletonComment count={2} type={'reply'}/>
            )}
            <Pagination page={currentPage.current} max_page={maxPage.current} handelPage={handlePageChange}/>
        </>
    )
};

export default CommunityCommentsReply