import React, { useEffect, useState } from "react";
import '../../../static/css/CustomAdmin/Admin/AdminDashboard.css'
import useAxios from "../../../axiosAPIClient";
const AdminDashboard = () => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    // Dashboard top key data
    const [totalUser, setTotalUser] = useState();
    const [newArticles, setNewArticles] = useState();
    const [newReports, setNewReports] = useState();
    
    // Dashboard Inquiry
    const [waitingInquiryCount, setWaitingInquiryCount] = useState();
    const [inquiry, setInquiry] = useState([]);
    const lastInquiry = inquiry.length - 1

    const fetchDashboardData = async () => {
        try {
            const response = await apiClient.get('/custom_admin_dashboard_data/');
            const data = response.data;
            setTotalUser(data.total_user);
            setNewArticles(data.new_article);
            setNewReports(data.new_reports);
            setInquiry(data.waiting_inquiry);
            setWaitingInquiryCount(data.waiting_inquiry_count);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }
    
    return (
        <>
            <div class="admin_dashboard_key_information_cover_frame">
                <div class="admin_dashboard_key_information_frame">
                    <span class="admin_dashboard_key_information_title Pre_KR_Normal">총 유저수</span>
                    <span class="admin_dashboard_key_information_content_text Pre_KR_Medium">{ totalUser }</span>
                </div>
                <div class="admin_dashboard_key_information_frame">
                    <span class="admin_dashboard_key_information_title Pre_KR_Normal">리포트마켓 수익 (1개월)</span>
                    {/* <span class="admin_dashboard_key_information_content_text Pre_KR_Medium">₩ {{ this_month_report_market_profit|intcomma }}</span> */}
                </div>
                <div class="admin_dashboard_key_information_frame">
                    <span class="admin_dashboard_key_information_title Pre_KR_Normal">포인트 수익 (1개월)</span>
                    {/* <span class="admin_dashboard_key_information_content_text Pre_KR_Medium">₩ {{ this_month_emoney_profit|intcomma }}</span> */}
                </div>
                <div class="admin_dashboard_key_information_frame">
                    <span class="admin_dashboard_key_information_title Pre_KR_Normal">신규 커뮤티글 (1개월)</span>
                    <span class="admin_dashboard_key_information_content_text Pre_KR_Medium">{ newArticles }</span>
                </div>
                <div class="admin_dashboard_key_information_frame">
                    <span class="admin_dashboard_key_information_title Pre_KR_Normal">신규 리포트 (1개월)</span>
                    <span class="admin_dashboard_key_information_content_text Pre_KR_Medium">{ newReports }</span>
                </div>
            </div>
            <div class="admin_dashboard_additional_information_cover">
                <div class="admin_dashboard_additional_information_frame">
                    <div class="admin_dashboard_additional_information_title Pre_KR_Medium">미답변 문의<span style={{color:'#0066FF', marginLeft:'4px'}}>{ waitingInquiryCount }</span></div>
                    <table class="admin_dashboard_additional_information_table Pre_KR_Normal">
                        <thead>
                            <tr style={{width:'100%'}}>
                                <th style={{width:'60%'}}>문의내용</th>
                                <th style={{width:'20%'}}>카테고리</th>
                                <th style={{width:'20%'}}>날짜</th>
                            </tr>
                        </thead>
                        <tbody style={{flexDirection:'column'}}>
                            {inquiry.length !== 0 ? (
                                inquiry.map((inquiry, index) => (
                                    <tr key={index} style={{ width:'100%', borderBottom:`${lastInquiry === index ? '0px' : null}` }}>
                                        <th style={{width:'60%'}}>{ inquiry.Inquiry_subject }</th>
                                        <th class="th_text_content_none_subject">{ inquiry.Inquiry_type }</th>
                                        <th class="th_text_content_none_subject">{ inquiry.formatted_date }</th>
                                    </tr>
                                ))
                            ) :  (
                                <tr style={{width:'100%', borderBottom:'0px'}}>
                                    <th style={{width:'100%'}}>문의 내역이 없습니다</th>
                                </tr> 
                            )}
                        </tbody>
                    </table>
                </div>
                <div class="admin_dashboard_additional_information_frame">
                    <div class="admin_dashboard_additional_information_title Pre_KR_Medium">포인트 결제내역</div>
                    <table class="admin_dashboard_additional_information_table Pre_KR_Normal">
                        <thead>
                            <tr style={{width:'100%'}}>
                                <th style={{width:'60%'}}>결제자</th>
                                <th style={{width:'20%'}}>결제금액</th>
                                <th style={{width:'20%'}}>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {% if emoney_purchase_record %}
                                {% for record in emoney_purchase_record %}
                                    <tr style="width: 100%; {% if forloop.last %} border-bottom: 0px; {% endif %}">
                                        <th style={{width:'60%'}}>{{ record.Buyer.username }}</th>
                                        <th class="th_text_content_none_subject">{{ record.Emoney_Amount|intcomma }}</th>
                                        <th class="th_text_content_none_subject">{{ record.Payment_Date|date:"Y-m-d" }}</th>
                                    </tr>
                                {% endfor %}
                            {% else %}
                                    <tr style="width: 100%; border-bottom: 0px;">
                                        <th style={{width:'100%'}}>결제내역이 없습니다</th>
                                    </tr> 
                            {% endif %} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard