import React from "react";
import '../../../static/css/ReportMarket/Report_Detail/Report_Purchase.css'
import { Link } from "react-router-dom";
function ReportPurchasePage({ 
    popStyle, 
    handlePopStyle,
    // Report Detail
    subject,
    category,
    create_date,
    price,
    author,
    author_profile_image
    }) {
    return(
        <div className={`report_purchase_popup_main_cover ${popStyle ? 'open' : null}`}>
            <div className={`report_purchase_popup_frame`}>
                <div className="report_purchase_popup_title_close_button_frame">
                    <span className="report_purchase_popup_title_text Pre_KR_Medium">주문정보</span>
                    <div className="report_purchase_popup_close_button" onClick={handlePopStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style={{pointerEvents:'none', display:'inherit', width:'100%', height:'100%'}}>
                            <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
                        </svg>
                    </div>
                </div>
                <div className="report_purchase_subtitle_frame Pre_KR_Medium">상품정보</div>
                <div className="report_purchase_report_detail_price_frame">
                    <div className="report_purchase_report_detail_frame">
                        {/* {% comment %} {% if report.report_description.html|extract_img_urls %}
                            <div className="report_purchase_report_image">
                                {% for report_preview_images in report.report_description.html|extract_img_urls %}
                                    <img src="{{ report_preview_images }}" alt="Preview Image">
                                {% endfor %}
                            </div>
                        {% endif %} {% endcomment %} */}
                        <div className="report_purchase_report_subject_category_frame">
                            <div className="report_purchase_report_subject_text Pre_KR_Normal">{ subject }</div>
                            <div className="report_purchase_report_category_frame Pre_KR_Normal">
                                { category }
                            </div>
                        </div>
                    </div>
                    <div className="report_purchase_report_price_frame">
                        <span className="report_purchase_report_price_text Pre_KR_Medium">{price}</span>
                        <span className="report_purchase_report_price_text Pre_KR_Medium" style={{fontSize:'15px'}}>원</span>
                    </div>
                </div>
                <div className="report_purchase_subtitle_frame Pre_KR_Medium" style={{paddingTop:'24px'}}>상세정보</div>
                <div className="report_purchase_additional_detail_frame">
                    <div className="report_purchase_additional_detail">
                        <span className="report_purchase_additional_detail_text Pre_KR_Normal">발매일</span>
                        <span className="report_purchase_additional_detail_text Pre_KR_Normal">{create_date}</span>
                    </div>
                    <div className="report_purchase_additional_detail">
                        <span className="report_purchase_additional_detail_text Pre_KR_Normal">판매자</span>
                        <div className="report_purchase_author_information_frame">
                            <div className="report_purchase_author_profile_img">
                                <img src={author_profile_image} alt="User Profile Image" />
                            </div>
                            <a className="report_purchase_additional_detail_text Pre_KR_Normal">{author}</a>
                        </div>
                    </div>
                    <div className="report_purchase_additional_detail">
                        <span className="report_purchase_additional_detail_text Pre_KR_Normal">수정</span>
                        <span className="report_purchase_additional_detail_text Pre_KR_Normal">0회</span>
                    </div>
                </div>
                <div className="report_purchase_agreement_frame">
                    <input type="checkbox" className="report_purchase_agreement_button" id="report_purchase_agreement_button" />
                    <span className="report_purchase_agreement_text Pre_KR_Normal">위 내용 및 <Link style={{color:'#0066FF', textDecoration:'none'}} to={'/company_policy'}>약관</Link>을 확인하였고, 결제에 동의 합니다</span>
                </div>
                <span className="Pre_KR_Normal" id="purchase_agreement_error" style={{color:'#FF0000', fontSize:'12px', marginBottom:'8px'}}>약관에 동의해주세요</span>
                <div className="report_purchase_purchase_button Pre_KR_Medium" id="report_purchase_purchase_button" onclick="ReportPurchase();">
                    결제하기
                </div>
            </div>
        </div>
    );
};

export default ReportPurchasePage