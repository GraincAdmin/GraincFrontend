import React, { useContext } from "react";
import '../../../../static/css/Community/Community_Global/FreeTrial/MembershipFreeTrial.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import useAxios from "../../../../axiosAPIClient";
import SnackBarStore from "../../../Store/SnackBarStore";
const MembershipFreeTrial = ({styleToggle, setStyleToggle, fetchArticle, setMembershipRequest}) => {
    const { user } = useContext(AuthContext);
    const { showSnackBar } = SnackBarStore();
    const apiClient = useAxios();

    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    const { article_id } = useParams();

    const requestFreeTrial = async () => {
        if (user !== null) {
            try {
                const response = await apiClient.post(`/handle_article_free_trial/?article_id=${article_id}`);
                if (response.status === 200) {
                    setStyleToggle(false);
                    if (!response.data.free_trial_limit) {
                        fetchArticle();
                        showSnackBar(`무료 보기를 사용하셨습니다. 잔여: ${response.data.free_trial_count}`, 'normal')
                    }
                }
            } catch(error) {
                if (error.response.status === 403) {
                    setStyleToggle(false);
                    setMembershipRequest(true);
                } else {
                    if (error.response.status !== 401) {
                        showSnackBar('무료 보기 요청 중 문제가 생겼습니다', 'error')
                    }
                }
            }
        }
    }



    
    return (
        <div className={`membership_free_trial_cover ${styleToggle ? 'open' : null}`}>
            <div className="membership_free_trial">
                <span className="g_font_18 g_text_color_1 Pre_KR_SemiBold"style={{textAlign: 'center'}}>
                    무료보기를 사용하시겠어요?
                </span>
                <span className="g_font_15 g_text_color_2 Pre_KR_Normal" style={{marginTop: '12px', textAlign: 'center'}}>
                    비멤버십 회원은 하루 최대 10개의 <br/>
                    멤버십 콘텐츠를 볼 수 있어요
                </span>
                <Link 
                    className="g_font_15 Pre_KR_SemiBold" 
                    style={{margin: '16px 0px 24px 0px', textAlign: 'center', color: '#0066ff', textDecoration: 'none'}}
                    to={'/membership_subscription'}
                >
                    멤버십 요금제 보기
                </Link>
                <div className="g_row g_gap_16">
                    <div className="membership_free_trial_button close Pre_KR_Medium" onClick={() => handleClose()}>
                        취소
                    </div>
                    <div className="membership_free_trial_button request Pre_KR_Medium" onClick={() => requestFreeTrial()}>
                        보기
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipFreeTrial