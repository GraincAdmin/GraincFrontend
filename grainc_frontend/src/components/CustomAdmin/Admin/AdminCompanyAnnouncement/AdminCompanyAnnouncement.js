import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import '../../../../static/css/CustomAdmin/Admin/AdminCompanyAnnouncement/AdminCompanyAnnouncement.css'
import useAxios from "../../../../axiosAPIClient";
import Pagination from "../../../Global/Pagination";
const AdminCompanyAnnouncement = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const [LTDAnnouncement, setLTDAnnouncement] = useState([]);
    
    const fetchPolicy = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_company_LTD_announcement/?page=${currentPage}`)
            const data = response.data
            console.log(data)

            setLTDAnnouncement(data.company_announcement);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchPolicy();
    }, [currentPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div class="admin_search_bar_page_main_cover_frame">
            <div class="admin_page_indicator Pre_KR_Normal">회사공고</div>
            <div class="admin_company_create_new_announcement_button_frame">
                <a class="admin_company_new_announcement_button Pre_KR_Normal" onClick={() => setAdminPage(null, 'new')}>새 공고</a>
            </div>
            <div class="admin_search_bar_base_main_content_frame">
                <table class="admin_company_announcement_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>공고</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LTDAnnouncement.map((announcement, index) => (
                            <tr key={index} onClick={() => setAdminPage(announcement.id, 'detail')}>
                                <th>{ announcement.Company_Announcement_Subject }</th>
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

export default AdminCompanyAnnouncement