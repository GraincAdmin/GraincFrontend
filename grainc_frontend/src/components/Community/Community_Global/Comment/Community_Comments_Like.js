import React, { useContext, useState } from "react";
import { ReactComponent as LikeIcon } from '../../../../static/assets/Community/Community_Global/Heart_01.svg';
import { ReactComponent as LikedIcon } from '../../../../static/assets/Community/Community_Global/Heart_02.svg';
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";
import loginRequestStore from "../../../Store/LoginRequest";
import SnackBarStore from "../../../Store/SnackBarStore";
// CSS with Community Comments View 
const CommunityCommentsLike = ({comment_id, likeData}) => {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const { user } = useContext(AuthContext);
    const { setLoginRequest } = loginRequestStore();

    // like variable
    const [commentLikeCount, setCommentLikeCount] = useState(likeData.length);
    const [userLike, setUserLike] = useState(user !== null ? likeData.includes(user.id) : false);


    // comment like feature
    const handleCommentLike = async () => {
        if (user !== null) {
            const pre_like_status = userLike;
            setUserLike(preState => (!preState));
    
            const pre_like_count = commentLikeCount;
    
            if (pre_like_status) {
                setCommentLikeCount(preState => (Number(preState) - 1))
            } else {
                setCommentLikeCount(preState => (Number(preState) + 1))
            }
    
            try {
                const response = await apiClient.post(`/article_comment_like/${comment_id}/`)
                if (response.status !== 200) {
                    setUserLike(pre_like_status);
                    setCommentLikeCount(pre_like_count);
                }
            } catch(error) {
                setUserLike(pre_like_status);
                setCommentLikeCount(pre_like_count);
                if (error.response.status !== 401) {
                    showSnackBar('댓글 좋아요 도중 문제가 발생했습니다', 'error')
                }
            }
        } else {
            setLoginRequest(true);
        }
    }


    return (
        <div className="community_comment_like_button_frame" onClick={() => handleCommentLike()}>
            {userLike ? (
                <LikedIcon style={{width:'20px', height:'20px', stroke: '#e1e1e1'}}/>
            ) : (
                <LikeIcon style={{width:'20px', height:'20px',  stroke: '#e1e1e1'}}/>
            )}
            <span className="Pre_KR_Normal">{commentLikeCount}</span>
        </div>
    );
};

export default CommunityCommentsLike