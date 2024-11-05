import React, { useContext } from "react";
import useAxios from "../../../axiosAPIClient";
import AuthContext from "../../../context/AuthContext";
import '../../../static/css/SellReportsBase/Bookmark/BookmarkFolderDeleteConfirm.css'
import { useNavigate } from "react-router-dom";
import SnackBarStore from "../../Store/SnackBarStore";
const BookmarkFolderDeleteConfirm = ({ folder_id, display_style, display_style_control}) => {
    const apiClient = useAxios();
    const {showSnackBar} = SnackBarStore();
    const navigate = useNavigate();
    // user identification
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";

    const controlBookmarkFolderDelete = async () => {
        try {
            if (authenticatedUser && folder_id) {
                const response = await apiClient.post(`/bookmark_folder_delete/`, {
                    folder_id: folder_id
                })
                const data = response.data
                if (response.status === 200) {
                    display_style_control(false);
                    navigate('/bookmark');
                }
            }
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('폴더를 삭제 중 문제가 발생했습니다', 'error')
            }
        }
    };

    return (
        <div className={`bookmark_delete_confirm_main_frame ${display_style ? 'visible' : null}`}>
            <div className="bookmark_delete_confirm_frame">
                <span className="bookmark_delete_title_text Pre_KR_Medium">정말 삭제 하시겠습니까?</span>
                <span className="bookmark_delete_sub_title_text Pre_KR_Normal">삭제시 저장한 커뮤니티글이 삭제 됩니다</span>
                <div className="bookmark_delete_decision_button_frame">
                    <div className="bookmark_delete_cancel_button Pre_KR_Normal" onClick={() => display_style_control(false)}>취소</div>
                    <div className="bookmark_delete_button Pre_KR_Normal" onClick={() => controlBookmarkFolderDelete()}>삭제하기</div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkFolderDeleteConfirm