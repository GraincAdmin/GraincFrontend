import React, { useContext, useEffect, useState } from "react";
import '../../static/css/Inquiry/Inquiry.css'
import AuthContext from "../../context/AuthContext";
import InquiryMain from "./InquiryMain";
import InquiryHistory from "./InquiryHistory";
import InquiryReply from './InquiryReply';
import SituationalNavM from "../SellReportsBase/Situational_Nav_Mobile/SituationalNavM";
import { useNavigate } from "react-router-dom";
function Inquiry() {
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user.user_id : "unAuthenticated";
    const navigate = useNavigate();
    function authentication_check() {
        if (user === null) {
            navigate('/login');
        }
    }

    useEffect(() => {
        authentication_check()
    }, []);
    

    const [inquiryPage, setInquiryPage] = useState('main');

    const [inquiryReplyID, setInquiryReplyID] = useState(null);

    const handelInquiryReplyPage = (inquiry_id) => {
        setInquiryPage('reply')
        setInquiryReplyID(inquiry_id)
    }

    return (
        <>
            <SituationalNavM page={'1:1 문의'} borderOption={true}/>
            <div className="inquiry_main_cover_frame">
                <div className="inquiry_banner_frame">
                    <span className="inquiry_banner_text Pre_KR_Normal">1:1 문의</span>
                </div>
                <div className="inquiry_main_frame">
                    <div className="inquiry_page_option_frame">
                        <div className="inquiry_page_option_button_cover_frame ">
                            <div className={`inquiry_page_option_button ${inquiryPage === 'main' ? 'inquiry_page_option_button_selected' : null} Pre_KR_Normal`}
                                onClick={() => setInquiryPage('main')}>1:1 문의하기</div>
                        </div>
                        <div className="inquiry_page_option_button_cover_frame">
                            <div className={`inquiry_page_option_button ${inquiryPage === 'history' || inquiryPage === 'reply' ? 'inquiry_page_option_button_selected' : null} Pre_KR_Normal`}
                            onClick={() => setInquiryPage('history')}>문의내역</div>
                        </div>
                    </div>
                    {inquiryPage === 'main' && (
                        <InquiryMain setInquiryPage={setInquiryPage}/>
                    )}
                    {inquiryPage === 'history' && (
                        <InquiryHistory handelInquiryReplyPage={handelInquiryReplyPage}/>
                    )}
                    {inquiryPage === 'reply' && (
                        <InquiryReply inquiry_id={inquiryReplyID}/>
                    )}
                </div>
            </div>
        </>
    );
};

export default Inquiry