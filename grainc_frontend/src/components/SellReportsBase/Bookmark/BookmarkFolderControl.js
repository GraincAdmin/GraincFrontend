import React, { useState } from "react";
import '../../../static/css/SellReportsBase/Bookmark/BookmarkFolderControl.css'
//Bookmark delete confirm
import BookmarkFolderDeleteConfirm from "./BookmarkFolderDeleteConfirm";

const BookmarkFolderControl = ({folder_id, display_style, handelDisplayStyle}) => {

    //delete confirm style control
    const [folderDeleteConfirmStyle, setFolderDeleteConfirmStyle] = useState(false);
    
    const handelFinalDeleteConfirm = () => {
        setFolderDeleteConfirmStyle(true)
        handelDisplayStyle(false)
    }

    return (
        <>
            <BookmarkFolderDeleteConfirm folder_id={folder_id} display_style={ folderDeleteConfirmStyle } display_style_control={ setFolderDeleteConfirmStyle } />
            <div class={`bookmark_action_button_popup ${display_style ? 'visible' : null}`}>
                <div class="bookmark_action_button Pre_KR_Normal" style={{border:'0px'}} onClick={() => handelFinalDeleteConfirm()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                        <mask id="mask0_1308_4719" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                        <rect width="16" height="16" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1308_4719)">
                        <path d="M4.87183 13.6665C4.53939 13.6665 4.25539 13.5488 4.01983 13.3133C3.78439 13.0778 3.66667 12.7938 3.66667 12.4613V3.99982H3V2.99982H6V2.41016H10V2.99982H13V3.99982H12.3333V12.4613C12.3333 12.7981 12.2167 13.0832 11.9833 13.3165C11.75 13.5498 11.4649 13.6665 11.1282 13.6665H4.87183ZM11.3333 3.99982H4.66667V12.4613C4.66667 12.5212 4.68589 12.5704 4.72433 12.6088C4.76278 12.6473 4.81194 12.6665 4.87183 12.6665H11.1282C11.1795 12.6665 11.2265 12.6451 11.2692 12.6023C11.3119 12.5597 11.3333 12.5127 11.3333 12.4613V3.99982ZM6.26933 11.3332H7.26917V5.33316H6.26933V11.3332ZM8.73083 11.3332H9.73067V5.33316H8.73083V11.3332Z" fill="#1A1A1B"/>
                        </g>
                    </svg>
                    삭제하기
                </div>
                <div class="bookmark_action_button Pre_KR_Normal" style={{border:'0px', color:'#ff0000'}} onClick={() => handelDisplayStyle(false)}>
                    취소
                </div>
            </div>
        </>
    )
}

export default BookmarkFolderControl