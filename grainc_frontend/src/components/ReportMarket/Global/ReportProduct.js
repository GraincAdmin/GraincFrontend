import React from "react";
import '../../../static/css/ReportMarket/Global/ReportProduct.css'
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from '../../../static/assets/ReportMarket/Global/Star.svg';

// import report bookmark component
import ReportBookmark from "./ReportBookmark";

function ReportProduct({reports, customStyle, customStyleDetail}) {
    const lastReport = reports.length - 1;
    return (
        reports ? (
            reports.map((report, index) => (
                <div 
                    className={`
                        g_report_product_frame
                        ${customStyle ? 'custom_style' : null}
                        ${customStyleDetail ? 'custom_style_detail' : null}
                        ${index === lastReport ? 'g_report_product_border_option_768' : null}`}>
                    <ReportBookmark report_id={report.report_id}/>
                    <Link  to={`/report_detail/${report.report_id}`} style={{textDecoration: 'none'}}>
                        <div className="g_report_product_category_bookmark_frame">
                            <div className="g_report_product_category_short_indicator_frame">
                                <div className="g_report_product_author_information">
                                    <div className="g_report_product_author_profile_image">
                                        <img src={report.author_profile_image}></img>
                                    </div>
                                    <span className="Pre_KR_Normal">{report.author_username}</span>
                                </div>
                            </div>
                        </div>
                        <div className="g_report_product_subject Pre_KR_Medium">{report.subject}</div>
                        <div 
                            className={`
                                g_report_product_bottom_information_frame
                                ${customStyleDetail ? 'custom_style_detail' : null}`}>
                            <div 
                                className={`
                                    g_report_product_additional_information_frame
                                    ${customStyleDetail ? 'custom_style_detail' : null}`}>
                                <div className="g_report_product_rating_frame">
                                    <StarIcon className='g_report_product_rating_icon'/>
                                    <span>{report.formatted_rating}</span>
                                </div>
                                <span className="g_report_product_price Pre_KR_Normal">{report.formatted_price}원</span>
                            </div>
                            <div 
                                className={`
                                    g_report_further_information_frame
                                    ${customStyleDetail ? 'custom_style_detail' : null}`}>
                                <div className="g_report_further_information_card_ui_frame">
                                    <span>{report.report_category}</span>
                                </div>
                                <div className="g_report_further_information_card_ui_frame">
                                    <span>{report.report_create_date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        ) : null
    );
}

export default ReportProduct
