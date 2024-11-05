import React from "react";
import '../../static/css/Company/CompanyIntroduction.css';
import CompanyNav from '../Company/CompanyNav'
import { Link } from "react-router-dom";
const CompanyIntroduction = () => {
    return (
        <>
            <CompanyNav />
            <div className="company_info_main_header">
                <span className="font_size_30 Pre_KR_Medium main_title_color_w">셀리포트의 미션</span>
                <span className="font_size_16 Pre_KR_Normal main_title_color_w mobile_responded_text">
                    셀리포트는 금융 - 부동산 정보를 더 쉽고 가치있게 전달하게 해줘요!
                </span>
            </div>
            <div className="company_info_white_block">
                <span className="font_size_28 Pre_KR_Medium main_title_color">커뮤니티에서 소통하세요</span>
                <div className="company_info_divider"></div>
                <span className="font_size_16 Pre_KR_Normal sub_title_color">
                    자신이 가진 금융 - 부동산 지식를 공유하고, 다른사람들의 지식도 얻어가세요!
                </span>
            </div>
            <div className="company_info_report_market_intro">
                <span className="font_size_30 Pre_KR_Medium main_title_color_w">리포트 마켓에서 가치전달</span>
                <span className="font_size_16 Pre_KR_Normal main_title_color_w mobile_responded_text">
                    자신의 지식을 정당한 값에 받고 다른 사람들에게 전달하세요.
                </span>
            </div>
            <div className="company_info_white_block company_info_download_frame">
                <span className="font_size_28 Pre_KR_Medium main_title_color">셀리포트에 가입해보세요</span>
                <div className="company_info_divider"></div>
                <span className="font_size_16 Pre_KR_Normal sub_title_color mobile_responded_text">
                    셀리포트에 가입하여 금융 및 부동산 지식을 거래하고, 리포트마켓에서 수익을 창출하며, 커뮤니티에서 소통하세요!
                </span>
                <Link className="company_info_login_text Pre_KR_Normal" to={'/login'}>이미 계정이 있으신가요?</Link>
                <Link className="company_info_signup_button Pre_KR_Normal font_size_16" to={'/signup'}>회원가입</Link>
            </div>
        </>
    );
};

export default CompanyIntroduction;
