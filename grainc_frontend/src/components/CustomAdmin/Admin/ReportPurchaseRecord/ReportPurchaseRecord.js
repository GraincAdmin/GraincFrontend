import React from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'

const ReportPurchaseRecord = () => {
    return (
        <div class="admin_search_bar_page_main_cover_frame">
            <div class="admin_page_indicator Pre_KR_Normal">리포트 결제내역</div>
            <form class="admin_page_search_bar_main_frame" method="get" >
                <input class="admin_page_search_bar Pre_KR_Normal" name="kw" placeholder="결제내역 검색 (제목, 구매자 닉네임, 판매자이름, 판매자 닉네임, 판매자 이메일, 결제코드)" />
                <button class="admin_page_search_button Pre_KR_Normal">검색하기</button>
            </form>
            <div class="admin_search_bar_base_main_content_frame">
                <table class="admin_report_purchase_record_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th style={{width:'25%'}}>구매자</th>
                            <th style={{width:'25%'}}>판매자</th>
                            <th style={{width:'25%'}}>금액</th>
                            <th style={{width:'25%'}}>결제코드</th>
                            <th style={{width:'25%'}}>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {% for purchase_record in report_purchase_record %}
                            <tr>
                                <th style="width: 25%; text-align: left;">{{ purchase_record.Buyer.username }}</th>
                                <th style="width: 25%; text-align: left;">{{ purchase_record.Purchased_Report.author.username }} - {{ purchase_record.Purchased_Report.author.fullname }}</th>
                                <th style="width: 25%; text-align: left;">{{ purchase_record.Amount|intcomma }}원</th>
                                <th style="width: 25%; text-align: left;">{{ purchase_record.Payment_Code }}</th>
                                <th style="width: 25%; text-align: left;">{{ purchase_record.Payment_Date|date:"Y-m-d" }}</th>
                            </tr>
                        {% endfor %} */}
                    </tbody>
                </table>
                {/* pagination */}
            </div>
        </div>
    );
};

export default ReportPurchaseRecord