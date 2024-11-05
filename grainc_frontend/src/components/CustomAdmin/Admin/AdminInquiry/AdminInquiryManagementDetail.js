import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
import useAxios from "../../../../axiosAPIClient";
const AdminInquiryManagementDetail = ({inquiry_id}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [inquiry, setInquiry] = useState();
    const [inquiryReply, setInquiryReply] = useState();
    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    const fetchInquiryDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_inquiry_management_detail/${inquiry_id}/`);
            const data = response.data
            setInquiry(data)
            setInquiryReply(data.Inquiry_reply)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInquiryDetail();
    }, [inquiry_id]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    const handelInquiryDetailModification = async () => {
        setUpdateError(false);
        setUpdateStatus(false);
        try {
            const response = await apiClient.post(`/custom_admin_inquiry_management_detail/${inquiry_id}/`, {
                reply: inquiryReply
            });
            fetchInquiryDetail();
            setUpdateStatus(true);
        } catch (error) {
            console.error('Error submitting form', error);
            setUpdateError(true);
        }
    }


    return (
        <form className="admin_modification_panel_form">
            <div className="admin_panel_section_indicator Pre_KR_SemiBold">문의 정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">문의 제목:</span>
                <span className="admin_inquiry_subject Pre_KR_Normal">{ inquiry.Inquiry_subject }</span>
            </div> 
            <div className="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">문의 내용:</span>
                <div className="admin_inquiry_content Pre_KR_Normal" dangerouslySetInnerHTML={{__html: inquiry.formatted_main_content}}></div>
            </div>
            <div className="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">문의 답글:</span>
                <textarea 
                    className="admin_panel_textarea" 
                    name="reply"
                    value={inquiryReply}
                    onChange={(e) => setInquiryReply(e.target.value)}>
                </textarea>
            </div>
            <div className="admin_panel_save_button_frame">
                <div className="admin_panel_save_button Pre_KR_Normal" onClick={() => handelInquiryDetailModification()}>저장</div>
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

export default AdminInquiryManagementDetail