import React, { useState, useEffect, useContext } from "react";
import '../../../../static/css/Community/Community_Global/Bookmark/Community_Bookmark_Folder_Add.css';
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";

// icon
import { ReactComponent as CloseIcon } from '../../../../static/assets/GlobalIcon/Close_MD.svg'
 
function CommunityBookmarkFolderAdd({display_style, onClose, folderLiveUpdate}) {
    const apiClient = useAxios();
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user: "unAuthenticated";

    // folder_add_style_control
    const [bookmarkFolderAddStyle, setBookmarkFolderAddStyle] = useState(display_style)

    useEffect(() => {
        if (bookmarkFolderAddStyle) {
            document.body.classList.add('overflow_block');
        } else {
            document.body.classList.remove('overflow_block');
        }
    }, [bookmarkFolderAddStyle]);

    useEffect(() => {
        setBookmarkFolderAddStyle(display_style);
    }, [display_style]);

    function handelBookmarkFolderAddClose() {
        onClose(false)
    }


    const handleAddBookmarkFolder = async () => {
        if (!authenticatedUser) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const response = await apiClient.post(`/bookmark_folder_add/`, {
                folder_name: newFolderName
            });
            const status = response.data.status
            const data = response.data;
            if (status === 'folder_exists') {
                setFolderAddError('같은 이름의 폴더가 존재합니다')
            } else if (status === 'folder_created') {
                handelBookmarkFolderAddClose();
                folderLiveUpdate(data.folder_id, newFolderName);
            }
        } catch (error) {
            console.error('Error adding bookmark folder:', error);
        }
    };


    // folder_add_error
    const [folderAddError, setFolderAddError] = useState(null)

    // folder_add_variable
    const [newFolderName, setNewFolderName] = useState(null)
    const updateFolderName = (e) => {
        const folder_name = e.target.value;
        setNewFolderName(folder_name)
    }
    const [folderNameError, setFolderNameError] = useState(false)

    useEffect(() => {
        if (!newFolderName) {
            setFolderNameError(true)
        } else {
            setFolderNameError(false)
        }
    }, [newFolderName]);

    function handelFolderAddButton() {
        if (folderNameError) {
            setFolderAddError('폴더 제목을 입력해주세요');
        } else {
            console.log('폴더생성');
            handleAddBookmarkFolder();
        }
    }

    
    return (
        <form className={`bookmark_folder_add_main_frame ${bookmarkFolderAddStyle ? 'visible' : 'hidden'}`} id="bookmark_folder_add_community">
            <div className="bookmark_folder_add_frame">
                <div className="bookmark_folder_add_title_frame Pre_KR_SemiBold">
                    북마크 폴더 추가
                    <div className="bookmark_folder_add_close_button" onClick={() => handelBookmarkFolderAddClose()}>
                        <CloseIcon style={{ width: '28px', height: '28px', stroke: '#1A1A1B' }} />
                    </div>
                </div>
                <input className="bookmark_folder_add_input Pre_KR_Normal" onChange={(e) => updateFolderName(e)} placeholder="폴더 이름을 입력해주세요" />
                {folderAddError ? (
                    <span className="bookmark_folder_add_error Pre_KR_Normal">{ folderAddError }</span>
                ) : null }
                <div className="bookmark_folder_add_button Pre_KR_Medium" onClick={() => handelFolderAddButton()}>폴더 추가</div>
            </div>
        </form>
    );
}

export default CommunityBookmarkFolderAdd;
