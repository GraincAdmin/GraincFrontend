import React from "react";
import '../../../static/css/Community/Community_Global/Comment_Login_Request.css'
// icon
import { ReactComponent as RightArrowIcon } from '../../../static/assets/GlobalIcon/Caret_Right_MD_Grey.svg'
import { Link } from "react-router-dom";

const CommentLoginRequest = ({style_option}) => {
    return (
        <Link className={`community_comment_login_request_frame ${style_option ? 'style_option' : null}`} to={'/login'}>
            <div className="community_comment_profile_image_frame">
                <img src={require('../../../static/assets/anonymous.png')}></img>
            </div>
            <span className="Pre_KR_Medium">지금 로그인해서 댓글을 남겨보세요</span>
            <RightArrowIcon />
        </Link>
    );
};

export default CommentLoginRequest