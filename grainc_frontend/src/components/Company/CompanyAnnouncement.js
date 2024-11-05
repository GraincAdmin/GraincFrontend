import React, { useEffect, useState } from "react";
import '../../static/css/Company/CompanyAnnouncement.css'
import Pagination from "../Global/Pagination";
import useAxios from "../../axiosAPIClient";
import { useNavigate } from 'react-router-dom';
import CompanyNav from "./CompanyNav";
const CompanyAnnouncement = () => {
    const apiClient = useAxios();
    const navigate = useNavigate();
    const [companyAnnouncement, setCompanyAnnouncement] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchCompanyAnnouncements = async () => {
        try {
            const response = await apiClient.get(`/get_company_announcements/?page=${currentPage}`)
            const data = response.data
            setCompanyAnnouncement(data.announcements)
            setCurrentPage(data.current_page)
            setMaxPage(data.max_page)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCompanyAnnouncements();
    }, [currentPage]);

    

    return (
        <>
            <CompanyNav />
            <div class="company_announcement_header Pre_KR_Medium">
                공고
            </div>
            <div class="company_announcement_main_cover">
                <div class="company_announcement_search_main_frame">
                    <span class="Pre_KR_Medium">공고</span>
                    <form class="announcement_search_frame" method="get">
                        <input class="announcement_search_input Pre_KR_Normal" name="kw" placeholder="공고검색"/>
                        <button class="announcement_search_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_1027_1551" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"></rect>
                                </mask>
                                <g mask="url(#mask0_1027_1551)">
                                    <path d="M19.5427 20.577L13.2619 14.2962C12.7619 14.7091 12.1869 15.0321 11.5369 15.2655C10.8869 15.4988 10.2145 15.6155 9.51965 15.6155C7.81048 15.6155 6.36396 15.0237 5.1801 13.8401C3.99623 12.6566 3.4043 11.2104 3.4043 9.50169C3.4043 7.79296 3.99608 6.34628 5.17965 5.16167C6.36321 3.97707 7.80936 3.38477 9.5181 3.38477C11.2268 3.38477 12.6735 3.9767 13.8581 5.16057C15.0427 6.34443 15.635 7.79095 15.635 9.50012C15.635 10.2142 15.5151 10.8963 15.2754 11.5463C15.0356 12.1963 14.7158 12.7616 14.3158 13.2424L20.5965 19.5232L19.5427 20.577ZM9.51965 14.1155C10.8081 14.1155 11.8995 13.6684 12.7937 12.7742C13.6879 11.8799 14.135 10.7886 14.135 9.50012C14.135 8.21165 13.6879 7.1203 12.7937 6.22607C11.8995 5.33183 10.8081 4.88472 9.51965 4.88472C8.23118 4.88472 7.13983 5.33183 6.2456 6.22607C5.35138 7.1203 4.90427 8.21165 4.90427 9.50012C4.90427 10.7886 5.35138 11.8799 6.2456 12.7742C7.13983 13.6684 8.23118 14.1155 9.51965 14.1155Z" fill="#878F9B"></path>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
                <table class="company_announcement_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th style={{width:'75%'}}>공고</th>
                            <th style={{width:'25%'}}>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyAnnouncement.length !== 0 ? (
                            companyAnnouncement.map((announcement, index) => (
                                <tr key={index} onClick={() => navigate(`/company_announcement_detail/${announcement.announcement_id}`)}>
                                    <td style={{width:'75%'}}>{ announcement.Company_Announcement_Subject }</td>
                                    <td style={{width:'25%'}}>{ announcement.formatted_create_date }</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td style={{width:'100%', textAlign:'center'}}>공고가 없습니다</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handlePageChange}/>
            </div>
        </>
    );
};

export default CompanyAnnouncement