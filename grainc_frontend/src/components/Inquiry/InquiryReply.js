import React, { useContext, useEffect, useState } from "react";
import '../../static/css/Inquiry/InquiryReply.css'
import useAxios from "../../axiosAPIClient";
import AuthContext from "../../context/AuthContext";
import SnackBarStore from "../Store/SnackBarStore";

const InquiryHistory = ({ inquiry_id }) => {
    const apiClient = useAxios();
    const {showSnackBar} = SnackBarStore();
    const { user } = useContext(AuthContext);
    const [inquiryReply, setInquiryReply] = useState();
    const [loading, setLoading] = useState(true);
    
    const fetchInquiryReply = async () => {
        try {
            const response = await apiClient.get(`/get_inquiry_reply/${inquiry_id}/`)
            const inquiry_data = response.data
            setInquiryReply(inquiry_data)
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('문의 내역을 가져오던 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiryReply();
    }, []);


    if (loading) {
        return <div>로딩중...</div>; // Add a loading state
    }

    return (
        inquiryReply ? (
            <div className="inquiry_reply_main_frame">
                <div className="inquiry_information_frame">
                    <div className="inquiry_key_information_frame">
                        <span className="inquiry_information_text Pre_KR_Normal">문의 제목 :</span>
                        <span className="inquiry_information_text Pre_KR_Normal">{ inquiryReply.Inquiry_subject }</span>
                    </div>
                    <div className="inquiry_key_information_frame" style={{marginTop:'8px', marginBottom:'32px'}}>
                        <span className="inquiry_information_text Pre_KR_Normal">문의 일시 :</span>
                        <span className="inquiry_information_text Pre_KR_Normal">{ inquiryReply.formatted_inquiry_date }</span>
                    </div>
                    <div className="inquiry_key_information_frame" style={{flexDirection:'column'}}>
                        <span className="inquiry_information_text Pre_KR_Normal">문의 내용 :</span>
                        <span className="inquiry_information_text Pre_KR_Normal" style={{color:'#616161'}} dangerouslySetInnerHTML={{__html: inquiryReply.formatted_inquiry_main_content }}></span>
                    </div>
                </div>
                <div className="inquiry_reply_frame">
                    <div className="inquiry_key_information_frame" style={{flexDirection:'column'}}>
                        <span className="inquiry_information_text Pre_KR_Normal">문의 답변 :</span>
                        {inquiryReply.is_replied ? (
                            <span className="inquiry_information_text Pre_KR_Normal" style={{color:'#616161'}} dangerouslySetInnerHTML={{__html: inquiryReply.formatted_Inquiry_reply }}></span>
                        ) : (
                            <span className="inquiry_information_text Pre_KR_Normal" style={{color:'#616161', textAlign:'center', marginTop:'32px'}}>아직 답변을 드리지 못했습니다.<br></br> 최대한 빠른 답변을 받을 수 있도록 노력하겠습니다.</span>
                        )}
                    </div>
                    {inquiryReply.is_replied && (
                        <div className="inquiry_key_information_frame" style={{justifyContent:'right', marginTop:'48px'}}>
                            <span className="inquiry_information_text Pre_KR_Normal">답변 일자 :</span>
                            <span className="inquiry_information_text Pre_KR_Normal" dangerouslySetInnerHTML={{ __html: inquiryReply.formatted_inquiry_reply_date }}></span>
                        </div>
                    )}
                </div>
            </div>
        ) : null
    );
};

export default InquiryHistory