import React, { useRef, useState } from "react";
import useAxios from "../../../../axiosAPIClient";
import '../../../../static/css/Community/Community_Global/Comment/ArticleCommentEditor.css'
import SnackBarStore from "../../../Store/SnackBarStore";

const CommunityCommentModificationEditor = ({
    comment_type,
    comment_value,
    set_comment_value,
    comment_modification_toggle}
) => {

    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const [newComment, setNewComment] = useState(
        comment_type === 'comment' ?
        comment_value.comment :
        comment_value.reply
    );
    const comment_id = comment_value.id


    const textareaRef = useRef(null);

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
    };




    // handle comment modification

    const postModifiedCommentData = async () => {
        if (newComment.length !== 0) {
            try {
                const response = await apiClient.post('/article_comment_modification/', {
                    type: comment_type,
                    modified_comment: newComment,
                    comment_id: comment_id
                })
                if (response.status === 200) {
                    updateCommentValue(comment_id, newComment); 
                    comment_modification_toggle(comment_id);
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('댓글을 수정 중 문제가 발생했습니다', 'error')
                }
            }
        }
    }

    const updateCommentValue = (comment_id, newComment) => {
        if (comment_type === 'comment') {
            set_comment_value(prevState => 
                prevState.map(comment => 
                    comment.id === comment_id ? {...comment, comment: newComment} : comment
                )
            );
        } else if (comment_type === 'reply') {
            set_comment_value(prevState => 
                prevState.map(reply => 
                    reply.id === comment_id ? {...reply, reply: newComment} : reply
                )
            );    
        }
    };


    return (
        <div className="community_article_comment_write_frame">
            <textarea
                className="community_article_comment_write_input"
                placeholder="" 
                value={newComment}
                ref={textareaRef}
                onChange={(e) => {
                    setNewComment(e.target.value);
                    autoResizeTextarea(); // Adjust the height on each change
                }}
            ></textarea>   
            <div className="g_row g_align_center g_gap_4">
                <div 
                    className="g_font_14 g_text_color_2 
                    Pre_KR_SemiBold"
                    style={{whiteSpace: 'nowrap', marginRight: '8px', cursor: 'pointer'}}
                    onClick={() => comment_modification_toggle(comment_id)}
                >
                    취소
                </div>
                <div 
                    className="community_article_comment_modification_submit_button Pre_KR_SemiBold"
                    onClick={() => postModifiedCommentData(comment_id)}
                >
                    수정
                </div>
            </div>
        </div>
    );
}

export default CommunityCommentModificationEditor