import React, { useEffect, useState } from "react";
import '../static/css/Maintenance.css'
import { Link } from "react-router-dom";
import useAxios from "../axiosAPIClient";
function Maintenance() {
    const apiClient = useAxios();


    // Important Announcement Control
    const [importantAnnouncementData, setImportantAnnouncementData] = useState(null);
    const [importantAnnouncementPopStyle, setImportantAnnouncementPopStyle] = useState(null);

    // Not Authenticated User
    const importantAnnouncementNotificationClose = localStorage.getItem("importantAnnouncementNotification");
    const importantAnnouncementFetchAuthority = sessionStorage.getItem("importantAnnouncementFetchAuthority")
    const fetchImportantAnnouncement = async () => {
        if (!importantAnnouncementFetchAuthority) {
            try {
                const response = await apiClient.get('/get_importance_announcement/');
                const data = response.data;
                setImportantAnnouncementData(data);
                if (response.status === 200) {
                    sessionStorage.setItem('importantAnnouncementFetchAuthority', true)
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchImportantAnnouncement();
    }, []);

    useEffect(() => {
        if (importantAnnouncementData) {
            if (importantAnnouncementNotificationClose) {
                const strLocal = JSON.parse(importantAnnouncementNotificationClose);
                const selectedAnnouncement = strLocal[importantAnnouncementData.id]
                if (selectedAnnouncement === true) {
                    setImportantAnnouncementPopStyle(false);
                } else {
                    setImportantAnnouncementPopStyle(true);
                }
            } else {
                setImportantAnnouncementPopStyle(true);
            }
        } else {
            setImportantAnnouncementPopStyle(false);
        }
    }, [importantAnnouncementData]);

    const closeImportantAnnouncement = () => {
        const getLocal = localStorage.getItem('importantAnnouncementNotification');
        if (getLocal) {
            const strLocal = JSON.parse(getLocal);
            const selectedAnnouncement = strLocal[importantAnnouncementData.id]
            if (selectedAnnouncement) {
                if (selectedAnnouncement === true) {
                    setImportantAnnouncementPopStyle(false);
                } else {
                    setImportantAnnouncementPopStyle(true);
                }
            } else {
                const setLocalData = { [importantAnnouncementData.id]: true };
                const strLocalData = JSON.stringify(setLocalData);
                localStorage.setItem('importantAnnouncementNotification', strLocalData);
                setImportantAnnouncementPopStyle(false);
            }
        } else {
            const setLocalData = { [importantAnnouncementData.id]: true };
            const strLocalData = JSON.stringify(setLocalData);
            localStorage.setItem('importantAnnouncementNotification', strLocalData);
            setImportantAnnouncementPopStyle(false);
        }
    };


    return (
        <div className={`important_announcement_main_frame ${importantAnnouncementPopStyle ? 'open' : ''}`}>
            {importantAnnouncementData && (
                <div className="important_announcement_frame">
                    <span className="important_announcement_title Pre_KR_Medium">중요 공지</span>
                    <div className="important_announcement_detail_section">
                        <div className="important_announcement_info_main_frame">
                            <span className="important_announcement_detail_text1 Pre_KR_Medium">일시</span>
                            <div className="important_announcement_duration_frame Pre_KR_Medium">
                                <span>{importantAnnouncementData.formatted_start_time} 부터</span>
                                <span>{importantAnnouncementData.formatted_end_time} 까지</span>
                            </div>
                        </div>
                        <div className="important_announcement_info_main_frame">
                            <span className="important_announcement_detail_text1 Pre_KR_Medium">제목</span>
                            <span className="important_announcement_detail_text2 Pre_KR_Medium">{importantAnnouncementData.subject}</span>
                        </div>
                    </div>
                    <Link className="important_announcement_detail_button Pre_KR_SemiBold" to={`/announcement/detail?announcement_id=${importantAnnouncementData.id}`} onClick={() => closeImportantAnnouncement()}>
                        더보기
                    </Link>
                    <div className="important_announcement_detail_text1 Pre_KR_SemiBold" onClick={() => closeImportantAnnouncement()} style={{ marginTop: '16px', width: '100%', textAlign: 'center', fontSize: '14px', cursor: 'pointer' }}>
                        닫기
                    </div>
                </div>
            )}
        </div>
    );

};

export default Maintenance