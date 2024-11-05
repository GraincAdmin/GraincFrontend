import React, { useContext, useState } from "react";
import '../../../../static/css/Community/Community_Global/Community_Global_Action_Button.css'
import { ReactComponent as BookmarkIcon } from '../../../../static/assets/GlobalIcon/Bookmark.svg';
import AuthContext from "../../../../context/AuthContext";
import CommunityBookmark from "./Community_Bookmark";
import loginRequestStore from "../../../Store/LoginRequest";

function CommunityBookmarkIndicator({article_id, is_bookmarked}) {
    const { user } = useContext(AuthContext);
    const { setLoginRequest } = loginRequestStore();


    const [bookmarkStatus, setBookmarkStatus] = useState(is_bookmarked);

    // bookmark Section Control
    const [bookmarkStyle, setBookmarkStyle] = useState(false);

    function showBookmarkPopup() {
        if (user !== null) {
            setBookmarkStyle(true);
        } else {
            setLoginRequest(true);
        }
    }


    return (    
        <>
            <CommunityBookmark style={bookmarkStyle} style_control={setBookmarkStyle} article_id={article_id} setBookmarkStatus={setBookmarkStatus}/>
            <div className="g_article_g_button_frame" onClick={() => showBookmarkPopup()}>
                {bookmarkStatus ? (
                    // <BookmarkedIcon style={{width: '24px', height: '24px'}}/>
                    <BookmarkIcon style={{width: '24px', height: '24px', fill: '#1a1a1b'}}/>
                ) : (
                    <BookmarkIcon style={{width: '24px', height: '24px'}}/>
                )}
            </div>
        </>
    );
};

export default CommunityBookmarkIndicator