import React, { useEffect, useState } from "react";
import '../../static/css/Announcement/AnnouncementPage.css'
import useAxios from "../../axiosAPIClient";
import Pagination from "../Global/Pagination";
import { Link } from "react-router-dom";
const AnnouncementPage = () => {
    const apiClient = useAxios();
    const [announcement, setAnnouncement] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleAnnouncementPage = (page) => {
        setCurrentPage(page)
    }

    const fetchAnnouncement = async () => {
        try {
            const response = await apiClient.get(`/get_announcements/?page=${currentPage}`);
            const announcement_data = response.data
            setAnnouncement(announcement_data.announcement);
            setMaxPage(announcement_data.max_page)
            currentPage(announcement.current_page)
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
    }, [currentPage]);

    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <>
            <div class="announcement_history_main_frame">
                {announcement.length !== 0 ? (
                    announcement.map((announcement, index) => (
                        <Link key={index} class="announcement_history_frame" to={`/announcement/detail?announcement_id=${announcement.id}`}>
                            <div class="announcement_title_create_date_frame">
                                <div class="announcement_title Pre_KR_Normal">{ announcement.subject }</div>
                                <div class="announcement_create_date Pre_KR_Normal">{ announcement.formatted_create_date }</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <span class="announcement_state Pre_KR_Normal" style={{ width: '100%', textAlign: 'center', marginTop: '32px', fontSize: '16px', color: '#000' }}>공지가 없습니다</span>
                )}
            </div>
            <Pagination page={currentPage} max_page={maxPage} handelPage={handleAnnouncementPage}/>
        </>
    );
};

export default AnnouncementPage