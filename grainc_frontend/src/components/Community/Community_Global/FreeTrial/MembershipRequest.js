import React from "react";
import '../../../../static/css/Community/Community_Global/FreeTrial/MembershipRequest.css'
import { Link, useNavigate } from "react-router-dom";

const MembershipRequest = ({toggle}) => {
    const navigate = useNavigate();

    return (
        <div className={`membership_request_main_frame ${toggle ? 'open' : null}`}>
            <div className="membership_request">
                <span className="g_font_24 g_text_color_1 Pre_KR_Medium">멤버십</span>
                <span 
                    className="g_font_16 g_text_color_1 Pre_KR_Regular" 
                    style={{
                        marginTop: '8px', 
                        marginBottom: '24px',
                        lineHeight: '150%'
                    }}
                >
                    당일 무료 멤버십 컨텐츠 한도에 도달했습니다 <br/>
                    멤버십에 가입해서 무제한으로 커뮤니티를 이용해보세요
                </span>
                <div className="g_row g_gap_16">
                    <div 
                        className="g_membership_request_button close Pre_KR_Medium"
                        onClick={() => navigate(-1)}
                    >   
                        닫기
                    </div>
                    <Link 
                        className="g_membership_request_button request Pre_KR_Medium"
                        to={'/membership_subscription'}
                    >
                        멤버십
                    </Link>
                </div>
            </div> 
        </div>
    );
}

export default MembershipRequest