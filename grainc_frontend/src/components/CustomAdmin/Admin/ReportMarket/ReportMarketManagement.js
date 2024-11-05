import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import useAxios from "../../../../axiosAPIClient";
import Pagination from "../../../Global/Pagination";
const ReportMarketManagement = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchReportMarket();
    }
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const [reports, setReports] = useState([]);
    
    const fetchReportMarket = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_report_management/?page=${currentPage}&kw=${searchKW}`)
            const data = response.data
            setReports(data.reports);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchReportMarket();
    }, [currentPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div className="admin_search_bar_page_main_cover_frame">
            <div className="admin_page_indicator Pre_KR_Normal">리포트 관리</div>
            <div className="admin_page_search_bar_main_frame" method="get" >
                <input className="admin_page_search_bar Pre_KR_Normal" onChange={(e) => setSearchKw(e.target.value)} placeholder="리포트 검색 (제목, 유저이름, 유저 이메일, 유저 닉네임, 카테고리, 부카테고리)" />
                <button className="admin_page_search_button Pre_KR_Normal" onClick={() => handelSearchButton()} >검색하기</button>
            </div>
            <div className="admin_search_bar_base_main_content_frame">
                <table className="admin_report_management_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>작성자</th>
                            <th>카테고리</th>
                            <th>제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} onClick={() => setAdminPage(report.id)}>
                                <th>{ report.author_username }</th>
                                <th>{ report.report_category }</th>
                                <th>{ report.subject }</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default ReportMarketManagement