import React, { useContext, useState } from "react";
import '../../../../static/css/Community/Community_Global/MoreOption/CommunityMoreOption.css'
import { ReactComponent as WarningIcon } from '../../../../static/assets/GlobalIcon/Warning/Octagon_Warning.svg'
import AuthContext from "../../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../../axiosAPIClient";
import SnackBarStore from "../../../Store/SnackBarStore";
function CommunityMoreOption({style, report_style, author_id , article_id}) {
    const apiClient = useAxios();
    const { user } = useContext(AuthContext);
    const { showSnackBar } = SnackBarStore();
    const navigate = useNavigate();
    const fetchDeleteUserArticle = async () => {
        if (user && article_id) {
            try {
                const response = await apiClient.post('/delete_article/', {
                    user_id: user.user_id,
                    article_id: article_id
                })
                const data = response.data.status
                if (data === 'article_deleted') {
                    setDeleteConfirmStyle(false);
                    navigate('/community?category=home')
                }
                
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('글을 삭제하던 중 문제가 발생했습니다', 'error')
                }
            }
        }
    };

    const [deleteConfirmStyle, setDeleteConfirmStyle] = useState(false);

    return (
        <>
            <div className={`g_article_more_option_main_frame ${style ? 'open' : null}`}>
                {!user && (
                    <div className="g_article_more_option_button border_option_768" onClick={() => report_style(true)}>
                        <WarningIcon style={{stroke: '#ff0000'}}/>
                        <span className="Pre_KR_Medium" style={{color:'#ff0000'}}>신고하기</span>
                    </div>
                )}
                {user && (
                    author_id !== user.id && (
                        <div className="g_article_more_option_button border_option_768" onClick={() => report_style(true)}>
                            <WarningIcon style={{stroke: '#ff0000'}}/>
                            <span className="Pre_KR_Medium" style={{color:'#ff0000'}}>신고하기</span>
                        </div>
                    )
                )}
                {user && (
                    <>
                        {author_id === user.id && (
                            <Link className="g_article_more_option_button" to={`/community_article_upload/${'modification'}`} state={{ articleId: article_id }}>
                                <span className="Pre_KR_Medium">수정하기</span>
                            </Link>
                        )}
                        {author_id === user.id && (
                            <div className="g_article_more_option_button delete" onClick={() => setDeleteConfirmStyle(true)}>
                                <span className="Pre_KR_Medium">삭제</span>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className={`community_article_delete_confirmation_main_frame ${deleteConfirmStyle ? 'open' : ''}`}>
                <div className="community_article_delete_confirmation">
                    <span className="community_article_delete_confirmation_title Pre_KR_Medium">정말 삭제 하시겠습니다</span>
                    <span className="community_article_delete_confirmation_sub_title Pre_KR_Normal">
                        삭제시 복구가 불가능 합니다
                    </span>
                    <div className="community_article_delete_decision_button_frame">
                        <div className="community_article_delete_cancel_button Pre_KR_Normal" onClick={() => setDeleteConfirmStyle(false)}>취소</div>
                        <div className="community_article_delete_button Pre_KR_Normal" onClick={() => fetchDeleteUserArticle()}>삭제하기</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityMoreOption