import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import '../../../../static/css/CustomAdmin/Admin/AdminInquiry/AdminInquiry.css'
import Pagination from "../../../Global/Pagination";
import useAxios from "../../../../axiosAPIClient";
const AdminInquiryManagement = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchInquiry();
    }
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }
    const [inquiryPage, setInquiryPage] = useState('미답변');
    const [inquiry, setInquiry] = useState([]);

    const fetchInquiry = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_inquiry_management/?page=${currentPage}&kw=${searchKW}&type=${inquiryPage}`)
            const data = response.data
            setInquiry(data.inquiry);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInquiry();
    }, [currentPage, inquiryPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div className="admin_search_bar_page_main_cover_frame">
            <div className="admin_page_indicator Pre_KR_Normal">문의내역 - { inquiryPage }</div>
            <div className="admin_inquiry_management_status_page_change_button_frame">
                <div className={`admin_inquiry_status_change_button Pre_KR_Normal 
                    ${inquiryPage === '미답변' ? 'selected' : null}`}
                    onClick={() => setInquiryPage('미답변')}>
                    미답변
                </div>
                <div className={`admin_inquiry_status_change_button Pre_KR_Normal 
                    ${inquiryPage === '답변완료' ? 'selected' : null}`}
                    onClick={() => setInquiryPage('답변완료')}>
                        답변완료
                </div>
            </div>
            <div className="admin_page_search_bar_main_frame" >
                <input className="admin_page_search_bar Pre_KR_Normal" onChange={(e) => setSearchKw(e.target.value)} placeholder="결제내역 검색 (제목, 구매자 닉네임, 구매자 이름, 결제코드)" />
                <button className="admin_page_search_button Pre_KR_Normal" onClick={() => handelSearchButton()}>검색하기</button>
            </div>
            <div className="admin_search_bar_base_main_content_frame">
                <table className="Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>유저 닉네임</th>
                            <th>문의유형</th>
                            <th>제목</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiry.map((inquiry, index) => (
                            <tr key={index} onClick={() => setAdminPage(inquiry.id)}>
                                <th>{ inquiry.author_username }</th>
                                <th>{ inquiry.Inquiry_type }</th>
                                <th className="textarea">{ inquiry.Inquiry_subject }</th>
                                <th>{ inquiry.formatted_date }</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default AdminInquiryManagement