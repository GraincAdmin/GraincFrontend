import React from "react";
import { Link } from "react-router-dom";
import '../../../static/css/SellReportsBase/GlobalAd/MembershipAd.css';
import MembershipAdImage from '../../../static/assets/AdImage/MembershipAdImage.png'; // Import as a URL

const MembershipAd = () => {
    return (
        <Link className="g_main_ad_frame">
            <div 
                className="g_main_ad_image_frame"
                style={{ backgroundImage: `url(${MembershipAdImage})` }} // Use the image URL
            >
            </div>
            <div className="g_colum g_main_ad_content_frame">
                <span className="Pre_KR_SemiBold" style={{ fontSize: '18px', color: '#1A1A1B'}}>
                    3초 회원가입하기
                </span>
                <div style={{height: '4px'}}></div>
                <span className="Pre_KR_Medium" style={{ fontSize: '16px', color: '#616161' }}>
                    커뮤니티에서 소통하며 금융 · 부동산 지식을 얻어가세요!
                </span>
            </div>
        </Link>
    );
};

export default MembershipAd;
