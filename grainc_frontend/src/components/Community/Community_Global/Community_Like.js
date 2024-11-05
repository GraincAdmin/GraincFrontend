import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../../axiosAPIClient";
import AuthContext from "../../../context/AuthContext";
import '../../../static/css/Community/Community_Global/Community_Global_Action_Button.css'
// like Icon 
import { ReactComponent as LikeIcon } from '../../../static/assets/Community/Community_Global/Heart_01.svg';
import { ReactComponent as LikedIcon } from '../../../static/assets/Community/Community_Global/Heart_02.svg';
import loginRequestStore from "../../Store/LoginRequest";

const CommunityLike = ({ article_id, article_like_count, article_like_status, handelSharedLike }) => {
    const apiClient = useAxios();

    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user.user_id : null; // Changed to null for unauthenticated users
    const { setLoginRequest } = loginRequestStore();


    const [communityLikeCount, setCommunityLikeCount] = useState(article_like_count);
    
    useEffect(() => {
        setCommunityLikeCount(article_like_count)
    }, [article_id ,article_like_count]);


    // user like button 
    const handleLikeToggle = async () => {
        try {
            if (article_id && user) { // Ensure both are valid
                const response = await apiClient.post(`/article_like/${authenticatedUser}/${article_id}/`);
                if (response.status === 200) {
                    handelSharedLike();
                }
            } else {
                setLoginRequest(true);
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    return (
        <>
            <div class="g_article_g_button_frame straight" onClick={handleLikeToggle}>
                {!article_like_status ? (
                    <LikeIcon className="g_article_g_button_icon" style={{stroke: '#1A1A1B'}}/>
                ) : (
                    <LikedIcon className="g_article_g_button_icon"/>
                )}
                <span class="g_article_action_button_text Pre_KR_Normal">{ communityLikeCount }</span>
            </div>
        </>
    );
};

export default CommunityLike