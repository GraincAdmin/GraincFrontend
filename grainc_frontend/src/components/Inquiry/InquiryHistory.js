import React, { useContext, useEffect, useState } from "react";
import '../../static/css/Inquiry/InquiryHistory.css';
import useAxios from "../../axiosAPIClient";
import AuthContext from "../../context/AuthContext";
import Pagination from "../Global/Pagination";
import SnackBarStore from "../Store/SnackBarStore";
const InquiryHistory = ({handelInquiryReplyPage}) => {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const { user } = useContext(AuthContext);
    const [inquiryHistory, setInquiryHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handelInquiryHistoryPage = (page) => {
        setCurrentPage(page)
    }

    const [loading, setLoading] = useState(true);

    const fetchInquiryHistory = async () => {
        try {
            const response = await apiClient.get(`/get_user_inquiry/?page=${currentPage}`);
            const data = response.data;
            setInquiryHistory(data.inquiry || []);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('문의 내역을 가져오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiryHistory();
    }, [currentPage]);

    if (loading) {
        return <div>Loading...</div>; // Add a loading state
    }

    return (
        <>
            <div className="inquiry_history_main_frame">
                {inquiryHistory.length !== 0 ? (
                    inquiryHistory.map((inquiry, index) => (
                        inquiry && (
                            <div key={index} className="inquiry_history_frame" onClick={() => handelInquiryReplyPage(inquiry.inquiry_id)}>
                                <div className="inquiry_title_create_date_frame">
                                    <div className="inquiry_title Pre_KR_Normal">{inquiry.Inquiry_subject}</div>
                                    <div className="inquiry_create_date Pre_KR_Normal">{inquiry.formatted_inquiry_date}</div>
                                </div>
                                {inquiry.is_replied ? (
                                    <span className="inquiry_state Pre_KR_Normal" style={{ color: '#0066FF' }}>답변완료</span>
                                ) : (
                                    <span className="inquiry_state Pre_KR_Normal">답변대기</span>
                                )}
                            </div>
                        )
                    ))
                ) : (
                    <span className="inquiry_state Pre_KR_Normal" style={{ width: '100%', textAlign: 'center', marginTop: '32px', fontSize: '16px', color: '#000' }}>문의내역이 없습니다</span>
                )}
            </div>
            <Pagination page={currentPage} max_page={maxPage} handelPage={handelInquiryHistoryPage}/>
        </>
    );
};

export default InquiryHistory;
