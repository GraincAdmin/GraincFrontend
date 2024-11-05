import React, { useEffect, useState } from "react";
import '../../../static/css/SellReportsBase/ViolationPop/ViolationAnnouncement.css'

// icon
import { ReactComponent as WarningIcon } from '../../../static/assets/GlobalIcon/Warning/Octagon_Warning.svg'
import { useNavigate } from "react-router-dom";
import violationNoticeStore from "../../Store/ViolationNotice";

function ViolationAnnouncement() {
    const navigate = useNavigate();
    
    const { violationNotice, setViolationNotice ,violationType, violationDetail, prePageOption, setPrePageOption } = violationNoticeStore();

    const [violationRestriction, setViolationRestriction] = useState(null);
    const [violationRestrictionDetail, setViolationRestrictionDetail] = useState(null);

    useEffect(() => {
        if (violationType === 'article_upload') {
            setViolationRestriction('커뮤니티 글 작성이 불가합니다');
            setViolationRestrictionDetail('셀리포트 커뮤니티 규제 위반으로 커뮤니티 글 및 댓글 작성이 불가합니다');
        } else if (violationType === 'comment') {
            setViolationRestriction('댓글 작성이 불가 합니다');
            setViolationRestrictionDetail('셀리포트 커뮤니티 규제 위반으로 댓글 작성이 불가합니다.');
        } else if (violationType === 'reply') {
            setViolationRestriction('답글 작성이 불가 합니다');
            setViolationRestrictionDetail('셀리포트 커뮤니티 규제 위반으로 답글 작성이 불가합니다.');
        }
    }, [violationType]);

    const handleClose = () => {
        if (prePageOption) {
            setViolationNotice(false);
            setPrePageOption(false);
            navigate(-1);
        } else {
            setViolationNotice(false);
        }
    }

    return (
        <div className={`violation_announcement_pop_main_frame ${violationNotice ? 'open': null}`}>
            <div className="violation_announcement_frame">
                <WarningIcon style={{width: '60px', height: '60px', stroke: '#ff0000'}} />
                <div className="violation_announcement_content_frame">
                    <span className="violation_announcement_title_text Pre_KR_SemiBold">{violationRestriction}</span>
                    <span className="violation_content_subtext_frame Pre_KR_Medium">{violationRestrictionDetail}</span>
                </div>
                <div className="violation_announcement_detail_frame">
                    <span className="violation_announcement_title_text Pre_KR_SemiBold" style={{fontSize:'16px'}}>정지사유</span>
                    <span className="violation_content_subtext_frame Pre_KR_Medium">{violationDetail}</span>
                </div>
                <div className={`violation_announcement_button Pre_KR_Medium`} onClick={() => handleClose()}>
                    닫기
                </div>
            </div>
        </div>
    )
}

export default ViolationAnnouncement