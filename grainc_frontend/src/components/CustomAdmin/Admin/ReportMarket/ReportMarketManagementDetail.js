import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
import useAxios from "../../../../axiosAPIClient";
const ReportMarketManagementDetail = ({report_id}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    const [report, setReport] = useState();
    const [onSales, setOnSales] = useState();

    const fetchReportDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_report_management_detail/${report_id}/`)
            const data = response.data
            setReport(data)
            setOnSales(data.on_sales)
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchReportDetail();
    }, [report_id]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }


    const handleReportMarketModification = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await apiClient.post(`/custom_admin_report_management_detail/${report_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Form submitted successfully', response.data);
            fetchReportDetail();
        } catch (error) {
            console.error('Error submitting form', error);
        }
    }

    return (
        <form className="admin_modification_panel_form" onSubmit={handleReportMarketModification}>
            <div className="admin_panel_indicator Pre_KR_Normal">리포트 변경</div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold">커뮤니티 글 정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">작성자</span>
                <input className="admin_panel_input" name="author" value={ report.author_username } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">제목:</span>
                <input className="admin_panel_input" name="subject" value={ report.subject } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">카테고리:</span>
                <input className="admin_panel_input" name="subject" value={ report.report_category } disabled />
            </div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold" style={{ marginTop:'24px' }}>리포트 세부정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">리뷰 수:</span>
                <input className="admin_panel_input" name="comments" value={ report.rating_count } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">판매량:</span>
                <input className="admin_panel_input" name="no_sales" value={ report.sales_count } disabled />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">판매여부:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="report_on_sales" 
                    checked={onSales} 
                    onChange={(e) => setOnSales(e.target.checked)}
                />
            </div>
            <div className="admin_panel_save_button_frame">
                <button className="admin_panel_delete_button Pre_KR_Normal">삭제</button>
                <button className="admin_panel_save_button Pre_KR_Normal">저장</button>
            </div>
            {updateStatus && (
                <span className="Pre_KR_Normal" style={{color:'#0066FF', marginLeft:'auto', paddingTop:'8px'}}>수정완료</span>
            )}
            {updateError && (
                <span className="Pre_KR_Normal" style={{color:'#ff0000', marginLeft:'auto', paddingTop:'8px'}}>수정에러</span>
            )}
        </form>
    );
};

export default ReportMarketManagementDetail