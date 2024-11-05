import React from "react";
import '../../../static/css/SellReportsBase/Membership/MembershipSubscription.css'
import { ReactComponent as CompanyMembershipIcon } from '../../../static/assets/CompanyLogo/GraincMembershipLogo.svg';

// icon 

const MembershipSubscription = () => {
    
    return (
        <div className="membership_subscription_main_cover">
            <div className="membership_subscription_header">
                {/* Use CompanyIcon as a React component */}
                <CompanyMembershipIcon style={{ height:'37px' }} />
            </div>
            <div className="membership_content_frame">
                <span className="g_font_28 g_text_color_1 Pre_KR_SemiBold">그레인크 멤버십 이용권</span>
                <span className="g_font_18 g_text_color_1 Pre_KR_Medium" style={{marginTop: '16px'}}>
                    멤버십 커뮤니티 이용을 무제한으로, <br/>
                    가입하고 <span style={{color: '#0066FF'}} className="Pre_KR_SemiBold">후원</span>도 받아보세요!
                </span>
                <div className="membership_price_frame">
                    <span className="g_font_16 g_text_color_1 Pre_KR_SemiBold">그레인크 멤버십</span>
                    <span className="g_font_16 g_text_color_1 Pre_KR_Bold">10,000 <span style={{letterSpacing: '2px'}}>원/월</span></span>
                </div>
            </div>
        </div>
    );
}

export default MembershipSubscription;
