import React, { useEffect, useState } from "react";
import '../../../static/css/Community/Community_Article/Community_Article_Comment.css'
import { useLocation, Link, useParams } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";
import SnackBarStore from "../../Store/SnackBarStore";

function CommunityArticleCommentPage() {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const communityCategory = queryParams.get('category');

    const {article_id} = useParams();

    const [createDate, setCreateDate] = useState();
    const [subject, setSubject] = useState();
    const [commentCount, setCommentCount] = useState();

    const fetchCommentDetail = async () => {
        try {
            const response = await apiClient.get(`/article_comment_page_detail/${article_id}`)
            const data = response.data
            setCreateDate(data.create_date);
            setSubject(data.subject);
            setCommentCount(data.comment_count);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('댓글을 불러오던 중 문제가 발생했습니다', 'error')
            }
        }
    }

    useEffect(() => {
        fetchCommentDetail();
    }, [article_id]);


    return (
        <div className="community_article_comment_main_cover">
            <div className="community_article_comment_page">
                <div class="community_view_title_frame Pre_KR_Medium">
                    { subject }
                </div>
                <div class="community_article_create_date Pre_KR_Medium">{ createDate }</div>
                <Link class="community_article_comment_exit_button_frame" to={`/community_detail/${article_id}/?category=${communityCategory}`}>
                    <span class="community_article_comment_exit_button Pre_KR_Normal">본문보기</span>
                </Link>
                <div class="community_article_number_of_comments_frame">
                    <span class="community_article_number_of_comments_text Pre_KR_Medium">댓글</span>
                    <span class="community_article_number_of_comments_text Pre_KR_Medium" style={{color:'#0066ff'}}>{ commentCount }</span>
                </div>
                {/* <CommunityCommentsView selectedArticle={article_id} page_section='comments'/> */}
            </div>
        </div>
    )
}

export default CommunityArticleCommentPage