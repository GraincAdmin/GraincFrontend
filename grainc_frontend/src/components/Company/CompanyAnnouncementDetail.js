import React, { useEffect, useState } from "react";
import '../../static/css/Company/CompanyAnnouncementDetail.css'
import { useParams } from "react-router-dom";
import CompanyNav from "./CompanyNav";
import useAxios from "../../axiosAPIClient";
const CompanyAnnouncementDetail = () => {
    const apiClient = useAxios();
    const { announcement_id } = useParams();

    const [announcementDetail, setAnnouncementDetail] = useState([]);
    
    const fetchAnnouncementDetail = async () => {
        if (announcement_id) {
            try {
                const response = await apiClient.get(`/company_announcement_detail/${announcement_id}`);
                const data = response.data;
                setAnnouncementDetail(data);
            } catch(error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchAnnouncementDetail();
    }, [announcement_id]);

    return (
        <>
            <CompanyNav />
            <div class="company_announcement_header Pre_KR_Medium">
                공고
            </div>
            <div class="company_announcement_main_cover">
                <div class="company_announcement_title_create_date_frame">
                    <span class="company_announcement_subject_text Pre_KR_Medium">{ announcementDetail.Company_Announcement_Subject }</span>
                    <span class="company_announcement_create_date_text Pre_KR_Medium">{ announcementDetail.formatted_create_date }</span>
                </div>
                <div class="company_announcement_main_content_frame Pre_KR_Normal" dangerouslySetInnerHTML={{__html: announcementDetail.Company_Announcement_Content}}>
                </div>
            </div>
        </>
    );
};

export default CompanyAnnouncementDetail