import React, { useState } from "react";
import '../../static/css/Inquiry/InquiryMain.css'
import useAxios from "../../axiosAPIClient";
import SnackBarStore from "../Store/SnackBarStore";
const InquiryMain = ({setInquiryPage}) => {
    const apiClient = useAxios();
    const {showSnackBar} = SnackBarStore();
    const [inquiryType, setInquiryType] = useState(null);

    const [subject, setSubject] = useState(null);
    const [mainContent, setMainContent] = useState(null);

    const [inquiryTypeError, setInquiryTypeError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [mainContentError, setMainContentError] = useState(false);

    const checkInquiryTypeError = () => {
        if (!inquiryType) {
            setInquiryTypeError(true);
        } else {
            setInquiryTypeError(false);
        }
    }

    const checkSubjectError = () => {
        if (!subject) {
            setSubjectError(true);
        } else {
            setSubjectError(false);
        }
    };

    const checkMainContentError = () => {
        if (!mainContent) {
            setMainContentError(true);
        } else {
            setMainContentError(false);
        }
    };

    const  handleInquirySubmit =  () => {
        checkInquiryTypeError();
        checkSubjectError();
        checkMainContentError();
        postInquiry();
    };

    const postInquiry = async () => {
        try {
            const response = await apiClient.post('/new_inquiry/' , {
                Inquiry_type: inquiryType,
                Subject: subject,
                Content: mainContent
            })
            const data = response.data.status
            if (data === 'success') {
                setInquiryPage('history');
            }
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('문의를 업로드 중 문제가 발생했습니다', 'error')
            }
        }
    }


    function buildInquiryTypeButton(label) {
        return <div className={`inquiry_type_option 
            Pre_KR_Normal 
            ${inquiryType === label ? 'selected' : null}
            ${inquiryTypeError ? 'error' : null}`} 
            onClick={() => setInquiryType(label)}>
            <span className="inquiry_type_option_text">{label}</span>
            <div className="inquiry_type_option_icon">
                {inquiryType === label ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <mask id="mask0_1241_3018" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                        <rect x="0.333008" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1241_3018)">
                        <path d="M10.9138 16.2538L17.6368 9.53075L16.583 8.477L10.9138 14.1463L8.06376 11.2963L7.01001 12.35L10.9138 16.2538ZM12.3348 21.5C11.0208 21.5 9.78567 21.2507 8.62951 20.752C7.47334 20.2533 6.46767 19.5766 5.61251 18.7218C4.75734 17.8669 4.08026 16.8617 3.58126 15.706C3.08242 14.5503 2.83301 13.3156 2.83301 12.0017C2.83301 10.6877 3.08234 9.45267 3.58101 8.2965C4.07967 7.14033 4.75642 6.13467 5.61126 5.2795C6.46609 4.42433 7.47134 3.74725 8.62701 3.24825C9.78267 2.74942 11.0174 2.5 12.3313 2.5C13.6453 2.5 14.8803 2.74933 16.0365 3.248C17.1927 3.74667 18.1983 4.42342 19.0535 5.27825C19.9087 6.13308 20.5858 7.13833 21.0848 8.294C21.5836 9.44967 21.833 10.6844 21.833 11.9983C21.833 13.3123 21.5837 14.5473 21.085 15.7035C20.5863 16.8597 19.9096 17.8653 19.0548 18.7205C18.1999 19.5757 17.1947 20.2528 16.039 20.7518C14.8833 21.2506 13.6486 21.5 12.3348 21.5Z" fill="#0066FF"/>
                        </g>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <mask id="mask0_1241_3023" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                        <rect x="0.666016" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1241_3023)">
                        <path d="M11.2468 16.2538L17.9698 9.53075L16.916 8.477L11.2468 14.1463L8.39677 11.2963L7.34302 12.35L11.2468 16.2538ZM12.6678 21.5C11.3538 21.5 10.1187 21.2507 8.96252 20.752C7.80635 20.2533 6.80068 19.5766 5.94552 18.7218C5.09035 17.8669 4.41327 16.8617 3.91427 15.706C3.41543 14.5503 3.16602 13.3156 3.16602 12.0017C3.16602 10.6877 3.41535 9.45267 3.91402 8.2965C4.41268 7.14033 5.08943 6.13467 5.94427 5.2795C6.7991 4.42433 7.80435 3.74725 8.96002 3.24825C10.1157 2.74942 11.3504 2.5 12.6643 2.5C13.9783 2.5 15.2133 2.74933 16.3695 3.248C17.5257 3.74667 18.5313 4.42342 19.3865 5.27825C20.2417 6.13308 20.9188 7.13833 21.4178 8.294C21.9166 9.44967 22.166 10.6844 22.166 11.9983C22.166 13.3123 21.9167 14.5473 21.418 15.7035C20.9193 16.8597 20.2426 17.8653 19.3878 18.7205C18.5329 19.5757 17.5277 20.2528 16.372 20.7518C15.2163 21.2506 13.9816 21.5 12.6678 21.5ZM12.666 20C14.8993 20 16.791 19.225 18.341 17.675C19.891 16.125 20.666 14.2333 20.666 12C20.666 9.76667 19.891 7.875 18.341 6.325C16.791 4.775 14.8993 4 12.666 4C10.4327 4 8.54102 4.775 6.99102 6.325C5.44102 7.875 4.66602 9.76667 4.66602 12C4.66602 14.2333 5.44102 16.125 6.99102 17.675C8.54102 19.225 10.4327 20 12.666 20Z" fill="#1C1B1F"/>
                        </g>
                    </svg>
                )}
            </div>
        </div>
    }
    

    return (
        <form className="inquiry_content_block_frame" method="post">
            <div className="inquiry_submit_section_frame">
                <span className="inquiry_submit_selection_title_text Pre_KR_Normal">문의유형</span>
                <div className="inquiry_type_option_cover_frame">
                    {buildInquiryTypeButton('서비스')}
                    {buildInquiryTypeButton('커뮤니티')}
                    {buildInquiryTypeButton('멤버십')}
                </div>
            </div>
            <div className="inquiry_submit_section_frame">
                <span className="inquiry_submit_selection_title_text Pre_KR_Normal">제목</span>
                <input className={`inquiry_subject_input Pre_KR_Normal ${subjectError ? 'error' : null}`} 
                    placeholder="문의 제목을 입력해주세요"
                    onChange={(e) => setSubject(e.target.value)}
                    onClick={() => setSubjectError(false)}
                    onBlur={() => checkSubjectError()}>
                </input>
            </div>
            <div className='inquiry_submit_section_frame'>
                <span className="inquiry_submit_selection_title_text Pre_KR_Normal">문의내용</span>
                <textarea className={`inquiry_main_content Pre_KR_Normal ${mainContentError ? 'error' : null}`} 
                    placeholder="문의내용을 입력해주세요"
                    onChange={(e) => setMainContent(e.target.value)}
                    onClick={() => setMainContentError(false)}
                    onBlur={() => checkMainContentError()}>
                </textarea>
            </div>
            <div className="inquiry_submit_button_frame" onClick={handleInquirySubmit}>
                <div className="inquiry_submit_button Pre_KR_Normal" onclick="InquirySubmit();">문의하기</div>
            </div>
        </form>
    );
};

export default InquiryMain