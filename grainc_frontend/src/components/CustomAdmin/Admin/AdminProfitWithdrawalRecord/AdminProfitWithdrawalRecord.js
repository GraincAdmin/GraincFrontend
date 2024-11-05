import React from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
const AdminProfitWithdrawalRecord = () => {
    return (
        <div class="admin_search_bar_page_main_cover_frame">
            <div class="admin_page_indicator Pre_KR_Normal">출금내역 조회</div>
            <form class="admin_page_search_bar_main_frame" method="get">
                <input class="admin_page_search_bar Pre_KR_Normal" name="kw" placeholder="출금내역 검색 (요청코드, 요청자 이름, 요청자 닉네님, 요청자 이메일, 요청자 전화번호)" />
                <button class="admin_page_search_button Pre_KR_Normal">검색하기</button>
            </form>
            <div class="admin_search_bar_base_main_content_frame">
                <table class="admin_profit_withdrawal_record_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th style={{width:'25%'}}>요청자</th>
                            <th style={{width:'25%'}}>금액</th>
                            <th style={{width:'25%'}}>실금액</th>
                            <th style={{width:'25%'}}>요청코드</th>
                            <th style={{width:'25%'}}>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {% for withdrawal_record in profit_withdrawal_record %}
                            <tr>
                                <th style="width: 25%; text-align: left;">{{ withdrawal_record.Request_User.username }} - {{ withdrawal_record.Request_User.fullname }}</th>
                                <th style="width: 25%; text-align: left;">{{ withdrawal_record.Request_Amount|intcomma }} 원</th>
                                <th style="width: 25%; text-align: left;">{{ withdrawal_record.Actual_Amount|intcomma }} 원</th>
                                <th style="width: 25%; text-align: left;">{{ withdrawal_record.Request_Code }}</th>
                                <th style="width: 25%; text-align: left;">{{ withdrawal_record.Request_Date|date:"Y-m-d" }}</th>
                            </tr>
                        {% endfor %} */}
                    </tbody>
                </table>
                {/* pagination */}
            </div>
        </div>
    );
};

export default AdminProfitWithdrawalRecord