import React, { useState } from "react";
import '../../static/css/Announcement/Announcement.css'
import SituationalNavM from "../SellReportsBase/Situational_Nav_Mobile/SituationalNavM";
import AnnouncementPage from "./AnnouncementPage";
import AnnouncementDetail from "./AnnouncementDetail";
import { useParams } from "react-router-dom";
function Announcement() {
    const {page_type} = useParams();

    
    return (
        <>
            <SituationalNavM page={'공지사항'}/>
            <div className="announcement_main_cover_frame">
                <div className="announcement_banner_frame">
                    <span className="announcement_banner_text Pre_KR_Normal">공지사항</span>
                </div>
                <div className="announcement_main_frame">
                    {page_type === 'main' && (
                        <AnnouncementPage />
                    )}
                    {page_type === 'detail' && (
                        <AnnouncementDetail />
                    )}
                </div>
            </div>
        </>
    );
};

export default Announcement