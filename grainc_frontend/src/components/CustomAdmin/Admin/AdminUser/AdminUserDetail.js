import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
import useAxios from "../../../../axiosAPIClient";

const AdminUserDetail = ({user_id}) => {
    const apiClient = useAxios();

    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    // user detail
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [isActive, setIsActive] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [isSeller, setIsSeller] = useState();

    // Violation Control

    const [communityRestriction, setCommunityRestriction] = useState();
    const [communityRestrictionDetail, setCommunityRestrictionDetail] = useState();

    const [reportMarketRestriction, setReportMarketRestriction] = useState();
    const [reportMarketRestrictionDetail, setReportMarketRestrictionDetail] = useState();


    const fetchUserDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_user_detail/${user_id}/`);
            const data = response.data;
            setEmail(data.email);
            setUsername(data.username);
            setIsActive(data.is_active);
            setIsAdmin(data.is_admin);
            setIsSeller(data.is_seller);

            // Violation
            setCommunityRestriction(data.community_restriction);
            setCommunityRestrictionDetail(data.violation_detail_community);
            setReportMarketRestriction(data.report_market_restriction);
            setReportMarketRestrictionDetail(data.violation_detail_report_market);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserDetail();
    }, []);

    if (loading) {
        return (
            <div>로딩중 ...</div>
        )
    }

    const handleSubmit = async () => {
        setUpdateStatus(null);
        setUpdateError(null);
        try {
            const response = await apiClient.post(`/custom_admin_user_detail/${user_id}/`, {
                is_active: isActive,
                is_admin: isAdmin,
                is_seller: isSeller,

                email: email,
                username: username,

                community_restriction: communityRestriction,
                community_restriction_detail: communityRestrictionDetail,
                report_market_restriction: reportMarketRestriction,
                report_market_restriction_detail: reportMarketRestrictionDetail,
            });
            fetchUserDetail();
            setUpdateStatus(true);
        } catch (error) {
            setUpdateStatus(false);
            setUpdateError(true);
        }
    };

    return (
        <form className="admin_modification_panel_form">
            <div className="admin_panel_section_indicator Pre_KR_SemiBold">유저 기본정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">이메일:</span>
                <input
                    className="admin_panel_input"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">유저이름:</span>
                <input 
                    className="admin_panel_input" 
                    name="username" 
                    value={ username } 
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">계정 활성화:</span>
                <input
                    className="admin_panel_input_check_box"
                    type="checkbox"
                    name="is_active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">관리자 권한:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="is_admin"  
                    checked={ isAdmin } 
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
            </div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold" style={{marginTop:'24px'}}>셀러정보</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">이름:</span>
                <input className="admin_panel_input" name="fullname" />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">핸드폰 정보:</span>
                <input className="admin_panel_input" name="phone_number" />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">입금은행:</span>
                <input className="admin_panel_input" name="bank" />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">계좌번호:</span>
                <input className="admin_panel_input" name="bank_account_number" />
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">판매자 여부:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="is_seller" 
                    checked={ isSeller } 
                    onChange={(e) => setIsSeller(e.target.checked)}
                />
            </div>
            <div className="admin_panel_section_indicator Pre_KR_SemiBold" style={{marginTop:'24px'}}>계정 정지</div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">커뮤니티 정지:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="community_restriction"
                    checked={communityRestriction}
                    onChange={(e) => setCommunityRestriction(e.target.checked)}
                />
            </div>
            <div class="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">정지사유</span>
                <textarea class="admin_panel_textarea" 
                    style={{height:'150px'}}
                    name="community_restriction_detail"
                    value={communityRestrictionDetail}
                    onChange={(e) => setCommunityRestrictionDetail(e.target.value)}
                >
                </textarea>
            </div>
            <div className="admin_panel_input_frame">
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">리포트 마켓 정지:</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="report_market_restriction"
                    checked={reportMarketRestriction}
                    onChange={(e) => setCommunityRestriction(e.target.checked)}
                />
            </div>
            <div class="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">정지사유:</span>
                <textarea class="admin_panel_textarea" 
                    style={{height:'150px'}}
                    name="report_market_restriction_detail"
                    value={reportMarketRestrictionDetail}
                    onChange={(e) => reportMarketRestrictionDetail(e.target.value)}
                >
                </textarea>
            </div>
            <div className="admin_panel_save_button_frame">
                <div className="admin_panel_save_button Pre_KR_Normal" onClick={() => handleSubmit()}>저장</div>
            </div>
            {updateStatus && (
                <span className="Pre_KR_Normal" style={{color:'#0066FF', marginLeft:'auto', paddingTop:'8px'}}>수정완료</span>
            )}
            {updateError && (
                <span className="Pre_KR_Normal" style={{color:'#ff0000', marginLeft:'auto', paddingTop:'8px'}}>수정에러</span>
            )}
        </form>
    );
};

export default AdminUserDetail