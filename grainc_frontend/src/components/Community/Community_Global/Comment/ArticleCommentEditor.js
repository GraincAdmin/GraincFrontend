import React, { useState, useContext, useRef } from 'react';
import AuthContext from '../../../../context/AuthContext';
import '../../../../static/css/Community/Community_Global/Comment/ArticleCommentEditor.css'
import useAxios from '../../../../axiosAPIClient';

// icon
import {ReactComponent as SendIcon} from '../../../../static/assets/GlobalIcon/Paper_Plane.svg'

// component
import CommentLoginRequest from '../Comment_Login_Request'
import LoadingCircle from '../../../Global/LoadingCircle';
import loginRequestStore from '../../../Store/LoginRequest';
import violationNoticeStore from '../../../Store/ViolationNotice';
import SnackBarStore from '../../../Store/SnackBarStore';
const ArticleCommentEditor = ({ type ,contentId, setCommentData }) => {
    const apiClient = useAxios();
    const { user } = useContext(AuthContext);
    const { setLoginRequest } = loginRequestStore();
    const { showSnackBar } = SnackBarStore();

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const { violationNotice, setViolationNotice, setViolationType, setViolationDetail } = violationNoticeStore();

    const submitComment = async () => {
        if (user !== null && !loading) {
            setLoading(true);
            if (type === 'comment') {
                try {
                    const response = await apiClient.post(`/article_comment_upload/${contentId}/`, {
                        comment: comment,
                    });
                    const data = response.data;
                    if (response.status === 200) {
                        if (!data.restriction) {
                            setCommentData(data.comment_id, comment);
                        } else {
                            setViolationNotice(data.restriction);
                            setViolationDetail(data.restriction_detail);
                            setViolationType('comment');
                        }
                        setComment('');
                    }
                } catch (error) {
                    if (error.response.status !== 401) {
                        showSnackBar('댓글 업로드 중 문제가 발생했습니다', 'error')
                    }
                } finally {
                    setLoading(false);
                }
            } else if (type === 'reply') {
                try {
                    const response = await apiClient.post(`/article_comment_reply/${contentId}/`, {
                        reply: comment
                    });
                    const data = response.data;
                    if (response.status === 200) {
                        if (!violationNotice && !data.restriction) {
                            setCommentData(data.reply_id, comment);
                        } else {
                            setViolationNotice(data.restriction);
                            setViolationDetail(data.restriction_detail);
                            setViolationType('reply');
                        }
                        setComment('');
                    }
                } catch (error) {
                    if (error.response.status !== 401) {
                        showSnackBar('답글을 업로드 중 문제가 발생했습니다', 'error')
                    }
                } finally {
                    setLoading(false);
                }
            } 
        } else {
            setLoginRequest(true);
        }
    };

    const textareaRef = useRef(null);

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
    };



    return (
        <>
            {user ? (
                <div className="community_article_comment_write_frame">
                    <textarea
                        className="community_article_comment_write_input"
                        placeholder={type === 'comment' ? '댓글을 입력해주세요' : '답글을 입력해주세요'}
                        value={comment}
                        ref={textareaRef}
                        onChange={(e) => {
                            setComment(e.target.value);
                            autoResizeTextarea(); // Adjust the height on each change
                        }}
                    ></textarea>   
                    <div className='community_article_comment_submit_button' onClick={submitComment} >
                        {loading ? (
                            <LoadingCircle color_option={true} />
                        ) : (
                            <SendIcon style={{stroke: '#616161'}}/>
                        )}
                    </div>
                </div>
            ) : (
                <CommentLoginRequest style_option={true}/>
            )}
        </>
    );
};


export default ArticleCommentEditor