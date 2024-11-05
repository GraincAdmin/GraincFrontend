import React, { useContext, useEffect, useState  } from "react";
import '../../../../static/css/Community/Community_Global/MoreOption/CommunityCommentMoreOption.css'

// icons
import {ReactComponent as OctagonWarningIcon} from '../../../../static/assets/GlobalIcon/Warning/Octagon_Warning.svg'
import {ReactComponent as DeleteIcon} from '../../../../static/assets/GlobalIcon/Trash_Full.svg'
import {ReactComponent as EditorIcon} from '../../../../static/assets/GlobalIcon/Edit_Pencil_Line_02.svg'
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";
import CommunityContentReport from "./CommunityContentReport";
import SnackBarStore from "../../../Store/SnackBarStore";

const CommunityCommentMoreOption = ({
    toggle, 
    setToggle, 
    type,
    comment_id, // comment is equal to reply in this component (share variable name)
    comment_data,
    set_comment_data,
    comment_modification_toggle
}) => {

    const apiClient = useAxios();
    const showSnackBar = SnackBarStore();
    const { user } = useContext(AuthContext);
    const optionFrame = document.querySelectorAll('.community_comment_more_option_button');

    const handleClickOutsideOption = (event) => {
        const isInsideAnyOption = Array.from(optionFrame).some(option => option.contains(event.target));
    
        if (!isInsideAnyOption) {
            setToggle({ comment_id: null });
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideOption);
    
        return () => {
            document.removeEventListener('click', handleClickOutsideOption);
        };
    }, [optionFrame]);  


    // comment more option style
    const selectedComment = comment_data.find(comment => comment.id === comment_id); 
    const isCommentOwner = user !== null && selectedComment?.author_id === user.id;
    

     const handleCommentDelete = async () => {
        if (type === 'comment') {
            try {
                const response = await apiClient.post('/article_comment_delete/', {
                    comment_id: comment_id
                })
                if (response.status === 200) {
                    const updatedCommentData = comment_data.filter(comment => comment.id !== comment_id);
                    set_comment_data(updatedCommentData); 
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('댓글을 삭제도 중 문제가 발생했습니다', 'error')
                }
            }
        } else if (type === 'comment_reply') {
            try {
                const response = await apiClient.post('/article_comment_reply_delete/', {
                    reply_id: comment_id
                })
                if (response.status === 200) {
                    const updatedReplyData = comment_data.filter(reply => reply.id !== comment_id);
                    set_comment_data(updatedReplyData); 
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('답글 삭제 중 문제가 발생했습니다', 'error')
                }
            }
        }
    }


    // comment reporting
    
    const [commentReportStyle, setCommentReportStyle] = useState(false);


    return (
        <>
            <CommunityContentReport toggle={commentReportStyle} setToggle={setCommentReportStyle} type={type} reporting_id={comment_id}/>
            <div className={`g_community_comment_options ${toggle ? 'open' : null}`}>
                {!isCommentOwner && (
                    <div 
                        className="g_community_comment_option_button"
                        onClick={() => setCommentReportStyle(true)}
                    >
                        <OctagonWarningIcon style={{width: '24px', height: '24px', stroke: '#616161'}}/>
                        <span className="Pre_KR_Normal">신고</span>
                    </div>
                )}
                {isCommentOwner && (
                    <>
                        <div 
                            className="g_community_comment_option_button"
                            onClick={() => comment_modification_toggle(comment_id)}
                        >
                            <EditorIcon style={{stroke: '#616161'}}/>
                            <span className="Pre_KR_Normal">수정</span>
                        </div>
                        <div 
                            className="g_community_comment_option_button"
                            onClick={handleCommentDelete} // Pass the function directly
                        >
                            <DeleteIcon style={{stroke: '#616161'}}/>
                            <span className="Pre_KR_Normal">삭제</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default CommunityCommentMoreOption