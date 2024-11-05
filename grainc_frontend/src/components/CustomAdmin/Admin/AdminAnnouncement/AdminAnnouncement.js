import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import '../../../../static/css/CustomAdmin/Admin/AdminAnnouncement/AdminAnnouncement.css'
import useAxios from "../../../../axiosAPIClient";
import Pagination from "../../../Global/Pagination";
const AdminAnnouncement = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchCompanyAnnouncement();
    }
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const [announcement, setAnnouncement] = useState([]);
    
    const fetchCompanyAnnouncement = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_company_announcement/?page=${currentPage}&kw=${searchKW}`)
            const data = response.data
            setAnnouncement(data.announcement);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchCompanyAnnouncement();
    }, [currentPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div className="admin_search_bar_page_main_cover_frame">
            <div className="admin_page_indicator Pre_KR_Normal">
                공지사항
                <div className="admin_new_announcement_create_button_frame">
                    <a className="admin_new_announcement_create_button Pre_KR_Normal" onClick={() => setAdminPage(null, 'new')}>새 공지</a>
                </div>
            </div>
            <div className="admin_page_search_bar_main_frame">
                <input className="admin_page_search_bar Pre_KR_Normal"   onChange={(e) => setSearchKw(e.target.value)} placeholder="공지검색" />
                <div className="admin_page_search_button Pre_KR_Normal" onClick={() => handelSearchButton()} >검색하기</div>
            </div>
            <div className="admin_search_bar_base_main_content_frame">
                <table className="Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>공지제목</th>
                            <th>공지날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcement.map((announcement, index) => (
                            <tr key={index} onClick={() => setAdminPage(announcement.id, 'detail')}>
                                <th>{ announcement.subject }</th>
                                <th>{ announcement.formatted_date }</th>
                            </tr>   
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default AdminAnnouncement