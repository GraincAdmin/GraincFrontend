import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import useAxios from "../../../../axiosAPIClient";
import Pagination from "../../../Global/Pagination";
const AdminCommunity = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchCommunityArticle();
    }
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const [article, setArticle] = useState([]);
    
    const fetchCommunityArticle = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_community_management/?page=${currentPage}&kw=${searchKW}`)
            const data = response.data
            setArticle(data.articles);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchCommunityArticle();
    }, [currentPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div class="admin_search_bar_page_main_cover_frame">
            <div class="admin_page_indicator Pre_KR_Normal">커뮤니티 관리</div>
            <div class="admin_page_search_bar_main_frame">
                <input class="admin_page_search_bar Pre_KR_Normal" onChange={(e) => setSearchKw(e.target.value)} placeholder="커뮤니티글 검색 (제목, 유저이름, 유저 이메일, 유저 닉네임,카테고리, 부카테고리)" />
                <button class="admin_page_search_button Pre_KR_Normal" onClick={() => handelSearchButton()} >검색하기</button>
            </div>
            <div class="admin_search_bar_base_main_content_frame">
                <table class="Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>작성자</th>
                            <th>카테고리</th>
                            <th>제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        {article.map((article, index) => (
                            <tr key={index} onClick={() => setAdminPage(article.id)}>
                                <th>{ article.author_username }</th>
                                <th>{ article.category }</th>
                                <th className="textarea">{ article.subject }</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default AdminCommunity