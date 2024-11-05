import React, { useEffect, useState } from "react";
import useAxios from "../../../../axiosAPIClient";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
const AdminCommunityDetail = ({article_id}) => {
    const apiClient = useAxios();

    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    const [article, setArticle] = useState();
    const [comments, setComments] = useState();
    const [isImage, setIsImage] = useState();
    const [isPublished, setIsPublished] = useState();
    const [isSaved, setIsSaved] = useState();


    const fetchCommunityDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_community_management_detail/${article_id}/`);
            const data = response.data;
            setArticle(data);
            setComments(data.comments)
            setIsImage(data.images);
            setIsPublished(data.is_hidden_admin);
            setIsSaved(data.saved_article);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCommunityDetail();
    }, [article_id]);


    if (loading) {
        return (
            <div>로딩중 ...</div>
        )
    }

    const handleCommunityDetailModification = async () => {
        setUpdateStatus(false);
        setUpdateError(false);
        try {
            const response = await apiClient.post(`/custom_admin_community_management_detail/${article_id}/`, {
                'published': isPublished
            });
            fetchCommunityDetail();
            setUpdateStatus(true);
        } catch (error) {
            setUpdateStatus(false);
            setUpdateError(true);
        }
    }

    return (
        <form className="admin_modification_panel_form" method="post">
            <div className="admin_panel_indicator Pre_KR_Normal"></div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold">커뮤니티 글 정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">작성자</span>
                <input className="admin_panel_input" name="author" value={ article.author_username } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">제목:</span>
                <input className="admin_panel_input" name="subject" value={ article.subject } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">카테고리:</span>
                <input className="admin_panel_input" name="subject" value={ article.category } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">부 카테고리:</span>
                <input className="admin_panel_input" name="subject" value={ article.sub_category } disabled />
            </div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold" style={{marginTop:'24px'}}>글 세부정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">좋아요 수:</span>
                <input className="admin_panel_input" name="comments" value={ article.like_count } disabled/>
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">댓글 수:</span>
                <input 
                    className="admin_panel_input" 
                    name="comments" 
                    value={ comments } 
                    onChange={(e) => setComments(e.target.value)}
                    disabled
                />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">이미지 여부:</span>
                <input 
                    className="admin_panel_input_check_box" type="checkbox" name="images" checked={isImage} disabled/>
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">가리기:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="published" 
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">임시저장글:</span>
                <input className="admin_panel_input_check_box" type="checkbox" name="saved_article" checked={isSaved} disabled/>
            </div>
            <div className="admin_panel_save_button_frame">
                <div className="admin_panel_delete_button Pre_KR_Normal">삭제</div>
                <div className="admin_panel_save_button Pre_KR_Normal" onClick={() => handleCommunityDetailModification()}>저장</div>
            </div>
            {updateStatus && (
                <span className="Pre_KR_Normal" style={{color:'#0066FF', marginLeft:'auto', paddingTop:'8px'}}>수정완료</span>
            )}
            {updateError && (
                <span className="Pre_KR_Normal" style={{color:'#ff0000', marginLeft:'auto', paddingTop:'8px'}}>수정에러</span>
            )}
        </form>
    );
};

export default AdminCommunityDetail