import React, { useContext, useEffect, useRef, useState } from "react";
import '../../../../static/css/Community/Community_Global/MoreOption/CommunityArticleReport.css'
import { ReactComponent as CloseIcon } from '../../../../static/assets/GlobalIcon/Close_MD.svg'
import { ReactComponent as DropdownIcon } from '../../../../static/assets/GlobalIcon/Caret_Down_MD.svg'
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";
import LoadingCircle from "../../../Global/LoadingCircle";
import SnackBarStore from "../../../Store/SnackBarStore";

function CommunityContentReport({toggle, setToggle, type, reporting_id}) {

    const handleReportingServiceClose = () => {
        setReportingDetail(null);
        setReportingCategory(null);
        setDropdownStyle(false);
        setToggle(false);
        setSubmitComplete(false);
    }
    
    useEffect(() => {
        if (toggle) {
            document.body.classList.add('overflow_block_768');
        } else {
            document.body.classList.remove('overflow_block_768');
        }
    }, [toggle]);


    const report_type_list = [
        '영리목적/홍보성',
        '저작권 침해',
        '음란성/선정성',
        '욕설/인신공격',
        '개인정보노출',
        '같은내용 반복게시',
        '기타'
    ]

    const renderReportingDropdown = () => {
        let dropdown = []

        report_type_list.forEach(type => {
            dropdown.push(
                <div 
                    className={`
                        g_article_report_dropdown 
                        ${reportingCategory === type ? 'selected' : null}
                        Pre_KR_Normal
                    `}
                    onClick={() => handleReportingCategory(type)}>
                    {type}
                </div>
            );
        })

        return (dropdown);
    }

    const [dropdownStyle, setDropdownStyle] = useState(false);

    const handleDropdownStyle = () => {
        if (dropdownStyle) {
            setDropdownStyle(false);
        } else {
            setDropdownStyle(true);
        }
    }

    const dropdownREF = useRef();
    const handleClickOutSideDropdown = (event) => {
        if (dropdownREF.current && !dropdownREF.current.contains(event.target)) {
            setDropdownStyle(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSideDropdown);

        return (
            document.addEventListener('click', handleClickOutSideDropdown)
        )
    }, []);

    // reporting variables

    const [reportingCategory, setReportingCategory] = useState(null);

    const [categoryError, setCategoryError] = useState(false);

    const handleReportingCategory = (category) => {
        setReportingCategory(category);
        setDropdownStyle(false);
        setCategoryError(false);
    }

    const [reportingDetail, setReportingDetail] = useState(null);

    
    // reporting submit
    const {showSnackBar} = SnackBarStore(); 
    const apiClient = useAxios();

    const [submitError, setSubmitError] = useState(null);
    const [submitComplete, setSubmitComplete] = useState(false);

    const [submitLoading, setSubmitLoading] = useState(false);
    const submitArticleReporting = async () => {
        if (reportingCategory) {
            setSubmitLoading(true);
            try {
                const response = await apiClient.post('/report_article/', {
                    reporting_id: reporting_id,
                    reporting_content_type: type,
                    reporting_category: reportingCategory,
                    reporting_detail: reportingDetail,
                })
                if (response.status === 200) {
                    setSubmitComplete(true);
                }
            } catch(error) {
                if (error.response.status === 403) {
                    setSubmitError(error.response.data.status)
                }
                if (error.response.status !== 401) {
                    showSnackBar('신고 접수 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setSubmitLoading(false);
            }
        }
    }


    const handleSubmitArticleReporting = () => {
        if (!reportingCategory) {
            setCategoryError(true);
        } else {
            submitArticleReporting();
        }
    }



     return (
        <>
            <div className={`g_article_report_main_cover_frame ${toggle ? 'open' : null}`}>
                <div className="g_article_report_main_frame">
                    <div className="g_article_report_title_frame">
                        <span className="Pre_KR_SemiBold">신고하기</span>
                        <div className="g_article_report_close_button" onClick={() => handleReportingServiceClose()}>
                            <CloseIcon style={{stroke: '#1A1A1B'}}/>
                        </div>
                    </div>
                    <div className="g_article_report_content_frame">
                        <span className="Pre_KR_Medium">신고유형</span>
                        <div 
                            className={`g_article_report_dropdown_main_frame ${categoryError ? 'error' : null}`}
                            ref={dropdownREF} onClick={() => handleDropdownStyle()}
                        >
                            <span className="Pre_KR_Normal" toggle={{color:'#000'}}>
                                {reportingCategory ? (
                                    `${reportingCategory}`
                                ) : (
                                    '신고유형을 선택해주세요'
                                )}
                            </span>
                            <div className={`g_article_report_dropdown_icon ${dropdownStyle ? 'open' : 'close'}`}>
                                <DropdownIcon />
                            </div>
                        </div>
                        <div className={`g_article_report_dropdown_frame ${dropdownStyle ? 'open' : null}`}>
                            {renderReportingDropdown()}
                        </div>
                    </div>
                    <div className="g_article_report_content_frame">
                        <span className="Pre_KR_Medium">신고내용</span>
                        <textarea 
                            className="g_article_report_content_input" 
                            placeholder="신고내용을 입력해주세요"
                            value={reportingDetail}
                            onChange={(e) => setReportingDetail(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="g_article_report_content_frame" toggle={{marginTop:'32px'}}>
                        {submitError ? (
                            <span className="Pre_KR_Medium" toggle={{fontSize:'12px', color:'#ff0000'}}>{submitError}</span>
                        ) : (
                            <span className="Pre_KR_Medium" toggle={{fontSize:'12px'}}>신고는 반대 의견을 표시하는 기능이 아닙니다.</span>
                        )}
                        <div className="g_article_report_submit_button Pre_KR_Medium" onClick={() => handleSubmitArticleReporting()}>
                            {submitLoading ? (
                                <LoadingCircle />
                            ) : (
                                '신고하기'
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`reporting_complete_main_frame ${submitComplete ? 'open' : null}`}>
                <div className="reporting_complete_frame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <rect width="52" height="52" rx="26" fill="#0066FF" fill-opacity="0.05"/>
                        <mask id="mask0_1507_125" toggle={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="10" y="10" width="32" height="32">
                        <rect x="10" y="10" width="32" height="32" rx="1.5" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1507_125)">
                        <path d="M23.7974 32.9395C23.2116 33.5253 22.2618 33.5253 21.6761 32.9395L16.0867 27.3501C15.562 26.8255 15.562 25.9748 16.0867 25.4501V25.4501C16.6114 24.9255 17.462 24.9255 17.9867 25.4501L21.6761 29.1395C22.2618 29.7253 23.2116 29.7253 23.7974 29.1395L34.0201 18.9168C34.5447 18.3921 35.3954 18.3921 35.9201 18.9168V18.9168C36.4447 19.4415 36.4447 20.2921 35.9201 20.8168L23.7974 32.9395Z" fill="#0066FF"/>
                        </g>
                    </svg>
                    <span className="reporting_complete_main_text Pre_KR_SemiBold">신고완료</span>
                    <span className="reporting_complete_sub_text Pre_KR_Medium">
                        더 좋은 서비스를 만들기 <br/>
                        위해 노력하겠습니다.
                    </span>
                    <div className="reporting_complete_button Pre_KR_Medium" onClick={() => handleReportingServiceClose()}>
                        확인
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityContentReport