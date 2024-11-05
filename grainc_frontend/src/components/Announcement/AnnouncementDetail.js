import React, { useEffect, useState } from "react";
import '../../static/css/Announcement/AnnouncementDetail.css'
import useAxios from "../../axiosAPIClient";
import { useLocation } from "react-router-dom";
import SnackBarStore from "../Store/SnackBarStore";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const AnnouncementDetail = () => {
    const apiClient = useAxios();
    const query = useQuery();
    const announcement_id = query.get('announcement_id'); // Extract the 'kw' value from the query parameters

    const [announcementData, setAnnouncementData] = useState();
    const [loading, setLoading] = useState(true);

    // snackbar
    const { showSnackBar } = SnackBarStore();

    const fetchAnnouncement = async () => {
        try {
            const response = await apiClient.get(`/get_announcement_detail/${announcement_id}`)
            const data = response.data
            setAnnouncementData(data)
        } catch(error) {
            showSnackBar('공지사항을 가져오던 중 문제가 발생했습니다', 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
    }, [announcement_id]);

    if (loading) {
        return (
            <div>로딩중 ...</div>
        )
    };

    return (
        <div class="announcement_reply_main_frame">
            <div class="announcement_information_frame">
                <div class="announcement_key_information_frame">
                    <span class="announcement_information_text Pre_KR_Normal">공지 제목 :</span>
                    <span class="announcement_information_text Pre_KR_Normal">{ announcementData.subject }</span>
                </div>
                <div class="announcement_key_information_frame" style={{marginTop:'8px', marginBottom:'32px'}}>
                    <span class="announcement_information_text Pre_KR_Normal">공지 일시 :</span>
                    <span class="announcement_information_text Pre_KR_Normal">{ announcementData.formatted_create_date }</span>
                </div>
                <div class="announcement_key_information_frame" style={{flexDirection:'column'}}>
                    <span class="announcement_information_text Pre_KR_Normal">공지 내용 :</span>
                    <span class="announcement_information_text Pre_KR_Normal" style={{color:'#616161'}} dangerouslySetInnerHTML={{ __html:  announcementData.formatted_announcement}}></span>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetail